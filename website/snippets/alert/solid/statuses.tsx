import { Alert } from '@moduix/solid/alert';
import { Check as CheckIcon, Info as InfoIcon } from 'lucide-solid';
import { For } from 'solid-js';
import styles from '@/components/examples/alert/alert-statuses.module.css';

const statuses = ['info', 'success', 'warning', 'error'] as const;

export default function AlertStatusesDemo() {
  return (
    <div class={styles.stack}>
      <For each={statuses}>
        {(status) => (
          <Alert status={status}>
            <Alert.Indicator>{status === 'success' ? <CheckIcon /> : <InfoIcon />}</Alert.Indicator>
            <Alert.Title>{status}</Alert.Title>
            <Alert.Description>Use this alert for {status} feedback.</Alert.Description>
          </Alert>
        )}
      </For>
    </div>
  );
}