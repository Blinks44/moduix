import { Stack } from '@moduix/react/stack';
import { Tag, TagCloseTrigger, TagEndElement, TagLabel } from '@moduix/react/tag';
import { useState, type ComponentProps } from 'react';

type DemoTag = {
  label: string;
  variant: ComponentProps<typeof Tag>['variant'];
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
  const [visibleTags, setVisibleTags] = useState(tags);

  return (
    <Stack direction="row" align="center" wrap="wrap" gap="3">
      {visibleTags.map((tag) => (
        <Tag key={tag.label} variant={tag.variant}>
          <TagLabel>{tag.label}</TagLabel>
          <TagEndElement>
            <TagCloseTrigger
              disabled={tag.disabled}
              aria-label={`Remove ${tag.label} tag`}
              onClick={() => {
                setVisibleTags((tags) => tags.filter((item) => item.label !== tag.label));
              }}
            />
          </TagEndElement>
        </Tag>
      ))}
    </Stack>
  );
}