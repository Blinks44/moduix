import { Alert, AlertContent, AlertDescription, AlertTitle } from '@moduix/react/alert';

const alert = {
  title: 'Update available',
  description: 'Install the latest version when your workflow allows it.',
};

export default function AlertDemo() {
  return (
    <Alert>
      <AlertContent>
        <AlertTitle>{alert.title}</AlertTitle>
        <AlertDescription>{alert.description}</AlertDescription>
      </AlertContent>
    </Alert>
  );
}