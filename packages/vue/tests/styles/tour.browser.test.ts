import type { TourStepDetails } from '@ark-ui/vue/tour';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent } from 'vue';
import {
  Tour,
  TourActionList,
  TourActionTrigger,
  TourActions,
  TourArrow,
  TourBackdrop,
  TourBody,
  TourCloseIcon,
  TourContent,
  TourControl,
  TourContext,
  TourDescription,
  TourPositioner,
  TourProgressText,
  TourSpotlight,
  TourTitle,
  useTour,
} from '@/index';

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
    arrow: true,
    backdrop: true,
  },
] satisfies TourStepDetails[];

const tourComponents = {
  Tour,
  TourActionList,
  TourActionTrigger,
  TourActions,
  TourArrow,
  TourBackdrop,
  TourBody,
  TourCloseIcon,
  TourContent,
  TourControl,
  TourContext,
  TourDescription,
  TourPositioner,
  TourProgressText,
  TourSpotlight,
  TourTitle,
};

test('preserves Ark action behavior for custom Vue markup with asChild', async () => {
  const App = defineComponent({
    components: tourComponents,
    setup() {
      return { tour: useTour({ steps }) };
    },
    template: `
      <button type="button" @click="tour.start()">Start custom action tour</button>
      <Tour :tour="tour" :portalled="false">
        <TourPositioner>
          <TourContent>
            <TourTitle />
            <TourDescription />
            <TourControl>
              <TourActions v-slot="actions">
                <TourActionTrigger
                  v-for="(action, index) in actions"
                  :key="action.label + index"
                  :action="action"
                  as-child
                >
                  <button type="button">{{ action.label }}</button>
                </TourActionTrigger>
              </TourActions>
            </TourControl>
          </TourContent>
        </TourPositioner>
      </Tour>
    `,
  });

  render(App);
  await page.getByRole('button', { name: 'Start custom action tour', exact: true }).click();

  await expect
    .element(page.getByText('Continue').nth(0))
    .toHaveAttribute('data-slot', 'tour-action-trigger');
  await expect.element(page.getByText('Continue').nth(0)).toBeDisabled();
  await expect.element(page.getByText('Continue').nth(1)).not.toBeDisabled();
});