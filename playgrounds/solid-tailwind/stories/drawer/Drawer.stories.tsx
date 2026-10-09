import { For, Show, createSignal } from 'solid-js';
import type { JSX } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
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
} from '@/components/drawer/Drawer';
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@/components/scroll-area/ScrollArea';
import { insideScrollSections } from '../data/insideScrollSections';

const DEFAULT_DEMO_SNAP_POINT = 0.3;
const DEFAULT_DEMO_SNAP_POINTS = [DEFAULT_DEMO_SNAP_POINT, 1];

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

function DrawerSurface(props: {
  title: string;
  description?: string;
  children?: JSX.Element;
  draggable?: boolean;
  backdrop?: boolean;
}) {
  return (
    <>
      {props.backdrop !== false ? <DrawerBackdrop /> : null}
      <DrawerPositioner>
        <DrawerContent draggable={props.draggable}>
          <DrawerGrabber>
            <DrawerGrabberIndicator />
          </DrawerGrabber>
          <DrawerHeader>
            <DrawerTitle>{props.title}</DrawerTitle>
            <DrawerCloseIcon />
            {props.description ? <DrawerDescription>{props.description}</DrawerDescription> : null}
          </DrawerHeader>
          {props.children}
        </DrawerContent>
      </DrawerPositioner>
    </>
  );
}

export const Basic: Story = {
  render: () => (
    <Drawer defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <DrawerTrigger asChild={(props) => <Button {...props()}>Open drawer</Button>} />
      <DrawerSurface title="Notifications" description="You are all caught up. Good job!">
        <DrawerBody>Bottom drawers are draggable by default.</DrawerBody>
        <DrawerFooter>
          <DrawerCloseTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                Close
              </Button>
            )}
          />
        </DrawerFooter>
      </DrawerSurface>
    </Drawer>
  ),
};

export const SwipeDirection: Story = {
  render: () => (
    <Drawer swipeDirection="end">
      <DrawerTrigger asChild={(props) => <Button {...props()}>Open right drawer</Button>} />
      <DrawerSurface title="Details" description='This drawer uses swipeDirection="end".'>
        <DrawerBody>Logical directions resolve for both LTR and RTL layouts.</DrawerBody>
      </DrawerSurface>
    </Drawer>
  ),
};

export const SnapPoints: Story = {
  render: () => (
    <Drawer snapPoints={[0.25, 0.5, 1]} defaultSnapPoint={0.5}>
      <DrawerTrigger asChild={(props) => <Button {...props()}>Open with snap points</Button>} />
      <DrawerSurface
        title="Snap points"
        description="Drag between 25%, 50%, and 100% of the viewport."
      >
        <DrawerBody class="grid max-h-[50dvh] gap-4">
          <For each={insideScrollSections}>
            {(item) => (
              <section>
                <h3 class="m-0 text-sm leading-6 font-semibold">{item.title}</h3>
                <p class="m-0 text-sm leading-6 text-muted-foreground">{item.body}</p>
              </section>
            )}
          </For>
        </DrawerBody>
      </DrawerSurface>
    </Drawer>
  ),
};

export const Island: Story = {
  render: () => (
    <Drawer variant="island" swipeDirection="end">
      <DrawerTrigger asChild={(props) => <Button {...props()}>Open island drawer</Button>} />
      <DrawerSurface
        title="Floating drawer"
        description="This compact drawer stays inset from the viewport edge."
      >
        <DrawerBody>Use the island variant for a detached drawer surface.</DrawerBody>
      </DrawerSurface>
    </Drawer>
  ),
};

export const NonModal: Story = {
  render: () => (
    <Drawer
      defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT}
      modal={false}
      preventScroll={false}
      snapPoints={DEFAULT_DEMO_SNAP_POINTS}
    >
      <DrawerTrigger asChild={(props) => <Button {...props()}>Open non-modal drawer</Button>} />
      <DrawerPositioner>
        <DrawerContent class="max-h-[min(28rem,80dvh)]" draggable={false}>
          <DrawerGrabber class="flex-col items-stretch gap-2 [&>[data-slot='drawer-grabber-indicator']]:self-center [&>[data-slot='drawer-header']]:w-full">
            <DrawerGrabberIndicator />
            <DrawerHeader>
              <DrawerTitle>Non-modal drawer</DrawerTitle>
              <DrawerCloseIcon data-no-drag />
              <DrawerDescription>
                Drag this header; the page and the scrollable content stay interactive.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerGrabber>
          <DrawerBody class="min-h-0 flex-1 overflow-hidden">
            <ScrollArea class="h-full min-h-0">
              <ScrollAreaViewport class="h-full min-h-0 pe-2">
                <ScrollAreaContent class="grid gap-3">
                  <For each={insideScrollSections}>
                    {(item) => (
                      <section>
                        <h3 class="m-0 text-sm leading-6 font-semibold">{item.title}</h3>
                        <p class="m-0 text-sm leading-6 text-muted-foreground">{item.body}</p>
                      </section>
                    )}
                  </For>
                </ScrollAreaContent>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar>
                <ScrollAreaThumb />
              </ScrollAreaScrollbar>
              <ScrollAreaCorner />
            </ScrollArea>
          </DrawerBody>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  ),
};

