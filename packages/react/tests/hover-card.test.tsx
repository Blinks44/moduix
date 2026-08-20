import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { HoverCard, useHoverCard, useHoverCardContext } from '../src';

function HoverCardSurface({ children = 'Profile details' }: { children?: string }) {
  return (
    <HoverCard.Positioner>
      <HoverCard.Content data-testid="content">
        <HoverCard.Arrow />
        {children}
      </HoverCard.Content>
    </HoverCard.Positioner>
  );
}

test('opens from a focused trigger and keeps Ark open-change details', async () => {
  function ControlledHoverCard() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <output>{open ? 'open' : 'closed'}</output>
        <HoverCard
          open={open}
          openDelay={0}
          portalled={false}
          onOpenChange={(details) => setOpen(details.open)}
        >
          <HoverCard.Trigger>Profile</HoverCard.Trigger>
          <HoverCardSurface />
        </HoverCard>
      </>
    );
  }

  render(<ControlledHoverCard />);

  fireEvent.focus(screen.getByRole('button', { name: 'Profile' }));

  await waitFor(() => expect(screen.getByText('open')).toBeVisible());
  expect(await screen.findByTestId('content')).toHaveAttribute('data-state', 'open');
});

test('does not mount a disabled hover card before it opens', () => {
  render(
    <HoverCard disabled openDelay={0} portalled={false}>
      <HoverCard.Trigger>Profile</HoverCard.Trigger>
      <HoverCardSurface />
    </HoverCard>,
  );

  fireEvent.focus(screen.getByRole('button', { name: 'Profile' }));

  expect(screen.queryByTestId('content')).not.toBeInTheDocument();
});

test('portals the positioner by default and can render it inline', () => {
  const { container, unmount } = render(
    <HoverCard open>
      <HoverCard.Trigger>Profile</HoverCard.Trigger>
      <HoverCardSurface />
    </HoverCard>,
  );

  expect(container).not.toContainElement(screen.getByTestId('content'));

  unmount();

  const inlineHoverCard = render(
    <HoverCard open portalled={false}>
      <HoverCard.Trigger>Profile</HoverCard.Trigger>
      <HoverCardSurface />
    </HoverCard>,
  );

  expect(inlineHoverCard.container).toContainElement(screen.getByTestId('content'));
});

test('renders the moduix arrow tip when HoverCard.Arrow has no child', () => {
  render(
    <HoverCard open portalled={false}>
      <HoverCard.Trigger>Profile</HoverCard.Trigger>
      <HoverCardSurface />
    </HoverCard>,
  );

  expect(document.querySelector('[data-slot="hover-card-arrow-tip"]')).toBeInTheDocument();
});

test('keeps RootProvider state available through the moduix context hook', async () => {
  function ContextValue() {
    const hoverCard = useHoverCardContext();
    return <output>{hoverCard.open ? 'open' : 'closed'}</output>;
  }

  function ProviderHoverCard() {
    const hoverCard = useHoverCard({ openDelay: 0 });

    return (
      <HoverCard.RootProvider value={hoverCard} portalled={false}>
        <HoverCard.Trigger>Profile</HoverCard.Trigger>
        <HoverCardSurface />
        <ContextValue />
      </HoverCard.RootProvider>
    );
  }

  render(<ProviderHoverCard />);

  fireEvent.focus(screen.getByRole('button', { name: 'Profile' }));

  await waitFor(() => expect(screen.getByText('open')).toBeVisible());
});

test('reports the active value when moving between triggers', async () => {
  function MultipleTriggersHoverCard() {
    const [value, setValue] = useState('');

    return (
      <>
        <output>{value}</output>
        <HoverCard
          openDelay={0}
          portalled={false}
          onTriggerValueChange={(details) => setValue(details.value ?? '')}
        >
          <HoverCard.Trigger value="sarah">Sarah</HoverCard.Trigger>
          <HoverCard.Trigger value="alex">Alex</HoverCard.Trigger>
          <HoverCardSurface />
        </HoverCard>
      </>
    );
  }

  render(<MultipleTriggersHoverCard />);

  fireEvent.focus(screen.getByRole('button', { name: 'Alex' }));

  await waitFor(() => expect(screen.getByText('alex')).toBeVisible());
});