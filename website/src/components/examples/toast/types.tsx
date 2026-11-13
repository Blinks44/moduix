import { Button } from '@moduix/react/button';
import { ToastToaster, createToaster } from '@moduix/react/toast';
import { useState } from 'react';
import styles from '@/components/examples/toast/toast-options.module.css';

const types = [
  { type: 'info', title: 'Update available', description: 'Version 2.4 is ready to install.' },
  { type: 'success', title: 'Changes saved', description: 'Your profile was updated.' },
  { type: 'warning', title: 'Storage almost full', description: 'You have used 90% of 5 GB.' },
  { type: 'error', title: 'Upload failed', description: 'The file is larger than 10 MB.' },
] as const;

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });

export default function App() {
  const [selected, setSelected] = useState<(typeof types)[number]>(types[1]);

  return (
    <div className={styles.root}>
      <ToastToaster toaster={toaster} />
      <div data-preview-meta>
        <output>Type: {selected.type}</output>
        {types.map((item) => (
          <Button
            key={item.type}
            variant={item.type === selected.type ? 'default' : 'outline'}
            onClick={() => setSelected(item)}
          >
            {item.type}
          </Button>
        ))}
        <Button onClick={() => toaster.create(selected)}>Show toast</Button>
      </div>
    </div>
  );
}