import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { Collapsible, useCollapsible, useCollapsibleContext } from '../src';

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
    <Collapsible.RootProvider value={collapsible}>
      <Collapsible.Trigger>Provider details</Collapsible.Trigger>
      <Collapsible.Content>
        <ContextCloseButton />
      </Collapsible.Content>
    </Collapsible.RootProvider>
  );
}

test('preserves Ark trigger semantics and lazy unmounting', async () => {
  render(
    <Collapsible lazyMount unmountOnExit>
      <Collapsible.Trigger>Recovery details</Collapsible.Trigger>
      <Collapsible.Content>Keep this safe.</Collapsible.Content>
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
        <Collapsible.Trigger>Controlled details</Collapsible.Trigger>
        <Collapsible.Content>Controlled content.</Collapsible.Content>
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
      <Collapsible.Trigger>Disabled details</Collapsible.Trigger>
      <Collapsible.Content>Unavailable details.</Collapsible.Content>
    </Collapsible>,
  );

  const trigger = screen.getByRole('button', { name: 'Disabled details' });
  fireEvent.click(trigger);

  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  expect(trigger).toHaveAttribute('data-disabled');
});

test('keeps provider and descendant context composition connected', async () => {
  render(<ProviderCollapsible />);

  const trigger = screen.getByRole('button', { name: 'Provider details' });

  expect(trigger).toHaveAttribute('aria-expanded', 'true');

  fireEvent.click(screen.getByRole('button', { name: 'Close from context' }));

  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
});