import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '@moduix/solid/alert';
import { Info as InfoIcon } from 'lucide-solid';

const alert = {
  title: 'Payment failed',
  description: 'Your payment could not be processed. Check the payment method and try again.',
};

export default function AlertErrorDemo() {
  return (
    <Alert status="error">
      <AlertIndicator>
        <InfoIcon />
      </AlertIndicator>
      <AlertContent>
        <AlertTitle>{alert.title}</AlertTitle>
        <AlertDescription>{alert.description}</AlertDescription>
      </AlertContent>
    </Alert>
  );
}