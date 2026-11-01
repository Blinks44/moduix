import { Avatar, AvatarFallback, AvatarImage } from '@moduix/solid/avatar';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export default function AvatarStatusDemo() {
  const [status, setStatus] = createSignal('idle');

  return (
    <Stack align="center" gap="3">
      <Avatar onStatusChange={(details) => setStatus(details.status)}>
        <AvatarFallback>AT</AvatarFallback>
        <AvatarImage src={avatarImage} alt="Alex T." />
      </Avatar>
      <output>Status: {status()}</output>
    </Stack>
  );
}