import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import styles from '@/components/examples/card/card-with-avatar.module.css';

const person = {
  initials: 'NF',
  name: 'Nate Foss',
  handle: '@natefoss',
  message: 'Nate has requested to join your team.',
};

export default function CardAvatarDemo() {
  return (
    <Card className={styles.root}>
      <Card.Header>
        <div className={styles.profile}>
          <span aria-hidden="true" className={styles.avatar}>
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