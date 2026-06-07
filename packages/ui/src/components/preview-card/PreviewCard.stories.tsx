import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardBackdrop,
  createPreviewCardHandle,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
  PreviewCardContent,
  PreviewCardViewport,
} from './PreviewCard';
import styles from './PreviewCard.stories.module.css';

const meta = {
  title: 'Components/PreviewCard',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

type LinkPreviewPayload = {
  title: string;
  summary: string;
  image: string;
  url: string;
};

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
      'Grid systems help organize content and maintain consistent spacing, alignment and visual hierarchy.',
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 720 420'%3E%3Crect width='720' height='420' fill='%230b1220'/%3E%3Cg stroke='%23ffffff40' stroke-width='2'%3E%3Cpath d='M80 40v340M170 40v340M260 40v340M350 40v340M440 40v340M530 40v340M620 40v340'/%3E%3Cpath d='M80 70h540M80 140h540M80 210h540M80 280h540M80 350h540'/%3E%3C/g%3E%3Crect x='80' y='70' width='170' height='70' fill='%230ea5e9aa'/%3E%3Crect x='260' y='140' width='350' height='140' fill='%2322c55e99'/%3E%3C/svg%3E",
    url: 'https://en.wikipedia.org/wiki/Grid_(graphic_design)',
  },
];

const SIDES = ['top', 'right', 'bottom', 'left'] as const;

export const DefaultPath: Story = {
  render: () => {
    return (
      <PreviewCard>
        <p className={styles.paragraph}>
          The principles of good{' '}
          <PreviewCardTrigger href="https://en.wikipedia.org/wiki/Typography">
            typography
          </PreviewCardTrigger>{' '}
          remain in the digital age.
        </p>
        <PreviewCardContent>
          <div className={styles.popupContent}>
            <img
              alt="Preview illustration for typography article"
              src={linkPayloads[0].image}
              className={styles.image}
            />
            <p className={styles.summary}>{linkPayloads[0].summary}</p>
          </div>
        </PreviewCardContent>
      </PreviewCard>
    );
  },
};

export const WithArrow: Story = {
  name: 'With Arrow',
  render: () => {
    return (
      <PreviewCard>
        <PreviewCardTrigger href={linkPayloads[0].url}>Preview with arrow</PreviewCardTrigger>
        <PreviewCardContent showArrow>
          <div className={styles.popupContent}>
            <img
              alt="Preview illustration for typography article"
              src={linkPayloads[0].image}
              className={styles.image}
            />
            <p className={styles.summary}>
              Enable <code>showArrow</code> when the popup should visually point to its trigger.
            </p>
          </div>
        </PreviewCardContent>
      </PreviewCard>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <PreviewCard open={open} onOpenChange={setOpen}>
        <PreviewCardTrigger href={linkPayloads[0].url}>Controlled preview card</PreviewCardTrigger>
        <PreviewCardContent>
          <div className={styles.popupContent}>
            <img
              alt="Preview illustration for typography article"
              src={linkPayloads[0].image}
              className={styles.image}
            />
            <p className={styles.summary}>
              State is controlled from Storybook via `open` and `onOpenChange`.
            </p>
          </div>
        </PreviewCardContent>
      </PreviewCard>
    );
  },
};

export const DetachedTrigger: Story = {
  name: 'Detached Trigger',
  render: () => {
    const previewCardHandle = React.useMemo(() => createPreviewCardHandle(), []);

    return (
      <div className={styles.row}>
        <PreviewCardTrigger handle={previewCardHandle} href={linkPayloads[0].url}>
          Open detached preview
        </PreviewCardTrigger>
        <PreviewCard handle={previewCardHandle}>
          <PreviewCardContent>
            <div className={styles.popupContent}>
              <img
                alt="Preview illustration for typography article"
                src={linkPayloads[0].image}
                className={styles.image}
              />
              <p className={styles.summary}>
                Trigger and popup are linked with `createPreviewCardHandle()`.
              </p>
            </div>
          </PreviewCardContent>
        </PreviewCard>
      </div>
    );
  },
};

