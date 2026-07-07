//#region demo
import { Avatar } from '@moduix/react';
import { useState } from 'react';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export function AvatarStatusDemo() {
  const [status, setStatus] = useState('idle');

  return (
    <div className="docs-avatar-status">
      <Avatar onStatusChange={(details) => setStatus(details.status)}>
        <Avatar.Fallback name="Alex T." />
        <Avatar.Image src={avatarImage} alt="Alex T." />
      </Avatar>
      <output>Status: {status}</output>
    </div>
  );
}
//#endregion