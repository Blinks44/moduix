import { Button, Swap } from '@moduix/react';
import { Check as CheckIcon, RefreshCw as RefreshCwIcon } from 'lucide-react';
import { useState } from 'react';

export default function SwapRotateDemo() {
  const [synced, setSynced] = useState(false);

  return (
    <Button aria-label={synced ? 'Synced' : 'Sync'} onClick={() => setSynced((value) => !value)}>
      <Swap swap={synced} className="rotateSwap">
        <Swap.Indicator aria-hidden="true" type="off">
          <RefreshCwIcon />
        </Swap.Indicator>
        <Swap.Indicator aria-hidden="true" type="on">
          <CheckIcon />
        </Swap.Indicator>
      </Swap>
    </Button>
  );
}