import { Tag, TagLabel } from '@moduix/solid/tag';

export default function TagAsChildDemo() {
  return (
    <Tag
      asChild={(props) => (
        <button {...props()} type="button">
          <TagLabel>Open filter</TagLabel>
        </button>
      )}
      variant="outline"
    />
  );
}
