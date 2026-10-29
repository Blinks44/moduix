import { Button } from '@moduix/solid/button';
import {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastTitle,
  ToastToaster,
  createToaster,
} from '@moduix/solid/toast';
import { X as XIcon } from 'lucide-solid';
import styles from '@/components/examples/toast/toast-basic.module.css';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });

export default function BuildFromPartsToastDemo() {
  return (
    <div class={styles.root}>
      <ToastToaster toaster={toaster}>
        {() => (
          <Toast>
            <ToastTitle />
            <ToastDescription />
            <ToastCloseTrigger>
              <XIcon strokeWidth={3} />
            </ToastCloseTrigger>
          </Toast>
        )}
      </ToastToaster>
      <Button
        onClick={() =>
          toaster.create({
            title: 'Scheduled for tomorrow',
            description: 'Your meeting has been scheduled for tomorrow at 10am.',
            type: 'info',
          })
        }
      >
        Schedule meeting
      </Button>
    </div>
  );
}