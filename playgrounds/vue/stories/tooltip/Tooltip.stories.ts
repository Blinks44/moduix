import { Bell, Info, Plus, Share } from '@lucide/vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed, defineComponent, ref, shallowRef } from 'vue';
import { Button } from '@/components/button';
import {
  Tooltip,
  TooltipArrow,
  TooltipBody,
  TooltipContent,
  TooltipDisabledTrigger,
  TooltipPositioner,
  TooltipRootProvider,
  TooltipTrigger,
  useTooltip,
  useTooltipContext,
} from '@/components/tooltip';
import storyStyles from './Tooltip.stories.module.css';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;
type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

const tooltipPlacements: TooltipPlacement[] = ['top', 'right', 'bottom', 'left'];
const tooltipTools = [
  { id: 'create', label: 'Create', shortcut: 'Ctrl+N', icon: Plus },
  { id: 'share', label: 'Share', shortcut: 'Ctrl+S', icon: Share },
  { id: 'details', label: 'Details', shortcut: 'Ctrl+I', icon: Info },
];

const TooltipStateContent = defineComponent({
  components: { TooltipContent },
  setup() {
    const tooltip = useTooltipContext();
    return { open: computed(() => tooltip.value.open) };
  },
  template: '<TooltipContent>Open from context: {{ open }}</TooltipContent>',
});

const storyComponents = {
  Bell,
  Button,
  Info,
  Plus,
  Share,
  Tooltip,
  TooltipArrow,
  TooltipBody,
  TooltipContent,
  TooltipDisabledTrigger,
  TooltipPositioner,
  TooltipRootProvider,
  TooltipStateContent,
  TooltipTrigger,
};

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { storyStyles, tooltipPlacements, tooltipTools, ...setup?.() };
      },
      template,
    });
}

export const Default: Story = {
  name: 'Default',
  render: renderStory(`
    <Tooltip>
      <TooltipTrigger as-child aria-label="Notifications">
        <Button>
          <span :class="storyStyles.triggerContent">
            <Bell :class="storyStyles.icon" aria-hidden="true" />
            Notifications
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipBody>Notifications</TooltipBody>
    </Tooltip>
  `),
};

export const WithArrow: Story = {
  name: 'With Arrow',
  render: renderStory(`
    <Tooltip>
      <TooltipTrigger aria-label="Tooltip with arrow">Hover or focus</TooltipTrigger>
      <TooltipBody><TooltipArrow />Tooltip with arrow</TooltipBody>
    </Tooltip>
  `),
};

export const Delay: Story = {
  render: renderStory(`
    <Tooltip :close-delay="0" :open-delay="0">
      <TooltipTrigger>Immediate tooltip</TooltipTrigger>
      <TooltipBody>No open or close delay</TooltipBody>
    </Tooltip>
  `),
};

export const DisabledTrigger: Story = {
  name: 'Disabled Trigger',
  render: renderStory(`
    <Tooltip>
      <TooltipDisabledTrigger aria-label="Create project is unavailable">
        <Button disabled>Create project</Button>
      </TooltipDisabledTrigger>
      <TooltipBody>Projects are unavailable while offline.</TooltipBody>
    </Tooltip>
  `),
};

export const Positioning: Story = {
  render: renderStory(
    `
      <div :class="storyStyles.stack">
        <div :class="storyStyles.sideButtons">
          <button
            v-for="item in tooltipPlacements"
            :key="item"
            type="button"
            :class="storyStyles.sideButton"
            :data-active="item === placement ? '' : undefined"
            @click="setPlacement(item)"
          >{{ item }}</button>
        </div>

        <Tooltip :positioning="positioning">
          <TooltipTrigger as-child :aria-label="'Tooltip placement: ' + placement">
            <Button>Hover or focus</Button>
          </TooltipTrigger>
          <TooltipBody>Placement: {{ placement }}</TooltipBody>
        </Tooltip>
      </div>
    `,
    () => {
      const placement = ref<TooltipPlacement>('top');
      return {
        placement,
        positioning: computed(() => ({ placement: placement.value, offset: { mainAxis: 12 } })),
        setPlacement: (value: TooltipPlacement) => {
          placement.value = value;
        },
      };
    },
  ),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="storyStyles.stack">
        <Button variant="outline" @click="open = !open">Toggle</Button>
        <Tooltip v-model:open="open">
          <TooltipTrigger>Controlled tooltip</TooltipTrigger>
          <TooltipBody>Open: {{ open }}</TooltipBody>
        </Tooltip>
      </div>
    `,
    () => ({ open: ref(false) }),
  ),
};

export const Context: Story = {
  render: renderStory(`
    <Tooltip>
      <TooltipTrigger>Context tooltip</TooltipTrigger>
      <TooltipPositioner><TooltipStateContent /></TooltipPositioner>
    </Tooltip>
  `),
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: renderStory(
    `
      <div :class="storyStyles.stack">
        <output :class="storyStyles.output">Open: {{ tooltip.open }}</output>
        <TooltipRootProvider :value="tooltip">
          <TooltipTrigger>RootProvider tooltip</TooltipTrigger>
          <TooltipBody>State is owned outside the tree.</TooltipBody>
        </TooltipRootProvider>
      </div>
    `,
    () => ({ tooltip: useTooltip() }),
  ),
};

export const MultipleTriggers: Story = {
  name: 'Multiple Triggers',
  render: renderStory(
    `
      <Tooltip @trigger-value-change="handleTriggerValueChange">
        <div :class="storyStyles.toolbar">
          <TooltipTrigger
            v-for="tool in tooltipTools"
            :key="tool.id"
            :value="tool.id"
            as-child
            :aria-label="tool.label"
          >
            <Button variant="ghost" size="icon-md"><component :is="tool.icon" :class="storyStyles.icon" /></Button>
          </TooltipTrigger>
        </div>
        <TooltipBody>
          <template v-if="activeTool">
            {{ activeTool.label }} <span :class="storyStyles.shortcut">{{ activeTool.shortcut }}</span>
          </template>
        </TooltipBody>
      </Tooltip>
    `,
    () => {
      const activeTool = shallowRef<(typeof tooltipTools)[number] | null>(null);
      return {
        activeTool,
        handleTriggerValueChange: ({ value }: { value?: string | null }) => {
          activeTool.value = tooltipTools.find((tool) => tool.id === value) ?? null;
        },
      };
    },
  ),
};

export const WithinFixedContainer: Story = {
  name: 'Within Fixed Container',
  parameters: { layout: 'fullscreen' },
  render: renderStory(`
    <div :class="storyStyles.fixedContainer">
      <Tooltip :positioning="{ strategy: 'fixed' }">
        <TooltipTrigger>Fixed strategy</TooltipTrigger>
        <TooltipBody>Positioned from a fixed container.</TooltipBody>
      </Tooltip>
    </div>
  `),
};

export const CustomComposition: Story = {
  name: 'Custom Composition',
  render: renderStory(`
    <Tooltip>
      <TooltipTrigger aria-label="Custom styled tooltip" :class="storyStyles.customTrigger">
        Custom style
      </TooltipTrigger>
      <TooltipPositioner :class="storyStyles.customPositioner">
        <TooltipContent :class="storyStyles.customContent">
          Styled through explicit Ark parts
        </TooltipContent>
      </TooltipPositioner>
    </Tooltip>
  `),
};