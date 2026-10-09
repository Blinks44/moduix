import { Button } from '@moduix/react/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/react/card';
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
        <CardHeader>
          <CardTitle>{copy.title}</CardTitle>
          <CardDescription>{copy.description}</CardDescription>
        </CardHeader>
        <CardBody className={styles.body}>
          {fields.map((field) => (
            <label className={styles.field} key={field.name}>
              {field.label}
              <Input name={field.name} />
            </label>
          ))}
        </CardBody>
        <CardFooter>
          <Button type="reset" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Create account</Button>
        </CardFooter>
      </form>
    </Card>
  );
}