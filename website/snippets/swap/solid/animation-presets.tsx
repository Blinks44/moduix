import { Button } from '@moduix/solid/button';
import { Swap, type SwapAnimation } from '@moduix/solid/swap';
import CheckIcon from 'lucide-solid/icons/check';
import DownloadIcon from 'lucide-solid/icons/download';
import { createSignal, For } from 'solid-js';
import styles from '@/components/examples/swap/swap-animation-presets.module.css';

const animations = ['fade', 'scale', 'rotate', 'flip'] as const;

export default function SwapAnimationPresetsDemo() {
  const [animation, setAnimation] = createSignal<SwapAnimation>('scale');
  const [downloaded, setDownloaded] = createSignal(false);

  return (
    <div class={styles.root}>
      <Button
        aria-label={downloaded() ? 'Downloaded' : 'Download'}
        onClick={() => setDownloaded((value) => !value)}
      >
        <Swap animation={animation()} swap={downloaded()}>
          <Swap.Indicator aria-hidden="true" type="off">
            <DownloadIcon />
          </Swap.Indicator>
          <Swap.Indicator aria-hidden="true" type="on">
            <CheckIcon />
          </Swap.Indicator>
        </Swap>
      </Button>
      <div class={styles.controls}>
        <output>Animation: {animation()}</output>
        <div class={styles.buttons}>
          <For each={animations}>
            {(name) => (
              <Button
                aria-pressed={animation() === name}
                size="sm"
                variant={animation() === name ? 'default' : 'outline'}
                onClick={() => setAnimation(name)}
              >
                {name}
              </Button>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}