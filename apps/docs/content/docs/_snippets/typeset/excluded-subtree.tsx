/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Typeset } from '@moduix/react';

export function TypesetExcludedSubtreeDemo() {
  return (
    <Typeset>
      <p>This paragraph uses the Typeset rhythm.</p>
      <section className="not-typeset app-surface">
        <strong>Application-owned surface</strong>
        <p>This nested subtree keeps its local styles.</p>
      </section>
      <p>Typeset resumes for following rendered content.</p>
    </Typeset>
  );
}

//#endregion