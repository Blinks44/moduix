import { BellIcon, Button, Popover, usePopover } from '@moduix/react';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './popover.module.css';

export const popoverOverrideCssProperties: CssPropertyInput[] = [
  ['--popover-arrow-size', '0.625rem', 'Controls the Ark arrow size.'],
  ['--popover-arrow-stroke-color', 'var(--popover-border-color)', 'Controls arrow border color.'],
  ['--popover-bg', 'var(--color-popover)', 'Controls the content background color.'],
  ['--popover-body-margin', '0', 'Controls body margin.'],
  ['--popover-border-color', 'var(--color-border)', 'Controls content border color.'],
  ['--popover-border-width', 'var(--border-width-sm)', 'Controls content border width.'],
  ['--popover-color', 'var(--color-popover-foreground)', 'Controls content text color.'],
  ['--popover-control-bg', 'var(--color-background)', 'Controls default trigger backgrounds.'],
  [
    '--popover-control-bg-active',
    'var(--popover-control-bg-hover)',
    'Controls open trigger color.',
  ],
  ['--popover-control-bg-hover', 'var(--color-accent)', 'Controls control hover backgrounds.'],
  ['--popover-control-border-color', 'var(--color-border)', 'Controls control border color.'],
  ['--popover-control-border-width', 'var(--border-width-sm)', 'Controls control border width.'],
  ['--popover-control-color', 'var(--color-foreground)', 'Controls control text color.'],
  ['--popover-control-font-size', 'var(--text-md)', 'Controls control font size.'],
  ['--popover-control-height', 'var(--size-lg)', 'Controls control min height.'],
  ['--popover-control-line-height', 'var(--line-height-text-md)', 'Controls line height.'],
  ['--popover-control-padding-x', '0.875rem', 'Controls horizontal control padding.'],
  ['--popover-control-padding-y', '0.5rem', 'Controls vertical control padding.'],
  ['--popover-control-radius', 'var(--radius-md)', 'Controls control radius.'],
  ['--popover-content-ending-opacity', '0', 'Controls exit opacity.'],
  ['--popover-content-ending-scale', 'var(--scale-popup)', 'Controls exit scale.'],
  ['--popover-content-ending-translate-x', '0', 'Controls exit horizontal offset.'],
  ['--popover-content-ending-translate-y', '0', 'Controls exit vertical offset.'],
  ['--popover-content-starting-opacity', '0', 'Controls enter opacity.'],
  ['--popover-content-starting-scale', 'var(--scale-popup)', 'Controls enter scale.'],
  ['--popover-content-starting-translate-x', '0', 'Controls enter horizontal offset.'],
  ['--popover-content-starting-translate-y', '0', 'Controls enter vertical offset.'],
  ['--popover-description-color', 'var(--color-muted-foreground)', 'Controls description color.'],
  ['--popover-description-font-size', 'var(--text-sm)', 'Controls description font size.'],
  ['--popover-description-line-height', 'var(--line-height-text-sm)', 'Controls line height.'],
  ['--popover-description-margin', '0', 'Controls description margin.'],
  ['--popover-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--popover-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--popover-focus-ring-width', 'var(--popover-control-border-width)', 'Controls ring width.'],
  ['--popover-footer-gap', 'var(--spacing-2)', 'Controls footer action spacing.'],
  ['--popover-footer-justify', 'flex-end', 'Controls footer alignment.'],
  ['--popover-footer-margin', 'var(--spacing-3) 0 0', 'Controls footer margin.'],
  ['--popover-header-gap', 'var(--spacing-1)', 'Controls header spacing.'],
  ['--popover-height', 'auto', 'Controls content height.'],
  ['--popover-max-height', '24rem', 'Controls content max height.'],
  ['--popover-max-width', '28rem', 'Controls content max width.'],
  ['--popover-min-width', '16rem', 'Controls content min width.'],
  ['--popover-padding-x', '1rem', 'Controls horizontal content padding.'],
  ['--popover-padding-y', '1rem', 'Controls vertical content padding.'],
  ['--popover-radius', 'var(--radius-md)', 'Controls content radius.'],
  ['--popover-shadow', 'var(--shadow-lg)', 'Controls content shadow.'],
  ['--popover-title-color', 'var(--popover-color)', 'Controls title color.'],
  ['--popover-title-font-size', 'var(--text-md)', 'Controls title font size.'],
  ['--popover-title-font-weight', 'var(--weight-semibold)', 'Controls title weight.'],
  ['--popover-title-line-height', 'var(--line-height-text-md)', 'Controls title line height.'],
  ['--popover-transition', 'var(--duration-fast)', 'Controls content animation duration.'],
  ['--popover-width', 'auto', 'Controls content width.'],
];

