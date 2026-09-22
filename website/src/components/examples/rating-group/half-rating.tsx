import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/react/rating-group';

export default function HalfRatingGroupDemo() {
  return (
    <RatingGroup allowHalf defaultValue={3.5}>
      <RatingGroupLabel>Average delivery score</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
    </RatingGroup>
  );
}