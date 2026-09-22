import { Button } from '@moduix/solid/button';
import { ToastToaster, createToaster } from '@moduix/solid/toast';
import styles from '@/components/examples/toast/toast-always-expanded.module.css';

const toaster = createToaster({ placement: 'bottom-end', overlap: false, gap: 16 });

export default function ToastNonOverlapping() {
  return (
    <div class={styles.root}>
      <ToastToaster toaster={toaster} />
      <Button
        onClick={() =>
          toaster.info({
            title: 'Expanded toast',
            description: 'Each notification remains fully visible in the stack.',
          })
        }
      >
        Create expanded toast
      </Button>
    </div>
  );
}
