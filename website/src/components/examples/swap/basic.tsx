import { Button } from '@moduix/react/button';
import { Swap, SwapIndicator } from '@moduix/react/swap';
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
        <SwapIndicator aria-hidden="true" type="off">
          <DownloadIcon />
        </SwapIndicator>
        <SwapIndicator aria-hidden="true" type="on">
          <CheckIcon />
        </SwapIndicator>
      </Swap>
    </Button>
  );
}