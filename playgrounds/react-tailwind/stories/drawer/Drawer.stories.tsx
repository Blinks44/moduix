import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
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
} from '@/components/drawer/Drawer';
import { ScrollArea, ScrollAreaContent, ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '@/components/scroll-area/ScrollArea';
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

function DrawerSurface({
  title,
  description,
  children,
  draggable,
  backdrop = true,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  draggable?: boolean;
  backdrop?: boolean;
}) {
  return (
    <>
      {backdrop ? <DrawerBackdrop /> : null}
      <DrawerPositioner>
        <DrawerContent draggable={draggable}>
          <DrawerGrabber>
            <DrawerGrabberIndicator />
          </DrawerGrabber>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerCloseIcon />
            {description ? <DrawerDescription>{description}</DrawerDescription> : null}
          </DrawerHeader>
          {children}
        </DrawerContent>
      </DrawerPositioner>
    </>
  );
}

export const Basic: Story = {
  render: () => (
    <Drawer defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerSurface title="Notifications" description="You are all caught up. Good job!">
        <DrawerBody>Bottom drawers are draggable by default.</DrawerBody>
        <DrawerFooter>
          <DrawerCloseTrigger asChild>
            <Button variant="outline">Close</Button>
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerSurface>
    </Drawer>
  ),
};

export const SwipeDirection: Story = {
  render: () => (
    <Drawer swipeDirection="end">
      <DrawerTrigger asChild>
        <Button>Open right drawer</Button>
      </DrawerTrigger>
      <DrawerSurface title="Details" description='This drawer uses swipeDirection="end".'>
        <DrawerBody>Logical directions resolve for both LTR and RTL layouts.</DrawerBody>
      </DrawerSurface>
    </Drawer>
  ),
};

export const SnapPoints: Story = {
  render: () => (
    <Drawer snapPoints={[0.25, 0.5, 1]} defaultSnapPoint={0.5}>
      <DrawerTrigger asChild>
        <Button>Open with snap points</Button>
      </DrawerTrigger>
      <DrawerSurface
        title="Snap points"
        description="Drag between 25%, 50%, and 100% of the viewport."
      >
        <DrawerBody className="grid max-h-[50dvh] gap-4">
          {insideScrollSections.map((item) => (
            <section key={item.title}>
              <h3 className="m-0 text-sm leading-6 font-semibold">{item.title}</h3>
              <p className="m-0 text-sm leading-6 text-muted-foreground">{item.body}</p>
            </section>
          ))}
        </DrawerBody>
      </DrawerSurface>
    </Drawer>
  ),
};

export const Island: Story = {
  render: () => (
    <Drawer variant="island" swipeDirection="end">
      <DrawerTrigger asChild>
        <Button>Open island drawer</Button>
      </DrawerTrigger>
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
      <DrawerTrigger asChild>
        <Button>Open non-modal drawer</Button>
      </DrawerTrigger>
      <DrawerPositioner>
        <DrawerContent className="max-h-[min(28rem,80dvh)]" draggable={false}>
          <DrawerGrabber className="flex-col items-stretch gap-2 [&>[data-slot='drawer-grabber-indicator']]:self-center [&>[data-slot='drawer-header']]:w-full">
            <DrawerGrabberIndicator />
            <DrawerHeader>
              <DrawerTitle>Non-modal drawer</DrawerTitle>
              <DrawerCloseIcon data-no-drag />
              <DrawerDescription>
                Drag this header; the page and the scrollable content stay interactive.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerGrabber>
          <DrawerBody className="min-h-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full min-h-0">
              <ScrollAreaViewport className="h-full min-h-0 pe-2">
                <ScrollAreaContent className="grid gap-3">
                  {insideScrollSections.map((item) => (
                    <section key={item.title}>
                      <h3 className="m-0 text-sm leading-6 font-semibold">{item.title}</h3>
                      <p className="m-0 text-sm leading-6 text-muted-foreground">{item.body}</p>
                    </section>
                  ))}
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

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button type="button" onClick={() => setOpen((value) => !value)}>
          {open ? 'Close' : 'Open'} drawer
        </Button>
        <Drawer
          defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT}
          open={open}
          snapPoints={DEFAULT_DEMO_SNAP_POINTS}
          onOpenChange={(details) => setOpen(details.open)}
        >
          <DrawerSurface title="Controlled drawer" description={`Open: ${String(open)}`} />
        </Drawer>
      </>
    );
  },
};

export const NoDragArea: Story = {
  render: () => (
    <Drawer defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerSurface title="No-drag area">
        <DrawerBody>
          <div data-no-drag className="rounded-md border border-dashed border-border bg-muted p-4">
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
      <DrawerTrigger asChild>
        <Button>Open non-draggable drawer</Button>
      </DrawerTrigger>
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

export const MultipleTriggers: Story = {
  render: () => {
    const [activeUser, setActiveUser] = useState<(typeof users)[number] | null>(null);

    return (
      <Drawer
        swipeDirection="end"
        onTriggerValueChange={(details) => {
          setActiveUser(users.find((user) => user.id === details.value) ?? null);
        }}
      >
        <div className="flex flex-wrap gap-2">
          {users.map((user) => (
            <DrawerTrigger key={user.id} value={user.id} asChild>
              <Button variant="outline">Edit {user.name}</Button>
            </DrawerTrigger>
          ))}
        </div>
        <DrawerSurface title="Edit user" description={activeUser?.email}>
          {activeUser ? (
            <DrawerBody>
              <label className="grid gap-2">
                Name
                <input
                  className="min-h-control-lg rounded-md border border-border bg-background px-3 text-foreground"
                  defaultValue={activeUser.name}
                />
              </label>
            </DrawerBody>
          ) : null}
        </DrawerSurface>
      </Drawer>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const drawer = useDrawer({
      defaultSnapPoint: 0.5,
      snapPoints: [0.25, 0.5, 1],
    });

    return (
      <div className="grid gap-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => drawer.setOpen(true)}>Open via API</Button>
          <Button variant="outline" onClick={() => drawer.setSnapPoint(0.25)}>
            Set 25%
          </Button>
          <Button variant="outline" onClick={() => drawer.setSnapPoint(1)}>
            Set 100%
          </Button>
        </div>
        <DrawerRootProvider value={drawer}>
          <DrawerSurface
            title="Root provider"
            description={`Active snap point: ${String(drawer.snapPoint)}`}
          />
        </DrawerRootProvider>
      </div>
    );
  },
};

export const IndentBackground: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <DrawerStack>
      <div className="relative min-h-[360px] overflow-hidden bg-foreground">
        <DrawerIndentBackground />
        <Drawer
          defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT}
          modal={false}
          snapPoints={DEFAULT_DEMO_SNAP_POINTS}
        >
          <DrawerIndent className="grid min-h-[360px] place-items-center bg-background p-6">
            <DrawerTrigger asChild>
              <Button>Open indented drawer</Button>
            </DrawerTrigger>
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
      Direction: {drawer.swipeDirection}; open: {String(drawer.open)}
    </DrawerBody>
  );
}

export const Context: Story = {
  render: () => (
    <Drawer defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <DrawerTrigger asChild>
        <Button>Open context example</Button>
      </DrawerTrigger>
      <DrawerSurface title="Context state">
        <DrawerContextReadout />
      </DrawerSurface>
    </Drawer>
  ),
};