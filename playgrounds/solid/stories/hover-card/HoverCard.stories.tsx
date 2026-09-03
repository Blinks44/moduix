import type { ComponentProps } from 'solid-js';
import { For, createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { HoverCard, useHoverCard } from '@/components/hover-card/HoverCard';
import { ChevronDownIcon, ChevronUpIcon } from '@/internal/icons/ui/Icons';
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

function ProfileCard(props: { profile: Profile }) {
  return (
    <div class={styles.card}>
      <img
        class={styles.image}
        alt="Sunlit workspace with a laptop and plants"
        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80"
      />
      <div class={styles.content}>
        <p class={styles.name}>{props.profile.name}</p>
        <p class={styles.bio}>{props.profile.bio}</p>
      </div>
    </div>
  );
}

function HoverCardSurface(props: { profile: Profile; withArrow?: boolean }) {
  return (
    <HoverCard.Positioner>
      <HoverCard.Content>
        {props.withArrow ? <HoverCard.Arrow /> : null}
        <HoverCard.Body>
          <ProfileCard profile={props.profile} />
        </HoverCard.Body>
      </HoverCard.Content>
    </HoverCard.Positioner>
  );
}

type HoverCardTriggerProps = ComponentProps<typeof HoverCard.Trigger>;
type HoverCardTriggerAsChild = NonNullable<HoverCardTriggerProps['asChild']>;

const profileTrigger =
  (profile: Profile): HoverCardTriggerAsChild =>
  (triggerProps) => (
    <a {...triggerProps()} href={`#${profile.id}`}>
      {profile.username}
    </a>
  );

export const Basic: Story = {
  render: () => (
    <HoverCard>
      <p class={styles.paragraph}>
        Liked by <HoverCard.Trigger asChild={profileTrigger(profiles[0])} /> and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} />
    </HoverCard>
  ),
};

export const WithArrow: Story = {
  name: 'With Arrow',
  render: () => (
    <HoverCard>
      <p class={styles.paragraph}>
        Liked by <HoverCard.Trigger asChild={profileTrigger(profiles[0])} /> and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} withArrow />
    </HoverCard>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = createSignal(false);

    return (
      <div class={styles.stack}>
        <button type="button" class={styles.button} onClick={() => setOpen(!open())}>
          Toggle
        </button>
        <HoverCard open={open()} onOpenChange={(details) => setOpen(details.open)}>
          <p class={styles.paragraph}>
            Liked by <HoverCard.Trigger asChild={profileTrigger(profiles[0])} /> and 3 others
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
      <div class={styles.stack}>
        <output>Open: {String(hoverCard().open)}</output>
        <HoverCard.RootProvider value={hoverCard}>
          <p class={styles.paragraph}>
            Liked by <HoverCard.Trigger asChild={profileTrigger(profiles[0])} /> and 3 others
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
      <p class={styles.paragraph}>
        Liked by <HoverCard.Trigger asChild={profileTrigger(profiles[0])} /> and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} />
    </HoverCard>
  ),
};

export const Positioning: Story = {
  render: () => (
    <HoverCard positioning={{ placement: 'right', gutter: 12 }}>
      <p class={styles.paragraph}>
        Liked by <HoverCard.Trigger asChild={profileTrigger(profiles[0])} /> and 3 others
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
          <p class={styles.paragraph}>
            Liked by{' '}
            <HoverCard.Trigger
              asChild={(triggerProps) => (
                <a {...triggerProps()} href="#sarah">
                  @sarah_chen {context().open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </a>
              )}
            />{' '}
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
      <p class={styles.paragraph}>
        Liked by <HoverCard.Trigger asChild={profileTrigger(profiles[0])} /> and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} />
    </HoverCard>
  ),
};

export const MultipleTriggers: Story = {
  name: 'Multiple Triggers',
  render: () => {
    const [activeProfile, setActiveProfile] = createSignal<Profile | null>(profiles[0]);

    return (
      <HoverCard
        onTriggerValueChange={(details) => {
          setActiveProfile(profiles.find((profile) => profile.id === details.value) ?? null);
        }}
      >
        <p class={styles.paragraph}>
          Reviewed by{' '}
          <For each={profiles}>
            {(profile, index) => (
              <>
                <HoverCard.Trigger
                  value={profile.id}
                  asChild={(triggerProps) => (
                    <a {...triggerProps()} href={`#${profile.id}`}>
                      {profile.username}
                    </a>
                  )}
                />
                {index() < profiles.length - 2 ? ', ' : null}
                {index() === profiles.length - 2 ? ', and ' : null}
              </>
            )}
          </For>
        </p>
        {activeProfile() ? <HoverCardSurface profile={activeProfile()!} /> : null}
      </HoverCard>
    );
  },
};