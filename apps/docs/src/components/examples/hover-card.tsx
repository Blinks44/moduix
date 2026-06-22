import { HoverCard, Portal, useHoverCard } from '@moduix/react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import './hover-card.css';

type Profile = {
  id: string;
  name: string;
  image: string;
  bio: string;
};

export const hoverCardProfiles: Profile[] = [
  {
    id: 'sarah',
    name: 'Typography',
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 720 420'%3E%3Cdefs%3E%3ClinearGradient id='bg1' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23141e30'/%3E%3Cstop stop-color='%2324374f' offset='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='720' height='420' fill='url(%23bg1)'/%3E%3Ctext x='48' y='110' fill='%23f8fafc' font-family='Arial' font-size='68' font-weight='700'%3EType%3C/text%3E%3Crect x='48' y='150' width='624' height='200' rx='24' fill='%23ffffff1f'/%3E%3Ctext x='76' y='230' fill='%23f8fafc' font-family='Arial' font-size='34'%3EReadability and rhythm%3C/text%3E%3C/svg%3E",
    bio: 'Typography is the art and technique of arranging type to make written language readable and expressive.',
  },
  {
    id: 'alex',
    name: 'Grid systems',
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 720 420'%3E%3Crect width='720' height='420' fill='%230b1220'/%3E%3Cg stroke='%23ffffff40' stroke-width='2'%3E%3Cpath d='M80 40v340M170 40v340M260 40v340M350 40v340M440 40v340M530 40v340M620 40v340'/%3E%3Cpath d='M80 70h540M80 140h540M80 210h540M80 280h540M80 350h540'/%3E%3C/g%3E%3Crect x='80' y='70' width='170' height='70' fill='%230ea5e9aa'/%3E%3Crect x='260' y='140' width='350' height='140' fill='%2322c55e99'/%3E%3C/svg%3E",
    bio: 'Grid systems help organize content and maintain consistent spacing, alignment, and visual hierarchy.',
  },
  {
    id: 'jordan',
    name: 'Motion design',
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 720 420'%3E%3Cdefs%3E%3ClinearGradient id='bg2' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%230f172a'/%3E%3Cstop stop-color='%23334155' offset='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='720' height='420' fill='url(%23bg2)'/%3E%3Ccircle cx='180' cy='210' r='82' fill='%23f59e0b' fill-opacity='.9'/%3E%3Ccircle cx='360' cy='170' r='52' fill='%23fb7185' fill-opacity='.88'/%3E%3Ccircle cx='520' cy='240' r='108' fill='%2338bdf8' fill-opacity='.82'/%3E%3C/svg%3E",
    bio: 'Motion design adds hierarchy and feedback, helping interfaces feel clear without adding visual noise.',
  },
];

