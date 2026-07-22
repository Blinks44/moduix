import { Alert } from '@moduix/react';
import { Info as InfoIcon } from 'lucide-react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const alert = {
  title: 'Payment failed',
  description: 'Your payment could not be processed. Check the payment method and try again.',
};

export default function AlertErrorDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <Alert status="error" className="alert-demo">
        <Alert.Indicator>
          <InfoIcon />
        </Alert.Indicator>
        <Alert.Title>{alert.title}</Alert.Title>
        <Alert.Description>{alert.description}</Alert.Description>
      </Alert>
    </PreviewLayout>
  );
}