import { Button } from '@moduix/solid/button';
import { Tooltip } from '@moduix/solid/tooltip';
import { Info as InfoIcon, Plus as PlusIcon, Share as ShareIcon } from 'lucide-solid';
import { For, Show, createSignal } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import styles from '@/components/examples/tooltip/component-multiple-triggers.module.css';

const tooltipTools = [
  {
    id: 'create',
    label: 'Create',
    shortcut: 'Ctrl+N',
    icon: PlusIcon,
  },
  {
    id: 'share',
    label: 'Share',
    shortcut: 'Ctrl+S',
    icon: ShareIcon,
  },
  {
    id: 'details',
    label: 'Details',
    shortcut: 'Ctrl+I',
    icon: InfoIcon,
  },
] as const;

export default function MultipleTriggersTooltipDemo() {
  const [activeTool, setActiveTool] = createSignal<(typeof tooltipTools)[number] | null>(null);

  return (
    <Tooltip
      onTriggerValueChange={(details) => {
        setActiveTool(tooltipTools.find((tool) => tool.id === details.value) ?? null);
      }}
    >
      <div class={styles.tools}>
        <For each={tooltipTools}>
          {(tool) => (
            <Tooltip.Trigger
              value={tool.id}
              asChild={(props) => (
                <Button {...props()} variant="ghost" size="icon-md" aria-label={tool.label}>
                  <Dynamic component={tool.icon} aria-hidden />
                </Button>
              )}
            />
          )}
        </For>
      </div>
      <Tooltip.Body>
        <Show when={activeTool()}>
          {(tool) => (
            <>
              {tool().label} ({tool().shortcut})
            </>
          )}
        </Show>
      </Tooltip.Body>
    </Tooltip>
  );
}