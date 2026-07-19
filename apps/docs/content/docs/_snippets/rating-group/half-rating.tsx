/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RatingGroup } from '@moduix/react';

export function HalfRatingGroupDemo() {
  return (
    <RatingGroup allowHalf defaultValue={3.5}>
      <RatingGroup.Label>Average delivery score</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroup.Items />
      </RatingGroup.Control>
    </RatingGroup>
  );
}

//#endregion