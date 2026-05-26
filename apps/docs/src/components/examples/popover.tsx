import {
  BellIcon,
  Button,
  CheckSmallIcon,
  Popover,
  PopoverArrow,
  PopoverBackdrop,
  PopoverBody,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
  PopoverViewport,
  createPopoverHandle,
} from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './popover.module.css';

const popoverSides = ['top', 'right', 'bottom', 'left'] as const;
type PopoverSide = (typeof popoverSides)[number];
const imageUrl =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 720 420'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%230b1220' offset='0'/%3E%3Cstop stop-color='%231d3557' offset='0.52'/%3E%3Cstop stop-color='%23004e64' offset='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='accent1' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop stop-color='%23ffd166'/%3E%3Cstop stop-color='%23fca311'/%3E%3C/linearGradient%3E%3ClinearGradient id='accent2' x1='0' y1='1' x2='1' y2='0'%3E%3Cstop stop-color='%2306d6a0'/%3E%3Cstop stop-color='%23118ab2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='720' height='420' fill='url(%23bg)'/%3E%3Ccircle cx='120' cy='90' r='70' fill='%23ffffff22'/%3E%3Ccircle cx='620' cy='330' r='120' fill='%23ffffff18'/%3E%3Crect x='70' y='240' width='320' height='110' rx='22' fill='url(%23accent1)' opacity='0.88' transform='rotate(-8 230 295)'/%3E%3Crect x='320' y='90' width='300' height='120' rx='24' fill='url(%23accent2)' opacity='0.92' transform='rotate(10 470 150)'/%3E%3Cpath d='M40 370 C160 260, 270 360, 390 280 C510 200, 610 280, 720 210 L720 420 L40 420 Z' fill='%23ffffff22'/%3E%3C/svg%3E";

