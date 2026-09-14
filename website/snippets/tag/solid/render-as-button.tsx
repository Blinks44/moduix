import { Tag } from '@moduix/solid/tag';

export default function TagAsChildDemo() {
  return (
    <Tag
      asChild={(props) => (
        <button {...props()} type="button">
          <Tag.Label>Open filter</Tag.Label>
        </button>
      )}
      variant="outline"
    />
  );
}