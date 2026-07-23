import { Button } from '@moduix/react';
import { useRef } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const labels = {
  target: 'Focus target',
  trigger: 'Focus first button',
};

export default function ButtonRefDemo() {
  const buttonRef = useRef(null as HTMLButtonElement | null);

  return (
    <div className="button-demo-row">
      <Button ref={buttonRef}>{labels.target}</Button>
      <PreviewMeta>
        <Button size="sm" variant="outline" onClick={() => buttonRef.current?.focus()}>
          {labels.trigger}
        </Button>
      </PreviewMeta>
    </div>
  );
}