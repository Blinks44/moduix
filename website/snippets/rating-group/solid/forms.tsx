import { Button } from '@moduix/solid/button';
import { RatingGroup } from '@moduix/solid/rating-group';
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
        <RatingGroup.Label>Review score</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
        <RatingGroup.HiddenInput />
      </RatingGroup>
      <output>Submitted: {submitted()}</output>
      <Button type="submit">Submit</Button>
    </form>
  );
}