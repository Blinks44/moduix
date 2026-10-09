import { Bell } from '@lucide/vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import { Button } from '@/components/button';
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseIcon,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverContext,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverRootProvider,
  PopoverTitle,
  PopoverTrigger,
  usePopover,
  usePopoverContext,
} from '@/components/popover';

const stackClass = 'grid justify-items-center gap-3';
const triggerGroupClass = 'flex flex-wrap justify-center gap-2';
const triggerContentClass = 'inline-flex items-center gap-2';
const iconClass = 'size-4';
const fieldClass = 'mt-3 grid gap-2 text-sm';
const inputClass =
  'min-h-control-lg min-w-64 rounded-md border border-border bg-background px-3 text-foreground';
const wideTriggerClass = 'w-80';
const nestedBodyClass = 'mt-3';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

const popoverActions = [
  { id: 'share', label: 'Share', detail: 'Share this item with others by link or email.' },
  { id: 'export', label: 'Export', detail: 'Export this item as PDF, CSV, or JSON.' },
  { id: 'archive', label: 'Archive', detail: 'Move this item to the archive for later reference.' },
];

const popoverComponents = {
  Bell,
  Button,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseIcon,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverContext,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverRootProvider,
  PopoverTitle,
  PopoverTrigger,
};

const PopoverSurface = defineComponent({
  components: {
    PopoverArrow,
    PopoverCloseTrigger,
    PopoverContent,
    PopoverDescription,
    PopoverFooter,
    PopoverHeader,
    PopoverPositioner,
    PopoverTitle,
  },
  props: {
    arrow: Boolean,
    description: { type: String, required: true },
    title: { type: String, required: true },
  },
  template: `<PopoverPositioner><PopoverContent><PopoverArrow v-if="arrow" /><PopoverHeader><PopoverTitle>{{ title }}</PopoverTitle><PopoverDescription>{{ description }}</PopoverDescription></PopoverHeader><PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter></PopoverContent></PopoverPositioner>`,
});

const PopoverState = defineComponent({
  setup() {
    return { popover: usePopoverContext() };
  },
  template: '<output>Popover is {{ popover.open ? "open" : "closed" }}</output>',
});

const storyComponents = { ...popoverComponents, PopoverState, PopoverSurface };

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return {
          inputClass,
          nestedBodyClass,
          popoverActions,
          stackClass,
          triggerContentClass,
          triggerGroupClass,
          iconClass,
          fieldClass,
          wideTriggerClass,
          ...setup?.(),
        };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(
    `<Popover :positioning="{ gutter: 8 }"><PopoverTrigger as-child><Button><span :class="triggerContentClass"><Bell :class="iconClass" aria-hidden="true" />Notifications</span></Button></PopoverTrigger><PopoverSurface title="Notifications" description="You are all caught up. Good job!" /></Popover>`,
  ),
};

export const Controlled: Story = {
  render: renderStory(
    `<div :class="stackClass"><span>Popover is {{ open ? 'open' : 'closed' }}</span><Popover v-model:open="open"><PopoverTrigger as-child><Button>Open controlled popover</Button></PopoverTrigger><PopoverSurface title="Publish changes?" description="This action will make your latest updates visible to all users." /></Popover></div>`,
    () => ({ open: ref(false) }),
  ),
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: renderStory(
    `<div :class="stackClass"><span>Popover is {{ popover.open ? 'open' : 'closed' }}</span><Button variant="outline" @click="popover.setOpen(!popover.open)">Toggle externally</Button><PopoverRootProvider :value="popover"><PopoverTrigger as-child><Button>Open from trigger</Button></PopoverTrigger><PopoverSurface title="External state" description="The usePopover hook owns this popover state." /></PopoverRootProvider></div>`,
    () => ({ popover: usePopover({ positioning: { placement: 'bottom-start', gutter: 8 } }) }),
  ),
};

export const Context: Story = {
  render: renderStory(
    `<Popover :positioning="{ gutter: 8 }"><PopoverTrigger as-child><Button>Open context example</Button></PopoverTrigger><PopoverPositioner><PopoverContent><PopoverHeader><PopoverTitle>Context state</PopoverTitle><PopoverDescription>Read the popover state from a descendant without prop drilling.</PopoverDescription></PopoverHeader><PopoverFooter><PopoverState /><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter></PopoverContent></PopoverPositioner></Popover>`,
  ),
};

export const WithArrow: Story = {
  name: 'With Arrow',
  render: renderStory(
    `<Popover :positioning="{ gutter: 8 }"><PopoverTrigger as-child><Button>Open with arrow</Button></PopoverTrigger><PopoverSurface arrow title="With arrow" description="Arrow and ArrowTip use Ark positioning variables." /></Popover>`,
  ),
};

