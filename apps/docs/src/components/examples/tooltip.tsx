import {
  BellIcon,
  Button,
  InfoIcon,
  PlusIcon,
  ShareIcon,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPopup,
  TooltipPortal,
  TooltipProvider,
  TooltipPositioner,
  TooltipTrigger,
  TooltipViewport,
  createTooltipHandle,
} from 'moduix';
import { useMemo, useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './tooltip.module.css';

const tooltipSides = ['top', 'right', 'bottom', 'left'] as const;
type TooltipSide = (typeof tooltipSides)[number];

export const tooltipOverrideCssProperties: CssPropertyInput[] = [
  ['--tooltip-arrow-height', '0.625rem', 'Controls the default arrow SVG height.'],
  ['--tooltip-arrow-inline-offset', '13px', 'Controls the inline-axis arrow offset.'],
  ['--tooltip-arrow-size', '8px', 'Controls the block-axis arrow offset.'],
  ['--tooltip-arrow-stroke-color', 'var(--tooltip-border-color)', 'Controls arrow border color.'],
  ['--tooltip-arrow-width', '1.25rem', 'Controls the default arrow SVG width.'],
  ['--tooltip-bg', 'var(--color-popover)', 'Controls the popup background color.'],
  ['--tooltip-border-color', 'var(--color-border)', 'Controls the popup border color.'],
  ['--tooltip-border-width', 'var(--border-width-sm)', 'Controls popup border width.'],
  ['--tooltip-color', 'var(--color-popover-foreground)', 'Controls the popup text color.'],
  [
    '--tooltip-content-transition',
    'var(--duration-fast)',
    'Controls content transitions between triggers.',
  ],
  ['--tooltip-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled trigger opacity.'],
  ['--tooltip-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
  ['--tooltip-focus-ring-offset', '-1px', 'Controls trigger focus ring offset.'],
  ['--tooltip-focus-ring-width', 'var(--border-width-sm)', 'Controls trigger focus ring width.'],
  ['--tooltip-font-size', 'var(--text-sm)', 'Controls the popup font size.'],
  ['--tooltip-line-height', 'var(--line-height-text-sm)', 'Controls the popup line height.'],
  ['--tooltip-max-height', '24rem', 'Controls the popup max height.'],
  ['--tooltip-max-width', '20rem', 'Controls the popup max width.'],
  ['--tooltip-padding-x', '0.5rem', 'Controls the popup horizontal padding.'],
  ['--tooltip-padding-y', '0.25rem', 'Controls the popup vertical padding.'],
  ['--tooltip-radius', 'var(--radius-md)', 'Controls the popup border radius.'],
  ['--tooltip-shadow', 'var(--shadow-lg)', 'Controls the popup shadow.'],
  ['--tooltip-transition', 'var(--duration-fast)', 'Controls popup and trigger transitions.'],
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
  ['--tooltip-width', 'max-content', 'Controls the popup width.'],
];
export const tooltipPlaygroundCssProperties: CssPropertyInput[] = [
  ['--tooltip-bg', 'var(--color-popover)', 'Controls popup background color.'],
  ['--tooltip-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--tooltip-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--tooltip-font-size', 'var(--text-sm)', 'Controls popup font size.'],
  ['--tooltip-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
  ['--tooltip-radius', 'var(--radius-md)', 'Controls popup border radius.'],
  ['--tooltip-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--tooltip-trigger-bg', 'var(--color-background)', 'Controls trigger background color.'],
  ['--tooltip-trigger-bg-hover', 'var(--color-accent)', 'Controls trigger hover background.'],
  ['--tooltip-trigger-color', 'var(--color-foreground)', 'Controls trigger text color.'],
];

export function TooltipCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={tooltipOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function TooltipCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={tooltipPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
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
      <TooltipTrigger render={<Button />} aria-label="Notifications">
        <span className={styles.triggerContent}>
          <BellIcon className={styles.icon} />
          Notifications
        </span>
      </TooltipTrigger>
      <TooltipContent>Notifications</TooltipContent>
    </Tooltip>
  );
}

export function ToolbarTooltipExample() {
  return (
    <TooltipProvider delay={300}>
      <div className={styles.toolbar}>
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon-md" />} aria-label="Add item">
            <PlusIcon className={styles.icon} />
          </TooltipTrigger>
          <TooltipContent showArrow sideOffset={16}>
            Add item
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon-md" />} aria-label="Share">
            <ShareIcon className={styles.icon} />
          </TooltipTrigger>
          <TooltipContent showArrow sideOffset={16}>
            Share
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon-md" />} aria-label="Details">
            <InfoIcon className={styles.icon} />
          </TooltipTrigger>
          <TooltipContent showArrow sideOffset={16}>
            Details
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export function TooltipCompactLabelExample() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button />} aria-label="Tooltip without arrow">
        Hover or focus
      </TooltipTrigger>
      <TooltipContent>Tooltip without arrow</TooltipContent>
    </Tooltip>
  );
}

export function SideControlTooltipExample() {
  const [side, setSide] = useState<TooltipSide>('top');

  return (
    <div className={styles.stack}>
      <div className={styles.sideButtons}>
        {tooltipSides.map((item) => (
          <button
            key={item}
            type="button"
            className={styles.sideButton}
            data-active={item === side || undefined}
            onClick={() => setSide(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <Tooltip>
        <TooltipTrigger render={<Button />} aria-label={`Tooltip side: ${side}`}>
          Hover or focus
        </TooltipTrigger>
        <TooltipContent side={side}>Side: {side}</TooltipContent>
      </Tooltip>
    </div>
  );
}

export function DetachedTriggerTooltipExample() {
  const tooltipHandle = useMemo(() => createTooltipHandle(), []);

  return (
    <div className={styles.row}>
      <TooltipTrigger handle={tooltipHandle} render={<Button />} aria-label="Detached tooltip">
        Detached trigger
      </TooltipTrigger>
      <Tooltip handle={tooltipHandle}>
        <TooltipContent>Linked with handle.</TooltipContent>
      </Tooltip>
    </div>
  );
}

export function MultipleTriggersTooltipExample() {
  const tooltipHandle = useMemo(() => createTooltipHandle<{ text: string }>(), []);

  return (
    <TooltipProvider delay={250}>
      <div className={styles.row}>
        <TooltipTrigger
          aria-label="Create"
          handle={tooltipHandle}
          payload={{ text: 'Create' }}
          render={<Button variant="ghost" size="icon-md" />}
        >
          <PlusIcon className={styles.icon} />
        </TooltipTrigger>
        <TooltipTrigger
          aria-label="Share"
          handle={tooltipHandle}
          payload={{ text: 'Share' }}
          render={<Button variant="ghost" size="icon-md" />}
        >
          <ShareIcon className={styles.icon} />
        </TooltipTrigger>
        <TooltipTrigger
          aria-label="Details"
          handle={tooltipHandle}
          payload={{ text: 'Details' }}
          render={<Button variant="ghost" size="icon-md" />}
        >
          <InfoIcon className={styles.icon} />
        </TooltipTrigger>

        <Tooltip handle={tooltipHandle}>
          {({ payload }) => <TooltipContent>{payload?.text}</TooltipContent>}
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export function CustomCompositionTooltipExample() {
  return (
    <Tooltip>
      <TooltipTrigger aria-label="Custom styled tooltip" className={styles.customTrigger}>
        Custom style
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipPositioner sideOffset={10} className={styles.customPositioner}>
          <TooltipPopup className={styles.customPopup}>
            <TooltipArrow className={styles.customArrow} />
            <TooltipViewport className={styles.customViewport}>
              Styled through explicit parts
            </TooltipViewport>
          </TooltipPopup>
        </TooltipPositioner>
      </TooltipPortal>
    </Tooltip>
  );
}