import { Button } from '@moduix/react/button';
import { Swap } from '@moduix/react/swap';
import { Check as CheckIcon, Download as DownloadIcon } from 'lucide-react';
import { useState } from 'react';
import styles from '@/components/examples/swap/swap-root-provider.module.css';

export default function SwapRootProviderDemo() {
  const [downloaded, setDownloaded] = useState(false);
  const swap = Swap.useSwap({ swap: downloaded });

  return (
    <div className={styles.root}>
      <Swap.RootProvider asChild value={swap}>
        <Button
          aria-label={downloaded ? 'Downloaded' : 'Download'}
          onClick={() => setDownloaded((value) => !value)}
        >
          <Swap.Indicator aria-hidden="true" type="off">
            <DownloadIcon />
          </Swap.Indicator>
          <Swap.Indicator aria-hidden="true" type="on">
            <CheckIcon />
          </Swap.Indicator>
        </Button>
      </Swap.RootProvider>
      <output>Visible indicator: {downloaded ? 'Downloaded' : 'Download'}</output>
    </div>
  );
}