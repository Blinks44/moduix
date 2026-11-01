import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';
import {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastTitle,
  ToastToaster,
  createToaster,
} from '@moduix/solid/toast';
import styles from '@/components/examples/toast/toast-custom-composition.module.css';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });

export default function ToastCustomComposition() {
  return (
    <Stack align="center" gap="3">
      <ToastToaster toaster={toaster}>
        {() => (
          <Toast class={styles.toast}>
            <Stack direction="row" align="flex-start" gap="2">
              <span aria-hidden="true">ⓘ</span>
              <div>
                <ToastTitle />
                <ToastDescription />
              </div>
            </Stack>
            <ToastCloseTrigger aria-label="Close custom toast">×</ToastCloseTrigger>
          </Toast>
        )}
      </ToastToaster>
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
    </Stack>
  );
}