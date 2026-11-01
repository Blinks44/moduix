import type { TourStepDetails } from '@ark-ui/solid/tour';
import { page } from '@rstest/browser';
import { describe, expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
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
  TourActionList,
  useTour,
} from '@/index';

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

describe('Tour', () => {
  test('applies Tailwind defaults and lets consumer utilities win', async () => {
    render(() => <StyledTourExample />);

    await page.getByRole('button', { name: 'Start styled tour', exact: true }).click();

    await expect.element(page.locator('[data-slot="tour-content"]')).toHaveCSS('width', '384px');
    await expect.element(page.locator('[data-slot="tour-content"]')).toHaveCSS('padding', '16px');
    await expect.element(page.locator('[data-slot="tour-close-icon"]')).toHaveCSS('width', '32px');
  });
});