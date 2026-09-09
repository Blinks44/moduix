import { For, Show, createSignal } from 'solid-js';
import type { JSX } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import { Drawer, useDrawer, useDrawerContext } from '@/components/drawer/Drawer';
import { ScrollArea } from '@/components/scroll-area/ScrollArea';
import { insideScrollSections } from '../data/insideScrollSections';

const DEFAULT_DEMO_SNAP_POINT = 0.3;
const DEFAULT_DEMO_SNAP_POINTS = [DEFAULT_DEMO_SNAP_POINT, 1];

const meta = {
  title: 'Components/Drawer',
  component: Drawer.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Drawer.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

function DrawerSurface(props: {
  title: string;
  description?: string;
  children?: JSX.Element;
  draggable?: boolean;
  backdrop?: boolean;
  variant?: 'island';
}) {
  return (
    <>
      {props.backdrop !== false ? <Drawer.Backdrop /> : null}
      <Drawer.Positioner>
        <Drawer.Content draggable={props.draggable} variant={props.variant}>
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Header>
            <Drawer.Title>{props.title}</Drawer.Title>
            <Drawer.CloseIcon />
            {props.description ? (
              <Drawer.Description>{props.description}</Drawer.Description>
            ) : null}
          </Drawer.Header>
          {props.children}
        </Drawer.Content>
      </Drawer.Positioner>
    </>
  );
}

export const Basic: Story = {
  render: () => (
    <Drawer.Root defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <Drawer.Trigger asChild={(props) => <Button {...props()}>Open drawer</Button>} />
      <DrawerSurface title="Notifications" description="You are all caught up. Good job!">
        <Drawer.Body>Bottom drawers are draggable by default.</Drawer.Body>
        <Drawer.Footer>
          <Drawer.CloseTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                Close
              </Button>
            )}
          />
        </Drawer.Footer>
      </DrawerSurface>
    </Drawer.Root>
  ),
};

export const SwipeDirection: Story = {
  render: () => (
    <Drawer.Root swipeDirection="end">
      <Drawer.Trigger asChild={(props) => <Button {...props()}>Open right drawer</Button>} />
      <DrawerSurface title="Details" description='This drawer uses swipeDirection="end".'>
        <Drawer.Body>Logical directions resolve for both LTR and RTL layouts.</Drawer.Body>
      </DrawerSurface>
    </Drawer.Root>
  ),
};

export const SnapPoints: Story = {
  render: () => (
    <Drawer.Root snapPoints={[0.25, 0.5, 1]} defaultSnapPoint={0.5}>
      <Drawer.Trigger asChild={(props) => <Button {...props()}>Open with snap points</Button>} />
      <DrawerSurface
        title="Snap points"
        description="Drag between 25%, 50%, and 100% of the viewport."
      >
        <Drawer.Body class="grid max-h-[50dvh] gap-4">
          <For each={insideScrollSections}>
            {(item) => (
              <section>
                <h3 class="m-0 text-sm leading-6 font-semibold">{item.title}</h3>
                <p class="m-0 text-sm leading-6 text-muted-foreground">{item.body}</p>
              </section>
            )}
          </For>
        </Drawer.Body>
      </DrawerSurface>
    </Drawer.Root>
  ),
};

export const Island: Story = {
  render: () => (
    <Drawer.Root defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <Drawer.Trigger asChild={(props) => <Button {...props()}>Open island drawer</Button>} />
      <DrawerSurface
        variant="island"
        title="Floating drawer"
        description="This compact drawer stays inset from the viewport edge."
      >
        <Drawer.Body>Use the island variant for a detached drawer surface.</Drawer.Body>
      </DrawerSurface>
    </Drawer.Root>
  ),
};

