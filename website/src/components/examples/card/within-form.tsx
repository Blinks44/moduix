import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Input } from '@moduix/react/input';
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
    <Card className={styles.root} asChild>
      <form>
        <Card.Header>
          <Card.Title>{copy.title}</Card.Title>
          <Card.Description>{copy.description}</Card.Description>
        </Card.Header>
        <Card.Body className={styles.body}>
          {fields.map((field) => (
            <label className={styles.field} key={field.name}>
              {field.label}
              <Input name={field.name} />
            </label>
          ))}
        </Card.Body>
        <Card.Footer>
          <Button type="reset" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Create account</Button>
        </Card.Footer>
      </form>
    </Card>
  );
}