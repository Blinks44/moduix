import { Alert, AlertContent, AlertDescription, AlertTitle } from '@moduix/solid/alert';

const alert = {
  title: 'Billing issue',
  description: 'Use asChild when the surrounding page needs a different heading level.',
};

export default function AlertHeadingDemo() {
  return (
    <Alert status="info">
      <AlertContent>
        <AlertTitle asChild={(titleProps) => <h2 {...titleProps()}>{alert.title}</h2>} />
        <AlertDescription>{alert.description}</AlertDescription>
      </AlertContent>
    </Alert>
  );
}