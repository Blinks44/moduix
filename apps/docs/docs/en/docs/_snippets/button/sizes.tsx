import { Button } from '@moduix/react';
import { Star as StarIcon } from 'lucide-react';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const iconSizes = [
  { label: 'Small favorite', size: 'icon-sm' },
  { label: 'Favorite', size: 'icon-md' },
  { label: 'Large favorite', size: 'icon-lg' },
] as const;

export default function ButtonSizesDemo() {
  return (
    <div className="button-demo-row">
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
    </div>
  );
}