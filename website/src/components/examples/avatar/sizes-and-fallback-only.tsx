import { Avatar, AvatarFallback } from '@moduix/react/avatar';
import { Stack } from '@moduix/react/stack';

const avatarSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function AvatarSizesDemo() {
  return (
    <Stack direction="row" align="center" justify="center" wrap="nowrap" gap="3">
      {avatarSizes.map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback>{size.toUpperCase()}</AvatarFallback>
        </Avatar>
      ))}
    </Stack>
  );
}