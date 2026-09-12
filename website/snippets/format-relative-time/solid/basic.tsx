import { Format } from '@ark-ui/solid';

const reviewStartsAt = new Date(Date.now() + 12 * 60 * 1000);

export default function FormatRelativeTimeBasicDemo() {
  return (
    <p>
      Next review:{' '}
      <time dateTime={reviewStartsAt.toISOString()}>
        <Format.RelativeTime numeric="auto" value={reviewStartsAt} />
      </time>
    </p>
  );
}