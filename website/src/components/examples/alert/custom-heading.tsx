import { Alert, AlertContent, AlertDescription, AlertTitle } from '@moduix/react/alert';

const alert = {
  title: 'Billing issue',
  description: 'Use asChild when the surrounding page needs a different heading level.',
};

export default function AlertHeadingDemo() {
  return (
    <Alert status="info">
      <AlertContent>
        <AlertTitle asChild>
          <h2>{alert.title}</h2>
        </AlertTitle>
        <AlertDescription>{alert.description}</AlertDescription>
      </AlertContent>
    </Alert>
  );
}