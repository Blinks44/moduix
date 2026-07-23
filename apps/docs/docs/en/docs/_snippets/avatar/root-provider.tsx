import { Avatar, Button, useAvatar } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export default function AvatarRootProviderDemo() {
  const [count, setCount] = useState(0);
  const avatar = useAvatar();

  return (
    <div className="docs-avatar-provider">
      <Avatar.RootProvider value={avatar}>
        <Avatar.Fallback name="Alex T." />
        <Avatar.Image src={`${avatarImage}&seed=${count}`} alt="Alex T." />
      </Avatar.RootProvider>
      <PreviewMeta>
        <Button size="sm" onClick={() => setCount(count + 1)}>
          Change avatar
        </Button>
      </PreviewMeta>
    </div>
  );
}