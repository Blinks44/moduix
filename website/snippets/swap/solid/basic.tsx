import { Button } from '@moduix/solid/button';
import { Swap, SwapIndicator } from '@moduix/solid/swap';
import CheckIcon from 'lucide-solid/icons/check';
import DownloadIcon from 'lucide-solid/icons/download';
import { createSignal } from 'solid-js';

export default function SwapBasicDemo() {
  const [downloaded, setDownloaded] = createSignal(false);

  return (
    <Button
      aria-label={downloaded() ? 'Downloaded' : 'Download'}
      onClick={() => setDownloaded((value) => !value)}
    >
      <Swap swap={downloaded()}>
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