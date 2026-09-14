import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { HoverCard, useHoverCard, useHoverCardContext } from '../src';

function HoverCardSurface(props: { children?: string }) {
  return (
    <HoverCard.Positioner>
      <HoverCard.Content data-testid="content">
        <HoverCard.Arrow />
        <HoverCard.Body>{props.children ?? 'Profile details'}</HoverCard.Body>
      </HoverCard.Content>
    </HoverCard.Positioner>
  );
}

test('opens from a focused trigger and keeps Ark open-change details', async () => {
  function ControlledHoverCard() {
    const [open, setOpen] = createSignal(false);

    return (
      <>
        <output>{open() ? 'open' : 'closed'}</output>
        <HoverCard
          open={open()}
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

  render(() => <ControlledHoverCard />);

  fireEvent.focusIn(screen.getByRole('button', { name: 'Profile' }));

  await waitFor(() => expect(screen.getByText('open')).toBeVisible());
  expect(await screen.findByTestId('content')).toHaveAttribute('data-state', 'open');
});

test('does not mount a disabled hover card before it opens', () => {
  render(() => (
    <HoverCard disabled openDelay={0} portalled={false}>
      <HoverCard.Trigger>Profile</HoverCard.Trigger>
      <HoverCardSurface />
    </HoverCard>
  ));

  fireEvent.focusIn(screen.getByRole('button', { name: 'Profile' }));

  expect(screen.queryByTestId('content')).not.toBeInTheDocument();
});

test('portals the positioner by default and can render it inline', () => {
  const { container, unmount } = render(() => (
    <HoverCard open>
      <HoverCard.Trigger>Profile</HoverCard.Trigger>
      <HoverCardSurface />
    </HoverCard>
  ));

  expect(container).not.toContainElement(screen.getByTestId('content'));

  unmount();

  const inlineHoverCard = render(() => (
    <HoverCard open portalled={false}>
      <HoverCard.Trigger>Profile</HoverCard.Trigger>
      <HoverCardSurface />
    </HoverCard>
  ));

  expect(inlineHoverCard.container).toContainElement(screen.getByTestId('content'));
});

test('renders the moduix arrow tip when HoverCard.Arrow has no child', () => {
  render(() => (
    <HoverCard open portalled={false}>
      <HoverCard.Trigger>Profile</HoverCard.Trigger>
      <HoverCardSurface />
    </HoverCard>
  ));

  const arrow = document.querySelector('[data-slot="hover-card-arrow"]');
  const content = screen.getByTestId('content');

  expect(document.querySelector('[data-slot="hover-card-arrow-tip"]')).toBeInTheDocument();
  expect(document.querySelector('[data-slot="hover-card-body"]')).toBeInTheDocument();
  expect(arrow?.parentElement).toBe(content);
});

test('keeps RootProvider state available through the moduix context hook', async () => {
  function ContextValue() {
    const hoverCard = useHoverCardContext();
    return <output>{hoverCard().open ? 'open' : 'closed'}</output>;
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

  render(() => <ProviderHoverCard />);

  fireEvent.focusIn(screen.getByRole('button', { name: 'Profile' }));

  await waitFor(() => expect(screen.getByText('open')).toBeVisible());
});

test('reports the active value when moving between triggers', async () => {
  function MultipleTriggersHoverCard() {
    const [value, setValue] = createSignal('');

    return (
      <>
        <output>{value()}</output>
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

  render(() => <MultipleTriggersHoverCard />);

  fireEvent.focusIn(screen.getByRole('button', { name: 'Alex' }));

  await waitFor(() => expect(screen.getByText('alex')).toBeVisible());
});

test('forwards refs on native parts and keeps asChild composition native', () => {
  let triggerRef!: HTMLButtonElement;
  let positionerRef!: HTMLDivElement;
  let contentRef!: HTMLDivElement;
  let arrowRef!: HTMLDivElement;
  let arrowTipRef!: HTMLDivElement;
  let composedTriggerRef: HTMLButtonElement | undefined;

  render(() => (
    <HoverCard open portalled={false}>
      <HoverCard.Trigger ref={(element) => (triggerRef = element)}>Profile</HoverCard.Trigger>
      <HoverCard.Trigger
        ref={(element) => (composedTriggerRef = element)}
        asChild={(props) => (
          <a {...props()} href="#profile">
            Composed profile
          </a>
        )}
      />
      <HoverCard.Positioner ref={(element) => (positionerRef = element)}>
        <HoverCard.Content ref={(element) => (contentRef = element)}>
          <HoverCard.Arrow ref={(element) => (arrowRef = element)}>
            <HoverCard.ArrowTip ref={(element) => (arrowTipRef = element)} />
          </HoverCard.Arrow>
          <HoverCard.Body />
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  ));

  expect(triggerRef).toHaveAttribute('data-slot', 'hover-card-trigger');
  expect(positionerRef).toHaveAttribute('data-slot', 'hover-card-positioner');
  expect(contentRef).toHaveAttribute('data-slot', 'hover-card-content');
  expect(arrowRef).toHaveAttribute('data-slot', 'hover-card-arrow');
  expect(arrowTipRef).toHaveAttribute('data-slot', 'hover-card-arrow-tip');
  expect(composedTriggerRef).toBeUndefined();
});

test('lets consumer classes override defaults and keeps visual parts styled', () => {
  render(() => (
    <HoverCard open portalled={false}>
      <HoverCard.Trigger class="gap-2 text-destructive">Profile</HoverCard.Trigger>
      <HoverCard.Positioner class="max-w-none">
        <HoverCard.Content data-testid="content" class="bg-card p-4">
          <HoverCard.Arrow class="[--arrow-size:1rem]">
            <HoverCard.ArrowTip class="border-primary" />
          </HoverCard.Arrow>
          <HoverCard.Body class="overflow-hidden">Profile details</HoverCard.Body>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  ));

  const trigger = screen.getByRole('button', { name: 'Profile' });
  const content = screen.getByTestId('content');
  const positioner = document.querySelector('[data-slot="hover-card-positioner"]');
  const arrow = document.querySelector('[data-slot="hover-card-arrow"]');
  const arrowTip = document.querySelector('[data-slot="hover-card-arrow-tip"]');
  const body = document.querySelector('[data-slot="hover-card-body"]');

  expect(trigger).toHaveClass('gap-2', 'text-destructive');
  expect(trigger).not.toHaveClass('gap-1', 'text-primary');
  expect(positioner).toHaveClass('max-w-none');
  expect(content).toHaveClass('bg-card', 'p-4');
  expect(content).not.toHaveClass('bg-popover', 'p-2');
  expect(arrow).toHaveClass('[--arrow-size:1rem]');
  expect(arrowTip).toHaveClass('border-primary');
  expect(body).toHaveClass('min-h-0', 'overflow-hidden');
});