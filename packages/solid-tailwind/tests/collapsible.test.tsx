import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Collapsible, useCollapsible, useCollapsibleContext } from '../src';

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
    <Collapsible.RootProvider value={collapsible}>
      <Collapsible.Trigger>Provider details</Collapsible.Trigger>
      <Collapsible.Content>
        <ContextCloseButton />
      </Collapsible.Content>
    </Collapsible.RootProvider>
  );
}

test('preserves Ark trigger semantics and lazy unmounting', async () => {
  render(() => (
    <Collapsible lazyMount unmountOnExit>
      <Collapsible.Trigger>Recovery details</Collapsible.Trigger>
      <Collapsible.Content>Keep this safe.</Collapsible.Content>
    </Collapsible>
  ));

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
    const [open, setOpen] = createSignal(false);

    return (
      <Collapsible open={open()} onOpenChange={(details) => setOpen(details.open)}>
        <Collapsible.Trigger>Controlled details</Collapsible.Trigger>
        <Collapsible.Content>Controlled content.</Collapsible.Content>
        <output>Open: {String(open())}</output>
      </Collapsible>
    );
  }

  render(() => <ControlledCollapsible />);

  const trigger = screen.getByRole('button', { name: 'Controlled details' });
  fireEvent.click(trigger);

  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
  expect(screen.getByText('Open: true')).toBeInTheDocument();
});

test('preserves disabled state', async () => {
  render(() => (
    <Collapsible disabled>
      <Collapsible.Trigger>Disabled details</Collapsible.Trigger>
      <Collapsible.Content>Unavailable details.</Collapsible.Content>
    </Collapsible>
  ));

  const trigger = screen.getByRole('button', { name: 'Disabled details' });
  fireEvent.click(trigger);

  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  expect(trigger).toHaveAttribute('data-disabled');
});

test('keeps interactive content inert while partially collapsed', async () => {
  render(() => (
    <Collapsible collapsedHeight="2rem">
      <Collapsible.Trigger>Partial details</Collapsible.Trigger>
      <Collapsible.Content data-testid="partial-content">
        <button type="button">Nested action</button>
      </Collapsible.Content>
    </Collapsible>
  ));

  const trigger = screen.getByRole('button', { name: 'Partial details' });
  const content = screen.getByTestId('partial-content');
  const nestedAction = screen.getByText('Nested action');

  expect(content).toHaveAttribute('data-has-collapsed-size');
  expect(content).not.toHaveAttribute('hidden');
  await waitFor(() => expect(nestedAction).toHaveAttribute('inert'));

  fireEvent.click(trigger);

  await waitFor(() => expect(nestedAction).not.toHaveAttribute('inert'));
});

test('preserves consumer-owned trigger behavior with asChild', async () => {
  let triggerRef: HTMLButtonElement | undefined;

  render(() => (
    <Collapsible>
      <Collapsible.Trigger
        ref={(element) => (triggerRef = element)}
        asChild={(props) => <button {...props()} class="consumer-trigger" />}
      >
        Composed details
      </Collapsible.Trigger>
      <Collapsible.Content>Composed content.</Collapsible.Content>
    </Collapsible>
  ));

  const trigger = screen.getByRole('button', { name: 'Composed details' });

  expect(triggerRef).toBeUndefined();
  expect(trigger).toHaveClass('consumer-trigger');
  expect(trigger).toHaveAttribute('data-slot', 'collapsible-trigger');
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(trigger);

  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
});

test('forwards refs on native parts', () => {
  let rootRef!: HTMLDivElement;
  let triggerRef!: HTMLButtonElement;
  let indicatorRef!: HTMLDivElement;
  let contentRef!: HTMLDivElement;
  let bodyRef!: HTMLDivElement;

  render(() => (
    <Collapsible defaultOpen ref={(element) => (rootRef = element)}>
      <Collapsible.Trigger ref={(element) => (triggerRef = element)}>
        Details
        <Collapsible.Indicator ref={(element) => (indicatorRef = element)} />
      </Collapsible.Trigger>
      <Collapsible.Content ref={(element) => (contentRef = element)}>
        <Collapsible.Body ref={(element) => (bodyRef = element)}>Content</Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  ));

  expect(rootRef).toHaveAttribute('data-slot', 'collapsible-root');
  expect(triggerRef).toHaveAttribute('data-slot', 'collapsible-trigger');
  expect(indicatorRef).toHaveAttribute('data-slot', 'collapsible-indicator');
  expect(contentRef).toHaveAttribute('data-slot', 'collapsible-content');
  expect(bodyRef).toHaveAttribute('data-slot', 'collapsible-body');
});

test('keeps provider and descendant context composition connected', async () => {
  render(() => <ProviderCollapsible />);

  const trigger = screen.getByRole('button', { name: 'Provider details' });

  expect(trigger).toHaveAttribute('aria-expanded', 'true');

  fireEvent.click(screen.getByRole('button', { name: 'Close from context' }));

  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
});

test('exposes component-owned Tailwind defaults on every visual part', () => {
  render(() => (
    <Collapsible defaultOpen data-testid="collapsible-root">
      <Collapsible.Trigger>
        Recovery details
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.Body>Keep this safe.</Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  ));

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
  render(() => (
    <Collapsible class="w-1/2 text-primary" data-testid="collapsible-root">
      <Collapsible.Trigger class="gap-6 py-4 text-lg">
        Recovery details
        <Collapsible.Indicator class="size-5" />
      </Collapsible.Trigger>
      <Collapsible.Content class="text-lg">
        <Collapsible.Body class="gap-6 p-6">Keep this safe.</Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  ));

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