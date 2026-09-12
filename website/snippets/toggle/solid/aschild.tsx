import { Toggle } from '@moduix/solid/toggle';
import { Check as CheckIcon } from 'lucide-solid';

export default function AsChildToggleDemo() {
  return (
    <Toggle
      asChild={(props) => (
        <button {...props()} type="button">
          <CheckIcon />
          Save to favorites
        </button>
      )}
      variant="outline"
      defaultPressed
    />
  );
}