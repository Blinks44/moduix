import { Button } from '@moduix/solid/button';
import { Tooltip } from '@moduix/solid/tooltip';
import { For, createSignal } from 'solid-js';
import styles from '@/components/examples/tooltip/component-positioning.module.css';

const tooltipPlacements = ['top', 'right', 'bottom', 'left'] as const;

type TooltipPlacement = (typeof tooltipPlacements)[number];

export default function PositioningTooltipDemo() {
  const [placement, setPlacement] = createSignal<TooltipPlacement>('top');

  return (
    <div>
      <Tooltip
        positioning={{
          placement: placement(),
          offset: {
            mainAxis: 12,
          },
        }}
      >
        <Tooltip.Trigger
          asChild={(props) => (
            <Button {...props()} aria-label={`Tooltip placement: ${placement()}`}>
              Hover or focus
            </Button>
          )}
        />
        <Tooltip.Body>Placement: {placement()}</Tooltip.Body>
      </Tooltip>
      <output>Placement: {placement()}</output>
      <div class={styles.meta}>
        <For each={tooltipPlacements}>
          {(item) => (
            <Button
              type="button"
              size="sm"
              variant={item === placement() ? 'default' : 'outline'}
              aria-pressed={item === placement()}
              onClick={() => setPlacement(item)}
            >
              {item}
            </Button>
          )}
        </For>
      </div>
    </div>
  );
}