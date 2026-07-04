/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const delayMs = 1500;

const asyncStep = {
  effect({ show, update }) {
    const controller = new AbortController();
    const [promise, cancel] = waitForPromise(loadDetails(), controller, delayMs);
    promise.then((details) => {
      update(details);
      show();
    });
    return cancel;
  },
};

//#endregion