import type { PreviewCardContentProps } from 'moduix';
import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
  createPreviewCardHandle,
} from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './preview-card.module.css';

type LinkPreviewPayload = {
  title: string;
  summary: string;
  image: string;
  url: string;
};

const previewCardSides: PreviewCardSide[] = ['top', 'right', 'bottom', 'left'];

const linkPayloads: LinkPreviewPayload[] = [
  {
    title: 'Typography',
    summary:
      'Typography is the art and technique of arranging type to make written language readable and expressive.',
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 720 420'%3E%3Cdefs%3E%3ClinearGradient id='bg1' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23141e30'/%3E%3Cstop stop-color='%2324374f' offset='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='720' height='420' fill='url(%23bg1)'/%3E%3Ctext x='48' y='110' fill='%23f8fafc' font-family='Arial' font-size='68' font-weight='700'%3EType%3C/text%3E%3Crect x='48' y='150' width='624' height='200' rx='24' fill='%23ffffff1f'/%3E%3Ctext x='76' y='230' fill='%23f8fafc' font-family='Arial' font-size='34'%3EReadability and rhythm%3C/text%3E%3C/svg%3E",
    url: 'https://en.wikipedia.org/wiki/Typography',
  },
  {
    title: 'Grid systems',
    summary:
      'Grid systems help organize content and maintain consistent spacing, alignment, and visual hierarchy.',
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 720 420'%3E%3Crect width='720' height='420' fill='%230b1220'/%3E%3Cg stroke='%23ffffff40' stroke-width='2'%3E%3Cpath d='M80 40v340M170 40v340M260 40v340M350 40v340M440 40v340M530 40v340M620 40v340'/%3E%3Cpath d='M80 70h540M80 140h540M80 210h540M80 280h540M80 350h540'/%3E%3C/g%3E%3Crect x='80' y='70' width='170' height='70' fill='%230ea5e9aa'/%3E%3Crect x='260' y='140' width='350' height='140' fill='%2322c55e99'/%3E%3C/svg%3E",
    url: 'https://en.wikipedia.org/wiki/Grid_(graphic_design)',
  },
];

export const previewCardOverrideCssProperties: CssPropertyInput[] = [
  ['--preview-card-arrow-height', '0.625rem', 'Controls the default arrow SVG height.'],
  ['--preview-card-arrow-inline-offset', '0.8125rem', 'Controls the inline-axis arrow offset.'],
  ['--preview-card-arrow-size', '0.5rem', 'Controls the block-axis arrow offset.'],
  [
    '--preview-card-arrow-stroke-color',
    'var(--preview-card-border-color)',
    'Controls arrow border color.',
  ],
  ['--preview-card-arrow-width', '1.25rem', 'Controls the default arrow SVG width.'],
  ['--preview-card-backdrop-bg', 'var(--backdrop-bg, transparent)', 'Controls the backdrop color.'],
  ['--preview-card-backdrop-blur', '0', 'Controls the backdrop blur.'],
  [
    '--preview-card-backdrop-transition',
    'var(--transition-default)',
    'Controls the backdrop transition.',
  ],
  ['--preview-card-bg', 'var(--color-popover)', 'Controls the popup background color.'],
  ['--preview-card-border-color', 'var(--color-border)', 'Controls the popup border color.'],
  ['--preview-card-border-width', 'var(--border-width-sm)', 'Controls popup border width.'],
  ['--preview-card-color', 'var(--color-popover-foreground)', 'Controls the popup text color.'],
  ['--preview-card-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  [
    '--preview-card-focus-ring-color',
    'var(--color-ring)',
    'Controls the trigger focus ring color.',
  ],
  ['--preview-card-focus-ring-width', 'var(--border-width-sm)', 'Controls focus ring width.'],
  ['--preview-card-height', 'auto', 'Controls the popup height.'],
  ['--preview-card-max-height', '24rem', 'Controls the popup max height.'],
  ['--preview-card-max-width', '24rem', 'Controls the popup max width.'],
  ['--preview-card-min-width', '14rem', 'Controls the popup min width.'],
  ['--preview-card-padding-x', 'var(--spacing-2)', 'Controls the popup horizontal padding.'],
  ['--preview-card-padding-y', 'var(--spacing-2)', 'Controls the popup vertical padding.'],
  ['--preview-card-radius', 'var(--radius-lg)', 'Controls the popup border radius.'],
  ['--preview-card-scale', 'var(--scale-popup)', 'Controls the popup enter and exit scale.'],
  ['--preview-card-shadow', 'var(--shadow-lg)', 'Controls the popup shadow.'],
  [
    '--preview-card-transition',
    'var(--transition-default)',
    'Controls popup and trigger transitions.',
  ],
  [
    '--preview-card-trigger-color',
    'var(--color-primary)',
    'Controls the default trigger text color.',
  ],
  [
    '--preview-card-trigger-decoration-color',
    'color-mix(in oklab, var(--preview-card-trigger-color), transparent 40%)',
    'Controls the trigger underline color.',
  ],
  [
    '--preview-card-trigger-decoration-color-hover',
    'var(--preview-card-trigger-color)',
    'Controls the trigger underline color on hover.',
  ],
  [
    '--preview-card-trigger-decoration-color-open',
    'var(--preview-card-trigger-color)',
    'Controls the trigger underline color while the popup is open.',
  ],
  [
    '--preview-card-trigger-decoration-thickness',
    '1px',
    'Controls the trigger underline thickness.',
  ],
  ['--preview-card-trigger-focus-offset', '1px', 'Controls the trigger focus outline offset.'],
  ['--preview-card-trigger-focus-radius', 'var(--radius-xs)', 'Controls the trigger focus radius.'],
  ['--preview-card-trigger-underline-offset', '2px', 'Controls the trigger underline offset.'],
  ['--preview-card-width', 'auto', 'Controls the popup width.'],
];
export const previewCardPlaygroundCssProperties: CssPropertyInput[] = [
  ['--preview-card-backdrop-bg', 'var(--backdrop-bg, transparent)', 'Controls backdrop color.'],
  ['--preview-card-bg', 'var(--color-popover)', 'Controls popup background color.'],
  ['--preview-card-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--preview-card-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--preview-card-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
  ['--preview-card-radius', 'var(--radius-lg)', 'Controls popup border radius.'],
  ['--preview-card-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--preview-card-trigger-color', 'var(--color-primary)', 'Controls trigger text color.'],
];

export function PreviewCardCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={previewCardOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function PreviewCardCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={previewCardPlaygroundCssProperties.map(normalizeCssProperty)}
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

export function PreviewCardExample() {
  return (
    <PreviewCard>
      <p className={styles.paragraph}>
        The principles of good{' '}
        <PreviewCardTrigger href={linkPayloads[0].url}>typography</PreviewCardTrigger> remain in the
        digital age.
      </p>
      <PreviewCardContent>
        <PreviewCardPreview item={linkPayloads[0]} />
      </PreviewCardContent>
    </PreviewCard>
  );
}

export function ControlledPreviewCardExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <PreviewCard open={open} onOpenChange={setOpen}>
      <PreviewCardTrigger href={linkPayloads[0].url}>Controlled preview card</PreviewCardTrigger>
      <PreviewCardContent>
        <PreviewCardPreview
          item={{
            ...linkPayloads[0],
            summary: 'This preview card is controlled with open and onOpenChange.',
          }}
        />
      </PreviewCardContent>
    </PreviewCard>
  );
}

