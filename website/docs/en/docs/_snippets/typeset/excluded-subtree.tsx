import { Typeset } from '@moduix/react/typeset';

export default function TypesetExcludedSubtreeDemo() {
  return (
    <Typeset>
      <p>This paragraph uses the Typeset rhythm.</p>
      <section
        className="not-typeset"
        style={{
          background: 'var(--moduix-color-muted)',
          border: 'var(--moduix-border-width-sm) solid var(--moduix-color-border)',
          borderRadius: 'var(--moduix-radius-md)',
          padding: 'var(--moduix-spacing-4)',
        }}
      >
        <strong>Application-owned surface</strong>
        <p>This nested subtree keeps its local styles.</p>
      </section>
      <p>Typeset resumes for following rendered content.</p>
    </Typeset>
  );
}