export const popoverActions = [
  {
    id: 'share',
    label: 'Share',
    detail: 'Share this item with others by link or email.',
  },
  {
    id: 'export',
    label: 'Export',
    detail: 'Export this item as PDF, CSV, or JSON.',
  },
  {
    id: 'archive',
    label: 'Archive',
    detail: 'Move this item to the archive for later reference.',
  },
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function PopoverCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={popoverOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function PopoverSurface({
  title,
  description,
  arrow = false,
  className,
}: {
  title: string;
  description: string;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Popover.Positioner>
      <Popover.Content className={className}>
        {arrow ? <Popover.Arrow /> : null}
        <Popover.Header>
          <Popover.Title>{title}</Popover.Title>
          <Popover.Description>{description}</Popover.Description>
        </Popover.Header>
        <Popover.Footer>
          <Popover.CloseTrigger>Close</Popover.CloseTrigger>
        </Popover.Footer>
      </Popover.Content>
    </Popover.Positioner>
  );
}

export function PopoverExample() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <Popover.Trigger asChild>
        <Button>
          <span className={styles.triggerContent}>
            <BellIcon className={styles.icon} />
            Notifications
          </span>
        </Button>
      </Popover.Trigger>
      <PopoverSurface title="Notifications" description="You are all caught up. Good job!" />
    </Popover>
  );
}

export function ControlledPopoverExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={styles.stack}>
      <span>Popover is {open ? 'open' : 'closed'}</span>
      <Popover open={open} onOpenChange={(details) => setOpen(details.open)}>
        <Popover.Trigger asChild>
          <Button>Open controlled popover</Button>
        </Popover.Trigger>
        <PopoverSurface
          title="Publish changes?"
          description="This action will make your latest updates visible to all users."
        />
      </Popover>
    </div>
  );
}

export function RootProviderPopoverExample() {
  const popover = usePopover({ positioning: { placement: 'bottom-start', gutter: 8 } });

  return (
    <div className={styles.stack}>
      <span>Popover is {popover.open ? 'open' : 'closed'}</span>
      <Button variant="outline" onClick={() => popover.setOpen(!popover.open)}>
        Toggle externally
      </Button>
      <Popover.RootProvider value={popover}>
        <Popover.Trigger asChild>
          <Button>Open from trigger</Button>
        </Popover.Trigger>
        <PopoverSurface
          title="External state"
          description="The usePopover hook owns this popover state."
        />
      </Popover.RootProvider>
    </div>
  );
}

export function PopoverContextExample() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <Popover.Trigger asChild>
        <Button>Read context</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Status</Popover.Title>
          <Popover.Description>
            <Popover.Context>
              {(context) => (
                <span className={styles.status}>
                  Popover is {context.open ? 'visible' : 'hidden'}
                </span>
              )}
            </Popover.Context>
          </Popover.Description>
          <Popover.Footer>
            <Popover.CloseTrigger>Close</Popover.CloseTrigger>
          </Popover.Footer>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}

export function PopoverWithArrowExample() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <Popover.Trigger asChild>
        <Button>Open with arrow</Button>
      </Popover.Trigger>
      <PopoverSurface
        arrow
        title="With arrow"
        description="Arrow and ArrowTip use Ark positioning variables."
      />
    </Popover>
  );
}

