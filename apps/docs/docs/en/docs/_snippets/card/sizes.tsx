import { Card } from '@moduix/react';

const sizes = ['sm', 'md', 'lg'] as const;
const descriptions = {
  sm: 'Compact supporting content.',
  md: 'Default product content.',
  lg: 'Prominent standalone content.',
};

export default function CardSizesDemo() {
  return (
    <div style={{ display: 'grid', inlineSize: '100%', gap: 'var(--moduix-spacing-4)' }}>
      {sizes.map((size) => (
        <Card key={size} size={size} style={{ width: '100%' }}>
          <Card.Header>
            <Card.Title>Card {size}</Card.Title>
            <Card.Description>{descriptions[size]}</Card.Description>
          </Card.Header>
          <Card.Body>Shared content with size-specific density.</Card.Body>
        </Card>
      ))}
    </div>
  );
}