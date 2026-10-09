import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef, useState } from 'react';
import {
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardBody,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardRootProvider,
  HoverCardTrigger,
  useHoverCard,
  useHoverCardContext,
} from '../src';

function HoverCardSurface() {
  return (
    <HoverCardPositioner>
      <HoverCardContent data-testid="content">
        <HoverCardArrow />
        <HoverCardBody>Profile details</HoverCardBody>
      </HoverCardContent>
    </HoverCardPositioner>
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
          <HoverCardTrigger>Profile</HoverCardTrigger>
          <HoverCardSurface />
        </HoverCard>
      </>
    );
  }

  render(<ControlledHoverCard />);

  await page.getByRole('button', { name: 'Profile' }).focus();

  await expect.element(page.getByText('open', { exact: true })).toBeVisible();
  await expect.element(page.getByTestId('content')).toHaveAttribute('data-state', 'open');
});

test('does not mount a disabled hover card before it opens', async () => {
  render(
    <HoverCard disabled openDelay={0} portalled={false}>
      <HoverCardTrigger>Profile</HoverCardTrigger>
      <HoverCardSurface />
    </HoverCard>,
  );

  await page.getByRole('button', { name: 'Profile' }).focus();

  await expect.element(page.getByTestId('content')).toHaveCount(0);
});

test('portals the positioner by default and can render it inline', async () => {
  const { container, unmount } = render(
    <HoverCard open>
      <HoverCardTrigger>Profile</HoverCardTrigger>
      <HoverCardSurface />
    </HoverCard>,
  );

  await expect.element(page.getByTestId('content')).toBeVisible();
  expect(container.querySelector('[data-testid="content"]')).toBeNull();

  unmount();

  const inlineHoverCard = render(
    <HoverCard open portalled={false}>
      <HoverCardTrigger>Profile</HoverCardTrigger>
      <HoverCardSurface />
    </HoverCard>,
  );

  await expect.element(page.getByTestId('content')).toBeVisible();
  const content = document.querySelector('[data-testid="content"]')!;
  expect(inlineHoverCard.container.contains(content)).toBe(true);
  await expect.element(page.locator('[data-slot="hover-card-arrow-tip"]')).toBeAttached();
  await expect.element(page.locator('[data-slot="hover-card-body"]')).toBeAttached();
  expect(document.querySelector('[data-slot="hover-card-arrow"]')?.parentElement).toBe(content);
});

test('keeps RootProvider state available through the moduix context hook', async () => {
  function ContextValue() {
    const hoverCard = useHoverCardContext();
    return <output>{hoverCard.open ? 'open' : 'closed'}</output>;
  }

  function ProviderHoverCard() {
    const hoverCard = useHoverCard({ openDelay: 0 });

    return (
      <HoverCardRootProvider value={hoverCard} portalled={false}>
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardSurface />
        <ContextValue />
      </HoverCardRootProvider>
    );
  }

  render(<ProviderHoverCard />);

  await page.getByRole('button', { name: 'Profile' }).focus();

  await expect.element(page.getByText('open', { exact: true })).toBeVisible();
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
          <HoverCardTrigger value="sarah">Sarah</HoverCardTrigger>
          <HoverCardTrigger value="alex">Alex</HoverCardTrigger>
          <HoverCardSurface />
        </HoverCard>
      </>
    );
  }

  render(<MultipleTriggersHoverCard />);

  await page.getByRole('button', { name: 'Alex' }).focus();

  await expect.element(page.getByText('alex', { exact: true })).toBeVisible();
  await expect.element(page.getByTestId('content')).toBeVisible();
  await page.getByRole('button', { name: 'Sarah' }).hover();
  await expect.element(page.getByText('sarah', { exact: true })).toBeVisible();
  await expect.element(page.getByTestId('content')).toBeVisible();
});

test('forwards refs through native parts and preserves asChild composition', async () => {
  const triggerRef = createRef<HTMLButtonElement>();
  const positionerRef = createRef<HTMLDivElement>();
  const contentRef = createRef<HTMLDivElement>();
  const arrowRef = createRef<HTMLDivElement>();
  const arrowTipRef = createRef<HTMLDivElement>();

  render(
    <HoverCard open portalled={false}>
      <HoverCardTrigger ref={triggerRef}>Profile</HoverCardTrigger>
      <HoverCardTrigger asChild>
        <a href="#profile">Composed profile</a>
      </HoverCardTrigger>
      <HoverCardPositioner ref={positionerRef}>
        <HoverCardContent ref={contentRef}>
          <HoverCardArrow ref={arrowRef}>
            <HoverCardArrowTip ref={arrowTipRef} />
          </HoverCardArrow>
          <HoverCardBody />
        </HoverCardContent>
      </HoverCardPositioner>
    </HoverCard>,
  );

  expect(triggerRef.current?.getAttribute('data-slot')).toBe('hover-card-trigger');
  expect(positionerRef.current?.getAttribute('data-slot')).toBe('hover-card-positioner');
  expect(contentRef.current?.getAttribute('data-slot')).toBe('hover-card-content');
  expect(arrowRef.current?.getAttribute('data-slot')).toBe('hover-card-arrow');
  expect(arrowTipRef.current?.getAttribute('data-slot')).toBe('hover-card-arrow-tip');
  await expect
    .element(page.getByRole('link', { name: 'Composed profile' }))
    .toHaveAttribute('data-slot', 'hover-card-trigger');
});

test('lets consumer classes override defaults and keeps visual parts styled', async () => {
  render(
    <HoverCard open portalled={false}>
      <HoverCardTrigger className="gap-2 text-destructive">Profile</HoverCardTrigger>
      <HoverCardPositioner className="max-w-none">
        <HoverCardContent data-testid="content" className="bg-card p-4">
          <HoverCardArrow className="[--arrow-size:1rem]">
            <HoverCardArrowTip className="border-primary" />
          </HoverCardArrow>
          <HoverCardBody className="overflow-hidden">Profile details</HoverCardBody>
        </HoverCardContent>
      </HoverCardPositioner>
    </HoverCard>,
  );

  const trigger = document.querySelector('[data-slot="hover-card-trigger"]')!;
  const content = document.querySelector('[data-slot="hover-card-content"]')!;
  const positioner = document.querySelector('[data-slot="hover-card-positioner"]')!;
  const arrow = document.querySelector('[data-slot="hover-card-arrow"]')!;
  const arrowTip = document.querySelector('[data-slot="hover-card-arrow-tip"]')!;
  const body = document.querySelector('[data-slot="hover-card-body"]')!;
  expect(Array.from(trigger.classList)).toEqual(
    expect.arrayContaining(['gap-2', 'text-destructive']),
  );
  expect(Array.from(trigger.classList)).not.toContain('gap-1');
  expect(Array.from(trigger.classList)).not.toContain('text-primary');
  expect(Array.from(positioner.classList)).toContain('max-w-none');
  expect(Array.from(content.classList)).toEqual(expect.arrayContaining(['bg-card', 'p-4']));
  expect(Array.from(content.classList)).not.toContain('bg-popover');
  expect(Array.from(content.classList)).not.toContain('p-2');
  expect(Array.from(arrow.classList)).toContain('[--arrow-size:1rem]');
  expect(Array.from(arrowTip.classList)).toContain('border-primary');
  expect(Array.from(body.classList)).toEqual(
    expect.arrayContaining(['min-h-0', 'overflow-hidden']),
  );
  await expect.element(page.getByRole('button', { name: 'Profile' })).toHaveCSS('gap', '8px');
  await expect.element(page.getByTestId('content')).toHaveCSS('padding', '16px');
});