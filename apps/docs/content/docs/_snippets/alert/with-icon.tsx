//#region demo
import { Alert } from '@moduix/react';
import { Info as InfoIcon } from 'lucide-react';

const alert = {
  title: 'Workspace sync is active',
  description: 'Changes are being synced across all connected devices.',
};

export function AlertWithIconDemo() {
  return (
    <Alert status="info" className="alert-demo">
      <Alert.Indicator>
        <InfoIcon />
      </Alert.Indicator>
      <Alert.Title>{alert.title}</Alert.Title>
      <Alert.Description>{alert.description}</Alert.Description>
    </Alert>
  );
}
//#endregion