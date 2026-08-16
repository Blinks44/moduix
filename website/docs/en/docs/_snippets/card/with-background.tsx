import { Card } from '@moduix/react/card';

export default function CardWithBackgroundDemo() {
  return (
    <Card
      variant="elevated"
      style={{
        minHeight: '20rem',
        border: 0,
        background: 'var(--moduix-color-muted)',
        color: '#fff',
      }}
    >
      <Card.Background>
        <img
          alt=""
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85"
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgb(0 0 0 / 4%) 24%, rgb(0 0 0 / 78%) 100%)',
          }}
        />
      </Card.Background>
      <Card.Header
        style={{ marginTop: 'auto', paddingBlock: 'var(--moduix-spacing-6)', color: 'inherit' }}
      >
        <Card.Title>Weekend guide</Card.Title>
        <Card.Description style={{ color: 'rgb(255 255 255 / 80%)' }}>
          Three places to slow down, look around, and stay a little longer.
        </Card.Description>
      </Card.Header>
    </Card>
  );
}