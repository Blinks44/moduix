/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Typeset } from '@moduix/react';

export function TypesetMarkdownExtensionsDemo() {
  return (
    <Typeset asChild>
      <article>
        <h2 id="markdown-extensions">Markdown extensions</h2>
        <ul className="contains-task-list">
          <li className="task-list-item">
            <input type="checkbox" checked readOnly /> Keep rendered task lists readable.
          </li>
        </ul>
        <details>
          <summary>Show implementation note</summary>
          <p>Disclosures, definition lists, and GFM footnotes receive the same reading rhythm.</p>
        </details>
        <dl>
          <dt>Flow</dt>
          <dd>Space before a rendered block.</dd>
        </dl>
        <section className="footnotes">
          <p>1. Footnotes use a compact, separated treatment.</p>
        </section>
      </article>
    </Typeset>
  );
}

//#endregion