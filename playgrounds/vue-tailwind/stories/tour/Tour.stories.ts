import type { TourStepDetails } from '@ark-ui/vue/tour';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component, PropType } from 'vue';
import { Button } from '@/components/button';
import {
  Tour,
  TourActionList,
  TourArrow,
  TourBackdrop,
  TourBody,
  TourCloseIcon,
  TourContent,
  TourControl,
  TourDescription,
  TourPositioner,
  TourProgressText,
  TourSpotlight,
  TourTitle,
  useTour,
  waitForEvent,
} from '@/components/tour';
import type { UseTourReturn } from '@/components/tour';

const meta = {
  title: 'Components/Tour',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tour>;

export default meta;

type Story = StoryObj<typeof meta>;

const basicSteps = [
  {
    id: 'welcome',
    type: 'dialog',
    title: 'Welcome',
    description: 'A tour can start with a dialog step before anchoring to page controls.',
    actions: [{ label: 'Start', action: 'next' }],
    backdrop: true,
  },
  {
    id: 'upload',
    type: 'tooltip',
    title: 'Upload files',
    description: 'Tooltip steps highlight a target and use Ark positioning.',
    target: () => document.querySelector<HTMLElement>('#tour-story-upload'),
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
    backdrop: true,
  },
  {
    id: 'complete',
    type: 'dialog',
    title: 'Complete',
    description: 'Dismiss closes the current tour and returns focus through Ark.',
    actions: [{ label: 'Finish', action: 'dismiss' }],
    backdrop: true,
  },
] satisfies TourStepDetails[];

const withArrowSteps = basicSteps.map((step) =>
  step.id === 'upload' ? { ...step, arrow: true } : step,
);

const mixedSteps = [
  {
    id: 'intro',
    type: 'dialog',
    title: 'Step types',
    description: 'Tour supports dialog, tooltip, and floating step layouts.',
    actions: [{ label: 'Next', action: 'next' }],
    backdrop: true,
  },
  {
    id: 'target',
    type: 'tooltip',
    title: 'Targeted step',
    description: 'This step is anchored to a target element.',
    target: () => document.querySelector<HTMLElement>('#tour-story-target'),
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'floating',
    type: 'floating',
    placement: 'bottom-end',
    title: 'Floating step',
    description: 'Floating steps are positioned in the viewport without a target.',
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Done', action: 'dismiss' },
    ],
  },
] satisfies TourStepDetails[];

const TourOverlay = defineComponent({
  components: {
    Tour,
    TourActionList,
    TourArrow,
    TourBackdrop,
    TourBody,
    TourCloseIcon,
    TourContent,
    TourControl,
    TourDescription,
    TourPositioner,
    TourProgressText,
    TourSpotlight,
    TourTitle,
  },
  props: {
    tour: { type: Object as PropType<UseTourReturn['value']>, required: true },
    withArrow: Boolean,
  },
  template: `
    <Tour :tour="tour" lazy-mount unmount-on-exit>
      <TourBackdrop />
      <TourSpotlight />
      <TourPositioner>
        <TourContent>
          <TourArrow v-if="withArrow" />
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
  `,
});

const storyComponents = {
  Button,
  Tour,
  TourActionList,
  TourArrow,
  TourBackdrop,
  TourBody,
  TourCloseIcon,
  TourContent,
  TourControl,
  TourDescription,
  TourOverlay,
  TourPositioner,
  TourProgressText,
  TourSpotlight,
  TourTitle,
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return setup?.() ?? {};
      },
      template,
    });
}

export const Default: Story = {
  render: renderStory(
    `
    <div class="flex w-[min(28rem,calc(100vw-2rem))] flex-col items-start gap-4">
      <Button @click="tour.start()">Start tour</Button>
      <div class="flex flex-wrap gap-2">
        <Button id="tour-story-upload" variant="outline">Upload</Button>
        <Button variant="outline">Save</Button>
      </div>
      <TourOverlay :tour="tour" />
    </div>
  `,
    () => ({ tour: useTour({ steps: basicSteps }) }),
  ),
};

export const WithArrow: Story = {
  name: 'With Arrow',
  render: renderStory(
    `
    <div class="flex w-[min(28rem,calc(100vw-2rem))] flex-col items-start gap-4">
      <Button @click="tour.start()">Start tour with arrow</Button>
      <div class="flex flex-wrap gap-2">
        <Button id="tour-story-upload" variant="outline">Upload</Button>
      </div>
      <TourOverlay :tour="tour" with-arrow />
    </div>
  `,
    () => ({ tour: useTour({ steps: withArrowSteps }) }),
  ),
};

