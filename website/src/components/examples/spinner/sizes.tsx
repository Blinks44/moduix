import { Spinner } from '@moduix/react/spinner';
import { Stack } from '@moduix/react/stack';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function SpinnerSizesDemo() {
  return (
    <Stack direction="row" align="center" gap="4">
      {sizes.map((size) => (
        <Spinner key={size} decorative size={size} />
      ))}
    </Stack>
  );
}