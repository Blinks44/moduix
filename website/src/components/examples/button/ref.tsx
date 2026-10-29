import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';
import { useRef } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const labels = {
  target: 'Focus target',
  trigger: 'Focus first button',
};

export default function ButtonRefDemo() {
  const buttonRef = useRef(null as HTMLButtonElement | null);

  return (
    <Stack align="center" gap="3">
      <Button ref={buttonRef}>{labels.target}</Button>
      <PreviewMeta>
        <Button size="sm" variant="outline" onClick={() => buttonRef.current?.focus()}>
          {labels.trigger}
        </Button>
      </PreviewMeta>
    </Stack>
  );
}