export const hoverCardOverrideCssProperties: CssPropertyInput[] = [
  ['--hover-card-arrow-size', '0.625rem', 'Controls the Ark arrow size.'],
  [
    '--hover-card-arrow-stroke-color',
    'var(--hover-card-border-color, var(--color-border))',
    'Controls arrow border color.',
  ],
  ['--hover-card-bg', 'var(--color-popover)', 'Controls the content background color.'],
  ['--hover-card-border-color', 'var(--color-border)', 'Controls the content border color.'],
  ['--hover-card-border-width', 'var(--border-width-sm)', 'Controls content border width.'],
  ['--hover-card-color', 'var(--color-popover-foreground)', 'Controls the content text color.'],
  ['--hover-card-content-ending-opacity', '0', 'Controls the content opacity at exit.'],
  [
    '--hover-card-content-ending-scale',
    'var(--scale-popup)',
    'Controls the content scale at exit.',
  ],
  ['--hover-card-content-ending-translate-x', '0', 'Controls the content x offset at exit.'],
  ['--hover-card-content-ending-translate-y', '0', 'Controls the content y offset at exit.'],
  ['--hover-card-content-starting-opacity', '0', 'Controls the content opacity at entry.'],
  [
    '--hover-card-content-starting-scale',
    'var(--scale-popup)',
    'Controls the content scale at entry.',
  ],
  ['--hover-card-content-starting-translate-x', '0', 'Controls the content x offset at entry.'],
  ['--hover-card-content-starting-translate-y', '0', 'Controls the content y offset at entry.'],
  ['--hover-card-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--hover-card-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
  ['--hover-card-focus-ring-width', 'var(--border-width-sm)', 'Controls focus ring width.'],
  ['--hover-card-height', 'auto', 'Controls the content height.'],
  ['--hover-card-max-height', '24rem', 'Controls the content max height.'],
  ['--hover-card-max-width', '24rem', 'Controls the content max width.'],
  ['--hover-card-min-width', '14rem', 'Controls the content min width.'],
  ['--hover-card-padding-x', 'var(--spacing-2)', 'Controls horizontal content padding.'],
  ['--hover-card-padding-y', 'var(--spacing-2)', 'Controls vertical content padding.'],
  ['--hover-card-radius', 'var(--radius-lg)', 'Controls content border radius.'],
  ['--hover-card-shadow', 'var(--shadow-lg)', 'Controls content shadow.'],
  ['--hover-card-transition', 'var(--duration-fast)', 'Controls content and trigger motion.'],
  ['--hover-card-trigger-color', 'var(--color-primary)', 'Controls trigger text color.'],
  [
    '--hover-card-trigger-decoration-color',
    'color-mix(in oklab, var(--hover-card-trigger-color), transparent 40%)',
    'Controls trigger underline color.',
  ],
  [
    '--hover-card-trigger-decoration-color-hover',
    'var(--hover-card-trigger-color)',
    'Controls trigger underline color on hover.',
  ],
  [
    '--hover-card-trigger-decoration-color-open',
    'var(--hover-card-trigger-color)',
    'Controls trigger underline color while open.',
  ],
  ['--hover-card-trigger-decoration-thickness', '1px', 'Controls trigger underline thickness.'],
  ['--hover-card-trigger-focus-offset', '1px', 'Controls trigger focus outline offset.'],
  ['--hover-card-trigger-focus-radius', 'var(--radius-xs)', 'Controls trigger focus radius.'],
  ['--hover-card-trigger-gap', '0.25rem', 'Controls inline trigger content gap.'],
  ['--hover-card-trigger-underline-offset', '2px', 'Controls trigger underline offset.'],
  ['--hover-card-width', 'auto', 'Controls the content width.'],
];

export function HoverCardCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={hoverCardOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function HoverCardExample() {
  return (
    <HoverCard>
      <p className="hover-card-example__paragraph">
        Liked by{' '}
        <HoverCard.Trigger asChild>
          <a href="#profile">@sarah_chen</a>
        </HoverCard.Trigger>{' '}
        and 3 others
      </p>
      <HoverCardSurface profile={hoverCardProfiles[0]} />
    </HoverCard>
  );
}

export function ControlledHoverCardExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="hover-card-example__stack">
      <button type="button" className="hover-card-example__button" onClick={() => setOpen(!open)}>
        Toggle
      </button>
      <HoverCard open={open} onOpenChange={(details) => setOpen(details.open)}>
        <p className="hover-card-example__paragraph">
          Liked by{' '}
          <HoverCard.Trigger asChild>
            <a href="#profile">@sarah_chen</a>
          </HoverCard.Trigger>{' '}
          and 3 others
        </p>
        <HoverCardSurface profile={hoverCardProfiles[0]} compact />
      </HoverCard>
    </div>
  );
}

export function RootProviderHoverCardExample() {
  const hoverCard = useHoverCard();

  return (
    <div className="hover-card-example__stack">
      <output>Open: {String(hoverCard.open)}</output>
      <HoverCard.RootProvider value={hoverCard}>
        <p className="hover-card-example__paragraph">
          Liked by{' '}
          <HoverCard.Trigger asChild>
            <a href="#profile">@sarah_chen</a>
          </HoverCard.Trigger>{' '}
          and 3 others
        </p>
        <HoverCardSurface profile={hoverCardProfiles[0]} compact />
      </HoverCard.RootProvider>
    </div>
  );
}

