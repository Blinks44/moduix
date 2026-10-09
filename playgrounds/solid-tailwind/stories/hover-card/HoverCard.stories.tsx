import type { ComponentProps } from 'solid-js';
import { For, createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
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
import { ChevronDownIcon, ChevronUpIcon } from '@/internal/icons/ui/Icons';

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

function ProfileCard(props: { profile: Profile }) {
  return (
    <div class="grid w-[min(14rem,calc(100vw-4rem))]">
      <img
        class="aspect-video w-full rounded-md object-cover"
        alt="Sunlit workspace with a laptop and plants"
        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80"
      />
      <div class="mt-2 grid gap-1">
        <p class="m-0 text-md leading-6 font-bold text-popover-foreground">{props.profile.name}</p>
        <p class="m-0 text-sm leading-5 text-muted-foreground">{props.profile.bio}</p>
      </div>
    </div>
  );
}

function HoverCardSurface(props: { profile: Profile; withArrow?: boolean }) {
  return (
    <HoverCardPositioner>
      <HoverCardContent>
        {props.withArrow ? <HoverCardArrow /> : null}
        <HoverCardBody>
          <ProfileCard profile={props.profile} />
        </HoverCardBody>
      </HoverCardContent>
    </HoverCardPositioner>
  );
}

type HoverCardTriggerProps = ComponentProps<typeof HoverCardTrigger>;
type HoverCardTriggerAsChild = NonNullable<HoverCardTriggerProps['asChild']>;

const profileTrigger =
  (profile: Profile): HoverCardTriggerAsChild =>
  (triggerProps) => (
    <a {...triggerProps()} class={profileLinkClass} href={`#${profile.id}`}>
      {profile.username}
    </a>
  );

export const Basic: Story = {
  render: () => (
    <HoverCard>
      <p class={paragraphClass}>
        Liked by <HoverCardTrigger asChild={profileTrigger(profiles[0])} /> and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} />
    </HoverCard>
  ),
};

export const WithArrow: Story = {
  name: 'With Arrow',
  render: () => (
    <HoverCard>
      <p class={paragraphClass}>
        Liked by <HoverCardTrigger asChild={profileTrigger(profiles[0])} /> and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} withArrow />
    </HoverCard>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = createSignal(false);

    return (
      <div class={stackClass}>
        <button type="button" class={buttonClass} onClick={() => setOpen(!open())}>
          Toggle
        </button>
        <HoverCard open={open()} onOpenChange={(details) => setOpen(details.open)}>
          <p class={paragraphClass}>
            Liked by <HoverCardTrigger asChild={profileTrigger(profiles[0])} /> and 3 others
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
      <div class={stackClass}>
        <output>Open: {String(hoverCard().open)}</output>
        <HoverCardRootProvider value={hoverCard}>
          <p class={paragraphClass}>
            Liked by <HoverCardTrigger asChild={profileTrigger(profiles[0])} /> and 3 others
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
      <p class={paragraphClass}>
        Liked by <HoverCardTrigger asChild={profileTrigger(profiles[0])} /> and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} />
    </HoverCard>
  ),
};

export const Positioning: Story = {
  render: () => (
    <HoverCard positioning={{ placement: 'right', gutter: 12 }}>
      <p class={paragraphClass}>
        Liked by <HoverCardTrigger asChild={profileTrigger(profiles[0])} /> and 3 others
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
          <p class={paragraphClass}>
            Liked by{' '}
            <HoverCardTrigger
              asChild={(triggerProps) => (
                <a {...triggerProps()} class={profileLinkClass} href="#profile">
                  @sarah_chen {context().open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </a>
              )}
            />{' '}
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
      <p class={paragraphClass}>
        Liked by <HoverCardTrigger asChild={profileTrigger(profiles[0])} /> and 3 others
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
        <p class={paragraphClass}>
          Reviewed by{' '}
          <For each={profiles}>
            {(profile, index) => (
              <>
                <HoverCardTrigger
                  value={profile.id}
                  asChild={(triggerProps) => (
                    <a {...triggerProps()} class={profileLinkClass} href={`#${profile.id}`}>
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