/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const steps = [
  {
    id: 'dialog',
    type: 'dialog',
    title: 'Mixed step types',
    description: 'Start centered.',
    actions: [{ label: 'Next', action: 'next' }],
    backdrop: true,
  },
  {
    id: 'tooltip',
    type: 'tooltip',
    title: 'Anchored tooltip',
    description: 'Follows a target.',
    target: () => document.querySelector('#tour-mixed-target') as HTMLElement | null,
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
    title: 'Floating note',
    description: 'Sits in the viewport.',
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Done', action: 'dismiss' },
    ],
  },
] satisfies TourStepDetails[];

const tour = useTour({ steps });

//#endregion