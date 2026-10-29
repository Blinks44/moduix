import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';

const variants = [
  'default',
  'outline',
  'secondary',
  'destructive',
  'destructive-outline',
  'ghost',
  'link',
] as const;

export default function ButtonVariantsDemo() {
  return (
    <Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
      {variants.map((variant) => (
        <Button variant={variant}>{variant}</Button>
      ))}
    </Stack>
  );
}