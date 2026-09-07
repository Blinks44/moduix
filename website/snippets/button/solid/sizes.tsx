import { Button } from '@moduix/solid/button';
import { Star as StarIcon } from 'lucide-solid';
import styles from '@/components/examples/button/button-sizes.module.css';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const iconSizes = [
  { label: 'Small favorite', size: 'icon-sm' },
  { label: 'Favorite', size: 'icon-md' },
  { label: 'Large favorite', size: 'icon-lg' },
] as const;

export default function ButtonSizesDemo() {
  return (
    <div class={styles.root}>
      {sizes.map((size) => (
        <Button size={size}>{size}</Button>
      ))}
      {iconSizes.map((item) => (
        <Button size={item.size} variant="outline" aria-label={item.label}>
          <StarIcon />
        </Button>
      ))}
    </div>
  );
}