import { Button } from '@moduix/solid/button';
import { Toaster, createToaster } from '@moduix/solid/toast';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/toast/toast-placement.module.css';

const placements = ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end'] as const;
type Placement = (typeof placements)[number];

const toasters: Record<Placement, ReturnType<typeof createToaster>> = {
  'top-start': createToaster({ placement: 'top-start', overlap: true, gap: 16 }),
  top: createToaster({ placement: 'top', overlap: true, gap: 16 }),
  'top-end': createToaster({ placement: 'top-end', overlap: true, gap: 16 }),
  'bottom-start': createToaster({ placement: 'bottom-start', overlap: true, gap: 16 }),
  bottom: createToaster({ placement: 'bottom', overlap: true, gap: 16 }),
  'bottom-end': createToaster({ placement: 'bottom-end', overlap: true, gap: 16 }),
};

export default function ToastPlacement() {
  const [placement, setPlacement] = createSignal<Placement>('bottom-end');
  const toaster = () => toasters[placement()];

  return (
    <div class={styles.root}>
      {placements.map((item) => (
        <Toaster toaster={toasters[item]} />
      ))}
      {placements.map((item) => (
        <Button
          variant={item === placement() ? 'default' : 'outline'}
          onClick={() => setPlacement(item)}
        >
          {item}
        </Button>
      ))}
      <Button
        onClick={() =>
          toaster().info({
            title: 'Notification',
            description: `This toast appears at ${placement()}.`,
          })
        }
      >
        Show toast
      </Button>
    </div>
  );
}