export const Positioning: Story = {
  render: renderStory(
    `<Popover :positioning="{ placement: 'left', gutter: 12 }"><PopoverTrigger as-child><Button>Open on the left</Button></PopoverTrigger><PopoverSurface title="Left placement" description="Placement and offsets belong to Root.positioning." /></Popover>`,
  ),
};

export const LazyMount: Story = {
  name: 'Lazy Mount',
  render: renderStory(
    `<Popover lazy-mount unmount-on-exit :positioning="{ gutter: 8 }"><PopoverTrigger as-child><Button>Open lazy popover</Button></PopoverTrigger><PopoverSurface title="Lazy mounted" description="This content mounts on open and unmounts after exit." /></Popover>`,
  ),
};

export const CloseBehavior: Story = {
  name: 'Close Behavior',
  render: renderStory(
    `<Popover :close-on-escape="false" :close-on-interact-outside="false"><PopoverTrigger as-child><Button>Open persistent popover</Button></PopoverTrigger><PopoverSurface title="Explicit close" description="Escape and outside interactions do not dismiss this popover." /></Popover>`,
  ),
};

export const Modal: Story = {
  render: renderStory(
    `<Popover modal :initial-focus-el="() => emailRef"><PopoverTrigger as-child><Button>Invite teammates</Button></PopoverTrigger><PopoverPositioner><PopoverContent><PopoverCloseIcon /><PopoverHeader><PopoverTitle>Invite teammates</PopoverTitle><PopoverDescription>Focus is trapped inside this modal popover until dismissed.</PopoverDescription></PopoverHeader><PopoverBody><label :class="fieldClass"><span>Email</span><input id="popover-email" ref="emailRef" :class="inputClass" /></label></PopoverBody><PopoverFooter><PopoverCloseTrigger>Done</PopoverCloseTrigger></PopoverFooter></PopoverContent></PopoverPositioner></Popover>`,
    () => ({ emailRef: ref<HTMLInputElement>() }),
  ),
};

export const Anchor: Story = {
  render: renderStory(
    `<Popover :positioning="{ gutter: 8 }"><div :class="stackClass"><PopoverAnchor as-child><input :class="inputClass" placeholder="Popover anchor" /></PopoverAnchor><PopoverTrigger as-child><Button>Open below the input</Button></PopoverTrigger></div><PopoverSurface title="Custom anchor" description="The popup is positioned relative to the input instead of the trigger." /></Popover>`,
  ),
};

export const SameWidth: Story = {
  name: 'Same Width',
  render: renderStory(
    `<Popover :positioning="{ sameWidth: true, gutter: 8 }"><PopoverTrigger as-child><Button :class="wideTriggerClass">Match this trigger width</Button></PopoverTrigger><PopoverPositioner><PopoverContent><PopoverTitle>Matched width</PopoverTitle><PopoverDescription>The content uses Ark's reference width measurement.</PopoverDescription></PopoverContent></PopoverPositioner></Popover>`,
  ),
};

export const MultipleTriggers: Story = {
  name: 'Multiple Triggers',
  render: renderStory(
    `<Popover @trigger-value-change="handleTriggerValueChange" :positioning="{ gutter: 8 }"><div :class="triggerGroupClass"><PopoverTrigger v-for="item in popoverActions" :key="item.id" :value="item.id">{{ item.label }}</PopoverTrigger></div><PopoverPositioner><PopoverContent><PopoverTitle>{{ activeItem?.label ?? 'Select an action' }}</PopoverTitle><PopoverDescription>{{ activeItem?.detail ?? 'Choose one of the actions.' }}</PopoverDescription></PopoverContent></PopoverPositioner></Popover>`,
    () => {
      const activeItem = ref<(typeof popoverActions)[number] | null>(null);
      const handleTriggerValueChange = (details: { value?: string | null }) => {
        activeItem.value = popoverActions.find((item) => item.id === details.value) ?? null;
      };
      return { activeItem, handleTriggerValueChange };
    },
  ),
};

export const Nested: Story = {
  render: renderStory(
    `<Popover :positioning="{ gutter: 8 }"><PopoverTrigger as-child><Button>Open settings</Button></PopoverTrigger><PopoverPositioner><PopoverContent><PopoverHeader><PopoverTitle>Settings</PopoverTitle><PopoverDescription>Nested popovers keep independent state.</PopoverDescription></PopoverHeader><PopoverBody :class="nestedBodyClass"><Popover :portalled="false" :positioning="{ placement: 'right', gutter: 8 }"><PopoverTrigger as-child><Button variant="outline">Advanced</Button></PopoverTrigger><PopoverSurface title="Advanced settings" description="This content belongs to the nested popover." /></Popover></PopoverBody></PopoverContent></PopoverPositioner></Popover>`,
  ),
};