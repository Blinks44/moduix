import { Stack } from '@moduix/solid/stack';
import { Tag, TagCloseTrigger, TagEndElement, TagLabel } from '@moduix/solid/tag';
import { createSignal } from 'solid-js';

type TagVariant = 'default' | 'secondary' | 'outline';
type DemoTag = {
  label: string;
  variant: TagVariant;
  disabled?: boolean;
};

const tags: DemoTag[] = [
  {
    label: 'TypeScript',
    variant: 'default',
  },
  {
    label: 'Design review',
    variant: 'secondary',
  },
  {
    label: 'Needs approval',
    variant: 'outline',
    disabled: true,
  },
];

export default function RemovableTagDemo() {
  const [visibleTags, setVisibleTags] = createSignal(tags);

  return (
    <Stack direction="row" align="center" wrap="wrap" gap="3">
      {visibleTags().map((tag) => (
        <Tag variant={tag.variant}>
          <TagLabel>{tag.label}</TagLabel>
          <TagEndElement>
            <TagCloseTrigger
              disabled={tag.disabled}
              aria-label={`Remove ${tag.label} tag`}
              onClick={() => {
                setVisibleTags((currentTags) =>
                  currentTags.filter((item) => item.label !== tag.label),
                );
              }}
            />
          </TagEndElement>
        </Tag>
      ))}
    </Stack>
  );
}