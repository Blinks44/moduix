import { Button, Card } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const person = {
  initials: 'NF',
  name: 'Nate Foss',
  handle: '@natefoss',
  message: 'Nate has requested to join your team.',
};

export default function CardAvatarDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <Card>
        <Card.Header>
          <div className="profile">
            <span aria-hidden="true" className="avatar">
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
    </PreviewLayout>
  );
}