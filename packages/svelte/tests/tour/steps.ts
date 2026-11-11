import type { TourStepDetails } from '@/components/tour';

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

export { steps };