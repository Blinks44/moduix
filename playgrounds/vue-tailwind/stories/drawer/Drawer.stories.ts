import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import { Button } from '@/components/button';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPositioner,
  DrawerRootProvider,
  DrawerStack,
  DrawerTitle,
  DrawerTrigger,
  useDrawer,
  useDrawerContext,
} from '@/components/drawer';
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@/components/scroll-area';
import { insideScrollSections } from '../data/insideScrollSections';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Drawer>;
export default meta;
type Story = StoryObj<typeof meta>;

const drawerComponents = {
  Button,
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPositioner,
  DrawerRootProvider,
  DrawerStack,
  DrawerTitle,
  DrawerTrigger,
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
};
const DrawerSurface = defineComponent({
  components: drawerComponents,
  props: { title: String, description: String, draggable: Boolean },
  template:
    '<DrawerBackdrop /><DrawerPositioner><DrawerContent :draggable="draggable"><DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber><DrawerHeader><DrawerTitle>{{ title }}</DrawerTitle><DrawerCloseIcon /><DrawerDescription v-if="description">{{ description }}</DrawerDescription></DrawerHeader><slot /></DrawerContent></DrawerPositioner>',
});
const DrawerContextReadout = defineComponent({
  setup: () => ({ drawer: useDrawerContext() }),
  template:
    '<DrawerBody>Direction: {{ drawer.swipeDirection }}; open: {{ String(drawer.open) }}</DrawerBody>',
});
const storyComponents = { ...drawerComponents, DrawerContextReadout, DrawerSurface };
function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { insideScrollSections, ...setup?.() };
      },
      template,
    });
}
const snapPoints = [0.3, 1];

