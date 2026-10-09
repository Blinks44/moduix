import { AvatarFallback, AvatarImage, AvatarRootProvider, useAvatar } from '@moduix/react/avatar';
import { Button } from '@moduix/react/button';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/avatar/avatar-root-provider.module.css';

const avatarImages = [
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&dpr=2&q=80',
];

export default function AvatarRootProviderDemo() {
  const [imageIndex, setImageIndex] = useState(0);
  const avatar = useAvatar();

  return (
    <div className={styles.root}>
      <AvatarRootProvider value={avatar}>
        <AvatarFallback>AT</AvatarFallback>
        <AvatarImage src={avatarImages[imageIndex]} alt="Alex T." />
      </AvatarRootProvider>
      <PreviewMeta>
        <output>Avatar: {imageIndex + 1}</output>
        <Button
          size="sm"
          onClick={() => setImageIndex((value) => (value + 1) % avatarImages.length)}
        >
          Change avatar
        </Button>
      </PreviewMeta>
    </div>
  );
}