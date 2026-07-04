//#region demo
import { Button, Spinner } from '@moduix/react';

const labels = { pending: 'Publishing' };

export function CustomStylingButtonDemo() {
  return (
    <Button className="customButton" disabled aria-busy>
      <Spinner decorative size="sm" className="customSpinner" />
      {labels.pending}
    </Button>
  );
}
//#endregion