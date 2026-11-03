import type { TourStepDetails } from '@ark-ui/vue/tour';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { defineComponent, nextTick, ref, shallowRef } from 'vue';
import type { ComponentPublicInstance, HTMLAttributes } from 'vue';
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

const StyledTourExample = defineComponent({
  components: tourComponents,
  setup() {
    return { tour: useTour({ steps }) };
  },
  template: `
    <button type="button" @click="tour.start()">Start styled tour</button>
    <Tour :tour="tour" :portalled="false" lazy-mount unmount-on-exit>
      <TourBackdrop />
      <TourSpotlight />
      <TourPositioner>
          <TourContent class="w-96 data-[type=dialog]:w-96 data-[type=floating]:w-96 bg-card p-4">
          <TourArrow />
          <TourCloseIcon class="size-8 rounded-full bg-primary" />
          <TourBody>
            <TourTitle class="text-xl">Welcome</TourTitle>
            <TourDescription class="text-base">Start the tour.</TourDescription>
            <TourProgressText />
          </TourBody>
          <TourControl><TourActionList /></TourControl>
        </TourContent>
      </TourPositioner>
    </Tour>
  `,
});

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

test('renders the inline anatomy, fallback content, refs, and Tailwind classes', async () => {
  const positionerRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const actionClass = shallowRef<HTMLAttributes['class']>('consumer-action');
  const App = defineComponent({
    components: tourComponents,
    setup() {
      return { actionClass, contentRef, positionerRef, tour: useTour({ steps }) };
    },
    template: `
      <button type="button" @click="tour.start()">Start tour</button>
      <Tour :tour="tour" :portalled="false">
        <TourBackdrop />
        <TourPositioner ref="positionerRef">
          <TourContent ref="contentRef" class="consumer-content">
            <TourCloseIcon />
            <TourBody>
              <TourTitle />
              <TourDescription />
              <TourProgressText />
            </TourBody>
            <TourControl><TourActionList :class="actionClass" /></TourControl>
          </TourContent>
        </TourPositioner>
      </Tour>
    `,
  });

  render(App);
  await page.getByRole('button', { name: 'Start tour', exact: true }).click();

  const content = screen.getByRole('dialog', { name: 'Welcome' });
  await expect
    .element(page.getByRole('dialog', { name: 'Welcome', exact: true }))
    .toHaveAttribute('data-slot', 'tour-content');
  expect([...content!.classList]).toEqual(expect.arrayContaining(['consumer-content']));
  await expect.element(page.locator('[data-slot="tour-backdrop"]')).toBeAttached();
  expect(positionerRef.value!.$el.getAttribute('data-slot')).toBe('tour-positioner');
  expect(contentRef.value?.$el).toBe(content);

  actionClass.value = ['consumer-array', 'px-6', { 'font-normal': true }];
  await nextTick();

  actionClass.value = { 'consumer-object': true, 'px-4': true };
  await nextTick();
});

test('applies Tailwind defaults and lets consumer utilities win', async () => {
  render(StyledTourExample);
  await page.getByRole('button', { name: 'Start styled tour', exact: true }).click();

  await expect.element(page.locator('[data-slot="tour-content"]')).toHaveCSS('width', '384px');
  await expect.element(page.locator('[data-slot="tour-content"]')).toHaveCSS('padding', '16px');
  await expect.element(page.locator('[data-slot="tour-close-icon"]')).toHaveCSS('width', '32px');
});