import { Spinner } from '@moduix/react';

export default function SpinnerAsChildDemo() {
  return (
    <Spinner asChild size="lg" aria-label="Loading report">
      <span style={{ color: 'var(--moduix-color-primary)' }}>
        <span
          aria-hidden="true"
          data-scope="spinner"
          data-part="indicator"
          data-slot="spinner-indicator"
        >
          <span data-scope="spinner" data-part="ring" data-slot="spinner-ring" />
        </span>
      </span>
    </Spinner>
  );
}