import { Button } from '@moduix/react/button';
import type { SwapAnimation } from '@moduix/react/swap';
import { Swap } from '@moduix/react/swap';
import { Check as CheckIcon, Download as DownloadIcon } from 'lucide-react';
import { useState } from 'react';

const animations = ['fade', 'scale', 'rotate', 'flip'] as const;

export default function SwapAnimationPresetsDemo() {
  const [animation, setAnimation] = useState<SwapAnimation>('scale');
  const [downloaded, setDownloaded] = useState(false);

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--moduix-spacing-4)' }}>
      <Button
        aria-label={downloaded ? 'Downloaded' : 'Download'}
        onClick={() => setDownloaded((value) => !value)}
      >
        <Swap animation={animation} swap={downloaded}>
          <Swap.Indicator aria-hidden="true" type="off">
            <DownloadIcon />
          </Swap.Indicator>
          <Swap.Indicator aria-hidden="true" type="on">
            <CheckIcon />
          </Swap.Indicator>
        </Swap>
      </Button>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--moduix-spacing-2)' }}>
        <output>Animation: {animation}</output>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
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
      </div>
    </div>
  );
}