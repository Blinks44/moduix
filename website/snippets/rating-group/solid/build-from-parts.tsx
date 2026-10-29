import {
  RatingGroup,
  RatingGroupContext,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItem,
  RatingGroupItemIndicator,
  RatingGroupLabel,
} from '@moduix/solid/rating-group';
import { For } from 'solid-js';

export default function BuildFromPartsRatingGroupDemo() {
  return (
    <RatingGroup defaultValue={4}>
      <RatingGroupLabel>Overall satisfaction</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupContext>
          {(ratingGroup) => (
            <For each={ratingGroup().items}>
              {(item) => (
                <RatingGroupItem index={item}>
                  <RatingGroupItemIndicator />
                </RatingGroupItem>
              )}
            </For>
          )}
        </RatingGroupContext>
      </RatingGroupControl>
      <RatingGroupHiddenInput />
    </RatingGroup>
  );
}