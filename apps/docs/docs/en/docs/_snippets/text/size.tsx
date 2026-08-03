import { Text } from '@moduix/react/text';

export default function TextSizesDemo() {
  return (
    <div style={{ display: 'grid', gap: 'var(--moduix-spacing-3)' }}>
      <Text size="xl">Extra-large text</Text>
      <Text size="lg">Large text</Text>
      <Text size="md">Medium text</Text>
      <Text size="sm">Small text</Text>
      <Text size="xs">Extra-small text</Text>
    </div>
  );
}