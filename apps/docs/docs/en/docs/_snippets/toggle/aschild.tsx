import { Toggle } from '@moduix/react/toggle';
import { Check as CheckIcon } from 'lucide-react';

export default function AsChildToggleDemo() {
  return (
    <Toggle asChild variant="outline" defaultPressed>
      <button type="button">
        <CheckIcon />
        Save to favorites
      </button>
    </Toggle>
  );
}