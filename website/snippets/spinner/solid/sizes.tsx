import { Spinner } from '@moduix/solid/spinner';
import { Stack } from '@moduix/solid/stack';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function SpinnerSizesDemo() {
  return (
    <Stack direction="row" align="center" gap="4">
      {sizes.map((size) => (
        <Spinner decorative size={size} />
      ))}
    </Stack>
  );
}