export const NonModal: Story = {
  render: () => (
    <Drawer.Root
      defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT}
      modal={false}
      preventScroll={false}
      snapPoints={DEFAULT_DEMO_SNAP_POINTS}
    >
      <Drawer.Trigger asChild={(props) => <Button {...props()}>Open non-modal drawer</Button>} />
      <Drawer.Positioner>
        <Drawer.Content class="max-h-[min(28rem,80dvh)]" draggable={false}>
          <Drawer.Grabber class="flex-col items-stretch gap-2 [&>[data-slot='drawer-grabber-indicator']]:self-center [&>[data-slot='drawer-header']]:w-full">
            <Drawer.GrabberIndicator />
            <Drawer.Header>
              <Drawer.Title>Non-modal drawer</Drawer.Title>
              <Drawer.CloseIcon data-no-drag />
              <Drawer.Description>
                Drag this header; the page and the scrollable content stay interactive.
              </Drawer.Description>
            </Drawer.Header>
          </Drawer.Grabber>
          <Drawer.Body class="min-h-0 flex-1 overflow-hidden">
            <ScrollArea class="h-full min-h-0">
              <ScrollArea.Viewport class="h-full min-h-0 pe-2">
                <ScrollArea.Content class="grid gap-3">
                  <For each={insideScrollSections}>
                    {(item) => (
                      <section>
                        <h3 class="m-0 text-sm leading-6 font-semibold">{item.title}</h3>
                        <p class="m-0 text-sm leading-6 text-muted-foreground">{item.body}</p>
                      </section>
                    )}
                  </For>
                </ScrollArea.Content>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar>
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner />
            </ScrollArea>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  ),
};

function ControlledDrawer() {
  const [open, setOpen] = createSignal(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen((value) => !value)}>
        {open() ? 'Close' : 'Open'} drawer
      </Button>
      <Drawer.Root
        defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT}
        open={open()}
        snapPoints={DEFAULT_DEMO_SNAP_POINTS}
        onOpenChange={(details) => setOpen(details.open)}
      >
        <DrawerSurface title="Controlled drawer" description={`Open: ${String(open())}`} />
      </Drawer.Root>
    </>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDrawer />,
};

export const NoDragArea: Story = {
  render: () => (
    <Drawer.Root defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <Drawer.Trigger asChild={(props) => <Button {...props()}>Open drawer</Button>} />
      <DrawerSurface title="No-drag area">
        <Drawer.Body>
          <div data-no-drag class="rounded-md border border-dashed border-border bg-muted p-4">
            Pointer gestures that start here do not drag the drawer.
          </div>
        </Drawer.Body>
      </DrawerSurface>
    </Drawer.Root>
  ),
};

export const NonDraggable: Story = {
  render: () => (
    <Drawer.Root defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <Drawer.Trigger
        asChild={(props) => <Button {...props()}>Open non-draggable drawer</Button>}
      />
      <DrawerSurface
        title="Grabber-only dragging"
        description="Content dragging is disabled; the grabber remains draggable."
        draggable={false}
      />
    </Drawer.Root>
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
    <Drawer.Root
      swipeDirection="end"
      onTriggerValueChange={(details) => {
        setActiveUser(users.find((user) => user.id === details.value) ?? null);
      }}
    >
      <div class="flex flex-wrap gap-2">
        <For each={users}>
          {(user) => (
            <Drawer.Trigger
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
            <Drawer.Body>
              <label class="grid gap-2">
                Name
                <input
                  class="min-h-control-lg rounded-md border border-border bg-background px-3 text-foreground"
                  value={user().name}
                />
              </label>
            </Drawer.Body>
          )}
        </Show>
      </DrawerSurface>
    </Drawer.Root>
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
      <Drawer.RootProvider value={drawer}>
        <DrawerSurface
          title="Root provider"
          description={`Active snap point: ${String(drawer().snapPoint)}`}
        />
      </Drawer.RootProvider>
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
    <Drawer.Stack>
      <div class="relative min-h-[360px] overflow-hidden bg-foreground">
        <Drawer.IndentBackground />
        <Drawer.Root
          defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT}
          modal={false}
          snapPoints={DEFAULT_DEMO_SNAP_POINTS}
        >
          <Drawer.Indent class="grid min-h-[360px] place-items-center bg-background p-6">
            <Drawer.Trigger
              asChild={(props) => <Button {...props()}>Open indented drawer</Button>}
            />
          </Drawer.Indent>
          <DrawerSurface
            title="Indent effect"
            description="Drawer.Stack coordinates the background and page surface."
          />
        </Drawer.Root>
      </div>
    </Drawer.Stack>
  ),
};

function DrawerContextReadout() {
  const drawer = useDrawerContext();

  return (
    <Drawer.Body>
      Direction: {drawer().swipeDirection}; open: {String(drawer().open)}
    </Drawer.Body>
  );
}

export const Context: Story = {
  render: () => (
    <Drawer.Root defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <Drawer.Trigger asChild={(props) => <Button {...props()}>Open context example</Button>} />
      <DrawerSurface title="Context state">
        <DrawerContextReadout />
      </DrawerSurface>
    </Drawer.Root>
  ),
};