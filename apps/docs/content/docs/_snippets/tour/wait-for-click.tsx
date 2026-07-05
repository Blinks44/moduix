/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const eventType = 'click';

const step = {
  id: 'click-target',
  type: 'tooltip',
  title: 'Click the target',
  target: () => document.querySelector('#tour-wait-click') as HTMLButtonElement | null,
  effect({ next, show, target }) {
    show();
    const [promise, cancel] = waitForEvent(target as HTMLButtonElement, eventType);
    promise.then(() => next());
    return cancel;
  },
  arrow: true,
};

//#endregion