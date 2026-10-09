import { Button } from '@moduix/solid/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/solid/card';
import { Input } from '@moduix/solid/input';
import { For } from 'solid-js';
import styles from '@/components/examples/card/card-within-form.module.css';

const copy = {
  title: 'Create account',
  description: 'Enter the contact details for the new member.',
};
const fields = [
  { label: 'First name', name: 'firstName' },
  { label: 'Last name', name: 'lastName' },
];

export default function CardFormDemo() {
  return (
    <Card
      class={styles.root}
      asChild={(props) => (
        <form {...props()}>
          <CardHeader>
            <CardTitle>{copy.title}</CardTitle>
            <CardDescription>{copy.description}</CardDescription>
          </CardHeader>
          <CardBody class={styles.body}>
            <For each={fields}>
              {(field) => (
                <label class={styles.field}>
                  {field.label}
                  <Input name={field.name} />
                </label>
              )}
            </For>
          </CardBody>
          <CardFooter>
            <Button type="reset" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Create account</Button>
          </CardFooter>
        </form>
      )}
    />
  );
}