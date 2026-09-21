import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  HoverCard,
  HoverCardArrow,
  HoverCardBody,
  HoverCardContent,
  HoverCardContext,
  HoverCardPositioner,
  HoverCardRootProvider,
  HoverCardTrigger,
  useHoverCard,
} from '@/components/hover-card/HoverCard';
import { ChevronDownIcon, ChevronUpIcon } from '@/lib/moduix/icons/ui';
import styles from './HoverCard.stories.module.css';

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HoverCard>;

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
      <img
        className={styles.image}
        alt="Sunlit workspace with a laptop and plants"
        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80"
      />
      <div className={styles.content}>
        <p className={styles.name}>{profile.name}</p>
        <p className={styles.bio}>{profile.bio}</p>
      </div>
    </div>
  );
}

function HoverCardSurface({
  profile,
  withArrow = false,
}: {
  profile: Profile;
  withArrow?: boolean;
}) {
  return (
    <HoverCardPositioner>
      <HoverCardContent>
        {withArrow ? <HoverCardArrow /> : null}
        <HoverCardBody>
          <ProfileCard profile={profile} />
        </HoverCardBody>
      </HoverCardContent>
    </HoverCardPositioner>
  );
}

export const Basic: Story = {
  render: () => (
    <HoverCard>
      <p className={styles.paragraph}>
        Liked by{' '}
        <HoverCardTrigger asChild>
          <a href="#profile">@sarah_chen</a>
        </HoverCardTrigger>{' '}
        and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} />
    </HoverCard>
  ),
};

export const WithArrow: Story = {
  name: 'With Arrow',
  render: () => (
    <HoverCard>
      <p className={styles.paragraph}>
        Liked by{' '}
        <HoverCardTrigger asChild>
          <a href="#profile">@sarah_chen</a>
        </HoverCardTrigger>{' '}
        and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} withArrow />
    </HoverCard>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className={styles.stack}>
        <button type="button" className={styles.button} onClick={() => setOpen(!open)}>
          Toggle
        </button>
        <HoverCard open={open} onOpenChange={(details) => setOpen(details.open)}>
          <p className={styles.paragraph}>
            Liked by{' '}
            <HoverCardTrigger asChild>
              <a href="#profile">@sarah_chen</a>
            </HoverCardTrigger>{' '}
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
        <HoverCardRootProvider value={hoverCard}>
          <p className={styles.paragraph}>
            Liked by{' '}
            <HoverCardTrigger asChild>
              <a href="#profile">@sarah_chen</a>
            </HoverCardTrigger>{' '}
            and 3 others
          </p>
          <HoverCardSurface profile={profiles[0]} />
        </HoverCardRootProvider>
      </div>
    );
  },
};

export const Delay: Story = {
  render: () => (
    <HoverCard openDelay={200} closeDelay={500}>
      <p className={styles.paragraph}>
        Liked by{' '}
        <HoverCardTrigger asChild>
          <a href="#profile">@sarah_chen</a>
        </HoverCardTrigger>{' '}
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
        <HoverCardTrigger asChild>
          <a href="#profile">@sarah_chen</a>
        </HoverCardTrigger>{' '}
        and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} />
    </HoverCard>
  ),
};

export const Context: Story = {
  render: () => (
    <HoverCard>
      <HoverCardContext>
        {(context) => (
          <p className={styles.paragraph}>
            Liked by{' '}
            <HoverCardTrigger asChild>
              <a href="#profile">
                @sarah_chen {context.open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </a>
            </HoverCardTrigger>{' '}
            and 3 others
          </p>
        )}
      </HoverCardContext>
      <HoverCardSurface profile={profiles[0]} />
    </HoverCard>
  ),
};

export const Disabled: Story = {
  render: () => (
    <HoverCard disabled>
      <p className={styles.paragraph}>
        Liked by{' '}
        <HoverCardTrigger asChild>
          <a href="#profile">@sarah_chen</a>
        </HoverCardTrigger>{' '}
        and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} />
    </HoverCard>
  ),
};

export const MultipleTriggers: Story = {
  name: 'Multiple Triggers',
  render: () => {
    const [activeProfile, setActiveProfile] = useState<Profile | null>(profiles[0]);

    return (
      <HoverCard
        onTriggerValueChange={(details) => {
          setActiveProfile(profiles.find((profile) => profile.id === details.value) ?? null);
        }}
      >
        <p className={styles.paragraph}>
          Reviewed by{' '}
          {profiles.map((profile, index) => (
            <span key={profile.id}>
              <HoverCardTrigger value={profile.id} asChild>
                <a href={`#${profile.id}`}>{profile.username}</a>
              </HoverCardTrigger>
              {index < profiles.length - 2 ? ', ' : null}
              {index === profiles.length - 2 ? ', and ' : null}
            </span>
          ))}
        </p>
        {activeProfile ? <HoverCardSurface profile={activeProfile} /> : null}
      </HoverCard>
    );
  },
};
