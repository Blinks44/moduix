import { Toggle, ToggleIndicator } from '@moduix/solid/toggle';
import { Check as CheckIcon, Star as StarIcon } from 'lucide-solid';

export default function IndicatorToggleDemo() {
  return (
    <Toggle aria-label="Favorite" size="icon-md" variant="outline">
      <ToggleIndicator fallback={<StarIcon />}>
        <CheckIcon />
      </ToggleIndicator>
    </Toggle>
  );
}