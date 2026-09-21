import { Button } from '@moduix/solid/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/solid/card';
import styles from '@/components/examples/card/card-basic.module.css';

const content = {
  title: 'Release health',
  description: 'Summary for the current production rollout.',
  summary: '98.4% successful sessions · 12 checks passed',
};

export default function CardDemo() {
  return (
    <Card class={styles.root}>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>
      <CardBody>{content.summary}</CardBody>
      <CardFooter>
        <Button variant="outline">View log</Button>
        <Button>Promote release</Button>
      </CardFooter>
    </Card>
  );
}