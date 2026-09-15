import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef, useState } from 'react';
import { HoverCard, useHoverCard, useHoverCardContext } from '../src';

function HoverCardSurface({ children = 'Profile details' }: { children?: string }) {
  return (
    <HoverCard.Positioner>
      <HoverCard.Content data-testid="content">
        <HoverCard.Arrow />
        <HoverCard.Body>{children}</HoverCard.Body>
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

  const arrow = document.querySelector('[data-slot="hover-card-arrow"]');
  const content = screen.getByTestId('content');

  expect(document.querySelector('[data-slot="hover-card-arrow-tip"]')).toBeInTheDocument();
  expect(document.querySelector('[data-slot="hover-card-body"]')).toBeInTheDocument();
  expect(arrow?.parentElement).toBe(content);
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

test('forwards consumer classes to visual parts', () => {
  render(
    <HoverCard open portalled={false}>
      <HoverCard.Trigger className="trigger-class">Profile</HoverCard.Trigger>
      <HoverCard.Positioner className="positioner-class">
        <HoverCard.Content className="content-class">
          <HoverCard.Arrow className="arrow-class">
            <HoverCard.ArrowTip className="tip-class" />
          </HoverCard.Arrow>
          <HoverCard.Body className="body-class">Profile details</HoverCard.Body>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>,
  );

  expect(screen.getByRole('button', { name: 'Profile' })).toHaveClass('trigger-class');
  expect(screen.getByText('Profile details')).toHaveClass('body-class');
  expect(
    screen.getByText('Profile details').closest('[data-slot="hover-card-content"]'),
  ).toHaveClass('content-class');
  expect(document.querySelector('[data-slot="hover-card-positioner"]')).toHaveClass(
    'positioner-class',
  );
  expect(document.querySelector('[data-slot="hover-card-arrow"]')).toHaveClass('arrow-class');
  expect(document.querySelector('[data-slot="hover-card-arrow-tip"]')).toHaveClass('tip-class');
});

test('forwards refs on ordinary parts and preserves a semantic asChild trigger', () => {
  const triggerRef = createRef<HTMLButtonElement>();
  const contentRef = createRef<HTMLDivElement>();

  render(
    <HoverCard open portalled={false}>
      <HoverCard.Trigger asChild>
        <a href="/profile">Profile</a>
      </HoverCard.Trigger>
      <HoverCard.Positioner>
        <HoverCard.Content ref={contentRef}>
          <HoverCard.Body>Profile details</HoverCard.Body>
        </HoverCard.Content>
      </HoverCard.Positioner>
      <HoverCard.Trigger ref={triggerRef}>Settings</HoverCard.Trigger>
    </HoverCard>,
  );

  expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute(
    'data-slot',
    'hover-card-trigger',
  );
  expect(triggerRef.current).toBe(screen.getByRole('button', { name: 'Settings' }));
  expect(contentRef.current).toHaveAttribute('data-slot', 'hover-card-content');
});