import { Button, Card, Input } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

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
    <PreviewLayout maxWidth="24rem">
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
    </PreviewLayout>
  );
}