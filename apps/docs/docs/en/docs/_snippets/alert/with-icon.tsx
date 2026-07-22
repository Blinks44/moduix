import { Alert } from '@moduix/react';
import { Info as InfoIcon } from 'lucide-react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const alert = {
  title: 'Workspace sync is active',
  description: 'Changes are being synced across all connected devices.',
};

export default function AlertWithIconDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <Alert status="info" className="alert-demo">
        <Alert.Indicator>
          <InfoIcon />
        </Alert.Indicator>
        <Alert.Title>{alert.title}</Alert.Title>
        <Alert.Description>{alert.description}</Alert.Description>
      </Alert>
    </PreviewLayout>
  );
}