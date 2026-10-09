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

test('forwards consumer classes to visual parts', () => {
  render(
    <HoverCard open portalled={false}>
      <HoverCardTrigger className="trigger-class">Profile</HoverCardTrigger>
      <HoverCardPositioner className="positioner-class">
        <HoverCardContent className="content-class">
          <HoverCardArrow className="arrow-class">
            <HoverCardArrowTip className="tip-class" />
          </HoverCardArrow>
          <HoverCardBody className="body-class">Profile details</HoverCardBody>
        </HoverCardContent>
      </HoverCardPositioner>
    </HoverCard>,
  );

  expect(
    Array.from(document.querySelector('[data-slot="hover-card-trigger"]')!.classList),
  ).toContain('trigger-class');
  expect(Array.from(document.querySelector('[data-slot="hover-card-body"]')!.classList)).toContain(
    'body-class',
  );
  expect(
    Array.from(document.querySelector('[data-slot="hover-card-content"]')!.classList),
  ).toContain('content-class');
  expect(
    Array.from(document.querySelector('[data-slot="hover-card-positioner"]')!.classList),
  ).toContain('positioner-class');
  expect(Array.from(document.querySelector('[data-slot="hover-card-arrow"]')!.classList)).toContain(
    'arrow-class',
  );
  expect(
    Array.from(document.querySelector('[data-slot="hover-card-arrow-tip"]')!.classList),
  ).toContain('tip-class');
});

test('forwards refs on ordinary parts and preserves a semantic asChild trigger', async () => {
  const triggerRef = createRef<HTMLButtonElement>();
  const contentRef = createRef<HTMLDivElement>();

  render(
    <HoverCard open portalled={false}>
      <HoverCardTrigger asChild>
        <a href="/profile">Profile</a>
      </HoverCardTrigger>
      <HoverCardPositioner>
        <HoverCardContent ref={contentRef}>
          <HoverCardBody>Profile details</HoverCardBody>
        </HoverCardContent>
      </HoverCardPositioner>
      <HoverCardTrigger ref={triggerRef}>Settings</HoverCardTrigger>
    </HoverCard>,
  );

  await expect
    .element(page.getByRole('link', { name: 'Profile' }))
    .toHaveAttribute('data-slot', 'hover-card-trigger');
  expect(triggerRef.current).toBe(document.querySelector('button[data-slot="hover-card-trigger"]'));
  expect(contentRef.current?.getAttribute('data-slot')).toBe('hover-card-content');
});