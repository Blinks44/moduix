import { Button } from '@moduix/solid/button';
import { Toast, Toaster, createToaster } from '@moduix/solid/toast';
import styles from '@/components/examples/toast/toast-custom-composition.module.css';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });

export default function ToastCustomComposition() {
  return (
    <div class={styles.root}>
      <Toaster toaster={toaster}>
        {() => (
          <Toast.Root class={styles.toast}>
            <div class={styles.content}>
              <span aria-hidden="true">ⓘ</span>
              <div>
                <Toast.Title />
                <Toast.Description />
              </div>
            </div>
            <Toast.CloseTrigger aria-label="Close custom toast">×</Toast.CloseTrigger>
          </Toast.Root>
        )}
      </Toaster>
      <Button
        onClick={() =>
          toaster.success({
            title: 'Workspace synced',
            description: 'Map edits are available to everyone.',
          })
        }
      >
        Create custom toast
      </Button>
    </div>
  );
}