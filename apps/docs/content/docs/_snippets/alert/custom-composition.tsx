//#region demo
import { Alert, Button } from '@moduix/react';
import { useState } from 'react';

const alert = {
  title: 'Storage is almost full',
  description:
    'You are using 92% of the available storage. Archive old uploads or upgrade the plan.',
  primaryAction: 'Review uploads',
  secondaryAction: 'Dismiss',
};

export function AlertActionsDemo() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Alert status="warning" className="alert-custom">
      <Alert.Indicator>
        <InfoIcon />
      </Alert.Indicator>
      <Alert.Content>
        <Alert.Title>{alert.title}</Alert.Title>
        <Alert.Description>{alert.description}</Alert.Description>
        <div className="alert-actions">
          <Button size="sm">{alert.primaryAction}</Button>
          <Button size="sm" variant="outline" onClick={() => setVisible(false)}>
            {alert.secondaryAction}
          </Button>
        </div>
      </Alert.Content>
    </Alert>
  );
}
//#endregion