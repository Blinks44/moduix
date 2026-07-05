/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const minLength = 2;

const step = {
  id: 'name',
  type: 'tooltip',
  title: 'Enter a name',
  target: () => document.querySelector('#tour-wait-name') as HTMLInputElement | null,
  effect({ next, show, target }) {
    show();
    const [promise, cancel] = waitForEvent(target as HTMLInputElement, 'input', {
      predicate: (element) => element.value.trim().length >= minLength,
    });
    promise.then(() => next());
    return cancel;
  },
};

//#endregion