export function DelayHoverCardExample() {
  return (
    <HoverCard openDelay={200} closeDelay={500}>
      <p className="hover-card-example__paragraph">
        Liked by{' '}
        <HoverCard.Trigger asChild>
          <a href="#profile">@sarah_chen</a>
        </HoverCard.Trigger>{' '}
        and 3 others
      </p>
      <HoverCardSurface profile={hoverCardProfiles[0]} compact />
    </HoverCard>
  );
}

export function PositioningHoverCardExample() {
  return (
    <HoverCard positioning={{ placement: 'right', gutter: 12 }}>
      <p className="hover-card-example__paragraph">
        Liked by{' '}
        <HoverCard.Trigger asChild>
          <a href="#profile">@sarah_chen</a>
        </HoverCard.Trigger>{' '}
        and 3 others
      </p>
      <HoverCardSurface profile={hoverCardProfiles[0]} compact />
    </HoverCard>
  );
}

export function ContextHoverCardExample() {
  return (
    <HoverCard>
      <HoverCard.Context>
        {(context) => (
          <p className="hover-card-example__paragraph">
            Liked by{' '}
            <HoverCard.Trigger asChild>
              <a href="#profile">
                @sarah_chen {context.open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </a>
            </HoverCard.Trigger>{' '}
            and 3 others
          </p>
        )}
      </HoverCard.Context>
      <HoverCardSurface profile={hoverCardProfiles[0]} compact />
    </HoverCard>
  );
}

export function MultipleTriggersHoverCardExample() {
  const [activeProfile, setActiveProfile] = React.useState<Profile | null>(hoverCardProfiles[0]);

  return (
    <HoverCard
      onTriggerValueChange={(details) => {
        setActiveProfile(hoverCardProfiles.find((profile) => profile.id === details.value) ?? null);
      }}
    >
      <p className="hover-card-example__paragraph">
        Reviewed by{' '}
        {hoverCardProfiles.map((profile, index) => (
          <React.Fragment key={profile.id}>
            <HoverCard.Trigger value={profile.id} asChild>
              <a href={`#${profile.id}`}>{profile.name}</a>
            </HoverCard.Trigger>
            {index < hoverCardProfiles.length - 2 ? ', ' : null}
            {index === hoverCardProfiles.length - 2 ? ', and ' : null}
          </React.Fragment>
        ))}
      </p>
      {activeProfile ? <HoverCardSurface profile={activeProfile} compact /> : null}
    </HoverCard>
  );
}

export function CustomStylingHoverCardExample() {
  return (
    <HoverCard positioning={{ placement: 'bottom-start', gutter: 10 }}>
      <p className="hover-card-example__paragraph">
        Liked by{' '}
        <HoverCard.Trigger className="hover-card-example__custom-trigger" asChild>
          <a href="#profile">@sarah_chen</a>
        </HoverCard.Trigger>{' '}
        and 3 others
      </p>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content className="hover-card-example__custom-content">
            <HoverCard.Arrow className="hover-card-example__custom-arrow" />
            <PreviewCardContent profile={hoverCardProfiles[0]} />
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard>
  );
}

function HoverCardSurface({ profile }: { profile: Profile; compact?: boolean }) {
  return (
    <Portal>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow />
          <PreviewCardContent profile={profile} />
        </HoverCard.Content>
      </HoverCard.Positioner>
    </Portal>
  );
}

function PreviewCardContent({ profile }: { profile: Profile }) {
  return (
    <div className="hover-card-example__card">
      <img className="hover-card-example__image" src={profile.image} alt={profile.name} />
      <p className="hover-card-example__name">{profile.name}</p>
      <p className="hover-card-example__bio">{profile.bio}</p>
    </div>
  );
}