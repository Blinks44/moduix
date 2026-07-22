import { Alert } from '@moduix/react';
import { Check as CheckIcon, Info as InfoIcon } from 'lucide-react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const statuses = ['neutral', 'info', 'success', 'warning', 'error'] as const;

export default function AlertStatusesDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <div className="alert-stack">
        {statuses.map((status) => (
          <Alert key={status} status={status}>
            <Alert.Indicator>{status === 'success' ? <CheckIcon /> : <InfoIcon />}</Alert.Indicator>
            <Alert.Title>{status}</Alert.Title>
            <Alert.Description>Use this alert for {status} feedback.</Alert.Description>
          </Alert>
        ))}
      </div>
    </PreviewLayout>
  );
}