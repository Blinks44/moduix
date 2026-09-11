import { Badge } from '@moduix/solid/badge';
import { Stack } from '@moduix/solid/stack';

export default function StackWrapDemo() {
  return (
    <Stack direction="row" gap={8} wrap="wrap">
      <Badge>Design</Badge>
      <Badge>Engineering</Badge>
      <Badge>Docs</Badge>
      <Badge>Release</Badge>
    </Stack>
  );
}