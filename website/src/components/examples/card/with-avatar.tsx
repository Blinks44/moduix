import { Button } from '@moduix/react/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';
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
      <CardHeader>
        <Stack direction="row" align="center" gap="3">
          <span aria-hidden="true" className={styles.avatar}>
            {person.initials}
          </span>
          <div>
            <CardTitle>{person.name}</CardTitle>
            <CardDescription>{person.handle}</CardDescription>
          </div>
        </Stack>
      </CardHeader>
      <CardBody>{person.message}</CardBody>
      <CardFooter>
        <Button variant="outline">Decline</Button>
        <Button>Approve</Button>
      </CardFooter>
    </Card>
  );
}