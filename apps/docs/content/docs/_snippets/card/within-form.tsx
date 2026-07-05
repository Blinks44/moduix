//#region demo
import { Button, Card, Input } from '@moduix/react';

const copy = {
  title: 'Create account',
  description: 'Enter the contact details for the new member.',
};
const fields = [
  { label: 'First name', name: 'firstName' },
  { label: 'Last name', name: 'lastName' },
];

export function CardFormDemo() {
  return (
    <Card asChild>
      <form>
        <Card.Header>
          <Card.Title>{copy.title}</Card.Title>
          <Card.Description>{copy.description}</Card.Description>
        </Card.Header>
        <Card.Body>
          {fields.map((field) => (
            <label key={field.name}>
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
//#endregion