/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Toggle } from '@moduix/react';
import { Star as StarIcon } from 'lucide-react';

const defaultPressed = true;

export function ToggleDemo() {
  return (
    <Toggle defaultPressed>
      <StarIcon />
      Favorite
    </Toggle>
  );
}

//#endregion