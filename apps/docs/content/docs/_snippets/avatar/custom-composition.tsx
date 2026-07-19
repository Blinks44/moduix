//#region demo
import { Avatar } from '@moduix/react';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export function AvatarLinkDemo() {
  return (
    <Avatar asChild size="xl" className="docs-avatar-link">
      <a href="mailto:alex@example.com" aria-label="Email Alex T.">
        <Avatar.Fallback className="docs-avatar-link-fallback" name="Alex T." />
        <Avatar.Image className="docs-avatar-link-image" src={avatarImage} alt="" />
      </a>
    </Avatar>
  );
}
//#endregion