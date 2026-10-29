import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/solid/popover';
import { Stack } from '@moduix/solid/stack';
import { For, createSignal } from 'solid-js';

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
      <Stack direction="row" justify="center" wrap="wrap" gap="2">
        <For each={actions}>
          {(item) => <PopoverTrigger value={item.id}>{item.label}</PopoverTrigger>}
        </For>
      </Stack>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverTitle>{activeItem()?.label ?? 'Select an action'}</PopoverTitle>
          <PopoverDescription>
            {activeItem()?.detail ?? 'Choose one of the actions.'}
          </PopoverDescription>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}