function ControlledDrawer() {
  const [open, setOpen] = createSignal(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen((value) => !value)}>
        {open() ? 'Close' : 'Open'} drawer
      </Button>
      <Drawer
        defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT}
        open={open()}
        snapPoints={DEFAULT_DEMO_SNAP_POINTS}
        onOpenChange={(details) => setOpen(details.open)}
      >
        <DrawerSurface title="Controlled drawer" description={`Open: ${String(open())}`} />
      </Drawer>
    </>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDrawer />,
};

export const NoDragArea: Story = {
  render: () => (
    <Drawer defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <DrawerTrigger asChild={(props) => <Button {...props()}>Open drawer</Button>} />
      <DrawerSurface title="No-drag area">
        <DrawerBody>
          <div data-no-drag class="rounded-md border border-dashed border-border bg-muted p-4">
            Pointer gestures that start here do not drag the drawer.
          </div>
        </DrawerBody>
      </DrawerSurface>
    </Drawer>
  ),
};

export const NonDraggable: Story = {
  render: () => (
    <Drawer defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <DrawerTrigger asChild={(props) => <Button {...props()}>Open non-draggable drawer</Button>} />
      <DrawerSurface
        title="Grabber-only dragging"
        description="Content dragging is disabled; the grabber remains draggable."
        draggable={false}
      />
    </Drawer>
  ),
};

const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com' },
];

function MultipleTriggersDrawer() {
  const [activeUser, setActiveUser] = createSignal<(typeof users)[number] | null>(null);

  return (
    <Drawer
      swipeDirection="end"
      onTriggerValueChange={(details) => {
        setActiveUser(users.find((user) => user.id === details.value) ?? null);
      }}
    >
      <div class="flex flex-wrap gap-2">
        <For each={users}>
          {(user) => (
            <DrawerTrigger
              value={user.id}
              asChild={(props) => (
                <Button {...props()} variant="outline">
                  Edit {user.name}
                </Button>
              )}
            />
          )}
        </For>
      </div>
      <DrawerSurface title="Edit user" description={activeUser()?.email}>
        <Show when={activeUser()}>
          {(user) => (
            <DrawerBody>
              <label class="grid gap-2">
                Name
                <input
                  class="min-h-control-lg rounded-md border border-border bg-background px-3 text-foreground"
                  value={user().name}
                />
              </label>
            </DrawerBody>
          )}
        </Show>
      </DrawerSurface>
    </Drawer>
  );
}

export const MultipleTriggers: Story = {
  render: () => <MultipleTriggersDrawer />,
};

function RootProviderDrawer() {
  const drawer = useDrawer({
    defaultSnapPoint: 0.5,
    snapPoints: [0.25, 0.5, 1],
  });

  return (
    <div class="grid gap-4">
      <div class="flex flex-wrap gap-2">
        <Button onClick={() => drawer().setOpen(true)}>Open via API</Button>
        <Button variant="outline" onClick={() => drawer().setSnapPoint(0.25)}>
          Set 25%
        </Button>
        <Button variant="outline" onClick={() => drawer().setSnapPoint(1)}>
          Set 100%
        </Button>
      </div>
      <DrawerRootProvider value={drawer}>
        <DrawerSurface
          title="Root provider"
          description={`Active snap point: ${String(drawer().snapPoint)}`}
        />
      </DrawerRootProvider>
    </div>
  );
}

export const RootProvider: Story = {
  render: () => <RootProviderDrawer />,
};

export const IndentBackground: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <DrawerStack>
      <div class="relative min-h-[360px] overflow-hidden bg-foreground">
        <DrawerIndentBackground />
        <Drawer
          defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT}
          modal={false}
          snapPoints={DEFAULT_DEMO_SNAP_POINTS}
        >
          <DrawerIndent class="grid min-h-[360px] place-items-center bg-background p-6">
            <DrawerTrigger
              asChild={(props) => <Button {...props()}>Open indented drawer</Button>}
            />
          </DrawerIndent>
          <DrawerSurface
            title="Indent effect"
            description="DrawerStack coordinates the background and page surface."
          />
        </Drawer>
      </div>
    </DrawerStack>
  ),
};

function DrawerContextReadout() {
  const drawer = useDrawerContext();

  return (
    <DrawerBody>
      Direction: {drawer().swipeDirection}; open: {String(drawer().open)}
    </DrawerBody>
  );
}

export const Context: Story = {
  render: () => (
    <Drawer defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <DrawerTrigger asChild={(props) => <Button {...props()}>Open context example</Button>} />
      <DrawerSurface title="Context state">
        <DrawerContextReadout />
      </DrawerSurface>
    </Drawer>
  ),
};