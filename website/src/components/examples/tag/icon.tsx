import { Stack } from '@moduix/react/stack';
import { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement } from '@moduix/react/tag';
import { Check as CheckIcon } from 'lucide-react';

const tags = [
  {
    label: 'Selected',
    variant: 'default',
    removable: false,
  },
  {
    label: 'Deployed',
    variant: 'outline',
    removable: true,
  },
] as const;

export default function TagWithIconDemo() {
  return (
    <Stack direction="row" align="center" wrap="wrap" gap="3">
      {tags.map((tag) => (
        <Tag key={tag.label} variant={tag.variant}>
          <TagStartElement>
            <CheckIcon />
          </TagStartElement>
          <TagLabel>{tag.label}</TagLabel>
          {tag.removable ? (
            <TagEndElement>
              <TagCloseTrigger aria-label={`Remove ${tag.label} tag`} />
            </TagEndElement>
          ) : null}
        </Tag>
      ))}
    </Stack>
  );
}