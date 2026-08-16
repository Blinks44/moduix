import { Text } from '@moduix/react/text';

export default function TextDemo() {
  return (
    <div style={{ display: 'grid', gap: 'var(--moduix-spacing-3)' }}>
      <Text>Use text to describe interface state and supporting details.</Text>
      <Text as="small" tone="muted">
        Last updated 2 minutes ago
      </Text>
    </div>
  );
}