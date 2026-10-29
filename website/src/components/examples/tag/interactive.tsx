import { Tag, TagLabel } from '@moduix/react/tag';

export default function InteractiveTagDemo() {
  return (
    <Tag asChild variant="outline">
      <button type="button">
        <TagLabel>Open filter</TagLabel>
      </button>
    </Tag>
  );
}