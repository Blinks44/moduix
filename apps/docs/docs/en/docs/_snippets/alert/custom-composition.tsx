import { Alert, Button } from '@moduix/react';
import { Info as InfoIcon } from 'lucide-react';
import { useState } from 'react';
import { PreviewLayout } from '@/components/examples/preview-layout';

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
    <PreviewLayout maxWidth="24rem">
      <Alert status="warning" className="alert-custom">
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
    </PreviewLayout>
  );
}