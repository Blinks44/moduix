import type { TourStepDetails } from '@ark-ui/react/tour';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { Button } from '../button';
import { Tour, useTour, waitForEvent } from './Tour';
import storyStyles from './Tour.stories.module.css';

const meta = {
  title: 'Components/Tour',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

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
    arrow: true,
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
    arrow: true,
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

function TourOverlay({ tour }: { tour: ReturnType<typeof useTour> }) {
  return (
    <Tour tour={tour} lazyMount unmountOnExit>
      <Tour.Backdrop />
      <Tour.Spotlight />
      <Tour.Positioner>
        <Tour.Content>
          <Tour.Arrow />
          <Tour.CloseTrigger>
            <CloseIcon className={storyStyles.closeIcon} />
          </Tour.CloseTrigger>
          <Tour.Title />
          <Tour.Description />
          <Tour.ProgressText />
          <Tour.Control>
            <Tour.Actions>
              {(actions) =>
                actions.map((action) => <Tour.ActionTrigger key={action.label} action={action} />)
              }
            </Tour.Actions>
          </Tour.Control>
        </Tour.Content>
      </Tour.Positioner>
    </Tour>
  );
}

export const Default: Story = {
  render: () => {
    const tour = useTour({ steps: basicSteps });

    return (
      <div className={storyStyles.canvas}>
        <Button onClick={() => tour.start()}>Start tour</Button>
        <div className={storyStyles.targets}>
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

export const MixedTypes: Story = {
  name: 'Mixed Types',
  render: () => {
    const tour = useTour({ steps: mixedSteps });

    return (
      <div className={storyStyles.canvas}>
        <Button onClick={() => tour.start()}>Start mixed tour</Button>
        <div id="tour-story-target" className={storyStyles.target}>
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
      <div className={storyStyles.canvas}>
        <Button onClick={() => tour.start()}>Start progress tour</Button>
        <Button id="tour-story-upload" variant="outline">
          Upload
        </Button>
        <Tour tour={tour} lazyMount unmountOnExit>
          <Tour.Backdrop />
          <Tour.Spotlight />
          <Tour.Positioner>
            <Tour.Content>
              <Tour.Arrow />
              <Tour.CloseTrigger>
                <CloseIcon className={storyStyles.closeIcon} />
              </Tour.CloseTrigger>
              <Tour.Title />
              <Tour.Description />
              <div className={storyStyles.progressTrack}>
                <div
                  className={storyStyles.progressFill}
                  style={{ width: `${tour.getProgressPercent()}%` }}
                />
              </div>
              <Tour.Control>
                <Tour.Actions>
                  {(actions) =>
                    actions.map((action) => (
                      <Tour.ActionTrigger key={action.label} action={action} />
                    ))
                  }
                </Tour.Actions>
              </Tour.Control>
            </Tour.Content>
          </Tour.Positioner>
        </Tour>
      </div>
    );
  },
};

export const Events: Story = {
  render: () => {
    const [logs, setLogs] = useState<string[]>([]);
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
      <div className={storyStyles.canvas}>
        <Button onClick={() => tour.start()}>Start event tour</Button>
        <Button id="tour-story-upload" variant="outline">
          Upload
        </Button>
        <div className={storyStyles.log} aria-live="polite">
          {logs.length ? logs.map((log) => <div key={log}>{log}</div>) : 'No events yet'}
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
          arrow: true,
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
      <div className={storyStyles.canvas}>
        <Button onClick={() => tour.start()}>Start input tour</Button>
        <label className={storyStyles.field}>
          Name
          <input id="tour-story-name" className={storyStyles.input} />
        </label>
        <TourOverlay tour={tour} />
      </div>
    );
  },
};