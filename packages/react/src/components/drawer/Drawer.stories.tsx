import { useDrawer, useDrawerContext } from '@ark-ui/react/drawer';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { insideScrollSections } from '@/data/insideScrollSections';
import { Button } from '../button';
import { Drawer } from './Drawer';
import storyStyles from './Drawer.stories.module.css';

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
      {backdrop ? <Drawer.Backdrop /> : null}
      <Drawer.Positioner>
        <Drawer.Content draggable={draggable}>
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Header>
            <Drawer.Title>{title}</Drawer.Title>
            <Drawer.CloseIcon />
            {description ? <Drawer.Description>{description}</Drawer.Description> : null}
          </Drawer.Header>
          {children}
        </Drawer.Content>
      </Drawer.Positioner>
    </>
  );
}

export const Basic: Story = {
  render: () => (
    <Drawer.Root defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <Drawer.Trigger asChild>
        <Button>Open drawer</Button>
      </Drawer.Trigger>
      <DrawerSurface title="Notifications" description="You are all caught up. Good job!">
        <Drawer.Body>Bottom drawers are draggable by default.</Drawer.Body>
        <Drawer.Footer>
          <Drawer.CloseTrigger asChild>
            <Button variant="outline">Close</Button>
          </Drawer.CloseTrigger>
        </Drawer.Footer>
      </DrawerSurface>
    </Drawer.Root>
  ),
};

export const SwipeDirection: Story = {
  render: () => (
    <Drawer.Root swipeDirection="end">
      <Drawer.Trigger asChild>
        <Button>Open right drawer</Button>
      </Drawer.Trigger>
      <DrawerSurface title="Details" description='This drawer uses swipeDirection="end".'>
        <Drawer.Body>Logical directions resolve for both LTR and RTL layouts.</Drawer.Body>
      </DrawerSurface>
    </Drawer.Root>
  ),
};

export const SnapPoints: Story = {
  render: () => (
    <Drawer.Root snapPoints={[0.25, 0.5, 1]} defaultSnapPoint={0.5}>
      <Drawer.Trigger asChild>
        <Button>Open with snap points</Button>
      </Drawer.Trigger>
      <DrawerSurface
        title="Snap points"
        description="Drag between 25%, 50%, and 100% of the viewport."
      >
        <Drawer.Body className={storyStyles.scrollBody}>
          {insideScrollSections.map((item) => (
            <section key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </section>
          ))}
        </Drawer.Body>
      </DrawerSurface>
    </Drawer.Root>
  ),
};

export const NonModal: Story = {
  render: () => (
    <Drawer.Root
      defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT}
      modal={false}
      snapPoints={DEFAULT_DEMO_SNAP_POINTS}
    >
      <Drawer.Trigger asChild>
        <Button>Open non-modal drawer</Button>
      </Drawer.Trigger>
      <DrawerSurface
        title="Non-modal drawer"
        description="The page remains interactive while this drawer is open."
        backdrop={false}
      />
    </Drawer.Root>
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
        <Drawer.Root
          defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT}
          open={open}
          snapPoints={DEFAULT_DEMO_SNAP_POINTS}
          onOpenChange={(details) => setOpen(details.open)}
        >
          <DrawerSurface title="Controlled drawer" description={`Open: ${String(open)}`} />
        </Drawer.Root>
      </>
    );
  },
};

export const NoDragArea: Story = {
  render: () => (
    <Drawer.Root defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <Drawer.Trigger asChild>
        <Button>Open drawer</Button>
      </Drawer.Trigger>
      <DrawerSurface title="No-drag area">
        <Drawer.Body>
          <div data-no-drag className={storyStyles.noDragArea}>
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
      <Drawer.Trigger asChild>
        <Button>Open non-draggable drawer</Button>
      </Drawer.Trigger>
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

export const MultipleTriggers: Story = {
  render: () => {
    const [activeUser, setActiveUser] = useState<(typeof users)[number] | null>(null);

    return (
      <Drawer.Root
        swipeDirection="end"
        onTriggerValueChange={(details) => {
          setActiveUser(users.find((user) => user.id === details.value) ?? null);
        }}
      >
        <div className={storyStyles.triggerGroup}>
          {users.map((user) => (
            <Drawer.Trigger key={user.id} value={user.id} asChild>
              <Button variant="outline">Edit {user.name}</Button>
            </Drawer.Trigger>
          ))}
        </div>
        <DrawerSurface title="Edit user" description={activeUser?.email}>
          {activeUser ? (
            <Drawer.Body>
              <label className={storyStyles.field}>
                Name
                <input defaultValue={activeUser.name} />
              </label>
            </Drawer.Body>
          ) : null}
        </DrawerSurface>
      </Drawer.Root>
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
      <div className={storyStyles.providerDemo}>
        <div className={storyStyles.triggerGroup}>
          <Button onClick={() => drawer.setOpen(true)}>Open via API</Button>
          <Button variant="outline" onClick={() => drawer.setSnapPoint(0.25)}>
            Set 25%
          </Button>
          <Button variant="outline" onClick={() => drawer.setSnapPoint(1)}>
            Set 100%
          </Button>
        </div>
        <Drawer.RootProvider value={drawer}>
          <DrawerSurface
            title="Root provider"
            description={`Active snap point: ${String(drawer.snapPoint)}`}
          />
        </Drawer.RootProvider>
      </div>
    );
  },
};

export const IndentBackground: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <Drawer.Stack>
      <div className={storyStyles.indentStage}>
        <Drawer.IndentBackground />
        <Drawer.Root
          defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT}
          modal={false}
          snapPoints={DEFAULT_DEMO_SNAP_POINTS}
        >
          <Drawer.Indent className={storyStyles.indentSurface}>
            <Drawer.Trigger asChild>
              <Button>Open indented drawer</Button>
            </Drawer.Trigger>
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
      Direction: {drawer.swipeDirection}; open: {String(drawer.open)}
    </Drawer.Body>
  );
}

export const Context: Story = {
  render: () => (
    <Drawer.Root defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <Drawer.Trigger asChild>
        <Button>Open context example</Button>
      </Drawer.Trigger>
      <DrawerSurface title="Context state">
        <DrawerContextReadout />
      </DrawerSurface>
    </Drawer.Root>
  ),
};