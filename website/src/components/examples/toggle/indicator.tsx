import { Toggle, ToggleIndicator } from '@moduix/react/toggle';
import { Check as CheckIcon } from 'lucide-react';
import { Star as StarIcon } from 'lucide-react';

export default function IndicatorToggleDemo() {
  return (
    <Toggle aria-label="Favorite" size="icon-md" variant="outline">
      <ToggleIndicator fallback={<StarIcon />}>
        <CheckIcon />
      </ToggleIndicator>
    </Toggle>
  );
}
