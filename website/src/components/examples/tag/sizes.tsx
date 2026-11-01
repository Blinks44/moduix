import { Stack } from '@moduix/react/stack';
import { Tag, TagLabel } from '@moduix/react/tag';

const sizes = [
  {
    label: 'Compact',
    size: 'sm',
  },
  {
    label: 'Default',
    size: 'md',
  },
  {
    label: 'Large',
    size: 'lg',
  },
] as const;

export default function TagSizesDemo() {
  return (
    <Stack direction="row" align="center" wrap="wrap" gap="3">
      {sizes.map((tag) => (
        <Tag key={tag.size} size={tag.size}>
          <TagLabel>{tag.label}</TagLabel>
        </Tag>
      ))}
    </Stack>
  );
}