export const popoverOverrideCssProperties: CssPropertyInput[] = [
  ['--popover-arrow-height', '0.625rem', 'Controls the default arrow SVG height.'],
  ['--popover-arrow-inline-offset', '0.8125rem', 'Controls the inline-axis arrow offset.'],
  ['--popover-arrow-size', '0.5rem', 'Controls the block-axis arrow offset.'],
  ['--popover-arrow-stroke-color', 'var(--popover-border-color)', 'Controls arrow border color.'],
  ['--popover-arrow-width', '1.25rem', 'Controls the default arrow SVG width.'],
  ['--popover-backdrop-bg', 'var(--backdrop-bg, transparent)', 'Controls backdrop background.'],
  ['--popover-backdrop-blur', '0', 'Controls backdrop blur.'],
  [
    '--popover-backdrop-transition',
    'var(--transition-default)',
    'Controls backdrop enter and exit transitions.',
  ],
  ['--popover-bg', 'var(--color-popover)', 'Controls the popup background color.'],
  ['--popover-body-margin', '0', 'Controls body margin.'],
  ['--popover-border-color', 'var(--color-border)', 'Controls the popup border color.'],
  ['--popover-border-width', 'var(--border-width-sm)', 'Controls popup border width.'],
  ['--popover-color', 'var(--color-popover-foreground)', 'Controls the popup text color.'],
  ['--popover-control-bg', 'var(--color-background)', 'Controls trigger and close backgrounds.'],
  [
    '--popover-control-bg-active',
    'var(--popover-control-bg-hover)',
    'Controls trigger background while the popup is open.',
  ],
  [
    '--popover-control-bg-hover',
    'var(--color-accent)',
    'Controls trigger and close hover backgrounds.',
  ],
  [
    '--popover-control-border-color',
    'var(--color-border)',
    'Controls trigger and close border color.',
  ],
  [
    '--popover-control-border-width',
    'var(--border-width-sm)',
    'Controls trigger and close border width.',
  ],
  ['--popover-control-color', 'var(--color-foreground)', 'Controls trigger and close text color.'],
  ['--popover-control-font-size', 'var(--text-md)', 'Controls control font size.'],
  ['--popover-control-height', 'var(--size-lg)', 'Controls trigger and close min height.'],
  ['--popover-control-line-height', 'var(--line-height-text-md)', 'Controls control line height.'],
  ['--popover-control-padding-x', '0.875rem', 'Controls control horizontal padding.'],
  ['--popover-control-padding-y', '0.5rem', 'Controls control vertical padding.'],
  ['--popover-control-radius', 'var(--radius-md)', 'Controls trigger and close border radius.'],
  ['--popover-description-color', 'var(--color-muted-foreground)', 'Controls description color.'],
  ['--popover-description-font-size', 'var(--text-sm)', 'Controls description font size.'],
  [
    '--popover-description-line-height',
    'var(--line-height-text-sm)',
    'Controls description line height.',
  ],
  ['--popover-description-margin', '0', 'Controls description margin.'],
  ['--popover-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled control opacity.'],
  ['--popover-focus-ring-color', 'var(--color-ring)', 'Controls control focus ring color.'],
  [
    '--popover-focus-ring-width',
    'var(--popover-control-border-width)',
    'Controls control focus ring width.',
  ],
  ['--popover-footer-gap', 'var(--spacing-2)', 'Controls spacing between footer actions.'],
  ['--popover-footer-justify', 'flex-end', 'Controls footer content alignment.'],
  ['--popover-footer-margin', 'var(--spacing-3) 0 0', 'Controls footer margin.'],
  ['--popover-header-gap', 'var(--spacing-1)', 'Controls spacing in the header slot.'],
  ['--popover-height', 'auto', 'Controls the popup height.'],
  ['--popover-max-height', '24rem', 'Controls the popup max height.'],
  ['--popover-max-width', '28rem', 'Controls the popup max width.'],
  ['--popover-min-width', '16rem', 'Controls the popup min width.'],
  ['--popover-padding-x', '1rem', 'Controls the popup horizontal padding.'],
  ['--popover-padding-y', '1rem', 'Controls the popup vertical padding.'],
  ['--popover-radius', 'var(--radius-md)', 'Controls the popup border radius.'],
  ['--popover-scale', 'var(--scale-popup)', 'Controls the popup enter and exit scale.'],
  ['--popover-shadow', 'var(--shadow-lg)', 'Controls the popup shadow.'],
  ['--popover-title-color', 'var(--popover-color)', 'Controls title color.'],
  ['--popover-title-font-size', 'var(--text-md)', 'Controls title font size.'],
  ['--popover-title-font-weight', 'var(--weight-semibold)', 'Controls title font weight.'],
  ['--popover-title-line-height', 'var(--line-height-text-md)', 'Controls title line height.'],
  ['--popover-transition', 'var(--transition-default)', 'Controls popup and control transitions.'],
  ['--popover-viewport-offset', '1rem', 'Controls viewport content transition offset.'],
  ['--popover-viewport-transition', '220ms', 'Controls viewport content transitions.'],
  ['--popover-width', 'auto', 'Controls the popup width.'],
];
export const popoverPlaygroundCssProperties: CssPropertyInput[] = [
  ['--popover-backdrop-bg', 'var(--backdrop-bg, transparent)', 'Controls backdrop background.'],
  ['--popover-bg', 'var(--color-popover)', 'Controls popup background color.'],
  ['--popover-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--popover-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--popover-control-bg', 'var(--color-background)', 'Controls trigger and close backgrounds.'],
  ['--popover-control-bg-hover', 'var(--color-accent)', 'Controls control hover backgrounds.'],
  ['--popover-control-color', 'var(--color-foreground)', 'Controls control text color.'],
  ['--popover-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--popover-radius', 'var(--radius-md)', 'Controls popup border radius.'],
  ['--popover-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
];

export function PopoverCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={popoverOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function PopoverCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={popoverPlaygroundCssProperties.map(normalizeCssProperty)}
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

export function PopoverExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button />}>
        <span className={styles.triggerContent}>
          <BellIcon className={styles.icon} />
          Notifications
        </span>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Notifications</PopoverTitle>
          <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}

export function PopoverWithCloseActionExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button />}>Project status</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Sprint 19</PopoverTitle>
          <PopoverDescription>
            9 tasks completed, 2 in progress. Everything is on schedule.
          </PopoverDescription>
        </PopoverHeader>
        <PopoverFooter>
          <PopoverClose>Close</PopoverClose>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export function PopoverWithBackdropExample() {
  return (
    <Popover>
      <PopoverTrigger className={styles.backdropTrigger} render={<Button />}>
        Open with backdrop
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverBackdrop className={styles.backdrop} />
        <PopoverPositioner sideOffset={8}>
          <PopoverPopup>
            <PopoverHeader>
              <PopoverTitle>Backdrop</PopoverTitle>
              <PopoverDescription>
                Compose the backdrop explicitly when the popup should separate from the page.
              </PopoverDescription>
            </PopoverHeader>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  );
}

