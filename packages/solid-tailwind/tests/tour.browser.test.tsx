import type { TourStepDetails } from '@ark-ui/solid/tour';
import { page } from '@rstest/browser';
import { describe, expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  Tour,
  TourBackdrop,
  TourSpotlight,
  TourPositioner,
  TourContent,
  TourArrow,
  TourTitle,
  TourDescription,
  TourProgressText,
  TourBody,
  TourCloseIcon,
  TourControl,
  TourActions,
  TourActionList,
  TourActionTrigger,
  useTour,
} from '../src';
import { Dialog, DialogContent, DialogPositioner, DialogTitle } from '../src';
import { LocaleProvider } from '../src/locale';

const steps = [
  {
    id: 'welcome',
    type: 'dialog',
    title: 'Welcome',
    description: 'Start the tour.',
    arrow: true,
    actions: [
      { label: 'Continue', action: 'next' },
      { label: 'Continue', action: 'dismiss' },
    ],
    backdrop: true,
  },
] satisfies TourStepDetails[];

function TourExample(props: { portalled?: boolean }) {
  const tour = useTour({ steps });

  return (
    <>
      <button type="button" onClick={() => tour().start()}>
        Start tour
      </button>
      <Tour tour={tour} portalled={props.portalled} lazyMount unmountOnExit>
        <TourBackdrop />
        <TourPositioner>
          <TourContent>
            <TourCloseIcon />
            <TourBody>
              <TourTitle />
              <TourDescription />
              <TourProgressText />
            </TourBody>
            <TourControl>
              <TourActionList />
            </TourControl>
          </TourContent>
        </TourPositioner>
      </Tour>
    </>
  );
}

function CustomActionTourExample() {
  const tour = useTour({ steps });

  return (
    <>
      <button type="button" onClick={() => tour().start()}>
        Start custom action tour
      </button>
      <Tour tour={tour} portalled={false} lazyMount unmountOnExit>
        <TourPositioner>
          <TourContent>
            <TourTitle />
            <TourDescription />
            <TourControl>
              <TourActions>
                {(actions) =>
                  actions().map((action) => (
                    <TourActionTrigger
                      action={action}
                      asChild={(triggerProps) => (
                        <button {...triggerProps()} type="button">
                          {action.label}
                        </button>
                      )}
                    />
                  ))
                }
              </TourActions>
            </TourControl>
          </TourContent>
        </TourPositioner>
      </Tour>
    </>
  );
}

function StyledTourExample() {
  const tour = useTour({ steps });

  return (
    <>
      <button type="button" onClick={() => tour().start()}>
        Start styled tour
      </button>
      <Tour tour={tour} portalled={false} lazyMount unmountOnExit>
        <TourBackdrop />
        <TourSpotlight />
        <TourPositioner>
          <TourContent class="w-96 bg-card p-4 data-[type=dialog]:w-96 data-[type=floating]:w-96">
            <TourArrow />
            <TourCloseIcon class="size-8 rounded-full bg-primary" />
            <TourBody>
              <TourTitle class="text-xl">Welcome</TourTitle>
              <TourDescription class="text-base">Start the tour.</TourDescription>
              <TourProgressText />
            </TourBody>
            <TourControl>
              <TourActionList />
            </TourControl>
          </TourContent>
        </TourPositioner>
      </Tour>
    </>
  );
}

function FloatingTourExample(props: { placement: 'center' | 'top' }) {
  const tour = useTour({
    steps: [
      {
        id: 'floating',
        type: 'floating',
        placement: props.placement,
        title: 'Floating',
        description: 'A floating step.',
      },
    ],
  });

  return (
    <>
      <button type="button" onClick={() => tour().start()}>
        Start floating tour
      </button>
      <Tour tour={tour}>
        <TourPositioner>
          <TourContent>
            <TourTitle />
            <TourDescription />
          </TourContent>
        </TourPositioner>
      </Tour>
    </>
  );
}

