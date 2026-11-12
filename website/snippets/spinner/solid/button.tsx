import { Button } from '@moduix/solid/button';
import { Spinner } from '@moduix/solid/spinner';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/spinner/spinner-button.module.css';

export default function SpinnerButtonDemo() {
  const [saving, setSaving] = createSignal(false);

  return (
    <Stack align="center" gap="3">
      <Button aria-busy={saving()} type="button" onClick={() => setSaving(!saving())}>
        {saving() ? (
          <>
            <Spinner decorative size="sm" />
            Saving changes
          </>
        ) : (
          'Save changes'
        )}
      </Button>
      <div data-preview-meta class={styles.meta}>
        <output>State: {saving() ? 'Saving' : 'Ready'}</output>
      </div>
    </Stack>
  );
}