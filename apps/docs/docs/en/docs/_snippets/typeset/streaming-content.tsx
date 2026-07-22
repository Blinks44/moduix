import { Typeset } from '@moduix/react';

export default function TypesetStreamingDemo() {
  return (
    <Typeset className="typeset-chat">
      <p>The first rendered block keeps its spacing as content arrives.</p>
      <p>Each new block contributes only its own margin, so the message does not jump.</p>
      <pre>
        <code>{'const answer = await streamText(prompt);'}</code>
      </pre>
    </Typeset>
  );
}