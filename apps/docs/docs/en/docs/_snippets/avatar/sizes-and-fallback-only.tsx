import { Avatar } from '@moduix/react';

const avatarSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function AvatarSizesDemo() {
  return (
    <div className="docs-avatar-row">
      {avatarSizes.map((size) => (
        <Avatar key={size} size={size}>
          <Avatar.Fallback>{size.toUpperCase()}</Avatar.Fallback>
        </Avatar>
      ))}
    </div>
  );
}