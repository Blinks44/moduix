/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const timeout = 5000;

const step = {
  id: 'new-item',
  type: 'tooltip',
  title: 'New item added',
  target: () => document.querySelector('[data-tour-new-item]') as HTMLElement | null,
  effect({ show }) {
    const [promise, cancel] = waitForElement(
      () => document.querySelector('[data-tour-new-item]') as HTMLElement | null,
      { timeout },
    );
    promise.then(() => show());
    return cancel;
  },
  actions: [{ label: 'Done', action: 'dismiss' }],
  arrow: true,
};

//#endregion