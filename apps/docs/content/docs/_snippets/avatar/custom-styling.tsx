//#region demo
import { Avatar } from '@moduix/react';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export function AvatarStylingDemo() {
  return (
    <Avatar size="lg" className="docs-avatar-ring">
      <Avatar.Fallback className="docs-avatar-uppercase">LT</Avatar.Fallback>
      <Avatar.Image className="docs-avatar-saturated-image" src={avatarImage} alt="Alex T." />
    </Avatar>
  );
}
//#endregion