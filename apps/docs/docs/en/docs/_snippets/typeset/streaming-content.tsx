import { Typeset } from '@moduix/react/typeset';
import type { CSSProperties } from 'react';

export default function TypesetStreamingDemo() {
  return (
    <Typeset
      style={
        {
          '--moduix-typeset-flow': '0.875em',
          '--moduix-typeset-leading': 1.6,
        } as CSSProperties
      }
    >
      <p>The first rendered block keeps its spacing as content arrives.</p>
      <p>Each new block contributes only its own margin, so the message does not jump.</p>
      <pre>
        <code>{'const answer = await streamText(prompt);'}</code>
      </pre>
    </Typeset>
  );
}