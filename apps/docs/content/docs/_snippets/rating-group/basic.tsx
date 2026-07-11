/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RatingGroup } from '@moduix/react';

export function RatingGroupDemo() {
  return (
    <RatingGroup defaultValue={4}>
      <RatingGroup.Label>Overall satisfaction</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroup.Items />
      </RatingGroup.Control>
    </RatingGroup>
  );
}

//#endregion