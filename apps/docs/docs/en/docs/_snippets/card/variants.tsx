import { Card } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const variants = ['elevated', 'outline', 'subtle'] as const;
const descriptions = {
  elevated: 'Raised above nearby content.',
  outline: 'Separated with a visible border.',
  subtle: 'Grouped with a muted background.',
};

export default function CardVariantsDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <div className="cards">
        {variants.map((variant) => (
          <Card key={variant} className="card" variant={variant}>
            <Card.Header>
              <Card.Title>{variant}</Card.Title>
              <Card.Description>{descriptions[variant]}</Card.Description>
            </Card.Header>
            <Card.Body>Use variants to communicate surface hierarchy.</Card.Body>
          </Card>
        ))}
      </div>
    </PreviewLayout>
  );
}