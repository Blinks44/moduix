// #region demo
import { Button, Swap } from '@moduix/react';
import { Heart as HeartIcon, HeartOff as HeartOffIcon } from 'lucide-react';
import { useState } from 'react';

export function SwapFlipDemo() {
  const [favorite, setFavorite] = useState(false);

  return (
    <Button
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      onClick={() => setFavorite((value) => !value)}
    >
      <Swap swap={favorite} className="flipSwap">
        <Swap.Indicator aria-hidden="true" type="off">
          <HeartOffIcon />
        </Swap.Indicator>
        <Swap.Indicator aria-hidden="true" type="on">
          <HeartIcon />
        </Swap.Indicator>
      </Swap>
    </Button>
  );
}
// #endregion