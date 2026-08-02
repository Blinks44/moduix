import { Button } from '@moduix/react/button';
import { Popover } from '@moduix/react/popover';

export default function MotionPlaygroundDemo() {
  return (
    <Popover positioning={{ gutter: 12 }}>
      <Popover.Trigger asChild>
        <Button>Open motion playground</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>Tune the motion tokens in the Playground tab.</Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}