import { Button } from '@moduix/react/button';
import { Tooltip } from '@moduix/react/tooltip';
import { Info as InfoIcon, Plus as PlusIcon, Share as ShareIcon } from 'lucide-react';
import { useState } from 'react';

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
];

export default function MultipleTriggersTooltipDemo() {
  const [activeTool, setActiveTool] = useState<(typeof tooltipTools)[number] | null>(null);
  return (
    <Tooltip
      onTriggerValueChange={(details) => {
        setActiveTool(tooltipTools.find((tool) => tool.id === details.value) ?? null);
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          flexWrap: 'wrap',
          gap: 'var(--moduix-spacing-1)',
        }}
      >
        {tooltipTools.map((tool) => (
          <Tooltip.Trigger key={tool.id} value={tool.id} asChild aria-label={tool.label}>
            <Button variant="ghost" size="icon-md">
              <tool.icon aria-hidden />
            </Button>
          </Tooltip.Trigger>
        ))}
      </div>
      <Tooltip.Body>
        {activeTool ? (
          <>
            {activeTool.label} ({activeTool.shortcut})
          </>
        ) : null}
      </Tooltip.Body>
    </Tooltip>
  );
}