export function OpenOnHoverPopoverExample() {
  return (
    <Popover>
      <PopoverTrigger openOnHover delay={150} closeDelay={120} render={<Button />}>
        Open on hover
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Hover mode</PopoverTitle>
          <PopoverDescription>
            This popover uses delayed hover opening for quick preview interactions.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}

export function ControlledPopoverExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={styles.stack}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={<Button />}>Open controlled popover</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Publish changes?</PopoverTitle>
            <PopoverDescription>
              This action will make your latest updates visible to all users.
            </PopoverDescription>
          </PopoverHeader>
          <PopoverFooter>
            <PopoverClose>Back to editing</PopoverClose>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function CustomTriggerPopoverExample() {
  return (
    <Popover>
      <PopoverTrigger className={styles.customAnchor} nativeButton={false} render={<div />}>
        Open custom trigger
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Custom trigger element</PopoverTitle>
          <PopoverDescription>
            Set nativeButton to false when the rendered trigger element is not a button.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}

export function DetachedTriggerPopoverExample() {
  const popoverHandle = React.useMemo(() => createPopoverHandle(), []);

  return (
    <div className={styles.row}>
      <PopoverTrigger handle={popoverHandle} render={<Button />}>
        Open details
      </PopoverTrigger>
      <Popover handle={popoverHandle}>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Detached trigger</PopoverTitle>
            <PopoverDescription>
              Trigger and popup are linked with createPopoverHandle().
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function ModalFocusPopoverExample() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Popover modal="trap-focus">
      <PopoverTrigger render={<Button />}>Invite teammates</PopoverTrigger>
      <PopoverContent initialFocus={inputRef}>
        <PopoverHeader>
          <PopoverTitle>Invite teammates</PopoverTitle>
          <PopoverDescription>
            Focus moves into the first field, and the close action stays available inside the popup.
          </PopoverDescription>
        </PopoverHeader>
        <PopoverBody>
          <label className={styles.field}>
            <span>Email</span>
            <input ref={inputRef} className={styles.input} placeholder="name@example.com" />
          </label>
        </PopoverBody>
        <PopoverFooter>
          <PopoverClose>Done</PopoverClose>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export function SideControlPopoverExample() {
  const [side, setSide] = React.useState<PopoverSide>('bottom');

  return (
    <div className={styles.stack}>
      <div className={styles.sideButtons}>
        {popoverSides.map((item) => (
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

      <Popover>
        <PopoverTrigger render={<Button />}>Open with side: {side}</PopoverTrigger>
        <PopoverContent side={side} className={styles.narrowPopup}>
          <PopoverHeader>
            <PopoverTitle>Placement</PopoverTitle>
            <PopoverDescription>
              Current side is <strong>{side}</strong>. You can switch it with the buttons above.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function ImageOnlyPopoverExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button />}>Open image popover</PopoverTrigger>
      <PopoverContent className={styles.imagePopup}>
        <PopoverBody>
          <img className={styles.image} alt="Abstract geometric composition" src={imageUrl} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export function PopoverWithArrowExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button />}>Open with arrow</PopoverTrigger>
      <PopoverContent showArrow>
        <PopoverHeader>
          <PopoverTitle>With arrow</PopoverTitle>
          <PopoverDescription>
            Enable showArrow when the popup should visually point to its trigger.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}

export function CustomCompositionPopoverExample() {
  return (
    <Popover>
      <PopoverTrigger className={styles.customTrigger} render={<Button />}>
        Open custom composition
      </PopoverTrigger>
      <PopoverPortal className={styles.customPortal}>
        <PopoverBackdrop className={styles.customBackdrop} />
        <PopoverPositioner sideOffset={8} className={styles.customPositioner}>
          <PopoverPopup className={styles.customPopup}>
            <PopoverArrow className={styles.customArrowSlot}>
              <CheckSmallIcon className={styles.customArrowIcon} />
            </PopoverArrow>
            <PopoverViewport className={styles.customViewport}>
              <PopoverHeader>
                <PopoverTitle>Custom composition</PopoverTitle>
                <PopoverDescription>
                  Portal, backdrop, popup, arrow, and viewport stay available as explicit building
                  blocks.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverViewport>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  );
}