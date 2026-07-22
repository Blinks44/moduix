import { Avatar, useAvatarContext } from '@moduix/react';
import type { ImgHTMLAttributes } from 'react';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

function AvatarCustomImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const avatar = useAvatarContext();
  const { hidden, ...imageProps } = avatar.getImageProps();

  return (
    <img
      {...imageProps}
      {...props}
      className="docs-avatar-custom-image"
      style={{ visibility: hidden ? 'hidden' : 'visible' }}
    />
  );
}

export default function AvatarCustomImageDemo() {
  return (
    <Avatar>
      <Avatar.Fallback name="Alex T." />
      <AvatarCustomImage src={avatarImage} alt="Alex T." />
    </Avatar>
  );
}