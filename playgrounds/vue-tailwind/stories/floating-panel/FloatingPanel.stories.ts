import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import { Button } from '@/components/button';
import {
  FloatingPanel,
  FloatingPanelBody,
  FloatingPanelCloseIcon,
  FloatingPanelContent,
  FloatingPanelContext,
  FloatingPanelControl,
  FloatingPanelDragIndicator,
  FloatingPanelDragTrigger,
  FloatingPanelFooter,
  FloatingPanelHeader,
  FloatingPanelPositioner,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelRootProvider,
  FloatingPanelStageTrigger,
  FloatingPanelTitle,
  FloatingPanelTrigger,
  useFloatingPanel,
} from '@/components/floating-panel';

const DEFAULT_SIZE = { width: 360, height: 260 };
const DEFAULT_POSITION = { x: 160, y: 140 };
const stackClass = 'flex flex-col items-center gap-3';
const triggerGroupClass = 'flex flex-wrap items-center justify-center gap-2';
const titleTextClass = 'min-w-0 overflow-hidden text-ellipsis whitespace-nowrap';
const bodyStackClass = 'grid gap-3';
const statusClass = 'text-sm leading-5 text-muted-foreground';
const metricGridClass = 'grid grid-cols-2 gap-2';
const metricClass = 'grid gap-1 rounded-md border border-border bg-background p-3';

const meta = {
  title: 'Components/FloatingPanel',
  component: FloatingPanel,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof FloatingPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

const floatingPanelComponents = {
  Button,
  FloatingPanel,
  FloatingPanelBody,
  FloatingPanelCloseIcon,
  FloatingPanelContent,
  FloatingPanelContext,
  FloatingPanelControl,
  FloatingPanelDragIndicator,
  FloatingPanelDragTrigger,
  FloatingPanelFooter,
  FloatingPanelHeader,
  FloatingPanelPositioner,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelRootProvider,
  FloatingPanelStageTrigger,
  FloatingPanelTitle,
  FloatingPanelTrigger,
};

const FloatingPanelSurface = defineComponent({
  components: floatingPanelComponents,
  props: {
    autofocus: Boolean,
    surfaceClass: { type: String, default: undefined },
    footer: { type: String, default: undefined },
    title: { type: String, required: true },
  },
  setup() {
    return { bodyStackClass, metricClass, metricGridClass, statusClass, titleTextClass };
  },
  template: `
    <FloatingPanelPositioner>
      <FloatingPanelContent :auto-focus="autofocus" :class="surfaceClass">
        <FloatingPanelDragTrigger>
          <FloatingPanelHeader :class="surfaceClass ? 'border-b-primary/80 bg-primary/90' : undefined">
            <FloatingPanelTitle :class="surfaceClass ? 'text-primary-foreground' : undefined">
              <FloatingPanelDragIndicator :class="surfaceClass ? 'text-primary-foreground' : undefined" />
              <span :class="titleTextClass">{{ title }}</span>
            </FloatingPanelTitle>
            <FloatingPanelControl>
              <FloatingPanelStageTrigger :class="surfaceClass ? 'border-primary/70 bg-primary/80 text-primary-foreground' : undefined" stage="minimized" />
              <FloatingPanelStageTrigger :class="surfaceClass ? 'border-primary/70 bg-primary/80 text-primary-foreground' : undefined" stage="maximized" />
              <FloatingPanelStageTrigger :class="surfaceClass ? 'border-primary/70 bg-primary/80 text-primary-foreground' : undefined" stage="default" />
              <FloatingPanelCloseIcon :class="surfaceClass ? 'border-primary/70 bg-primary/80 text-primary-foreground' : undefined" />
            </FloatingPanelControl>
          </FloatingPanelHeader>
        </FloatingPanelDragTrigger>
        <FloatingPanelBody><slot /></FloatingPanelBody>
        <FloatingPanelFooter v-if="footer" :class="surfaceClass ? 'border-t-primary/80 text-primary-foreground' : undefined">{{ footer }}</FloatingPanelFooter>
        <FloatingPanelResizeTriggerGroup />
      </FloatingPanelContent>
    </FloatingPanelPositioner>
  `,
});

const storyComponents = { ...floatingPanelComponents, FloatingPanelSurface };

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(
    `
    <FloatingPanel :default-size="DEFAULT_SIZE">
      <FloatingPanelTrigger as-child><Button>Open panel</Button></FloatingPanelTrigger>
      <FloatingPanelSurface title="Inspector" footer="Last synced just now">
        <div :class="bodyStackClass">
          <p>Drag the header to move this panel and resize it from any edge.</p>
          <div :class="metricGridClass">
            <div :class="metricClass"><span>Width</span><strong>360</strong></div>
            <div :class="metricClass"><span>Height</span><strong>260</strong></div>
          </div>
        </div>
      </FloatingPanelSurface>
    </FloatingPanel>
  `,
    () => ({ DEFAULT_SIZE, bodyStackClass, metricClass, metricGridClass }),
  ),
};

export const ControlledOpen: Story = {
  name: 'Controlled Open',
  render: renderStory(
    `
      <div :class="stackClass">
        <span :class="statusClass">Panel is {{ open ? 'open' : 'closed' }}</span>
        <FloatingPanel v-model:open="open" :default-size="DEFAULT_SIZE">
          <FloatingPanelTrigger as-child><Button>{{ open ? 'Focus panel' : 'Open controlled panel' }}</Button></FloatingPanelTrigger>
          <FloatingPanelSurface title="Controlled open">Open state is synchronized with Vue state.</FloatingPanelSurface>
        </FloatingPanel>
      </div>
    `,
    () => ({ DEFAULT_SIZE, open: ref(false), stackClass, statusClass }),
  ),
};

