import { Avatar, useAvatarContext } from '@moduix/solid/avatar';
import type { JSX } from 'solid-js';
import { createMemo } from 'solid-js';
import styles from '@/components/examples/avatar/avatar-custom-image.module.css';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

type AvatarCustomImageProps = Pick<JSX.ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'>;

function AvatarCustomImage({ alt, src }: AvatarCustomImageProps) {
  const avatar = useAvatarContext();
  const image = createMemo(() => {
    const { hidden, ...imageProps } = avatar().getImageProps();

    return { hidden, imageProps };
  });

  return (
    <img
      {...image().imageProps}
      src={src}
      alt={alt}
      class={styles.image}
      style={{ visibility: image().hidden ? 'hidden' : 'visible' }}
    />
  );
}

export default function AvatarCustomImageDemo() {
  return (
    <Avatar>
      <Avatar.Fallback>AT</Avatar.Fallback>
      <AvatarCustomImage src={avatarImage} alt="Alex T." />
    </Avatar>
  );
}