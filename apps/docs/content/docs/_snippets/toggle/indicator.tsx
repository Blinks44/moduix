/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { CheckIcon, Toggle } from '@moduix/react';
import { Star as StarIcon } from 'lucide-react';

export function IndicatorToggleDemo() {
  return (
    <Toggle aria-label="Favorite" size="icon-md" variant="outline">
      <Toggle.Indicator fallback={<StarIcon />}>
        <CheckIcon />
      </Toggle.Indicator>
    </Toggle>
  );
}

//#endregion