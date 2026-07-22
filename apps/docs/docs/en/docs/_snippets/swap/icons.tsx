import { Button, Swap } from '@moduix/react';
import { Check as CheckIcon, Download as DownloadIcon } from 'lucide-react';
import { useState } from 'react';

export default function SwapIconsDemo() {
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