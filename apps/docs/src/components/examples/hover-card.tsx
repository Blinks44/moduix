import { HoverCard, useHoverCard } from '@moduix/react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';
import './hover-card.css';

type Profile = {
  id: string;
  name: string;
  username: string;
  bio: string;
};

const hoverCardProfiles: Profile[] = [
  {
    id: 'sarah',
    name: 'Sarah Chen',
    username: '@sarah_chen',
    bio: 'Design Engineer at Acme Inc. Building beautiful interfaces and design systems.',
  },
  {
    id: 'alex',
    name: 'Alex Rivera',
    username: '@alex_r',
    bio: 'Full-stack developer and open source contributor.',
  },
  {
    id: 'jordan',
    name: 'Jordan Lee',
    username: '@jordan_lee',
    bio: 'DevOps lead. Automating all the things.',
  },
];

const hoverCardOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-hover-card-arrow-size', 'var(--moduix-spacing-2-5)', 'Controls the Ark arrow size.'],
  [
    '--moduix-hover-card-arrow-stroke-color',
    'var(--moduix-hover-card-border-color, var(--moduix-color-border))',
    'Controls arrow border color.',
  ],
  [
    '--moduix-hover-card-bg',
    'var(--moduix-color-popover)',
    'Controls the content background color.',
  ],
  [
    '--moduix-hover-card-border-color',
    'var(--moduix-color-border)',
    'Controls the content border color.',
  ],
  [
    '--moduix-hover-card-border-width',
    'var(--moduix-border-width-sm)',
    'Controls content border width.',
  ],
  [
    '--moduix-hover-card-color',
    'var(--moduix-color-popover-foreground)',
    'Controls the content text color.',
  ],
  ['--moduix-hover-card-content-ending-opacity', '0', 'Controls the content opacity at exit.'],
  [
    '--moduix-hover-card-content-ending-scale',
    'var(--moduix-scale-popup)',
    'Controls the content scale at exit.',
  ],
  ['--moduix-hover-card-content-ending-translate-x', '0', 'Controls the content x offset at exit.'],
  ['--moduix-hover-card-content-ending-translate-y', '0', 'Controls the content y offset at exit.'],
  ['--moduix-hover-card-content-starting-opacity', '0', 'Controls the content opacity at entry.'],
  [
    '--moduix-hover-card-content-starting-scale',
    'var(--moduix-scale-popup)',
    'Controls the content scale at entry.',
  ],
  [
    '--moduix-hover-card-content-starting-translate-x',
    '0',
    'Controls the content x offset at entry.',
  ],
  [
    '--moduix-hover-card-content-starting-translate-y',
    '0',
    'Controls the content y offset at entry.',
  ],
  [
    '--moduix-hover-card-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  [
    '--moduix-hover-card-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls trigger focus ring color.',
  ],
  [
    '--moduix-hover-card-focus-ring-width',
    'var(--moduix-focus-ring-width, var(--moduix-border-width-md))',
    'Controls focus ring width.',
  ],
  ['--moduix-hover-card-height', 'auto', 'Controls the content height.'],
  ['--moduix-hover-card-max-height', '24rem', 'Controls the content max height.'],
  ['--moduix-hover-card-max-width', '24rem', 'Controls the content max width.'],
  ['--moduix-hover-card-min-width', '14rem', 'Controls the content min width.'],
  [
    '--moduix-hover-card-padding-x',
    'var(--moduix-spacing-2)',
    'Controls horizontal content padding.',
  ],
  [
    '--moduix-hover-card-padding-y',
    'var(--moduix-spacing-2)',
    'Controls vertical content padding.',
  ],
  ['--moduix-hover-card-radius', 'var(--moduix-radius-lg)', 'Controls content border radius.'],
  ['--moduix-hover-card-shadow', 'var(--moduix-shadow-lg)', 'Controls content shadow.'],
  [
    '--moduix-hover-card-transition',
    'var(--moduix-duration-fast)',
    'Controls content and trigger motion.',
  ],
  [
    '--moduix-hover-card-trigger-color',
    'var(--moduix-color-primary)',
    'Controls trigger text color.',
  ],
  [
    '--moduix-hover-card-trigger-decoration-color',
    'color-mix(in oklab, var(--moduix-hover-card-trigger-color, var(--moduix-color-primary)), transparent 40%)',
    'Controls trigger underline color.',
  ],
  [
    '--moduix-hover-card-trigger-decoration-color-hover',
    'var(--moduix-hover-card-trigger-color, var(--moduix-color-primary))',
    'Controls trigger underline color on hover.',
  ],
  [
    '--moduix-hover-card-trigger-decoration-color-open',
    'var(--moduix-hover-card-trigger-color, var(--moduix-color-primary))',
    'Controls trigger underline color while open.',
  ],
  [
    '--moduix-hover-card-trigger-decoration-thickness',
    '1px',
    'Controls trigger underline thickness.',
  ],
  [
    '--moduix-hover-card-trigger-focus-offset',
    'var(--moduix-focus-ring-offset)',
    'Controls trigger focus outline offset.',
  ],
  [
    '--moduix-hover-card-trigger-focus-radius',
    'var(--moduix-radius-xs)',
    'Controls trigger focus radius.',
  ],
  [
    '--moduix-hover-card-trigger-gap',
    'var(--moduix-spacing-1)',
    'Controls inline trigger content gap.',
  ],
  ['--moduix-hover-card-trigger-underline-offset', '2px', 'Controls trigger underline offset.'],
  ['--moduix-hover-card-width', 'auto', 'Controls the content width.'],
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
        <HoverCardSurface profile={hoverCardProfiles[0]} />
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
        <HoverCardSurface profile={hoverCardProfiles[0]} />
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
      <HoverCardSurface profile={hoverCardProfiles[0]} />
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
      <HoverCardSurface profile={hoverCardProfiles[0]} />
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
      <HoverCardSurface profile={hoverCardProfiles[0]} />
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
              <a href={`#${profile.id}`}>{profile.username}</a>
            </HoverCard.Trigger>
            {index < hoverCardProfiles.length - 2 ? ', ' : null}
            {index === hoverCardProfiles.length - 2 ? ', and ' : null}
          </React.Fragment>
        ))}
      </p>
      {activeProfile ? <HoverCardSurface profile={activeProfile} /> : null}
    </HoverCard>
  );
}

function HoverCardSurface({ profile }: { profile: Profile }) {
  return (
    <HoverCard.Positioner>
      <HoverCard.Content>
        <HoverCard.Arrow />
        <ProfileCard profile={profile} />
      </HoverCard.Content>
    </HoverCard.Positioner>
  );
}

function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <div className="hover-card-example__card">
      <p className="hover-card-example__name">{profile.name}</p>
      <p className="hover-card-example__username">{profile.username}</p>
      <p className="hover-card-example__bio">{profile.bio}</p>
    </div>
  );
}