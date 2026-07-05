/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const steps = [
  {
    id: 'intro',
    type: 'dialog',
    title: 'Optional walkthrough',
    description: 'Use a dismiss action when the tour is helpful but not required.',
    actions: [
      { label: 'Skip tour', action: 'dismiss' },
      { label: 'Continue', action: 'next' },
    ],
    backdrop: true,
  },
] satisfies TourStepDetails[];

const tour = useTour({ steps });

//#endregion