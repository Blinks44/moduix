import {
  BellIcon,
  Button,
  InfoIcon,
  PlusIcon,
  ShareIcon,
  Tooltip,
  useTooltip,
} from '@moduix/react';
import { useState } from 'react';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './tooltip.module.css';

export const tooltipPlacements = ['top', 'right', 'bottom', 'left'] as const;
export type TooltipPlacement = (typeof tooltipPlacements)[number];

export const tooltipTools = [
  { id: 'create', label: 'Create', shortcut: 'Ctrl+N', icon: PlusIcon },
  { id: 'share', label: 'Share', shortcut: 'Ctrl+S', icon: ShareIcon },
  { id: 'details', label: 'Details', shortcut: 'Ctrl+I', icon: InfoIcon },
];

export const tooltipCssProperties: CssPropertyInput[] = [
  [
    '--tooltip-arrow-background',
    'var(--tooltip-bg, var(--color-popover))',
    'Controls the Ark arrow background.',
  ],
  ['--tooltip-arrow-size', '0.625rem', 'Controls the Ark arrow square size.'],
  [
    '--tooltip-arrow-stroke-color',
    'var(--tooltip-border-color, var(--color-border))',
    'Controls arrow border color.',
  ],
  ['--tooltip-bg', 'var(--color-popover)', 'Controls the content background color.'],
  ['--tooltip-border-color', 'var(--color-border)', 'Controls the content border color.'],
  ['--tooltip-border-width', 'var(--border-width-sm)', 'Controls content border width.'],
  ['--tooltip-color', 'var(--color-popover-foreground)', 'Controls the content text color.'],
  ['--tooltip-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled trigger opacity.'],
  ['--tooltip-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
  ['--tooltip-focus-ring-offset', '-1px', 'Controls trigger focus ring offset.'],
  ['--tooltip-focus-ring-width', 'var(--border-width-sm)', 'Controls trigger focus ring width.'],
  ['--tooltip-font-size', 'var(--text-sm)', 'Controls the content font size.'],
  ['--tooltip-line-height', 'var(--line-height-text-sm)', 'Controls the content line height.'],
  ['--tooltip-max-height', '24rem', 'Controls the content max height.'],
  ['--tooltip-max-width', '20rem', 'Controls the content max width.'],
  ['--tooltip-padding-x', '0.5rem', 'Controls the content horizontal padding.'],
  ['--tooltip-padding-y', '0.25rem', 'Controls the content vertical padding.'],
  ['--tooltip-popup-ending-opacity', '0', 'Controls content opacity at the end of exit animation.'],
  [
    '--tooltip-popup-ending-scale',
    'var(--scale-popup)',
    'Controls content scale at the end of exit animation.',
  ],
  [
    '--tooltip-popup-ending-translate-x',
    '0',
    'Controls content X offset at the end of exit animation.',
  ],
  [
    '--tooltip-popup-ending-translate-y',
    '0',
    'Controls content Y offset at the end of exit animation.',
  ],
  [
    '--tooltip-popup-starting-opacity',
    '0',
    'Controls content opacity at the start of enter animation.',
  ],
  [
    '--tooltip-popup-starting-scale',
    'var(--scale-popup)',
    'Controls content scale at the start of enter animation.',
  ],
  [
    '--tooltip-popup-starting-translate-x',
    '0',
    'Controls content X offset at the start of enter animation.',
  ],
  [
    '--tooltip-popup-starting-translate-y',
    '0',
    'Controls content Y offset at the start of enter animation.',
  ],
  ['--tooltip-radius', 'var(--radius-md)', 'Controls the content border radius.'],
  ['--tooltip-shadow', 'var(--shadow-lg)', 'Controls the content shadow.'],
  ['--tooltip-transition', '150ms', 'Controls content animation and trigger transitions.'],
  ['--tooltip-trigger-bg', 'var(--color-background)', 'Controls trigger background color.'],
  [
    '--tooltip-trigger-bg-active',
    'var(--tooltip-trigger-bg-hover, var(--color-accent))',
    'Controls trigger background while the tooltip is open.',
  ],
  ['--tooltip-trigger-bg-hover', 'var(--color-accent)', 'Controls trigger hover background.'],
  ['--tooltip-trigger-border-color', 'var(--color-border)', 'Controls trigger border color.'],
  ['--tooltip-trigger-border-width', 'var(--border-width-sm)', 'Controls trigger border width.'],
  ['--tooltip-trigger-color', 'var(--color-foreground)', 'Controls trigger text color.'],
  ['--tooltip-trigger-font-size', 'var(--text-sm)', 'Controls trigger font size.'],
  ['--tooltip-trigger-height', 'var(--size-lg)', 'Controls trigger height.'],
  ['--tooltip-trigger-line-height', 'var(--line-height-text-sm)', 'Controls trigger line height.'],
  ['--tooltip-trigger-padding-x', '0.875rem', 'Controls trigger horizontal padding.'],
  ['--tooltip-trigger-padding-y', '0.5rem', 'Controls trigger vertical padding.'],
  ['--tooltip-trigger-radius', 'var(--radius-md)', 'Controls trigger border radius.'],
  ['--tooltip-z-index', 'var(--z-popup)', 'Controls the content z-index.'],
];

export function TooltipCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable properties={tooltipCssProperties.map(normalizeCssProperty)} />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function TooltipExample() {
  return (
    <Tooltip>
      <Tooltip.Trigger asChild aria-label="Notifications">
        <Button>
          <span className={styles.triggerContent}>
            <BellIcon className={styles.icon} />
            Notifications
          </span>
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner>
          <Tooltip.Content>Notifications</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip>
  );
}

export function ArrowTooltipExample() {
  return (
    <Tooltip>
      <Tooltip.Trigger>Hover or focus</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner>
          <Tooltip.Content>
            <Tooltip.Arrow />
            Tooltip with arrow
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip>
  );
}

export function DelayTooltipExample() {
  return (
    <Tooltip closeDelay={0} openDelay={0}>
      <Tooltip.Trigger>Immediate tooltip</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner>
          <Tooltip.Content>No open or close delay</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip>
  );
}

export function PositioningTooltipExample() {
  const [placement, setPlacement] = useState<TooltipPlacement>('top');

  return (
    <div className={styles.stack}>
      <div className={styles.sideButtons}>
        {tooltipPlacements.map((item) => (
          <button
            key={item}
            type="button"
            className={styles.sideButton}
            data-active={item === placement || undefined}
            onClick={() => setPlacement(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <Tooltip positioning={{ placement, offset: { mainAxis: 12 } }}>
        <Tooltip.Trigger asChild aria-label={`Tooltip placement: ${placement}`}>
          <Button>Hover or focus</Button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Content>Placement: {placement}</Tooltip.Content>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </div>
  );
}

export function ControlledTooltipExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.stack}>
      <Button variant="outline" onClick={() => setOpen((value) => !value)}>
        Toggle
      </Button>
      <Tooltip open={open} onOpenChange={(details) => setOpen(details.open)}>
        <Tooltip.Trigger>Controlled tooltip</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Content>Open: {String(open)}</Tooltip.Content>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </div>
  );
}

export function ContextTooltipExample() {
  return (
    <Tooltip>
      <Tooltip.Trigger>Context tooltip</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner>
          <Tooltip.Context>
            {(tooltip) => (
              <Tooltip.Content>Open from context: {tooltip.open.toString()}</Tooltip.Content>
            )}
          </Tooltip.Context>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip>
  );
}

export function RootProviderTooltipExample() {
  const tooltip = useTooltip();

  return (
    <div className={styles.stack}>
      <output className={styles.output}>Open: {String(tooltip.open)}</output>
      <Tooltip.RootProvider value={tooltip}>
        <Tooltip.Trigger>RootProvider tooltip</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Content>State is owned outside the tree.</Tooltip.Content>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.RootProvider>
    </div>
  );
}

export function MultipleTriggersTooltipExample() {
  const [activeTool, setActiveTool] = useState<(typeof tooltipTools)[number] | null>(null);

  return (
    <Tooltip
      onTriggerValueChange={(details) => {
        setActiveTool(tooltipTools.find((tool) => tool.id === details.value) ?? null);
      }}
    >
      <div className={styles.toolbar}>
        {tooltipTools.map((tool) => (
          <Tooltip.Trigger key={tool.id} value={tool.id} asChild aria-label={tool.label}>
            <Button variant="ghost" size="icon-md">
              <tool.icon className={styles.icon} />
            </Button>
          </Tooltip.Trigger>
        ))}
      </div>
      <Tooltip.Portal>
        <Tooltip.Positioner>
          <Tooltip.Content>
            {activeTool ? (
              <>
                {activeTool.label} <span className={styles.shortcut}>{activeTool.shortcut}</span>
              </>
            ) : null}
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip>
  );
}

export function WithinFixedTooltipExample() {
  return (
    <div className={styles.fixedContainer}>
      <Tooltip positioning={{ strategy: 'fixed' }}>
        <Tooltip.Trigger>Fixed strategy</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Content>Positioned from a fixed container.</Tooltip.Content>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </div>
  );
}

export function CustomStylingTooltipExample() {
  return (
    <Tooltip>
      <Tooltip.Trigger aria-label="Custom styled tooltip" className={styles.customTrigger}>
        Custom style
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner className={styles.customPositioner}>
          <Tooltip.Content className={styles.customContent}>
            <Tooltip.Arrow className={styles.customArrow} />
            Styled through explicit Ark parts
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip>
  );
}