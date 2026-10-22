import { Tag, TagLabel } from '@moduix/react/tag';

export default function TagAsChildDemo() {
  return (
    <Tag asChild variant="outline">
      <button type="button">
        <TagLabel>Open filter</TagLabel>
      </button>
    </Tag>
  );
}