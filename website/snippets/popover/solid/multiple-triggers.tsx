import { Popover } from '@moduix/solid/popover';
import { For, createSignal } from 'solid-js';
import styles from '@/components/examples/popover/popover-multiple-triggers.module.css';

const actions = [
  { id: 'share', label: 'Share', detail: 'Share this item by link or email.' },
  { id: 'export', label: 'Export', detail: 'Export this item as PDF, CSV, or JSON.' },
  { id: 'archive', label: 'Archive', detail: 'Move this item to the archive.' },
];

export default function MultipleTriggersDemo() {
  const [activeItem, setActiveItem] = createSignal<(typeof actions)[number] | null>(null);

  return (
    <Popover
      onTriggerValueChange={(details) => {
        setActiveItem(actions.find((item) => item.id === details.value) ?? null);
      }}
    >
      <div class={styles.root}>
        <For each={actions}>
          {(item) => <Popover.Trigger value={item.id}>{item.label}</Popover.Trigger>}
        </For>
      </div>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>{activeItem()?.label ?? 'Select an action'}</Popover.Title>
          <Popover.Description>
            {activeItem()?.detail ?? 'Choose one of the actions.'}
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}