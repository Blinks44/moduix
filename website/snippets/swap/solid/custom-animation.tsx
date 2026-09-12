import { Button } from '@moduix/solid/button';
import { Swap } from '@moduix/solid/swap';
import CheckIcon from 'lucide-solid/icons/check';
import DownloadIcon from 'lucide-solid/icons/download';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/swap/swap-custom-animation.module.css';

export default function SwapCustomAnimationDemo() {
  const [downloaded, setDownloaded] = createSignal(false);

  return (
    <Button
      aria-label={downloaded() ? 'Downloaded' : 'Download'}
      onClick={() => setDownloaded((value) => !value)}
    >
      <Swap animation="bounce" class={styles.root} swap={downloaded()}>
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