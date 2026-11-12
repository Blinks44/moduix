import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';
import { SwapIndicator, SwapRootProvider, useSwap } from '@moduix/react/swap';
import { Check as CheckIcon, Download as DownloadIcon } from 'lucide-react';
import { useState } from 'react';

export default function SwapRootProviderDemo() {
  const [downloaded, setDownloaded] = useState(false);
  const swap = useSwap({ swap: downloaded });

  return (
    <Stack align="center" gap="4">
      <SwapRootProvider asChild value={swap}>
        <Button
          aria-label={downloaded ? 'Downloaded' : 'Download'}
          onClick={() => setDownloaded((value) => !value)}
        >
          <SwapIndicator aria-hidden="true" type="off">
            <DownloadIcon />
          </SwapIndicator>
          <SwapIndicator aria-hidden="true" type="on">
            <CheckIcon />
          </SwapIndicator>
        </Button>
      </SwapRootProvider>
      <div data-preview-meta>
        <output>Visible indicator: {downloaded ? 'Downloaded' : 'Download'}</output>
      </div>
    </Stack>
  );
}