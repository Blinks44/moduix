import { Avatar, AvatarFallback, AvatarImage } from '@moduix/react/avatar';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/avatar/avatar-events.module.css';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export default function AvatarStatusDemo() {
  const [status, setStatus] = useState('idle');

  return (
    <div className={styles.root}>
      <Avatar onStatusChange={(details) => setStatus(details.status)}>
        <AvatarFallback>AT</AvatarFallback>
        <AvatarImage src={avatarImage} alt="Alex T." />
      </Avatar>
      <PreviewMeta>
        <output>Status: {status}</output>
      </PreviewMeta>
    </div>
  );
}