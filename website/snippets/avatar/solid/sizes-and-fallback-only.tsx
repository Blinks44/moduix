import { Avatar, AvatarFallback } from '@moduix/solid/avatar';
import { Stack } from '@moduix/solid/stack';
import { For } from 'solid-js';

const avatarSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function AvatarSizesDemo() {
  return (
    <Stack direction="row" align="center" justify="center" wrap="nowrap" gap="3">
      <For each={avatarSizes}>
        {(size) => (
          <Avatar size={size}>
            <AvatarFallback>{size.toUpperCase()}</AvatarFallback>
          </Avatar>
        )}
      </For>
    </Stack>
  );
}