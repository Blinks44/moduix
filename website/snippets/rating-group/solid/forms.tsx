import { Button } from '@moduix/solid/button';
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/solid/rating-group';
import { createSignal } from 'solid-js';

export default function FormRatingGroupDemo() {
  const [submitted, setSubmitted] = createSignal('Nothing submitted');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    setSubmitted(String(new FormData(form).get('review') ?? ''));
  };

  return (
    <form onSubmit={handleSubmit}>
      <RatingGroup name="review" defaultValue={4} required>
        <RatingGroupLabel>Review score</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
        <RatingGroupHiddenInput />
      </RatingGroup>
      <output>Submitted: {submitted()}</output>
      <Button type="submit">Submit</Button>
    </form>
  );
}