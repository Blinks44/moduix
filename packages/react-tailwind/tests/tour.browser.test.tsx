import type { TourStepDetails } from '@ark-ui/react/tour';
import { page } from '@rstest/browser';
import { describe, expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
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
  Button,
  useTour,
} from '../src';

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

function TourExample({ portalled }: { portalled?: boolean }) {
  const tour = useTour({ steps });

  return (
    <>
      <Button onClick={() => tour.start()}>Start tour</Button>
      <Tour tour={tour} portalled={portalled} lazyMount unmountOnExit>
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
      <Button onClick={() => tour.start()}>Start custom action tour</Button>
      <Tour tour={tour} portalled={false} lazyMount unmountOnExit>
        <TourPositioner>
          <TourContent>
            <TourTitle />
            <TourDescription />
            <TourControl>
              <TourActions>
                {(actions) =>
                  actions.map((action, index) => (
                    <TourActionTrigger key={`${action.label}-${index}`} action={action} asChild>
                      <button type="button">{action.label}</button>
                    </TourActionTrigger>
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
      <Button onClick={() => tour.start()}>Start styled tour</Button>
      <Tour tour={tour} portalled={false} lazyMount unmountOnExit>
        <TourBackdrop />
        <TourSpotlight />
        <TourPositioner>
          <TourContent className="w-96 bg-card p-4 data-[type=dialog]:w-96 data-[type=floating]:w-96">
            <TourArrow />
            <TourCloseIcon className="size-8 rounded-full bg-primary" />
            <TourBody>
              <TourTitle className="text-xl">Welcome</TourTitle>
              <TourDescription className="text-base">Start the tour.</TourDescription>
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

describe('Tour', () => {
  test('renders an inline dialog with the scrollable body sugar', async () => {
    render(
      <div data-testid="tour-host">
        <TourExample portalled={false} />
      </div>,
    );

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
    render(
      <div data-testid="tour-host">
        <TourExample />
      </div>,
    );

    await page.getByRole('button', { name: 'Start tour', exact: true }).click();

    const content = screen.getByRole('alertdialog', { name: 'Welcome' });
    expect(screen.getByTestId('tour-host').contains(content)).not.toBe(true);
  });

  test('keeps duplicate action labels as separate, correctly disabled action triggers', async () => {
    render(<TourExample portalled={false} />);

    await page.getByRole('button', { name: 'Start tour', exact: true }).click();

    const actions = await screen.findAllByText('Continue');
    expect(actions).toHaveLength(2);
    await expect.element(page.getByText('Continue').nth(0)).toBeDisabled();
    await expect.element(page.getByText('Continue').nth(1)).not.toBeDisabled();
  });

  test('preserves Ark action behavior when custom markup is composed with asChild', async () => {
    render(<CustomActionTourExample />);

    await page.getByRole('button', { name: 'Start custom action tour', exact: true }).click();

    await expect
      .element(page.getByText('Continue').nth(0))
      .toHaveAttribute('data-slot', 'tour-action-trigger');
    await expect.element(page.getByText('Continue').nth(0)).toBeDisabled();
    await expect.element(page.getByText('Continue').nth(1)).not.toBeDisabled();
  });

  test('applies Tailwind defaults and lets consumer utilities win', async () => {
    render(<StyledTourExample />);

    await page.getByRole('button', { name: 'Start styled tour', exact: true }).click();

    const content = screen.getByRole('alertdialog', { name: 'Welcome' });
    const backdrop = document.querySelector('[data-slot="tour-backdrop"]');
    const spotlight = document.querySelector('[data-slot="tour-spotlight"]');
    const positioner = document.querySelector('[data-slot="tour-positioner"]');
    const arrow = document.querySelector('[data-slot="tour-arrow"]');
    const closeIcon = screen.getByRole('button', { name: 'Close tour' });

    expect([...backdrop!.classList]).toEqual(
      expect.arrayContaining(['bg-overlay', 'backdrop-blur-xs']),
    );
    expect([...spotlight!.classList]).toEqual(expect.arrayContaining(['ring-2', 'ring-ring']));
    expect([...positioner!.classList]).toEqual(
      expect.arrayContaining([
        '[--tour-z-index:var(--moduix-tour-z-index,var(--moduix-z-modal))]',
        'max-w-[var(--available-width)]',
      ]),
    );
    expect([...arrow!.classList]).toEqual(
      expect.arrayContaining([
        '[--arrow-background:var(--color-popover)]',
        '[--arrow-size:var(--spacing-2_5)]',
      ]),
    );
    expect([...content!.classList]).toEqual(expect.arrayContaining(['w-96', 'bg-card', 'p-4']));
    expect(['w-80', 'bg-popover', 'p-5'].some((name) => content!.classList.contains(name))).toBe(
      false,
    );
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
});