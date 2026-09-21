import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '@moduix/react/alert';
import { Check as CheckIcon, Info as InfoIcon } from 'lucide-react';
import styles from '@/components/examples/alert/alert-statuses.module.css';

const statuses = ['info', 'success', 'warning', 'error'] as const;

export default function AlertStatusesDemo() {
  return (
    <div className={styles.stack}>
      {statuses.map((status) => (
        <Alert key={status} status={status}>
          <AlertIndicator>{status === 'success' ? <CheckIcon /> : <InfoIcon />}</AlertIndicator>
          <AlertContent>
            <AlertTitle>{status}</AlertTitle>
            <AlertDescription>Use this alert for {status} feedback.</AlertDescription>
          </AlertContent>
        </Alert>
      ))}
    </div>
  );
}