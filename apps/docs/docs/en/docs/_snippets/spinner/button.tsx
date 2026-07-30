import { Button, Spinner } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function SpinnerButtonDemo() {
  const [saving, setSaving] = useState(false);

  return (
    <div
      style={{
        display: 'grid',
        justifyItems: 'center',
        gap: 'var(--moduix-spacing-3)',
      }}
    >
      <Button aria-busy={saving} type="button" onClick={() => setSaving(!saving)}>
        {saving ? (
          <>
            <Spinner decorative size="sm" data-icon="inline-start" />
            Saving changes
          </>
        ) : (
          'Save changes'
        )}
      </Button>
      <PreviewMeta style={{ justifySelf: 'center' }}>
        <output>State: {saving ? 'Saving' : 'Ready'}</output>
      </PreviewMeta>
    </div>
  );
}