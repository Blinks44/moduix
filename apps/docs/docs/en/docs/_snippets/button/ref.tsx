import { Button } from '@moduix/react';
import { useRef } from 'react';

const labels = {
  target: 'Focus target',
  trigger: 'Focus first button',
};

export default function ButtonRefDemo() {
  const buttonRef = useRef(null as HTMLButtonElement | null);

  return (
    <div className="button-demo-row">
      <Button ref={buttonRef}>{labels.target}</Button>
      <Button variant="outline" onClick={() => buttonRef.current?.focus()}>
        {labels.trigger}
      </Button>
    </div>
  );
}