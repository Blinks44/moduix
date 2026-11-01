import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';
import { Star as StarIcon } from 'lucide-solid';

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
        <Button size={size}>{size}</Button>
      ))}
      {iconSizes.map((item) => (
        <Button size={item.size} variant="outline" aria-label={item.label}>
          <StarIcon />
        </Button>
      ))}
    </Stack>
  );
}