import { RatingGroup } from '@moduix/solid/rating-group';

export default function HalfRatingGroupDemo() {
  return (
    <RatingGroup allowHalf defaultValue={3.5}>
      <RatingGroup.Label>Average delivery score</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroup.Items />
      </RatingGroup.Control>
    </RatingGroup>
  );
}