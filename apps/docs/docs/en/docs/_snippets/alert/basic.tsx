import { Alert } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const alert = {
  title: 'Update available',
  description: 'Install the latest version when your workflow allows it.',
};

export default function AlertDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <Alert className="alert-demo">
        <Alert.Title>{alert.title}</Alert.Title>
        <Alert.Description>{alert.description}</Alert.Description>
      </Alert>
    </PreviewLayout>
  );
}