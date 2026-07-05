//#region demo
import { Alert } from '@moduix/react';

const alert = {
  title: 'Billing issue',
  description: 'Use asChild when the surrounding page needs a different heading level.',
};

export function AlertHeadingDemo() {
  return (
    <Alert status="info" className="alert-demo">
      <Alert.Content>
        <Alert.Title asChild>
          <h2>{alert.title}</h2>
        </Alert.Title>
        <Alert.Description>{alert.description}</Alert.Description>
      </Alert.Content>
    </Alert>
  );
}
//#endregion