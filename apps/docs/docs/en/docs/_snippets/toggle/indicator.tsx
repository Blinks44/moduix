import { Toggle } from '@moduix/react';
import { Check as CheckIcon } from 'lucide-react';
import { Star as StarIcon } from 'lucide-react';

export default function IndicatorToggleDemo() {
  return (
    <Toggle aria-label="Favorite" size="icon-md" variant="outline">
      <Toggle.Indicator fallback={<StarIcon />}>
        <CheckIcon />
      </Toggle.Indicator>
    </Toggle>
  );
}