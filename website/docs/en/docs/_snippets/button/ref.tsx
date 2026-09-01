import { Button } from '@moduix/react/button';
import { useRef } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/button-ref.module.css';

const labels = {
  target: 'Focus target',
  trigger: 'Focus first button',
};

export default function ButtonRefDemo() {
  const buttonRef = useRef(null as HTMLButtonElement | null);

  return (
    <div className={styles.root}>
      <Button ref={buttonRef}>{labels.target}</Button>
      <PreviewMeta>
        <Button size="sm" variant="outline" onClick={() => buttonRef.current?.focus()}>
          {labels.trigger}
        </Button>
      </PreviewMeta>
    </div>
  );
}