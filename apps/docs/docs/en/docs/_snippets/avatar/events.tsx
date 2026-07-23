import { Avatar } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export default function AvatarStatusDemo() {
  const [status, setStatus] = useState('idle');

  return (
    <div className="docs-avatar-status">
      <Avatar onStatusChange={(details) => setStatus(details.status)}>
        <Avatar.Fallback name="Alex T." />
        <Avatar.Image src={avatarImage} alt="Alex T." />
      </Avatar>
      <PreviewMeta>
        <output>Status: {status}</output>
      </PreviewMeta>
    </div>
  );
}