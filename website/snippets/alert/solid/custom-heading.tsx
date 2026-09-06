import { Alert } from '@moduix/solid/alert';

const alert = {
  title: 'Billing issue',
  description: 'Use asChild when the surrounding page needs a different heading level.',
};

export default function AlertHeadingDemo() {
  return (
    <Alert status="info">
      <Alert.Content>
        <Alert.Title asChild={(titleProps) => <h2 {...titleProps()}>{alert.title}</h2>} />
        <Alert.Description>{alert.description}</Alert.Description>
      </Alert.Content>
    </Alert>
  );
}