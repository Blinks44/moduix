import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
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
    <button type="button" onClick={() => collapsible().setOpen(false)}>
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
  render(() => (
    <Collapsible lazyMount unmountOnExit>
      <CollapsibleTrigger>Recovery details</CollapsibleTrigger>
      <CollapsibleContent>Keep this safe.</CollapsibleContent>
    </Collapsible>
  ));

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
    const [open, setOpen] = createSignal(false);

    return (
      <Collapsible open={open()} onOpenChange={(details) => setOpen(details.open)}>
        <CollapsibleTrigger>Controlled details</CollapsibleTrigger>
        <CollapsibleContent>Controlled content.</CollapsibleContent>
        <output>Open: {String(open())}</output>
      </Collapsible>
    );
  }

  render(() => <ControlledCollapsible />);

  await page.getByRole('button', { name: 'Controlled details' }).click();

  await expect
    .element(page.getByRole('button', { name: 'Controlled details' }))
    .toHaveAttribute('aria-expanded', 'true');
  await expect.element(page.getByText('Open: true')).toBeAttached();
});

test('does not toggle or emit changes while disabled', async () => {
  const changes = rs.fn();
  render(() => (
    <Collapsible disabled onOpenChange={changes}>
      <CollapsibleTrigger>Disabled details</CollapsibleTrigger>
      <CollapsibleContent>Unavailable details.</CollapsibleContent>
    </Collapsible>
  ));
  const trigger = page.getByRole('button', { name: 'Disabled details' });
  await expect.element(trigger).toHaveAttribute('data-disabled');
  await trigger.click();
  await trigger.press('Enter');
  await trigger.press('Space');
  await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(changes).not.toHaveBeenCalled();
});

test('keeps interactive content inert while partially collapsed', async () => {
  render(() => (
    <Collapsible collapsedHeight="2rem">
      <CollapsibleTrigger>Partial details</CollapsibleTrigger>
      <CollapsibleContent data-testid="partial-content">
        <button type="button">Nested action</button>
      </CollapsibleContent>
    </Collapsible>
  ));

  const content = screen.getByTestId('partial-content');

  expect(content.hasAttribute('data-has-collapsed-size')).toBe(true);
  await expect.element(page.getByTestId('partial-content')).not.toHaveAttribute('hidden');
  await expect.element(page.getByText('Nested action')).toHaveAttribute('inert');

  await page.getByRole('button', { name: 'Partial details' }).click();

  await expect.element(page.getByText('Nested action')).not.toHaveAttribute('inert');
});

test('preserves consumer-owned trigger behavior with asChild', async () => {
  let triggerRef: HTMLButtonElement | undefined;

  render(() => (
    <Collapsible>
      <CollapsibleTrigger
        ref={(element) => (triggerRef = element)}
        asChild={(props) => <button {...props()} class="consumer-trigger" />}
      >
        Composed details
      </CollapsibleTrigger>
      <CollapsibleContent>Composed content.</CollapsibleContent>
    </Collapsible>
  ));

  const trigger = screen.getByRole('button', { name: 'Composed details' });

  expect(triggerRef).toBeUndefined();
  expect(trigger?.classList.contains('consumer-trigger')).toBe(true);
  expect(trigger.getAttribute('data-slot')).toBe('collapsible-trigger');
  const triggerLocator = page.getByRole('button', { name: 'Composed details' });

  await expect.element(triggerLocator).toHaveAttribute('aria-expanded', 'false');

  await triggerLocator.click();

  await expect.element(triggerLocator).toHaveAttribute('aria-expanded', 'true');
});

test('forwards refs on native parts', () => {
  let rootRef!: HTMLDivElement;
  let triggerRef!: HTMLButtonElement;
  let indicatorRef!: HTMLDivElement;
  let contentRef!: HTMLDivElement;
  let bodyRef!: HTMLDivElement;

  render(() => (
    <Collapsible defaultOpen ref={(element) => (rootRef = element)}>
      <CollapsibleTrigger ref={(element) => (triggerRef = element)}>
        Details
        <CollapsibleIndicator ref={(element) => (indicatorRef = element)} />
      </CollapsibleTrigger>
      <CollapsibleContent ref={(element) => (contentRef = element)}>
        <CollapsibleBody ref={(element) => (bodyRef = element)}>Content</CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  ));

  expect(rootRef?.getAttribute('data-slot')).toBe('collapsible-root');
  expect(triggerRef?.getAttribute('data-slot')).toBe('collapsible-trigger');
  expect(indicatorRef?.getAttribute('data-slot')).toBe('collapsible-indicator');
  expect(contentRef?.getAttribute('data-slot')).toBe('collapsible-content');
  expect(bodyRef?.getAttribute('data-slot')).toBe('collapsible-body');
});

test('keeps provider and descendant context composition connected', async () => {
  render(() => <ProviderCollapsible />);

  await expect
    .element(page.getByRole('button', { name: 'Provider details' }))
    .toHaveAttribute('aria-expanded', 'true');

  await page.getByRole('button', { name: 'Close from context' }).click();

  await expect
    .element(page.getByRole('button', { name: 'Provider details' }))
    .toHaveAttribute('aria-expanded', 'false');
});