export const MultipleTriggersWithPayload: Story = {
  name: 'Multiple Triggers With Payload',
  render: () => {
    const previewCardHandle = React.useMemo(
      () => createPreviewCardHandle<LinkPreviewPayload>(),
      [],
    );

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
              <div className={styles.popupContent}>
                <img
                  alt={`Preview illustration for ${payload?.title ?? 'article'}`}
                  src={payload?.image ?? linkPayloads[0].image}
                  className={styles.image}
                />
                <p className={styles.summary}>
                  <strong>{payload?.title ?? 'Preview'}</strong>
                  <br />
                  {payload?.summary ?? 'Move between links to see payload-based content changes.'}
                </p>
              </div>
            </PreviewCardContent>
          )}
        </PreviewCard>
      </div>
    );
  },
};

export const Placement: Story = {
  render: () => {
    const [side, setSide] = React.useState<(typeof SIDES)[number]>('bottom');

    return (
      <div className={styles.sideControl}>
        <div className={styles.sideButtons}>
          {SIDES.map((item) => (
            <button
              key={item}
              type="button"
              className={styles.sideButton}
              data-active={item === side ? '' : undefined}
              onClick={() => setSide(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <PreviewCard>
          <PreviewCardTrigger href={linkPayloads[0].url}>Placement: {side}</PreviewCardTrigger>
          <PreviewCardContent side={side} className={styles.sidePopup}>
            <img
              alt="Preview illustration for typography article"
              src={linkPayloads[0].image}
              className={styles.image}
            />
            <p className={styles.summary}>
              Current side is <strong>{side}</strong>.
            </p>
          </PreviewCardContent>
        </PreviewCard>
      </div>
    );
  },
};

export const CustomArrow: Story = {
  name: 'Custom Arrow',
  render: () => {
    return (
      <PreviewCard>
        <PreviewCardTrigger href={linkPayloads[0].url}>
          Preview with custom arrow
        </PreviewCardTrigger>
        <PreviewCardPortal>
          <PreviewCardPositioner>
            <PreviewCardPopup className={styles.customArrowPopup}>
              <PreviewCardArrow>
                <CustomArrowSvg />
              </PreviewCardArrow>
              <PreviewCardViewport>
                <div className={styles.popupContent}>
                  <p className={styles.summary}>
                    Custom arrow content now lives in explicit composition.
                  </p>
                </div>
              </PreviewCardViewport>
            </PreviewCardPopup>
          </PreviewCardPositioner>
        </PreviewCardPortal>
      </PreviewCard>
    );
  },
};

export const CustomComposition: Story = {
  name: 'Custom Composition',
  render: () => {
    return (
      <PreviewCard>
        <PreviewCardTrigger className={styles.slotTrigger} href={linkPayloads[0].url}>
          Preview with custom composition
        </PreviewCardTrigger>
        <PreviewCardPortal>
          <PreviewCardBackdrop className={styles.backdrop} />
          <PreviewCardPositioner side="right" sideOffset={12}>
            <PreviewCardPopup className={styles.composedPopup}>
              <PreviewCardArrow className={styles.slotArrow} />
              <PreviewCardViewport className={styles.viewport}>
                <div className={styles.popupContent}>
                  <p className={styles.summary}>
                    Portal, backdrop, arrow, and viewport stay available as explicit parts.
                  </p>
                </div>
              </PreviewCardViewport>
            </PreviewCardPopup>
          </PreviewCardPositioner>
        </PreviewCardPortal>
      </PreviewCard>
    );
  },
};

function CustomArrowSvg() {
  return (
    <svg className={styles.customArrow} viewBox="0 0 16 8" fill="none" aria-hidden="true">
      <path d="M8 0L16 8H0L8 0Z" fill="currentColor" />
    </svg>
  );
}