import { Button } from '@moduix/solid/button';
import { SwapIndicator, SwapRootProvider, useSwap } from '@moduix/solid/swap';
import CheckIcon from 'lucide-solid/icons/check';
import DownloadIcon from 'lucide-solid/icons/download';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/swap/swap-root-provider.module.css';

export default function SwapRootProviderDemo() {
  const [downloaded, setDownloaded] = createSignal(false);
  const swap = useSwap(() => ({ swap: downloaded() }));

  return (
    <div class={styles.root}>
      <SwapRootProvider
        value={swap}
        asChild={(props) => (
          <Button
            {...props()}
            aria-label={downloaded() ? 'Downloaded' : 'Download'}
            onClick={() => setDownloaded((value) => !value)}
          >
            <SwapIndicator aria-hidden="true" type="off">
              <DownloadIcon />
            </SwapIndicator>
            <SwapIndicator aria-hidden="true" type="on">
              <CheckIcon />
            </SwapIndicator>
          </Button>
        )}
      />
      <output>Visible indicator: {downloaded() ? 'Downloaded' : 'Download'}</output>
    </div>
  );
}