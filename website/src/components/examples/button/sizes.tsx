import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';
import { Star as StarIcon } from 'lucide-react';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const iconSizes = [
  { label: 'Small favorite', size: 'icon-sm' },
  { label: 'Favorite', size: 'icon-md' },
  { label: 'Large favorite', size: 'icon-lg' },
] as const;

export default function ButtonSizesDemo() {
  return (
    <Stack direction="row" align="center" wrap="wrap" gap="3">
      {sizes.map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
      {iconSizes.map((item) => (
        <Button key={item.size} size={item.size} variant="outline" aria-label={item.label}>
          <StarIcon />
        </Button>
      ))}
    </Stack>
  );
}