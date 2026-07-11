/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RatingGroup } from '@moduix/react';

export function RatingGroupSizesDemo() {
  return (
    <div className="rating-group-stack">
      <RatingGroup size="xs" defaultValue={3} aria-label="Extra-small rating">
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
      </RatingGroup>
      <RatingGroup size="sm" defaultValue={3} aria-label="Small rating">
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
      </RatingGroup>
      <RatingGroup size="md" defaultValue={3} aria-label="Medium rating">
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
      </RatingGroup>
      <RatingGroup size="lg" defaultValue={3} aria-label="Large rating">
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
      </RatingGroup>
      <RatingGroup size="xl" defaultValue={3} aria-label="Extra-large rating">
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
      </RatingGroup>
    </div>
  );
}

//#endregion