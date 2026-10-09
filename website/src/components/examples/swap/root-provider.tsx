import { Button } from '@moduix/react/button';
import { SwapIndicator, SwapRootProvider, useSwap } from '@moduix/react/swap';
import { Check as CheckIcon, Download as DownloadIcon } from 'lucide-react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/swap/swap-root-provider.module.css';

export default function SwapRootProviderDemo() {
  const [downloaded, setDownloaded] = useState(false);
  const swap = useSwap({ swap: downloaded });

  return (
    <div className={styles.root}>
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
      <PreviewMeta>
        <output>Visible indicator: {downloaded ? 'Downloaded' : 'Download'}</output>
      </PreviewMeta>
    </div>
  );
}