import { Button } from '@moduix/react/button';
import { Spinner } from '@moduix/react/spinner';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/spinner/spinner-button.module.css';

export default function SpinnerButtonDemo() {
  const [saving, setSaving] = useState(false);

  return (
    <div className={styles.root}>
      <Button aria-busy={saving} type="button" onClick={() => setSaving(!saving)}>
        {saving ? (
          <>
            <Spinner decorative size="sm" />
            Saving changes
          </>
        ) : (
          'Save changes'
        )}
      </Button>
      <PreviewMeta className={styles.meta}>
        <output>State: {saving ? 'Saving' : 'Ready'}</output>
      </PreviewMeta>
    </div>
  );
}