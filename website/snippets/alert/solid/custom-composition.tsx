import { Alert } from '@moduix/solid/alert';
import { Button } from '@moduix/solid/button';
import { Info as InfoIcon } from 'lucide-solid';
import { createSignal, Show } from 'solid-js';
import styles from '@/components/examples/alert/alert-custom-composition.module.css';

const alert = {
  title: 'Storage is almost full',
  description:
    'You are using 92% of the available storage. Archive old uploads or upgrade the plan.',
  primaryAction: 'Review uploads',
  secondaryAction: 'Dismiss',
};

export default function AlertActionsDemo() {
  const [visible, setVisible] = createSignal(true);

  return (
    <Show when={visible()}>
      <Alert status="warning" class={styles.custom}>
        <Alert.Indicator>
          <InfoIcon />
        </Alert.Indicator>
        <Alert.Content>
          <Alert.Title>{alert.title}</Alert.Title>
          <Alert.Description>{alert.description}</Alert.Description>
          <Alert.Actions>
            <Button size="sm">{alert.primaryAction}</Button>
            <Button size="sm" variant="outline" onClick={() => setVisible(false)}>
              {alert.secondaryAction}
            </Button>
          </Alert.Actions>
        </Alert.Content>
      </Alert>
    </Show>
  );
}