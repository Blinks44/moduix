import { Alert } from '@moduix/react/alert';
import { Check as CheckIcon, Info as InfoIcon } from 'lucide-react';
import styles from '@/components/examples/alert-statuses.module.css';

const statuses = ['info', 'success', 'warning', 'error'] as const;

export default function AlertStatusesDemo() {
  return (
    <div className={styles.stack}>
      {statuses.map((status) => (
        <Alert key={status} status={status}>
          <Alert.Indicator>{status === 'success' ? <CheckIcon /> : <InfoIcon />}</Alert.Indicator>
          <Alert.Title>{status}</Alert.Title>
          <Alert.Description>Use this alert for {status} feedback.</Alert.Description>
        </Alert>
      ))}
    </div>
  );
}