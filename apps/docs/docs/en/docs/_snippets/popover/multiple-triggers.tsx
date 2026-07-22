import { Popover } from '@moduix/react';
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
      <div className="triggerGroup">
        {actions.map((item) => (
          <Popover.Trigger key={item.id} value={item.id}>
            {item.label}
          </Popover.Trigger>
        ))}
      </div>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>{activeItem?.label ?? 'Select an action'}</Popover.Title>
          <Popover.Description>
            {activeItem?.detail ?? 'Choose one of the actions.'}
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}