import { Badge } from '@moduix/react/badge';
import { Stack } from '@moduix/react/stack';

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