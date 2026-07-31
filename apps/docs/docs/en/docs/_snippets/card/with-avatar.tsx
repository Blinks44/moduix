import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';

const person = {
  initials: 'NF',
  name: 'Nate Foss',
  handle: '@natefoss',
  message: 'Nate has requested to join your team.',
};

export default function CardAvatarDemo() {
  return (
    <Card>
      <Card.Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--moduix-spacing-3)' }}>
          <span
            aria-hidden="true"
            style={{
              display: 'inline-grid',
              width: '3rem',
              height: '3rem',
              placeItems: 'center',
              borderRadius: 'var(--moduix-radius-full)',
              background: 'var(--moduix-color-primary)',
              color: 'var(--moduix-color-primary-foreground)',
            }}
          >
            {person.initials}
          </span>
          <div>
            <Card.Title>{person.name}</Card.Title>
            <Card.Description>{person.handle}</Card.Description>
          </div>
        </div>
      </Card.Header>
      <Card.Body>{person.message}</Card.Body>
      <Card.Footer>
        <Button variant="outline">Decline</Button>
        <Button>Approve</Button>
      </Card.Footer>
    </Card>
  );
}