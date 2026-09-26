import { Button } from '@moduix/solid/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/solid/card';
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
      <CardHeader>
        <div class={styles.profile}>
          <span aria-hidden="true" class={styles.avatar}>
            {person.initials}
          </span>
          <div>
            <CardTitle>{person.name}</CardTitle>
            <CardDescription>{person.handle}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardBody>{person.message}</CardBody>
      <CardFooter>
        <Button variant="outline">Decline</Button>
        <Button>Approve</Button>
      </CardFooter>
    </Card>
  );
}