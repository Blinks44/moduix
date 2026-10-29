import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';

const labels = {
  target: 'Focus target',
  trigger: 'Focus first button',
};

export default function ButtonRefDemo() {
  let buttonRef: HTMLButtonElement | undefined;

  return (
    <Stack align="center" gap="3">
      <Button ref={(element) => (buttonRef = element)}>{labels.target}</Button>
      <Button size="sm" variant="outline" onClick={() => buttonRef?.focus()}>
        {labels.trigger}
      </Button>
    </Stack>
  );
}