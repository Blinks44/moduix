/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RatingGroup } from '@moduix/react';
import { Heart as HeartIcon } from 'lucide-react';

export function CustomIconRatingGroupDemo() {
  return (
    <RatingGroup defaultValue={3}>
      <RatingGroup.Label>Checklist score</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroup.Items>
          <RatingGroup.ItemIndicator className="rating-group-custom-icon">
            <HeartIcon />
          </RatingGroup.ItemIndicator>
        </RatingGroup.Items>
      </RatingGroup.Control>
    </RatingGroup>
  );
}

//#endregion