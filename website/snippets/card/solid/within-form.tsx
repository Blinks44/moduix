import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
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
          <Card.Header>
            <Card.Title>{copy.title}</Card.Title>
            <Card.Description>{copy.description}</Card.Description>
          </Card.Header>
          <Card.Body class={styles.body}>
            <For each={fields}>
              {(field) => (
                <label class={styles.field}>
                  {field.label}
                  <Input name={field.name} />
                </label>
              )}
            </For>
          </Card.Body>
          <Card.Footer>
            <Button type="reset" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Create account</Button>
          </Card.Footer>
        </form>
      )}
    />
  );
}