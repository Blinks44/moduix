import { Card } from '@moduix/react/card';

const variants = ['elevated', 'outline', 'subtle'] as const;
const descriptions = {
  elevated: 'Raised above nearby content.',
  outline: 'Separated with a visible border.',
  subtle: 'Grouped with a muted background.',
};

export default function CardVariantsDemo() {
  return (
    <div style={{ display: 'grid', inlineSize: '100%', gap: 'var(--moduix-spacing-4)' }}>
      {variants.map((variant) => (
        <Card key={variant} variant={variant} style={{ width: '100%' }}>
          <Card.Header>
            <Card.Title>{variant}</Card.Title>
            <Card.Description>{descriptions[variant]}</Card.Description>
          </Card.Header>
          <Card.Body>Use variants to communicate surface hierarchy.</Card.Body>
        </Card>
      ))}
    </div>
  );
}