export const MixedTypes: Story = {
  name: 'Mixed Types',
  render: renderStory(
    `
    <div class="flex w-[min(28rem,calc(100vw-2rem))] flex-col items-start gap-4">
      <Button @click="tour.start()">Start mixed tour</Button>
      <div id="tour-story-target" class="grid min-h-20 w-full place-items-center rounded-lg border border-border bg-muted text-sm leading-5 text-foreground">Target element</div>
      <TourOverlay :tour="tour" />
    </div>
  `,
    () => ({ tour: useTour({ steps: mixedSteps }) }),
  ),
};

export const Progress: Story = {
  render: renderStory(
    `
    <div class="flex w-[min(28rem,calc(100vw-2rem))] flex-col items-start gap-4">
      <Button @click="tour.start()">Start progress tour</Button>
      <Button id="tour-story-upload" variant="outline">Upload</Button>
      <Tour :tour="tour" lazy-mount unmount-on-exit>
        <TourBackdrop />
        <TourSpotlight />
        <TourPositioner>
          <TourContent>
            <TourCloseIcon />
            <TourTitle />
            <TourDescription />
            <div class="mt-2 h-1 overflow-hidden rounded-full bg-muted">
              <div
                class="h-full rounded-[inherit] bg-primary transition-[width] duration-200"
                :style="{ width: tour.getProgressPercent() + '%' }"
              />
            </div>
            <TourControl><TourActionList /></TourControl>
          </TourContent>
        </TourPositioner>
      </Tour>
    </div>
  `,
    () => ({ tour: useTour({ steps: basicSteps }) }),
  ),
};

export const Events: Story = {
  render: renderStory(
    `
    <div class="flex w-[min(28rem,calc(100vw-2rem))] flex-col items-start gap-4">
      <Button @click="tour.start()">Start event tour</Button>
      <Button id="tour-story-upload" variant="outline">Upload</Button>
      <div class="min-h-20 w-full rounded-md border border-border bg-muted p-3 font-mono text-xs leading-4 text-muted-foreground" aria-live="polite">
        <template v-if="logs.length">
          <div v-for="(log, index) in logs" :key="log + index">{{ log }}</div>
        </template>
        <template v-else>No events yet</template>
      </div>
      <TourOverlay :tour="tour" />
    </div>
  `,
    () => {
      const logs = ref<string[]>([]);
      const addLog = (value: string) => {
        logs.value = [value, ...logs.value].slice(0, 4);
      };
      return {
        logs,
        tour: useTour({
          steps: basicSteps,
          onStepChange: (details) => addLog('step: ' + details.stepId),
          onStatusChange: (details) => addLog('status: ' + details.status),
        }),
      };
    },
  ),
};

export const WaitForInput: Story = {
  name: 'Wait For Input',
  render: renderStory(
    `
    <div class="flex w-[min(28rem,calc(100vw-2rem))] flex-col items-start gap-4">
      <Button @click="tour.start()">Start input tour</Button>
      <label class="grid w-full max-w-80 gap-1 text-sm leading-5 font-medium text-foreground">
        Name
        <input id="tour-story-name" class="min-h-control-lg rounded-md border border-border bg-background px-3 text-foreground outline-0 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring" />
      </label>
      <TourOverlay :tour="tour" />
    </div>
  `,
    () => ({
      tour: useTour({
        steps: [
          {
            id: 'input',
            type: 'tooltip',
            title: 'Enter a name',
            description: 'The tour advances when the input has at least two characters.',
            target: () => document.querySelector<HTMLInputElement>('#tour-story-name'),
            effect({ next, show, target }) {
              show();
              const [promise, cancel] = waitForEvent<HTMLInputElement>(target, 'input', {
                predicate: (element) => element.value.trim().length >= 2,
              });
              promise.then(() => next());
              return cancel;
            },
          },
          {
            id: 'done',
            type: 'dialog',
            title: 'Input captured',
            description: 'Effects can wait for DOM interaction before moving on.',
            actions: [{ label: 'Done', action: 'dismiss' }],
            backdrop: true,
          },
        ],
      }),
    }),
  ),
};