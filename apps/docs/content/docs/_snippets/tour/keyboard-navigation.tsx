/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const keyboardNavigation = true;
const progressText = ({ current, total }) => String(current + 1) + ' / ' + String(total);

const tour = useTour({
  steps,
  keyboardNavigation: true,
  translations: {
    progressText: ({ current, total }) => `${current + 1} / ${total}`,
  },
});

//#endregion