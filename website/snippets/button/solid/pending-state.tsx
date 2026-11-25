import { Button } from '@moduix/solid/button';
import { createSignal } from 'solid-js';

const delay = 1800;

export default function PendingButton() {
  const [pending, setPending] = createSignal(false);

  return (
    <Button
      loading={pending()}
      loadingText="Saving"
      onClick={() => {
        setPending(true);
        setTimeout(() => setPending(false), delay);
      }}
    >
      Save Changes
    </Button>
  );
}