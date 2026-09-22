import { Button } from '@moduix/solid/button';
import { ToastToaster, createToaster } from '@moduix/solid/toast';
import styles from '@/components/examples/toast/toast-types.module.css';

const types = ['info', 'success', 'warning', 'error'] as const;
const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });

export default function ToastTypes() {
  return (
    <div class={styles.root}>
      <ToastToaster toaster={toaster} />
      {types.map((type) => (
        <Button
          onClick={() =>
            toaster.create({
              title: type === 'info' ? 'Update available' : `${type} toast`,
              description: `This notification uses the ${type} status style.`,
              type,
            })
          }
        >
          {type}
        </Button>
      ))}
    </div>
  );
}
