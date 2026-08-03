import { Typeset } from '@moduix/react/typeset';
import type { CSSProperties } from 'react';

export default function TypesetReadingDemo() {
  return (
    <Typeset
      asChild
      style={
        {
          '--moduix-typeset-flow': '1.75em',
          '--moduix-typeset-leading': 1.9,
          '--moduix-typeset-size': '1.125rem',
        } as CSSProperties
      }
    >
      <article>
        <h2>Reading mode</h2>
        <p>A roomier preset can make long-form content more comfortable without adding props.</p>
        <p>Use a class to keep the page and its layout in control of the rhythm.</p>
      </article>
    </Typeset>
  );
}