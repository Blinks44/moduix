/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const statuses = ['idle', 'started', 'skipped', 'completed', 'dismissed', 'not-found'] as const;

const tour = useTour({
  steps,
  onStepChange: (details) => {
    console.log(details.stepId, details.stepIndex, details.progress);
  },
  onStatusChange: (details) => {
    console.log(details.status);
  },
});

//#endregion