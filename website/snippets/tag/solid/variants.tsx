import { Stack } from '@moduix/solid/stack';
import { Tag, TagLabel } from '@moduix/solid/tag';

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive'] as const;

export default function TagVariantsDemo() {
  return (
    <Stack direction="row" align="center" wrap="wrap" gap="3">
      {variants.map((variant) => (
        <Tag variant={variant}>
          <TagLabel>{variant}</TagLabel>
        </Tag>
      ))}
    </Stack>
  );
}