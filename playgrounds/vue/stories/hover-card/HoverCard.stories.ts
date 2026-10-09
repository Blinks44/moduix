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
import { ChevronDownIcon, ChevronUpIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './HoverCard.stories.module.css';

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
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

const ProfileCard = defineComponent({
  props: { profile: { type: Object as PropType<Profile>, required: true } },
  setup(props) {
    return { profile: props.profile, styles };
  },
  template: `
    <div :class="styles.card">
      <img :class="styles.image" alt="Sunlit workspace with a laptop and plants" src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80" />
      <div :class="styles.content">
        <p :class="styles.name">{{ profile.name }}</p>
        <p :class="styles.bio">{{ profile.bio }}</p>
      </div>
    </div>
  `,
});

const HoverCardSurface = defineComponent({
  components: { HoverCardArrow, HoverCardBody, HoverCardContent, HoverCardPositioner, ProfileCard },
  props: {
    profile: { type: Object as PropType<Profile>, required: true },
    withArrow: Boolean,
  },
  setup(props) {
    return { profile: props.profile, styles };
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
        return { profiles, styles, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <HoverCard>
      <p :class="styles.paragraph">
        Liked by <HoverCardTrigger as-child><a href="#profile">@sarah_chen</a></HoverCardTrigger> and 3 others
      </p>
      <HoverCardSurface :profile="profiles[0]" />
    </HoverCard>
  `),
};

export const WithArrow: Story = {
  name: 'With Arrow',
  render: renderStory(`
    <HoverCard>
      <p :class="styles.paragraph">
        Liked by <HoverCardTrigger as-child><a href="#profile">@sarah_chen</a></HoverCardTrigger> and 3 others
      </p>
      <HoverCardSurface :profile="profiles[0]" with-arrow />
    </HoverCard>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <button type="button" :class="styles.button" @click="open = !open">Toggle</button>
        <HoverCard v-model:open="open">
          <p :class="styles.paragraph">
            Liked by <HoverCardTrigger as-child><a href="#profile">@sarah_chen</a></HoverCardTrigger> and 3 others
          </p>
          <HoverCardSurface :profile="profiles[0]" />
        </HoverCard>
      </div>
    `,
    () => ({ open: ref(false) }),
  ),
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: renderStory(
    `
      <div :class="styles.stack">
        <output>Open: {{ String(hoverCard.open) }}</output>
        <HoverCardRootProvider :value="hoverCard">
          <p :class="styles.paragraph">
            Liked by <HoverCardTrigger as-child><a href="#profile">@sarah_chen</a></HoverCardTrigger> and 3 others
          </p>
          <HoverCardSurface :profile="profiles[0]" />
        </HoverCardRootProvider>
      </div>
    `,
    () => ({ hoverCard: useHoverCard() }),
  ),
};

export const Delay: Story = {
  render: renderStory(`
    <HoverCard :open-delay="200" :close-delay="500">
      <p :class="styles.paragraph">
        Liked by <HoverCardTrigger as-child><a href="#profile">@sarah_chen</a></HoverCardTrigger> and 3 others
      </p>
      <HoverCardSurface :profile="profiles[0]" />
    </HoverCard>
  `),
};

export const Positioning: Story = {
  render: renderStory(`
    <HoverCard :positioning="{ placement: 'right', gutter: 12 }">
      <p :class="styles.paragraph">
        Liked by <HoverCardTrigger as-child><a href="#profile">@sarah_chen</a></HoverCardTrigger> and 3 others
      </p>
      <HoverCardSurface :profile="profiles[0]" />
    </HoverCard>
  `),
};

export const Context: Story = {
  render: renderStory(`
    <HoverCard>
      <HoverCardContext v-slot="context">
        <p :class="styles.paragraph">
          Liked by
          <HoverCardTrigger as-child>
            <a href="#profile">@sarah_chen <ChevronUpIcon v-if="context.open" /><ChevronDownIcon v-else /></a>
          </HoverCardTrigger>
          and 3 others
        </p>
      </HoverCardContext>
      <HoverCardSurface :profile="profiles[0]" />
    </HoverCard>
  `),
};

export const Disabled: Story = {
  render: renderStory(`
    <HoverCard disabled>
      <p :class="styles.paragraph">
        Liked by <HoverCardTrigger as-child><a href="#profile">@sarah_chen</a></HoverCardTrigger> and 3 others
      </p>
      <HoverCardSurface :profile="profiles[0]" />
    </HoverCard>
  `),
};

export const MultipleTriggers: Story = {
  name: 'Multiple Triggers',
  render: renderStory(
    `
      <HoverCard @trigger-value-change="handleTriggerValueChange">
        <p :class="styles.paragraph">
          Reviewed by
          <template v-for="(profile, index) in profiles" :key="profile.id">
            <HoverCardTrigger :value="profile.id" as-child><a :href="'#' + profile.id">{{ profile.username }}</a></HoverCardTrigger>
            <template v-if="index < profiles.length - 2">, </template><template v-else-if="index === profiles.length - 2">, and </template>
          </template>
        </p>
        <HoverCardSurface v-if="activeProfile" :profile="activeProfile" />
      </HoverCard>
    `,
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