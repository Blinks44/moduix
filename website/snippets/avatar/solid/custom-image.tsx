import { Avatar, AvatarFallback, useAvatarContext } from '@moduix/solid/avatar';
import type { JSX } from 'solid-js';
import styles from '@/components/examples/avatar/avatar-custom-image.module.css';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

type AvatarCustomImageProps = Pick<JSX.ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'>;

function AvatarCustomImage(props: AvatarCustomImageProps) {
  const avatar = useAvatarContext();

  return <img {...avatar().getImageProps()} src={props.src} alt={props.alt} class={styles.image} />;
}

export default function AvatarCustomImageDemo() {
  return (
    <Avatar>
      <AvatarFallback>AT</AvatarFallback>
      <AvatarCustomImage src={avatarImage} alt="Alex T." />
    </Avatar>
  );
}