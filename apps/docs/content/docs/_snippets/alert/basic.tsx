//#region demo
import { Alert } from '@moduix/react';

const alert = {
  title: 'Update available',
  description: 'Install the latest version when your workflow allows it.',
};

export function AlertDemo() {
  return (
    <Alert className="alert-demo">
      <Alert.Content>
        <Alert.Title>{alert.title}</Alert.Title>
        <Alert.Description>{alert.description}</Alert.Description>
      </Alert.Content>
    </Alert>
  );
}
//#endregion