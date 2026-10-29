import { Button } from '@moduix/react/button';
import { Spinner } from '@moduix/react/spinner';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/spinner/spinner-button.module.css';

export default function SpinnerButtonDemo() {
  const [saving, setSaving] = useState(false);

  return (
    <Stack align="center" gap="3">
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
    </Stack>
  );
}