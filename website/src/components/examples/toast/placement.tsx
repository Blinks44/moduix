import { Button } from '@moduix/react/button';
import { ToastToaster, createToaster } from '@moduix/react/toast';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
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

export default function App() {
  const [placement, setPlacement] = useState<Placement>('bottom-end');
  const toaster = toasters[placement];

  return (
    <div className={styles.root}>
      {placements.map((item) => (
        <ToastToaster key={item} toaster={toasters[item]} />
      ))}
      <PreviewMeta>
        <output>Placement: {placement}</output>
        {placements.map((item) => (
          <Button
            key={item}
            variant={item === placement ? 'default' : 'outline'}
            onClick={() => setPlacement(item)}
          >
            {item}
          </Button>
        ))}
        <Button
          onClick={() =>
            toaster.info({
              title: 'Notification',
              description: `This toast appears at ${placement}.`,
            })
          }
        >
          Show toast
        </Button>
      </PreviewMeta>
    </div>
  );
}