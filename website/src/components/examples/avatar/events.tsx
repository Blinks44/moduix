import { Avatar, AvatarFallback, AvatarImage } from '@moduix/react/avatar';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export default function AvatarStatusDemo() {
  const [status, setStatus] = useState('idle');

  return (
    <Stack align="center" gap="3">
      <Avatar onStatusChange={(details) => setStatus(details.status)}>
        <AvatarFallback>AT</AvatarFallback>
        <AvatarImage src={avatarImage} alt="Alex T." />
      </Avatar>
      <div data-preview-meta>
        <output>Status: {status}</output>
      </div>
    </Stack>
  );
}