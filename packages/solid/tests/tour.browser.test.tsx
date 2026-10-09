import type { TourStepDetails } from '@ark-ui/solid/tour';
import { page } from '@rstest/browser';
import { describe, expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  Tour,
  TourBackdrop,
  TourPositioner,
  TourContent,
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
} from '../src/components/tour';

const steps = [
  {
    id: 'welcome',
    type: 'dialog',
    title: 'Welcome',
    description: 'Start the tour.',
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
});