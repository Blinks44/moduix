import type { TourStepDetails } from '@ark-ui/solid/tour';
import { For, createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
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
  waitForEvent,
} from '@/components/tour/Tour';
import storyStyles from './Tour.stories.module.css';

const meta = {
  title: 'Components/Tour',
  component: Tour,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tour>;

export default meta;

type Story = StoryObj<Meta<typeof Tour>>;

const basicSteps: TourStepDetails[] = [
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
];

const withArrowSteps = basicSteps.map((step) =>
  step.id === 'upload' ? { ...step, arrow: true } : step,
);

const mixedSteps: TourStepDetails[] = [
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
];

function TourOverlay(props: { tour: ReturnType<typeof useTour>; withArrow?: boolean }) {
  return (
    <Tour tour={props.tour} lazyMount unmountOnExit>
      <TourBackdrop />
      <TourSpotlight />
      <TourPositioner>
        <TourContent>
          {props.withArrow ? <TourArrow /> : null}
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
  );
}

export const Default: Story = {
  render: () => {
    const tour = useTour({ steps: basicSteps });

    return (
      <div class={storyStyles.canvas}>
        <Button onClick={() => tour().start()}>Start tour</Button>
        <div class={storyStyles.targets}>
          <Button id="tour-story-upload" variant="outline">
            Upload
          </Button>
          <Button variant="outline">Save</Button>
        </div>
        <TourOverlay tour={tour} />
      </div>
    );
  },
};

export const WithArrow: Story = {
  name: 'With Arrow',
  render: () => {
    const tour = useTour({ steps: withArrowSteps });

    return (
      <div class={storyStyles.canvas}>
        <Button onClick={() => tour().start()}>Start tour with arrow</Button>
        <div class={storyStyles.targets}>
          <Button id="tour-story-upload" variant="outline">
            Upload
          </Button>
        </div>
        <TourOverlay tour={tour} withArrow />
      </div>
    );
  },
};

export const MixedTypes: Story = {
  name: 'Mixed Types',
  render: () => {
    const tour = useTour({ steps: mixedSteps });

    return (
      <div class={storyStyles.canvas}>
        <Button onClick={() => tour().start()}>Start mixed tour</Button>
        <div id="tour-story-target" class={storyStyles.target}>
          Target element
        </div>
        <TourOverlay tour={tour} />
      </div>
    );
  },
};

export const Progress: Story = {
  render: () => {
    const tour = useTour({ steps: basicSteps });

    return (
      <div class={storyStyles.canvas}>
        <Button onClick={() => tour().start()}>Start progress tour</Button>
        <Button id="tour-story-upload" variant="outline">
          Upload
        </Button>
        <Tour tour={tour} lazyMount unmountOnExit>
          <TourBackdrop />
          <TourSpotlight />
          <TourPositioner>
            <TourContent>
              <TourCloseIcon />
              <TourTitle />
              <TourDescription />
              <div class={storyStyles.progressTrack}>
                <div
                  class={storyStyles.progressFill}
                  style={{ width: `${tour().getProgressPercent()}%` }}
                />
              </div>
              <TourControl>
                <TourActionList />
              </TourControl>
            </TourContent>
          </TourPositioner>
        </Tour>
      </div>
    );
  },
};

export const Events: Story = {
  render: () => {
    const [logs, setLogs] = createSignal<string[]>([]);
    const tour = useTour({
      steps: basicSteps,
      onStepChange: (details) => {
        setLogs((value) => [`step: ${details.stepId}`, ...value].slice(0, 4));
      },
      onStatusChange: (details) => {
        setLogs((value) => [`status: ${details.status}`, ...value].slice(0, 4));
      },
    });

    return (
      <div class={storyStyles.canvas}>
        <Button onClick={() => tour().start()}>Start event tour</Button>
        <Button id="tour-story-upload" variant="outline">
          Upload
        </Button>
        <div class={storyStyles.log} aria-live="polite">
          {logs().length ? <For each={logs()}>{(log) => <div>{log}</div>}</For> : 'No events yet'}
        </div>
        <TourOverlay tour={tour} />
      </div>
    );
  },
};

export const WaitForInput: Story = {
  name: 'Wait For Input',
  render: () => {
    const tour = useTour({
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
    });

    return (
      <div class={storyStyles.canvas}>
        <Button onClick={() => tour().start()}>Start input tour</Button>
        <label class={storyStyles.field}>
          Name
          <input id="tour-story-name" class={storyStyles.input} />
        </label>
        <TourOverlay tour={tour} />
      </div>
    );
  },
};
