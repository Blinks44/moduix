//#region demo
import { Button, Spinner } from '@moduix/react';
import { useState } from 'react';

const delay = 1800;
const labels = {
  idle: 'Save Changes',
  pending: 'Saving',
};

export function PendingButton() {
  const [pending, setPending] = useState(false);

  return (
    <Button
      loading={pending}
      onClick={() => {
        setPending(true);
        setTimeout(() => setPending(false), delay);
      }}
    >
      {pending ? (
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
//#endregion