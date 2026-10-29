import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';

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
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </Stack>
  );
}