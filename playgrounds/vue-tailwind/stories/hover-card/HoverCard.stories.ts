import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref, type PropType } from 'vue';
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
} from '@/components/hover-card';
import { ChevronDownIcon, ChevronUpIcon } from '@/lib/moduix/icons/ui';

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

type Profile = { id: string; name: string; username: string; bio: string };
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

const ProfileCard = defineComponent({
  props: { profile: { type: Object as PropType<Profile>, required: true } },
  setup(props) {
    return { profile: props.profile };
  },
  template: `
    <div class="grid w-[min(14rem,calc(100vw-4rem))]">
      <img class="aspect-video w-full rounded-md object-cover" alt="Sunlit workspace with a laptop and plants" src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80" />
      <div class="mt-2 grid gap-1">
        <p class="m-0 text-md leading-6 font-bold text-popover-foreground">{{ profile.name }}</p>
        <p class="m-0 text-sm leading-5 text-muted-foreground">{{ profile.bio }}</p>
      </div>
    </div>
  `,
});

const HoverCardSurface = defineComponent({
  components: { HoverCardArrow, HoverCardBody, HoverCardContent, HoverCardPositioner, ProfileCard },
  props: { profile: { type: Object as PropType<Profile>, required: true }, withArrow: Boolean },
  setup(props) {
    return { profile: props.profile };
  },
  template: `
    <HoverCardPositioner>
      <HoverCardContent>
        <HoverCardArrow v-if="withArrow" />
        <HoverCardBody><ProfileCard :profile="profile" /></HoverCardBody>
      </HoverCardContent>
    </HoverCardPositioner>
  `,
});

const storyComponents = {
  ChevronDownIcon,
  ChevronUpIcon,
  HoverCard,
  HoverCardArrow,
  HoverCardBody,
  HoverCardContent,
  HoverCardContext,
  HoverCardPositioner,
  HoverCardRootProvider,
  HoverCardSurface,
  HoverCardTrigger,
};

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return {
          profiles,
          paragraphClass,
          profileLinkClass,
          stackClass,
          buttonClass,
          ...setup?.(),
        };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(
    `<HoverCard><p :class="paragraphClass">Liked by <HoverCardTrigger as-child><a :class="profileLinkClass" href="#profile">@sarah_chen</a></HoverCardTrigger> and 3 others</p><HoverCardSurface :profile="profiles[0]" /></HoverCard>`,
  ),
};
export const WithArrow: Story = {
  name: 'With Arrow',
  render: renderStory(
    `<HoverCard><p :class="paragraphClass">Liked by <HoverCardTrigger as-child><a :class="profileLinkClass" href="#profile">@sarah_chen</a></HoverCardTrigger> and 3 others</p><HoverCardSurface :profile="profiles[0]" with-arrow /></HoverCard>`,
  ),
};
export const Controlled: Story = {
  render: renderStory(
    `<div :class="stackClass"><button type="button" :class="buttonClass" @click="open = !open">Toggle</button><HoverCard v-model:open="open"><p :class="paragraphClass">Liked by <HoverCardTrigger as-child><a :class="profileLinkClass" href="#profile">@sarah_chen</a></HoverCardTrigger> and 3 others</p><HoverCardSurface :profile="profiles[0]" /></HoverCard></div>`,
    () => ({ open: ref(false) }),
  ),
};
export const RootProvider: Story = {
  name: 'Root Provider',
  render: renderStory(
    `<div :class="stackClass"><output>Open: {{ String(hoverCard.open) }}</output><HoverCardRootProvider :value="hoverCard"><p :class="paragraphClass">Liked by <HoverCardTrigger as-child><a :class="profileLinkClass" href="#profile">@sarah_chen</a></HoverCardTrigger> and 3 others</p><HoverCardSurface :profile="profiles[0]" /></HoverCardRootProvider></div>`,
    () => ({ hoverCard: useHoverCard() }),
  ),
};
export const Delay: Story = {
  render: renderStory(
    `<HoverCard :open-delay="200" :close-delay="500"><p :class="paragraphClass">Liked by <HoverCardTrigger as-child><a :class="profileLinkClass" href="#profile">@sarah_chen</a></HoverCardTrigger> and 3 others</p><HoverCardSurface :profile="profiles[0]" /></HoverCard>`,
  ),
};
export const Positioning: Story = {
  render: renderStory(
    `<HoverCard :positioning="{ placement: 'right', gutter: 12 }"><p :class="paragraphClass">Liked by <HoverCardTrigger as-child><a :class="profileLinkClass" href="#profile">@sarah_chen</a></HoverCardTrigger> and 3 others</p><HoverCardSurface :profile="profiles[0]" /></HoverCard>`,
  ),
};
export const Context: Story = {
  render: renderStory(
    `<HoverCard><HoverCardContext v-slot="context"><p :class="paragraphClass">Liked by <HoverCardTrigger as-child><a :class="profileLinkClass" href="#profile">@sarah_chen <ChevronUpIcon v-if="context.open" /><ChevronDownIcon v-else /></a></HoverCardTrigger> and 3 others</p></HoverCardContext><HoverCardSurface :profile="profiles[0]" /></HoverCard>`,
  ),
};
export const Disabled: Story = {
  render: renderStory(
    `<HoverCard disabled><p :class="paragraphClass">Liked by <HoverCardTrigger as-child><a :class="profileLinkClass" href="#profile">@sarah_chen</a></HoverCardTrigger> and 3 others</p><HoverCardSurface :profile="profiles[0]" /></HoverCard>`,
  ),
};
export const MultipleTriggers: Story = {
  name: 'Multiple Triggers',
  render: renderStory(
    `<HoverCard @trigger-value-change="handleTriggerValueChange"><p :class="paragraphClass">Reviewed by <template v-for="(profile, index) in profiles" :key="profile.id"><HoverCardTrigger :value="profile.id" as-child><a :class="profileLinkClass" :href="'#' + profile.id">{{ profile.username }}</a></HoverCardTrigger><template v-if="index < profiles.length - 2">, </template><template v-else-if="index === profiles.length - 2">, and </template></template></p><HoverCardSurface v-if="activeProfile" :profile="activeProfile" /></HoverCard>`,
    () => {
      const activeProfile = ref(profiles[0]);
      const handleTriggerValueChange = (details: { value?: string | null }) => {
        activeProfile.value =
          profiles.find((profile) => profile.id === details.value) ?? profiles[0];
      };
      return { activeProfile, handleTriggerValueChange };
    },
  ),
};