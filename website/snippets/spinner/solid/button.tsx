import { Button } from '@moduix/solid/button';
import { Spinner } from '@moduix/solid/spinner';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/spinner/spinner-button.module.css';

export default function SpinnerButtonDemo() {
  const [saving, setSaving] = createSignal(false);

  return (
    <div class={styles.root}>
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
      <output class={styles.meta}>State: {saving() ? 'Saving' : 'Ready'}</output>
    </div>
  );
}