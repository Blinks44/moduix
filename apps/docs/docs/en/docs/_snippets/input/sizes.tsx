import { Input } from '@moduix/react/input';

export default function InputSizesDemo() {
  return (
    <div style={{ display: 'grid', gap: 'var(--moduix-spacing-3)' }}>
      <Input size="xs" aria-label="Extra-small input" placeholder="Extra-small input" />
      <Input size="sm" aria-label="Small input" placeholder="Small input" />
      <Input size="md" aria-label="Medium input" placeholder="Medium input" />
      <Input size="lg" aria-label="Large input" placeholder="Large input" />
      <Input size="xl" aria-label="Extra-large input" placeholder="Extra-large input" />
    </div>
  );
}