export const Basic: Story = {
  render: renderStory(
    '<Drawer :snap-points="snapPoints" :default-snap-point="snapPoints[0]"><DrawerTrigger as-child><Button>Open drawer</Button></DrawerTrigger><DrawerSurface title="Notifications" description="You are all caught up. Good job."><DrawerBody>Bottom drawers are draggable by default.</DrawerBody><DrawerFooter><DrawerCloseTrigger as-child><Button variant="outline">Close</Button></DrawerCloseTrigger></DrawerFooter></DrawerSurface></Drawer>',
    () => ({ snapPoints }),
  ),
};
export const SwipeDirection: Story = {
  render: renderStory(
    '<Drawer swipe-direction="end"><DrawerTrigger as-child><Button>Open right drawer</Button></DrawerTrigger><DrawerSurface title="Details" description="Logical directions resolve for LTR and RTL." /></Drawer>',
  ),
};
export const SnapPoints: Story = {
  render: renderStory(
    '<Drawer :snap-points="[0.25, 0.5, 1]" :default-snap-point="0.5"><DrawerTrigger as-child><Button>Open with snap points</Button></DrawerTrigger><DrawerSurface title="Snap points"><DrawerBody class="max-h-[50dvh] grid gap-4"><section v-for="item in insideScrollSections" :key="item.title"><h3>{{ item.title }}</h3><p>{{ item.body }}</p></section></DrawerBody></DrawerSurface></Drawer>',
  ),
};
export const Island: Story = {
  render: renderStory(
    '<Drawer variant="island" swipe-direction="end"><DrawerTrigger as-child><Button>Open island drawer</Button></DrawerTrigger><DrawerSurface title="Floating drawer" description="This compact drawer stays inset from the viewport edge."><DrawerBody>Use the island variant for a detached surface.</DrawerBody></DrawerSurface></Drawer>',
  ),
};
export const NonModal: Story = {
  render: renderStory(
    '<Drawer :modal="false" :prevent-scroll="false" :snap-points="snapPoints" :default-snap-point="snapPoints[0]"><DrawerTrigger as-child><Button>Open non-modal drawer</Button></DrawerTrigger><DrawerPositioner><DrawerContent class="max-h-[min(28rem,80dvh)]" :draggable="false"><DrawerGrabber class="flex-col items-stretch gap-2"><DrawerGrabberIndicator class="self-center" /><DrawerHeader><DrawerTitle>Non-modal drawer</DrawerTitle><DrawerCloseIcon data-no-drag /><DrawerDescription>Drag this header while the page remains interactive.</DrawerDescription></DrawerHeader></DrawerGrabber><DrawerBody class="min-h-0 flex-1 overflow-hidden"><ScrollArea class="h-full min-h-0"><ScrollAreaViewport class="h-full min-h-0 pe-2"><ScrollAreaContent class="grid gap-3"><section v-for="item in insideScrollSections" :key="item.title"><h3>{{ item.title }}</h3><p class="m-0">{{ item.body }}</p></section></ScrollAreaContent></ScrollAreaViewport><ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar><ScrollAreaCorner /></ScrollArea></DrawerBody></DrawerContent></DrawerPositioner></Drawer>',
    () => ({ snapPoints }),
  ),
};
export const Controlled: Story = {
  render: renderStory(
    '<Button @click="open = !open">{{ open ? \'Close\' : \'Open\' }} drawer</Button><Drawer v-model:open="open" :snap-points="snapPoints" :default-snap-point="snapPoints[0]"><DrawerSurface title="Controlled drawer" :description="`Open: ${String(open)}`" /></Drawer>',
    () => ({ open: ref(false), snapPoints }),
  ),
};
export const NoDragArea: Story = {
  render: renderStory(
    '<Drawer :snap-points="snapPoints" :default-snap-point="snapPoints[0]"><DrawerTrigger as-child><Button>Open drawer</Button></DrawerTrigger><DrawerSurface title="No-drag area"><DrawerBody><div data-no-drag class="rounded-md border border-dashed border-border bg-muted p-4">Pointer gestures that start here do not drag the drawer.</div></DrawerBody></DrawerSurface></Drawer>',
    () => ({ snapPoints }),
  ),
};
export const NonDraggable: Story = {
  render: renderStory(
    '<Drawer :snap-points="snapPoints" :default-snap-point="snapPoints[0]"><DrawerTrigger as-child><Button>Open non-draggable drawer</Button></DrawerTrigger><DrawerSurface title="Grabber-only dragging" description="Content dragging is disabled." :draggable="false" /></Drawer>',
    () => ({ snapPoints }),
  ),
};
const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com' },
];
export const MultipleTriggers: Story = {
  render: renderStory(
    '<Drawer swipe-direction="end" @trigger-value-change="activeUser = users.find((user) => user.id === $event.value) ?? null"><div class="flex flex-wrap gap-2"><DrawerTrigger v-for="user in users" :key="user.id" :value="user.id" as-child><Button variant="outline">Edit {{ user.name }}</Button></DrawerTrigger></div><DrawerSurface title="Edit user" :description="activeUser?.email"><DrawerBody v-if="activeUser"><label class="grid gap-2">Name<input class="min-h-10 rounded-md border border-border bg-background px-3" :value="activeUser.name" /></label></DrawerBody></DrawerSurface></Drawer>',
    () => ({ activeUser: ref<(typeof users)[number] | null>(null), users }),
  ),
};
export const RootProvider: Story = {
  render: renderStory(
    '<div class="grid gap-4"><div class="flex flex-wrap gap-2"><Button @click="drawer.setOpen(true)">Open via API</Button><Button variant="outline" @click="drawer.setSnapPoint(0.25)">Set 25%</Button><Button variant="outline" @click="drawer.setSnapPoint(1)">Set 100%</Button></div><DrawerRootProvider :value="drawer"><DrawerSurface title="Root provider" :description="`Active snap point: ${String(drawer.snapPoint)}`" /></DrawerRootProvider></div>',
    () => ({ drawer: useDrawer({ defaultSnapPoint: 0.5, snapPoints: [0.25, 0.5, 1] }) }),
  ),
};
export const IndentBackground: Story = {
  parameters: { layout: 'fullscreen' },
  render: renderStory(
    '<DrawerStack><div class="relative min-h-[360px] overflow-hidden bg-foreground"><DrawerIndentBackground /><Drawer :modal="false" :portalled="false" :snap-points="snapPoints" :default-snap-point="snapPoints[0]"><DrawerIndent class="grid min-h-[360px] place-items-center bg-background p-6"><DrawerTrigger as-child><Button>Open indented drawer</Button></DrawerTrigger></DrawerIndent><DrawerSurface title="Indent effect" description="DrawerStack coordinates the background and page surface." /></Drawer></div></DrawerStack>',
    () => ({ snapPoints }),
  ),
};
export const Context: Story = {
  render: renderStory(
    '<Drawer :snap-points="snapPoints" :default-snap-point="snapPoints[0]"><DrawerTrigger as-child><Button>Open context example</Button></DrawerTrigger><DrawerSurface title="Context state"><DrawerContextReadout /></DrawerSurface></Drawer>',
    () => ({ snapPoints }),
  ),
};