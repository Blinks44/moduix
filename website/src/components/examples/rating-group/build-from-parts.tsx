import {
  RatingGroup,
  RatingGroupContext,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItem,
  RatingGroupItemIndicator,
  RatingGroupLabel,
} from '@moduix/react/rating-group';

export default function BuildFromPartsRatingGroupDemo() {
  return (
    <RatingGroup defaultValue={4}>
      <RatingGroupLabel>Overall satisfaction</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupContext>
          {({ items }) =>
            items.map((item) => (
              <RatingGroupItem key={item} index={item}>
                <RatingGroupItemIndicator />
              </RatingGroupItem>
            ))
          }
        </RatingGroupContext>
      </RatingGroupControl>
      <RatingGroupHiddenInput />
    </RatingGroup>
  );
}