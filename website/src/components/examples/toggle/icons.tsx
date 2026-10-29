import { Stack } from '@moduix/react/stack';
import { Toggle } from '@moduix/react/toggle';
import { Bell as BellIcon, Check as CheckIcon, Star as StarIcon } from 'lucide-react';

export default function ToggleIconsDemo() {
  return (
    <Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
      <Toggle variant="outline">
        <BellIcon />
        Alerts
      </Toggle>
      <Toggle size="icon-md" variant="outline" aria-label="Favorites">
        <StarIcon />
      </Toggle>
      <Toggle size="icon-md" variant="ghost" aria-label="Enabled" defaultPressed>
        <CheckIcon />
      </Toggle>
    </Stack>
  );
}