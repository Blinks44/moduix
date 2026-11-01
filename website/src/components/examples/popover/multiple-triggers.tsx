import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/react/popover';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';

const actions = [
  {
    id: 'share',
    label: 'Share',
    detail: 'Share this item by link or email.',
  },
  {
    id: 'export',
    label: 'Export',
    detail: 'Export this item as PDF, CSV, or JSON.',
  },
  {
    id: 'archive',
    label: 'Archive',
    detail: 'Move this item to the archive.',
  },
];

export default function MultipleTriggersDemo() {
  const [activeItem, setActiveItem] = useState(null as (typeof actions)[number] | null);
  return (
    <Popover
      onTriggerValueChange={(details) => {
        setActiveItem(actions.find((item) => item.id === details.value) ?? null);
      }}
    >
      <Stack direction="row" justify="center" wrap="wrap" gap="2">
        {actions.map((item) => (
          <PopoverTrigger key={item.id} value={item.id}>
            {item.label}
          </PopoverTrigger>
        ))}
      </Stack>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverTitle>{activeItem?.label ?? 'Select an action'}</PopoverTitle>
          <PopoverDescription>
            {activeItem?.detail ?? 'Choose one of the actions.'}
          </PopoverDescription>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}