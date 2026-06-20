import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import * as React from 'react';
import { HoverCard, useHoverCard } from './HoverCard';
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
  image: string;
  bio: string;
};

const profiles: Profile[] = [
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

function PreviewCardContent({ profile }: { profile: Profile; compact?: boolean }) {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={profile.image} alt={profile.name} />
      <p className={styles.name}>{profile.name}</p>
      <p className={styles.bio}>{profile.bio}</p>
    </div>
  );
}

function HoverCardSurface({ profile }: { profile: Profile; compact?: boolean }) {
  return (
    <HoverCard.Portal>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow />
          <PreviewCardContent profile={profile} />
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard.Portal>
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
          <HoverCardSurface profile={profiles[0]} compact />
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
          <HoverCardSurface profile={profiles[0]} compact />
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
      <HoverCardSurface profile={profiles[0]} compact />
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
      <HoverCardSurface profile={profiles[0]} compact />
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
      <HoverCardSurface profile={profiles[0]} compact />
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
                <a href={`#${profile.id}`}>{profile.name}</a>
              </HoverCard.Trigger>
              {index < profiles.length - 2 ? ', ' : null}
              {index === profiles.length - 2 ? ', and ' : null}
            </React.Fragment>
          ))}
        </p>
        {activeProfile ? <HoverCardSurface profile={activeProfile} compact /> : null}
      </HoverCard>
    );
  },
};