import { Button } from '@moduix/react/button';
import { Swap } from '@moduix/react/swap';
import { Check as CheckIcon, Download as DownloadIcon } from 'lucide-react';
import { useState } from 'react';

export default function SwapBasicDemo() {
  const [downloaded, setDownloaded] = useState(false);

  return (
    <Button
      aria-label={downloaded ? 'Downloaded' : 'Download'}
      onClick={() => setDownloaded((value) => !value)}
    >
      <Swap swap={downloaded}>
        <Swap.Indicator aria-hidden="true" type="off">
          <DownloadIcon />
        </Swap.Indicator>
        <Swap.Indicator aria-hidden="true" type="on">
          <CheckIcon />
        </Swap.Indicator>
      </Swap>
    </Button>
  );
}