function TooltipTourExample() {
  const tour = useTour({
    steps: [
      {
        id: 'tooltip',
        type: 'tooltip',
        title: 'Tooltip',
        description: 'A tooltip step.',
        target: () => document.querySelector<HTMLElement>('#tour-tooltip-target'),
        backdrop: true,
      },
    ],
  });

  return (
    <>
      <button id="tour-tooltip-target" type="button" onClick={() => tour().start()}>
        Start tooltip tour
      </button>
      <Tour tour={tour}>
        <TourBackdrop />
        <TourSpotlight />
        <TourPositioner>
          <TourContent>
            <TourTitle />
            <TourDescription />
          </TourContent>
        </TourPositioner>
      </Tour>
    </>
  );
}

function TourInDialogExample() {
  const tour = useTour({ steps });

  return (
    <Dialog defaultOpen>
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Settings</DialogTitle>
          <button type="button" onClick={() => tour().start()}>
            Start dialog tour
          </button>
        </DialogContent>
      </DialogPositioner>
      <Tour tour={tour}>
        <TourBackdrop />
        <TourPositioner>
          <TourContent>
            <TourTitle />
            <TourDescription />
          </TourContent>
        </TourPositioner>
      </Tour>
    </Dialog>
  );
}

describe('Tour', () => {
  test('renders an inline dialog with the scrollable body sugar', async () => {
    render(() => (
      <div data-testid="tour-host">
        <TourExample portalled={false} />
      </div>
    ));

    await page.getByRole('button', { name: 'Start tour', exact: true }).click();

    const content = screen.getByRole('alertdialog', { name: 'Welcome' });
    await expect
      .element(page.getByRole('alertdialog', { name: 'Welcome', exact: true }))
      .toHaveAttribute('data-slot', 'tour-content');
    expect(Boolean(content.querySelector('[data-slot="tour-body"]')?.isConnected)).toBe(true);
    expect(
      Boolean(
        screen.getByTestId('tour-host').querySelector('[data-slot="tour-positioner"]')?.isConnected,
      ),
    ).toBe(true);
    await expect
      .element(page.getByRole('button', { name: 'Close tour', exact: true }))
      .toHaveAttribute('data-slot', 'tour-close-icon');
  });

  test('portals overlay parts by default', async () => {
    render(() => (
      <div data-testid="tour-host">
        <TourExample />
      </div>
    ));

    await page.getByRole('button', { name: 'Start tour', exact: true }).click();

    const content = screen.getByRole('alertdialog', { name: 'Welcome' });
    expect(screen.getByTestId('tour-host').contains(content)).not.toBe(true);
  });

  test('keeps duplicate action labels as separate, correctly disabled action triggers', async () => {
    render(() => <TourExample portalled={false} />);

    await page.getByRole('button', { name: 'Start tour', exact: true }).click();

    const actions = await screen.findAllByText('Continue');
    expect(actions).toHaveLength(2);
    await expect.element(page.getByText('Continue').nth(0)).toBeDisabled();
    await expect.element(page.getByText('Continue').nth(1)).not.toBeDisabled();
  });

  test('preserves Ark action behavior when custom markup is composed with asChild', async () => {
    render(() => <CustomActionTourExample />);

    await page.getByRole('button', { name: 'Start custom action tour', exact: true }).click();

    await expect
      .element(page.getByText('Continue').nth(0))
      .toHaveAttribute('data-slot', 'tour-action-trigger');
    await expect.element(page.getByText('Continue').nth(0)).toBeDisabled();
    await expect.element(page.getByText('Continue').nth(1)).not.toBeDisabled();
  });

  test('applies Tailwind defaults and lets consumer utilities win', async () => {
    render(() => <StyledTourExample />);

    await page.getByRole('button', { name: 'Start styled tour', exact: true }).click();

    const content = screen.getByRole('alertdialog', { name: 'Welcome' });
    const backdrop = document.querySelector('[data-slot="tour-backdrop"]');
    const spotlight = document.querySelector('[data-slot="tour-spotlight"]');
    const positioner = document.querySelector('[data-slot="tour-positioner"]');
    const arrow = document.querySelector('[data-slot="tour-arrow"]');
    const closeIcon = screen.getByRole('button', { name: 'Close tour' });

    expect([...backdrop!.classList]).toEqual(
      expect.arrayContaining(['bg-overlay', 'backdrop-blur-[4px]']),
    );
    expect([...spotlight!.classList]).toEqual(expect.arrayContaining(['ring-2', 'ring-ring']));
    expect([...positioner!.classList]).toEqual(
      expect.arrayContaining([
        'z-[calc(var(--moduix-z-tour)+var(--tour-layer,0))]',
        'max-w-(--available-width)',
      ]),
    );
    expect([...arrow!.classList]).toEqual(
      expect.arrayContaining([
        '[--arrow-background:var(--color-popover)]',
        '[--arrow-size:var(--spacing-2_5)]',
      ]),
    );
    expect([...content!.classList]).toEqual(expect.arrayContaining(['w-96', 'bg-card', 'p-4']));
    expect(
      ['w-[20rem]', 'bg-popover', 'p-5'].some((name) => content!.classList.contains(name)),
    ).toBe(false);
    expect([...screen.getByRole('heading', { name: 'Welcome' }).classList]).toEqual(
      expect.arrayContaining(['text-xl']),
    );
    expect([...screen.getByText('Start the tour.').classList]).toEqual(
      expect.arrayContaining(['text-base']),
    );
    expect([...closeIcon!.classList]).toEqual(
      expect.arrayContaining(['size-8', 'rounded-full', 'bg-primary']),
    );
    expect(
      ['rounded-md', 'bg-transparent'].some((name) => closeIcon!.classList.contains(name)),
    ).toBe(false);

    await expect.element(page.locator('[data-slot="tour-content"]')).toHaveCSS('width', '384px');
    await expect.element(page.locator('[data-slot="tour-content"]')).toHaveCSS('padding', '16px');
    await expect.element(page.locator('[data-slot="tour-close-icon"]')).toHaveCSS('width', '32px');
  });
  test.each([
    ['center', 'ltr'],
    ['top', 'rtl'],
  ] as const)('centers %s floating steps in %s', async (placement, dir) => {
    render(() => (
      <LocaleProvider locale={dir === 'rtl' ? 'ar' : 'en'}>
        <FloatingTourExample placement={placement} />
      </LocaleProvider>
    ));

    await page.getByRole('button', { name: 'Start floating tour', exact: true }).click();
    await expect.element(page.getByRole('alertdialog', { name: 'Floating' })).toBeVisible();

    const rect = document.querySelector('[data-slot="tour-content"]')!.getBoundingClientRect();
    expect(Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2)).toBeLessThanOrEqual(1);
    if (placement === 'center') {
      expect(Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2)).toBeLessThanOrEqual(1);
    }
  });
  test('stacks a tooltip step above its spotlight and backdrop', async () => {
    render(() => <TooltipTourExample />);

    await page.getByRole('button', { name: 'Start tooltip tour', exact: true }).click();
    await expect.element(page.getByRole('alertdialog', { name: 'Tooltip' })).toBeVisible();

    const zIndex = (slot: string) =>
      Number(getComputedStyle(document.querySelector(`[data-slot="tour-${slot}"]`)!).zIndex);
    expect(zIndex('spotlight')).toBeGreaterThan(zIndex('backdrop'));
    expect(zIndex('positioner')).toBeGreaterThan(zIndex('spotlight'));
  });
  test('shows a tour started from an open dialog above that dialog', async () => {
    render(() => <TourInDialogExample />);

    await page.getByRole('button', { name: 'Start dialog tour', exact: true }).click();
    // Solid creates the portal host before the modal dialog hides its siblings with aria-hidden.
    await expect.element(page.locator('[data-slot="tour-content"]')).toBeVisible();

    const content = document.querySelector('[data-slot="tour-content"]')!;
    const rect = content.getBoundingClientRect();
    const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    expect(content.contains(hit)).toBe(true);
  });
});