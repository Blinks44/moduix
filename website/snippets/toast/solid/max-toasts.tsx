import { Button } from '@moduix/solid/button';
import { Toaster, createToaster } from '@moduix/solid/toast';
import styles from '@/components/examples/toast/toast-max-toasts.module.css';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16, max: 3 });
const descriptions = [
  'John liked your post',
  'Sarah commented on your photo',
  'New follower: @designpro',
  'Your post was shared 10 times',
  'Meeting reminder in 15 minutes',
];

export default function ToastMaximumVisible() {
  return (
    <div class={styles.root}>
      <Toaster toaster={toaster} />
      <Button
        onClick={() =>
          toaster.info({
            title: 'New notification',
            description: 'You have a new message in your inbox.',
          })
        }
      >
        Add notification
      </Button>
      <Button
        onClick={() => {
          descriptions.forEach((description) => {
            toaster.info({ title: 'Notification', description });
          });
        }}
      >
        Add 5 notifications
      </Button>
    </div>
  );
}