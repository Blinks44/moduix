import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@/lib/moduix/icons/ui';
import { HoverCard, useHoverCard } from '../../../src/components/hover-card/HoverCard';
import styles from './HoverCard.stories.module.css';

const meta = {
  title: 'Components/HoverCard',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

type Profile = {
  id: string;
  name: string;
  username: string;
  bio: string;
};

const profiles: Profile[] = [
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

function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <div className={styles.card}>
      <p className={styles.name}>{profile.name}</p>
      <p className={styles.username}>{profile.username}</p>
      <p className={styles.bio}>{profile.bio}</p>
    </div>
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

export const Basic: Story = {
  render: () => (
    <HoverCard>
      <p className={styles.paragraph}>
        Liked by{' '}
        <HoverCard.Trigger asChild>
          <a href="#profile">@sarah_chen</a>
        </HoverCard.Trigger>{' '}
        and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} />
    </HoverCard>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className={styles.stack}>
        <button type="button" className={styles.button} onClick={() => setOpen(!open)}>
          Toggle
        </button>
        <HoverCard open={open} onOpenChange={(details) => setOpen(details.open)}>
          <p className={styles.paragraph}>
            Liked by{' '}
            <HoverCard.Trigger asChild>
              <a href="#profile">@sarah_chen</a>
            </HoverCard.Trigger>{' '}
            and 3 others
          </p>
          <HoverCardSurface profile={profiles[0]} />
        </HoverCard>
      </div>
    );
  },
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: () => {
    const hoverCard = useHoverCard();

    return (
      <div className={styles.stack}>
        <output>Open: {String(hoverCard.open)}</output>
        <HoverCard.RootProvider value={hoverCard}>
          <p className={styles.paragraph}>
            Liked by{' '}
            <HoverCard.Trigger asChild>
              <a href="#profile">@sarah_chen</a>
            </HoverCard.Trigger>{' '}
            and 3 others
          </p>
          <HoverCardSurface profile={profiles[0]} />
        </HoverCard.RootProvider>
      </div>
    );
  },
};

export const Delay: Story = {
  render: () => (
    <HoverCard openDelay={200} closeDelay={500}>
      <p className={styles.paragraph}>
        Liked by{' '}
        <HoverCard.Trigger asChild>
          <a href="#profile">@sarah_chen</a>
        </HoverCard.Trigger>{' '}
        and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} />
    </HoverCard>
  ),
};

export const Positioning: Story = {
  render: () => (
    <HoverCard positioning={{ placement: 'right', gutter: 12 }}>
      <p className={styles.paragraph}>
        Liked by{' '}
        <HoverCard.Trigger asChild>
          <a href="#profile">@sarah_chen</a>
        </HoverCard.Trigger>{' '}
        and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} />
    </HoverCard>
  ),
};

export const Context: Story = {
  render: () => (
    <HoverCard>
      <HoverCard.Context>
        {(context) => (
          <p className={styles.paragraph}>
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
      <HoverCardSurface profile={profiles[0]} />
    </HoverCard>
  ),
};

export const Disabled: Story = {
  render: () => (
    <HoverCard disabled>
      <p className={styles.paragraph}>
        Liked by{' '}
        <HoverCard.Trigger asChild>
          <a href="#profile">@sarah_chen</a>
        </HoverCard.Trigger>{' '}
        and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} />
    </HoverCard>
  ),
};

export const MultipleTriggers: Story = {
  name: 'Multiple Triggers',
  render: () => {
    const [activeProfile, setActiveProfile] = React.useState<Profile | null>(profiles[0]);

    return (
      <HoverCard
        onTriggerValueChange={(details) => {
          setActiveProfile(profiles.find((profile) => profile.id === details.value) ?? null);
        }}
      >
        <p className={styles.paragraph}>
          Reviewed by{' '}
          {profiles.map((profile, index) => (
            <React.Fragment key={profile.id}>
              <HoverCard.Trigger value={profile.id} asChild>
                <a href={`#${profile.id}`}>{profile.username}</a>
              </HoverCard.Trigger>
              {index < profiles.length - 2 ? ', ' : null}
              {index === profiles.length - 2 ? ', and ' : null}
            </React.Fragment>
          ))}
        </p>
        {activeProfile ? <HoverCardSurface profile={activeProfile} /> : null}
      </HoverCard>
    );
  },
};