import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '@moduix/solid/alert';
import { Info as InfoIcon } from 'lucide-solid';

const alert = {
  title: 'Workspace sync is active',
  description: 'Changes are being synced across all connected devices.',
};

export default function AlertWithIconDemo() {
  return (
    <Alert status="info">
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