export function PositioningPopoverExample() {
  return (
    <Popover positioning={{ placement: 'left', gutter: 12 }}>
      <Popover.Trigger asChild>
        <Button>Open on the left</Button>
      </Popover.Trigger>
      <PopoverSurface title="Left placement" description="Belong to Root.positioning." />
    </Popover>
  );
}

export function CloseBehaviorPopoverExample() {
  return (
    <Popover closeOnEscape={false} closeOnInteractOutside={false}>
      <Popover.Trigger asChild>
        <Button>Open persistent popover</Button>
      </Popover.Trigger>
      <PopoverSurface
        title="Explicit close"
        description="Escape and outside interactions do not dismiss this popover."
      />
    </Popover>
  );
}

export function ModalPopoverExample() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Popover modal initialFocusEl={() => inputRef.current}>
      <Popover.Trigger asChild>
        <Button>Invite teammates</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Invite teammates</Popover.Title>
            <Popover.Description>
              Focus is trapped inside this modal popover until dismissed.
            </Popover.Description>
          </Popover.Header>
          <Popover.Body>
            <label className={styles.field}>
              <span>Email</span>
              <input ref={inputRef} className={styles.input} />
            </label>
          </Popover.Body>
          <Popover.Footer>
            <Popover.CloseTrigger>Done</Popover.CloseTrigger>
          </Popover.Footer>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}

export function AnchorPopoverExample() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <div className={styles.stack}>
        <Popover.Anchor asChild>
          <input className={styles.input} placeholder="Popover anchor" />
        </Popover.Anchor>
        <Popover.Trigger asChild>
          <Button>Open below the input</Button>
        </Popover.Trigger>
      </div>
      <PopoverSurface
        title="Custom anchor"
        description="The popup is positioned relative to the input instead of the trigger."
      />
    </Popover>
  );
}

export function SameWidthPopoverExample() {
  return (
    <Popover positioning={{ sameWidth: true, gutter: 8 }}>
      <Popover.Trigger asChild>
        <Button className={styles.wideTrigger}>Match this trigger width</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content className={styles.sameWidthContent}>
          <Popover.Title>Matched width</Popover.Title>
          <Popover.Description>
            The content uses Ark&apos;s reference width measurement.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}

export function LazyMountPopoverExample() {
  return (
    <Popover lazyMount unmountOnExit positioning={{ gutter: 8 }}>
      <Popover.Trigger asChild>
        <Button>Open lazy popover</Button>
      </Popover.Trigger>
      <PopoverSurface
        title="Lazy mounted"
        description="This content mounts on open and unmounts after exit."
      />
    </Popover>
  );
}

export function NestedPopoverExample() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <Popover.Trigger asChild>
        <Button>Open settings</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Settings</Popover.Title>
            <Popover.Description>Nested popovers keep independent state.</Popover.Description>
          </Popover.Header>
          <Popover.Body className={styles.nestedBody}>
            <Popover positioning={{ placement: 'right', gutter: 8 }}>
              <Popover.Trigger asChild>
                <Button variant="outline">Advanced</Button>
              </Popover.Trigger>
              <PopoverSurface
                title="Advanced settings"
                description="This content belongs to the nested popover."
              />
            </Popover>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}

export function MultipleTriggersPopoverExample() {
  const [activeItem, setActiveItem] = React.useState<(typeof popoverActions)[number] | null>(null);

  return (
    <Popover
      onTriggerValueChange={(details) => {
        setActiveItem(popoverActions.find((item) => item.id === details.value) ?? null);
      }}
      positioning={{ gutter: 8 }}
    >
      <div className={styles.triggerGroup}>
        {popoverActions.map((item) => (
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

export function CustomStylingPopoverExample() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <Popover.Trigger asChild>
        <Button>Open styled popover</Button>
      </Popover.Trigger>
      <PopoverSurface
        arrow
        className={styles.customContent}
        title="Custom styling"
        description="The Ark structure stays unchanged while moduix variables change the surface."
      />
    </Popover>
  );
}