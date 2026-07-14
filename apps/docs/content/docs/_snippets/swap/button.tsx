// #region demo
import { Button, Swap } from '@moduix/react';
import { Pause as PauseIcon, Play as PlayIcon } from 'lucide-react';
import { useState } from 'react';

export function SwapButtonDemo() {
  const [playing, setPlaying] = useState(false);

  return (
    <Button
      aria-label={playing ? 'Pause playback' : 'Play playback'}
      className="feedbackButton"
      data-playing={playing || undefined}
      onClick={() => setPlaying((value) => !value)}
    >
      <Swap swap={playing} className="feedbackSwap">
        <Swap.Indicator aria-hidden="true" type="off" className="compactIndicator">
          <PlayIcon />
          Play
        </Swap.Indicator>
        <Swap.Indicator aria-hidden="true" type="on" className="compactIndicator">
          <PauseIcon />
          Pause
        </Swap.Indicator>
      </Swap>
    </Button>
  );
}
// #endregion