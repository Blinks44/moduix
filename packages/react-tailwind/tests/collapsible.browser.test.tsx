import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleRootProvider,
  CollapsibleTrigger,
  useCollapsible,
  useCollapsibleContext,
} from '../src';

function ContextCloseButton() {
  const collapsible = useCollapsibleContext();

  return (
    <button type="button" onClick={() => collapsible.setOpen(false)}>
      Close from context
    </button>
  );
}

function ProviderCollapsible() {
  const collapsible = useCollapsible({ defaultOpen: true });

  return (
    <CollapsibleRootProvider value={collapsible}>
      <CollapsibleTrigger>Provider details</CollapsibleTrigger>
      <CollapsibleContent>
        <ContextCloseButton />
      </CollapsibleContent>
    </CollapsibleRootProvider>
  );
}

test('preserves Ark trigger semantics and lazy unmounting', async () => {
  render(
    <Collapsible lazyMount unmountOnExit>
      <CollapsibleTrigger>Recovery details</CollapsibleTrigger>
      <CollapsibleContent>Keep this safe.</CollapsibleContent>
    </Collapsible>,
  );

  const trigger = page.getByRole('button', { name: 'Recovery details' });

  await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect.element(page.getByText('Keep this safe.')).toHaveCount(0);

  await trigger.click();

  await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect.element(page.getByText('Keep this safe.')).toBeAttached();

  await trigger.click();

  await expect.element(page.getByText('Keep this safe.')).toHaveCount(0);
});

test('forwards the controlled callback details object', async () => {
  function ControlledCollapsible() {
    const [open, setOpen] = useState(false);

    return (
      <Collapsible open={open} onOpenChange={(details) => setOpen(details.open)}>
        <CollapsibleTrigger>Controlled details</CollapsibleTrigger>
        <CollapsibleContent>Controlled content.</CollapsibleContent>
        <output>Open: {String(open)}</output>
      </Collapsible>
    );
  }

  render(<ControlledCollapsible />);

  await page.getByRole('button', { name: 'Controlled details' }).click();

  await expect
    .element(page.getByRole('button', { name: 'Controlled details' }))
    .toHaveAttribute('aria-expanded', 'true');
  await expect.element(page.getByText('Open: true')).toBeAttached();
});

test('does not toggle or emit changes while disabled', async () => {
  const changes = rs.fn();
  render(
    <Collapsible disabled onOpenChange={changes}>
      <CollapsibleTrigger>Disabled details</CollapsibleTrigger>
      <CollapsibleContent>Unavailable details.</CollapsibleContent>
    </Collapsible>,
  );
  const trigger = page.getByRole('button', { name: 'Disabled details' });
  await expect.element(trigger).toHaveAttribute('data-disabled');
  await trigger.click();
  await trigger.press('Enter');
  await trigger.press('Space');
  await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(changes).not.toHaveBeenCalled();
});

test('keeps interactive content inert while partially collapsed', async () => {
  render(
    <Collapsible collapsedHeight="2rem">
      <CollapsibleTrigger>Partial details</CollapsibleTrigger>
      <CollapsibleContent data-testid="partial-content">
        <button type="button">Nested action</button>
      </CollapsibleContent>
    </Collapsible>,
  );

  const content = screen.getByTestId('partial-content');

  expect(content.hasAttribute('data-has-collapsed-size')).toBe(true);
  await expect.element(page.getByTestId('partial-content')).not.toHaveAttribute('hidden');
  await expect.element(page.getByText('Nested action')).toHaveAttribute('inert');

  await page.getByRole('button', { name: 'Partial details' }).click();

  await expect.element(page.getByText('Nested action')).not.toHaveAttribute('inert');
});

