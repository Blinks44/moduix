import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import styles from '@/components/examples/card/card-with-avatar.module.css';

const person = {
  initials: 'NF',
  name: 'Nate Foss',
  handle: '@natefoss',
  message: 'Nate has requested to join your team.',
};

export default function CardAvatarDemo() {
  return (
    <Card class={styles.root}>
      <Card.Header>
        <div class={styles.profile}>
          <span aria-hidden="true" class={styles.avatar}>
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