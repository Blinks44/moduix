import { Avatar } from '@moduix/react';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export default function AvatarDemo() {
  return (
    <Avatar>
      <Avatar.Fallback name="Alex T." />
      <Avatar.Image src={avatarImage} alt="Alex T." />
    </Avatar>
  );
}