test('preserves consumer-owned trigger refs and behavior with asChild', async () => {
  const triggerRef = createRef<HTMLButtonElement>();

  render(
    <Collapsible>
      <CollapsibleTrigger asChild ref={triggerRef}>
        <button type="button" className="consumer-trigger">
          Composed details
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>Composed content.</CollapsibleContent>
    </Collapsible>,
  );

  const trigger = screen.getByRole('button', { name: 'Composed details' });

  expect(triggerRef.current).toBe(trigger);
  expect(trigger?.classList.contains('consumer-trigger')).toBe(true);
  expect(trigger.getAttribute('data-slot')).toBe('collapsible-trigger');
  const triggerLocator = page.getByRole('button', { name: 'Composed details' });

  await expect.element(triggerLocator).toHaveAttribute('aria-expanded', 'false');

  await triggerLocator.click();

  await expect.element(triggerLocator).toHaveAttribute('aria-expanded', 'true');
});

test('keeps provider and descendant context composition connected', async () => {
  render(<ProviderCollapsible />);

  await expect
    .element(page.getByRole('button', { name: 'Provider details' }))
    .toHaveAttribute('aria-expanded', 'true');

  await page.getByRole('button', { name: 'Close from context' }).click();

  await expect
    .element(page.getByRole('button', { name: 'Provider details' }))
    .toHaveAttribute('aria-expanded', 'false');
});

test('exposes component-owned Tailwind defaults on every visual part', () => {
  render(
    <Collapsible defaultOpen data-testid="collapsible-root">
      <CollapsibleTrigger>
        Recovery details
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody>Keep this safe.</CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>,
  );

  const root = screen.getByTestId('collapsible-root');
  const trigger = screen.getByRole('button', { name: 'Recovery details' });
  const indicator = root.querySelector('[data-slot="collapsible-indicator"]');
  const content = root.querySelector('[data-slot="collapsible-content"]');
  const body = root.querySelector('[data-slot="collapsible-body"]');

  expect([...root!.classList]).toEqual(
    expect.arrayContaining(['box-border', 'flex', 'w-full', 'max-w-full', 'min-w-0', 'flex-col']),
  );
  expect([...trigger!.classList]).toEqual(
    expect.arrayContaining([
      'flex',
      'w-full',
      'gap-2',
      'bg-transparent',
      'px-0',
      'py-1',
      'text-sm',
    ]),
  );
  expect([...indicator!.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'size-3', 'shrink-0', 'transition-transform']),
  );
  expect([...content!.classList]).toEqual(
    expect.arrayContaining(['box-border', 'overflow-hidden', 'text-sm', 'text-muted-foreground']),
  );
  expect([...body!.classList]).toEqual(expect.arrayContaining(['grid', 'min-w-0', 'gap-2']));
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(
    <Collapsible className="w-1/2 text-primary" data-testid="collapsible-root">
      <CollapsibleTrigger className="gap-6 py-4 text-lg">
        Recovery details
        <CollapsibleIndicator className="size-5" />
      </CollapsibleTrigger>
      <CollapsibleContent className="text-lg">
        <CollapsibleBody className="gap-6 p-6">Keep this safe.</CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>,
  );

  const root = screen.getByTestId('collapsible-root');
  const trigger = screen.getByRole('button', { name: 'Recovery details' });
  const indicator = root.querySelector('[data-slot="collapsible-indicator"]');
  const content = root.querySelector('[data-slot="collapsible-content"]');
  const body = root.querySelector('[data-slot="collapsible-body"]');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-1/2', 'text-primary']));
  for (const utility of ['w-full', 'text-foreground']) {
    expect(root!.classList.contains(utility)).toBe(false);
  }
  expect([...trigger!.classList]).toEqual(expect.arrayContaining(['gap-6', 'py-4', 'text-lg']));
  for (const utility of ['gap-2', 'py-1', 'text-sm']) {
    expect(trigger!.classList.contains(utility)).toBe(false);
  }
  expect(indicator?.classList.contains('size-5')).toBe(true);
  expect(indicator?.classList.contains('size-3')).toBe(false);
  expect(content?.classList.contains('text-lg')).toBe(true);
  expect(content?.classList.contains('text-sm')).toBe(false);
  expect([...body!.classList]).toEqual(expect.arrayContaining(['gap-6', 'p-6']));
  expect(body?.classList.contains('gap-2')).toBe(false);
});