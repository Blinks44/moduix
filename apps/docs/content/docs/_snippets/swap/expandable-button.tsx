// #region demo
import { Button, Swap } from '@moduix/react';
import { Download as DownloadIcon } from 'lucide-react';
import { useState } from 'react';

export function SwapExpandableButtonDemo() {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const expanded = hovered || focused;

  return (
    <Button
      aria-label="Download"
      className="compactButton"
      data-expanded={expanded || undefined}
      size="icon-md"
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <span className="compactContent">
        <DownloadIcon aria-hidden="true" />
        <Swap swap={expanded} className="compactLabel">
          <Swap.Indicator aria-hidden="true" type="off" />
          <Swap.Indicator aria-hidden="true" type="on">
            Download
          </Swap.Indicator>
        </Swap>
      </span>
    </Button>
  );
}
// #endregion