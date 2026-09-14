import { Alert } from '@moduix/solid/alert';
import { Info as InfoIcon } from 'lucide-solid';

const alert = {
  title: 'Workspace sync is active',
  description: 'Changes are being synced across all connected devices.',
};

export default function AlertWithIconDemo() {
  return (
    <Alert status="info">
      <Alert.Indicator>
        <InfoIcon />
      </Alert.Indicator>
      <Alert.Content>
        <Alert.Title>{alert.title}</Alert.Title>
        <Alert.Description>{alert.description}</Alert.Description>
      </Alert.Content>
    </Alert>
  );
}