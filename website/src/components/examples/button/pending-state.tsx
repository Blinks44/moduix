import { Button } from '@moduix/react/button';
import { useState } from 'react';

const delay = 1800;

export default function PendingButton() {
  const [pending, setPending] = useState(false);

  return (
    <Button
      loading={pending}
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