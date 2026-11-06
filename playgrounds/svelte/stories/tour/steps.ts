import type { TourStepDetails } from '@/components/tour';

export const basicSteps = [
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

export const withArrowSteps = basicSteps.map((step) =>
  step.id === 'upload' ? { ...step, arrow: true } : step,
);

export const mixedSteps = [
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