export function DetachedTriggerPreviewCardExample() {
  const previewCardHandle = React.useMemo(() => createPreviewCardHandle(), []);

  return (
    <div className={styles.row}>
      <PreviewCardTrigger handle={previewCardHandle} href={linkPayloads[0].url}>
        Open detached preview
      </PreviewCardTrigger>
      <PreviewCard handle={previewCardHandle}>
        <PreviewCardContent>
          <PreviewCardPreview
            item={{
              ...linkPayloads[0],
              summary: 'Trigger and popup are linked with createPreviewCardHandle().',
            }}
          />
        </PreviewCardContent>
      </PreviewCard>
    </div>
  );
}

export function MultipleTriggersPreviewCardExample() {
  const previewCardHandle = React.useMemo(() => createPreviewCardHandle<LinkPreviewPayload>(), []);

  return (
    <div className={styles.row}>
      {linkPayloads.map((item) => (
        <PreviewCardTrigger
          key={item.title}
          handle={previewCardHandle}
          href={item.url}
          payload={item}
        >
          {item.title}
        </PreviewCardTrigger>
      ))}

      <PreviewCard handle={previewCardHandle}>
        {({ payload }) => (
          <PreviewCardContent>
            <PreviewCardPreview item={payload ?? linkPayloads[0]} />
          </PreviewCardContent>
        )}
      </PreviewCard>
    </div>
  );
}

export function SideControlPreviewCardExample() {
  const [side, setSide] = React.useState<PreviewCardSide>('bottom');

  return (
    <div className={styles.stack}>
      <div className={styles.sideButtons}>
        {previewCardSides.map((item) => (
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

      <PreviewCard>
        <PreviewCardTrigger href={linkPayloads[0].url}>Placement: {side}</PreviewCardTrigger>
        <PreviewCardContent side={side} className={styles.sidePopup}>
          <PreviewCardPreview
            item={{
              ...linkPayloads[0],
              summary: `Current side is ${side}. You can switch it with the buttons above.`,
            }}
          />
        </PreviewCardContent>
      </PreviewCard>
    </div>
  );
}

export function CustomArrowPreviewCardExample() {
  return (
    <PreviewCard>
      <PreviewCardTrigger href={linkPayloads[0].url}>Preview with custom arrow</PreviewCardTrigger>
      <PreviewCardContent className={styles.customArrowPopup} arrow={<CustomArrow />}>
        <PreviewCardPreview
          item={{
            ...linkPayloads[0],
            summary: 'Pass any React node to the arrow prop to use a custom SVG or icon.',
          }}
        />
      </PreviewCardContent>
    </PreviewCard>
  );
}

export function SlotCustomizationPreviewCardExample() {
  return (
    <PreviewCard>
      <PreviewCardTrigger className={styles.slotTrigger} href={linkPayloads[0].url}>
        Preview with styled slots
      </PreviewCardTrigger>
      <PreviewCardContent
        withBackdrop
        classNames={{
          backdrop: styles.backdrop,
          arrow: styles.slotArrow,
          viewport: styles.viewport,
        }}
      >
        <PreviewCardPreview
          item={{
            ...linkPayloads[0],
            summary:
              'Portal, backdrop, positioner, and viewport are rendered by PreviewCardContent.',
          }}
        />
      </PreviewCardContent>
    </PreviewCard>
  );
}

function PreviewCardPreview({ item }: { item: LinkPreviewPayload }) {
  return (
    <div className={styles.popupContent}>
      <img
        className={styles.image}
        alt={`Preview illustration for ${item.title}`}
        src={item.image}
      />
      <p className={styles.summary}>
        <strong>{item.title}</strong>
        <br />
        {item.summary}
      </p>
    </div>
  );
}

function CustomArrow() {
  return (
    <svg className={styles.customArrow} viewBox="0 0 16 8" fill="none" aria-hidden="true">
      <path d="M8 0L16 8H0L8 0Z" fill="currentColor" />
    </svg>
  );
}

type PreviewCardSide = Exclude<PreviewCardContentProps['side'], undefined>;