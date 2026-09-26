import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

  const trigger = screen.getByRole('button', { name: 'Recovery details' });

  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByText('Keep this safe.')).not.toBeInTheDocument();

  fireEvent.click(trigger);

  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
  expect(screen.getByText('Keep this safe.')).toBeInTheDocument();

  fireEvent.click(trigger);

  await waitFor(() => expect(screen.queryByText('Keep this safe.')).not.toBeInTheDocument());
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

  const trigger = screen.getByRole('button', { name: 'Controlled details' });
  fireEvent.click(trigger);

  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
  expect(screen.getByText('Open: true')).toBeInTheDocument();
});

test('preserves disabled state', async () => {
  render(
    <Collapsible disabled>
      <CollapsibleTrigger>Disabled details</CollapsibleTrigger>
      <CollapsibleContent>Unavailable details.</CollapsibleContent>
    </Collapsible>,
  );

  const trigger = screen.getByRole('button', { name: 'Disabled details' });
  fireEvent.click(trigger);

  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  expect(trigger).toHaveAttribute('data-disabled');
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

  const trigger = screen.getByRole('button', { name: 'Partial details' });
  const content = screen.getByTestId('partial-content');
  const nestedAction = screen.getByText('Nested action');

  expect(content).toHaveAttribute('data-has-collapsed-size');
  expect(content).not.toHaveAttribute('hidden');
  await waitFor(() => expect(nestedAction).toHaveAttribute('inert'));

  fireEvent.click(trigger);

  await waitFor(() => expect(nestedAction).not.toHaveAttribute('inert'));
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
  expect(trigger).toHaveClass('consumer-trigger');
  expect(trigger).toHaveAttribute('data-slot', 'collapsible-trigger');
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(trigger);

  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
});

test('keeps provider and descendant context composition connected', async () => {
  render(<ProviderCollapsible />);

  const trigger = screen.getByRole('button', { name: 'Provider details' });

  expect(trigger).toHaveAttribute('aria-expanded', 'true');

  fireEvent.click(screen.getByRole('button', { name: 'Close from context' }));

  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
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

  expect(root).toHaveClass('box-border', 'flex', 'w-full', 'max-w-full', 'min-w-0', 'flex-col');
  expect(trigger).toHaveClass(
    'flex',
    'w-full',
    'gap-2',
    'bg-transparent',
    'px-0',
    'py-1',
    'text-sm',
  );
  expect(indicator).toHaveClass('inline-flex', 'size-3', 'shrink-0', 'transition-transform');
  expect(content).toHaveClass('box-border', 'overflow-hidden', 'text-sm', 'text-muted-foreground');
  expect(body).toHaveClass('grid', 'min-w-0', 'gap-2');
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

  expect(root).toHaveClass('w-1/2', 'text-primary');
  expect(root).not.toHaveClass('w-full', 'text-foreground');
  expect(trigger).toHaveClass('gap-6', 'py-4', 'text-lg');
  expect(trigger).not.toHaveClass('gap-2', 'py-1', 'text-sm');
  expect(indicator).toHaveClass('size-5');
  expect(indicator).not.toHaveClass('size-3');
  expect(content).toHaveClass('text-lg');
  expect(content).not.toHaveClass('text-sm');
  expect(body).toHaveClass('gap-6', 'p-6');
  expect(body).not.toHaveClass('gap-2');
});