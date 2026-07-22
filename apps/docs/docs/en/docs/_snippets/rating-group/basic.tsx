import { RatingGroup } from '@moduix/react';

export default function RatingGroupDemo() {
  return (
    <RatingGroup defaultValue={4}>
      <RatingGroup.Label>Overall satisfaction</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroup.Items />
      </RatingGroup.Control>
    </RatingGroup>
  );
}