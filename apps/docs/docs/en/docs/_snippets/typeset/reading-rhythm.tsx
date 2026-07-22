import { Typeset } from '@moduix/react';

export default function TypesetReadingDemo() {
  return (
    <Typeset asChild className="typeset-reading">
      <article>
        <h2>Reading mode</h2>
        <p>A roomier preset can make long-form content more comfortable without adding props.</p>
        <p>Use a class to keep the page and its layout in control of the rhythm.</p>
      </article>
    </Typeset>
  );
}