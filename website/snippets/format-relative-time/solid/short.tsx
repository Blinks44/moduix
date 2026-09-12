import { Format } from '@ark-ui/solid';

const lastSavedAt = new Date(Date.now() - 43 * 60 * 1000);

export default function FormatRelativeTimeShortDemo() {
  return (
    <p>
      Last saved:{' '}
      <time dateTime={lastSavedAt.toISOString()}>
        <Format.RelativeTime style="short" value={lastSavedAt} />
      </time>
    </p>
  );
}