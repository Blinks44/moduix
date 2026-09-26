import { Button } from '@moduix/react/button';
import type { SwapAnimation } from '@moduix/react/swap';
import { Swap, SwapIndicator } from '@moduix/react/swap';
import { Check as CheckIcon, Download as DownloadIcon } from 'lucide-react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/swap/swap-animation-presets.module.css';

const animations = ['fade', 'scale', 'rotate', 'flip'] as const;

export default function SwapAnimationPresetsDemo() {
  const [animation, setAnimation] = useState<SwapAnimation>('scale');
  const [downloaded, setDownloaded] = useState(false);

  return (
    <div className={styles.root}>
      <Button
        aria-label={downloaded ? 'Downloaded' : 'Download'}
        onClick={() => setDownloaded((value) => !value)}
      >
        <Swap animation={animation} swap={downloaded}>
          <SwapIndicator aria-hidden="true" type="off">
            <DownloadIcon />
          </SwapIndicator>
          <SwapIndicator aria-hidden="true" type="on">
            <CheckIcon />
          </SwapIndicator>
        </Swap>
      </Button>
      <PreviewMeta className={styles.controls}>
        <output>Animation: {animation}</output>
        <div className={styles.buttons}>
          {animations.map((name) => (
            <Button
              key={name}
              aria-pressed={animation === name}
              size="sm"
              variant={animation === name ? 'default' : 'outline'}
              onClick={() => setAnimation(name)}
            >
              {name}
            </Button>
          ))}
        </div>
      </PreviewMeta>
    </div>
  );
}