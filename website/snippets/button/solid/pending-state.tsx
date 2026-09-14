import { Button } from '@moduix/solid/button';
import { Spinner } from '@moduix/solid/spinner';
import { createSignal } from 'solid-js';

const delay = 1800;
const labels = {
  idle: 'Save Changes',
  pending: 'Saving',
};

export default function PendingButton() {
  const [pending, setPending] = createSignal(false);

  return (
    <Button
      loading={pending()}
      onClick={() => {
        setPending(true);
        setTimeout(() => setPending(false), delay);
      }}
    >
      {pending() ? (
        <>
          <Spinner decorative size="sm" />
          {labels.pending}
        </>
      ) : (
        labels.idle
      )}
    </Button>
  );
}