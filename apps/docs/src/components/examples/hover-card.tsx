import { Dialog, HoverCard, useHoverCard } from '@moduix/react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/preview';
import { CSSPropertiesReferenceTable } from '../mdx/preview';
import './hover-card.css';

type Profile = {
  id: string;
  name: string;
  username: string;
  bio: string;
};

export const hoverCardProfiles: Profile[] = [
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

export function DisabledHoverCardExample() {
  return (
    <HoverCard disabled>
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

export function DialogHoverCardExample() {
  const titleRef = React.useRef<HTMLHeadingElement>(null);

  return (
    <Dialog initialFocusEl={() => titleRef.current}>
      <Dialog.Trigger asChild>
        <button type="button" className="hover-card-example__button">
          View profile
        </button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title ref={titleRef} tabIndex={-1}>
              Profile
            </Dialog.Title>
          </Dialog.Header>
          <HoverCard portalled={false}>
            <HoverCard.Trigger asChild>
              <a href="#profile">@sarah_chen</a>
            </HoverCard.Trigger>
            <HoverCardSurface profile={hoverCardProfiles[0]} />
          </HoverCard>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
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