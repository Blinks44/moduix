import { Alert } from '@moduix/react';
import { Info as InfoIcon } from 'lucide-react';

const alert = {
  title: 'Payment failed',
  description: 'Your payment could not be processed. Check the payment method and try again.',
};

export default function AlertErrorDemo() {
  return (
    <Alert status="error" className="alert-demo">
      <Alert.Indicator>
        <InfoIcon />
      </Alert.Indicator>
      <Alert.Title>{alert.title}</Alert.Title>
      <Alert.Description>{alert.description}</Alert.Description>
    </Alert>
  );
}