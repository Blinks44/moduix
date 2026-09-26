import {
  Alert,
  AlertActions,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '@moduix/react/alert';
import { Button } from '@moduix/react/button';
import { Info as InfoIcon } from 'lucide-react';
import { useState } from 'react';
import styles from '@/components/examples/alert/alert-custom-composition.module.css';

const alert = {
  title: 'Storage is almost full',
  description:
    'You are using 92% of the available storage. Archive old uploads or upgrade the plan.',
  primaryAction: 'Review uploads',
  secondaryAction: 'Dismiss',
};

export default function AlertActionsDemo() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Alert status="warning" className={styles.custom}>
      <AlertIndicator>
        <InfoIcon />
      </AlertIndicator>
      <AlertContent>
        <AlertTitle>{alert.title}</AlertTitle>
        <AlertDescription>{alert.description}</AlertDescription>
        <AlertActions>
          <Button size="sm">{alert.primaryAction}</Button>
          <Button size="sm" variant="outline" onClick={() => setVisible(false)}>
            {alert.secondaryAction}
          </Button>
        </AlertActions>
      </AlertContent>
    </Alert>
  );
}