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

const paragraphClass = 'm-0 max-w-[33rem] text-md leading-6 text-foreground [&_svg]:size-[1em]';
const profileLinkClass = 'inline-flex items-center gap-1';
const stackClass = 'grid justify-items-center gap-3';
const buttonClass =
  'min-h-control-lg cursor-pointer rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition-[background-color,border-color] duration-200 ease-in-out [@media(hover:hover)]:hover:bg-accent';

function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <div className="grid w-[min(14rem,calc(100vw-4rem))]">
      <img
        className="aspect-video w-full rounded-md object-cover"
        alt="Sunlit workspace with a laptop and plants"
        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80"
      />
      <div className="mt-2 grid gap-1">
        <p className="m-0 text-md leading-6 font-bold text-popover-foreground">{profile.name}</p>
        <p className="m-0 text-sm leading-5 text-muted-foreground">{profile.bio}</p>
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
      <p className={paragraphClass}>
        Liked by{' '}
        <HoverCardTrigger asChild>
          <a className={profileLinkClass} href="#profile">
            @sarah_chen
          </a>
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
      <p className={paragraphClass}>
        Liked by{' '}
        <HoverCardTrigger asChild>
          <a className={profileLinkClass} href="#profile">
            @sarah_chen
          </a>
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
      <div className={stackClass}>
        <button type="button" className={buttonClass} onClick={() => setOpen(!open)}>
          Toggle
        </button>
        <HoverCard open={open} onOpenChange={(details) => setOpen(details.open)}>
          <p className={paragraphClass}>
            Liked by{' '}
            <HoverCardTrigger asChild>
              <a className={profileLinkClass} href="#profile">
                @sarah_chen
              </a>
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
      <div className={stackClass}>
        <output>Open: {String(hoverCard.open)}</output>
        <HoverCardRootProvider value={hoverCard}>
          <p className={paragraphClass}>
            Liked by{' '}
            <HoverCardTrigger asChild>
              <a className={profileLinkClass} href="#profile">
                @sarah_chen
              </a>
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
      <p className={paragraphClass}>
        Liked by{' '}
        <HoverCardTrigger asChild>
          <a className={profileLinkClass} href="#profile">
            @sarah_chen
          </a>
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
      <p className={paragraphClass}>
        Liked by{' '}
        <HoverCardTrigger asChild>
          <a className={profileLinkClass} href="#profile">
            @sarah_chen
          </a>
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
          <p className={paragraphClass}>
            Liked by{' '}
            <HoverCardTrigger asChild>
              <a className={profileLinkClass} href="#profile">
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
      <p className={paragraphClass}>
        Liked by{' '}
        <HoverCardTrigger asChild>
          <a className={profileLinkClass} href="#profile">
            @sarah_chen
          </a>
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
        <p className={paragraphClass}>
          Reviewed by{' '}
          {profiles.map((profile, index) => (
            <span key={profile.id}>
              <HoverCardTrigger value={profile.id} asChild>
                <a className={profileLinkClass} href={`#${profile.id}`}>
                  {profile.username}
                </a>
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