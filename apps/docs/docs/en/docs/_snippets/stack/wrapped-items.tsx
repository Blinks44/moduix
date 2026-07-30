import { Badge, Stack } from '@moduix/react';

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