export const ControlledPosition: Story = {
  name: 'Controlled Position',
  render: renderStory(
    `
      <div :class="stackClass">
        <span :class="statusClass">x: {{ Math.round(position.x) }}, y: {{ Math.round(position.y) }}</span>
        <FloatingPanel :default-size="DEFAULT_SIZE" :position="position" @position-change="position = $event.position">
          <FloatingPanelTrigger as-child><Button>Open positioned panel</Button></FloatingPanelTrigger>
          <FloatingPanelSurface title="Controlled position">Dragging updates the controlled position object.</FloatingPanelSurface>
        </FloatingPanel>
      </div>
    `,
    () => ({ DEFAULT_SIZE, position: ref(DEFAULT_POSITION), stackClass, statusClass }),
  ),
};

export const ControlledSize: Story = {
  name: 'Controlled Size',
  render: renderStory(
    `
      <div :class="stackClass">
        <span :class="statusClass">{{ Math.round(size.width) }} x {{ Math.round(size.height) }}</span>
        <FloatingPanel :size="size" @size-change="size = $event.size">
          <FloatingPanelTrigger as-child><Button>Open resizable panel</Button></FloatingPanelTrigger>
          <FloatingPanelSurface title="Controlled size">Resize handles update controlled width and height.</FloatingPanelSurface>
        </FloatingPanel>
      </div>
    `,
    () => ({ size: ref(DEFAULT_SIZE), stackClass, statusClass }),
  ),
};

export const EscapeDismiss: Story = {
  name: 'Escape Dismiss',
  render: renderStory(
    `
    <FloatingPanel :default-size="DEFAULT_SIZE">
      <FloatingPanelTrigger as-child><Button>Open panel</Button></FloatingPanelTrigger>
      <FloatingPanelSurface autofocus title="Escape dismiss" footer="Esc closes the focused topmost panel.">The content receives focus on open so Escape dismisses the panel immediately.</FloatingPanelSurface>
    </FloatingPanel>
  `,
    () => ({ DEFAULT_SIZE }),
  ),
};

export const AnchorPosition: Story = {
  name: 'Anchor Position',
  render: renderStory(
    `
    <FloatingPanel :default-size="DEFAULT_SIZE" :get-anchor-position="getAnchorPosition">
      <FloatingPanelTrigger as-child><Button>Open from trigger</Button></FloatingPanelTrigger>
      <FloatingPanelSurface title="Anchored start">The initial panel position is derived from the trigger rect.</FloatingPanelSurface>
    </FloatingPanel>
  `,
    () => ({
      DEFAULT_SIZE,
      getAnchorPosition: ({ triggerRect }: { triggerRect: DOMRect | null }) => ({
        x: (triggerRect?.x ?? 0) + (triggerRect?.width ?? 0) / 2,
        y: (triggerRect?.y ?? 0) + (triggerRect?.height ?? 0) + 12,
      }),
    }),
  ),
};

export const Context: Story = {
  render: renderStory(
    `
    <FloatingPanel :default-size="DEFAULT_SIZE">
      <div :class="stackClass">
        <FloatingPanelTrigger as-child><Button>Open context panel</Button></FloatingPanelTrigger>
        <FloatingPanelContext v-slot="panel"><span :class="statusClass">open: {{ String(panel.open) }}, dragging: {{ String(panel.dragging) }}</span></FloatingPanelContext>
      </div>
      <FloatingPanelSurface title="Context state">FloatingPanelContext exposes the panel API to descendants.</FloatingPanelSurface>
    </FloatingPanel>
  `,
    () => ({ DEFAULT_SIZE, stackClass, statusClass }),
  ),
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: renderStory(
    `
    <div :class="stackClass">
      <div :class="triggerGroupClass">
        <Button @click="panel.setOpen(true)">Open via API</Button>
        <Button variant="outline" @click="panel.maximize">Maximize</Button>
        <Button variant="outline" @click="panel.minimize">Minimize</Button>
      </div>
      <FloatingPanelRootProvider :value="panel"><FloatingPanelSurface title="Root provider">useFloatingPanel owns state outside the rendered panel tree.</FloatingPanelSurface></FloatingPanelRootProvider>
    </div>
  `,
    () => ({
      panel: useFloatingPanel({ defaultSize: DEFAULT_SIZE, persistRect: true }),
      stackClass,
      triggerGroupClass,
    }),
  ),
};

export const LazyMount: Story = {
  name: 'Lazy Mount',
  render: renderStory(
    `
    <div :class="stackClass">
      <span :class="statusClass">Exit completions: {{ exits }}</span>
      <FloatingPanel lazy-mount unmount-on-exit :default-size="DEFAULT_SIZE" @exit-complete="exits++">
        <FloatingPanelTrigger as-child><Button>Open lazy panel</Button></FloatingPanelTrigger>
        <FloatingPanelSurface title="Lazy mounted">The panel content mounts on first open and unmounts after exit.</FloatingPanelSurface>
      </FloatingPanel>
    </div>
  `,
    () => ({ DEFAULT_SIZE, exits: ref(0), stackClass, statusClass }),
  ),
};

export const CustomStyling: Story = {
  name: 'Custom Styling',
  render: renderStory(`
    <FloatingPanel :default-size="{ width: 380, height: 240 }">
      <FloatingPanelTrigger as-child><Button>Open styled panel</Button></FloatingPanelTrigger>
      <FloatingPanelSurface title="Custom styling" surface-class="border-primary/80 bg-primary text-primary-foreground shadow-lg">Tailwind utilities change the visual treatment without changing Ark composition.</FloatingPanelSurface>
    </FloatingPanel>
  `),
};