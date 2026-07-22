import { Alert } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const alert = {
  title: 'Billing issue',
  description: 'Use asChild when the surrounding page needs a different heading level.',
};

export default function AlertHeadingDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <Alert status="info" className="alert-demo">
        <Alert.Title asChild>
          <h2>{alert.title}</h2>
        </Alert.Title>
        <Alert.Description>{alert.description}</Alert.Description>
      </Alert>
    </PreviewLayout>
  );
}