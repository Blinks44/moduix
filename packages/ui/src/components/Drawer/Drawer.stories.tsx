import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { insideScrollSections } from '@/data/insideScrollSections';
import { ChevronDownIcon, ChevronUpIcon } from '@/primitives';
import { Button } from '../Button';
import { ScrollArea } from '../ScrollArea';
import {
  createDrawerHandle,
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerContentInner,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPopup,
  DrawerPortal,
  DrawerProvider,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from './Drawer';
import storyStyles from './Drawer.stories.module.css';

const meta = {
  title: 'Components/Drawer',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Bottom: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger render={<Button />}>Open bottom drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>You are all caught up. Good job!</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>Bottom drawer with the default composition.</DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Top: Story = {
  render: () => (
    <Drawer swipeDirection="up">
      <DrawerTrigger render={<Button />}>Open top drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Top panel</DrawerTitle>
          <DrawerDescription>Set swipeDirection to up for a top drawer.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Left: Story = {
  render: () => (
    <Drawer swipeDirection="left">
      <DrawerTrigger render={<Button />}>Open left drawer</DrawerTrigger>
      <DrawerContent className={storyStyles.sideContent}>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>Side drawers reuse the same high-level API.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>Use a class on DrawerContent to set side width.</DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Right: Story = {
  render: () => (
    <Drawer swipeDirection="right">
      <DrawerTrigger render={<Button />}>Open right drawer</DrawerTrigger>
      <DrawerContent className={storyStyles.sideContent}>
        <DrawerHeader>
          <DrawerTitle>Details</DrawerTitle>
          <DrawerDescription>Right drawers work the same way.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>Adjust width through CSS variables on DrawerContent.</DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithSnapPoints: Story = {
  render: () => {
    const snapPoints = [0.35, 0.65, 1];
    const [snapPoint, setSnapPoint] = React.useState<number | string | null>(snapPoints[1]);

    return (
      <Drawer snapPoints={snapPoints} snapPoint={snapPoint} onSnapPointChange={setSnapPoint}>
        <DrawerTrigger render={<Button />}>Open drawer with snap points</DrawerTrigger>
        <DrawerContent snapLayout>
          <DrawerHeader>
            <DrawerTitle>Snap points</DrawerTitle>
            <DrawerDescription>Current snap point: {String(snapPoint)}</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <ScrollArea
              className={storyStyles.scrollArea}
              classNames={{ content: storyStyles.scrollContent }}
            >
              {insideScrollSections.map((item) => (
                <section key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </section>
              ))}
            </ScrollArea>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

export const NonModal: Story = {
  render: () => (
    <Drawer modal={false}>
      <DrawerTrigger render={<Button />}>Open non-modal drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Non-modal drawer</DrawerTitle>
          <DrawerDescription>Outside pointer interaction stays enabled.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>The default content wrapper skips the backdrop when modal is false.</DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const ControlledPersistent: Story = {
  render: () => {
    const snapPoints = [0.35, 0.85] as const;
    const [open, setOpen] = React.useState(true);
    const [snapPoint, setSnapPoint] = React.useState<number | string | null>(snapPoints[0]);
    const expanded = snapPoint === snapPoints[1];

    const handleOpenChange = (nextOpen: boolean) => {
      if (nextOpen) {
        setOpen(true);
      }
    };

    return (
      <>
        <Button type="button" onClick={() => setOpen(true)}>
          Open persistent drawer
        </Button>
        <Drawer
          open={open}
          onOpenChange={handleOpenChange}
          modal={false}
          disablePointerDismissal
          snapPoints={[...snapPoints]}
          snapPoint={snapPoint}
          onSnapPointChange={(nextSnapPoint) => {
            if (nextSnapPoint !== null) {
              setSnapPoint(nextSnapPoint);
            }
          }}
        >
          <DrawerContent snapLayout disableInitialAnimation>
            <DrawerHeader className={storyStyles.headerWithAction}>
              <div>
                <DrawerTitle>Controlled persistent drawer</DrawerTitle>
                <DrawerDescription>
                  Persistence is controlled from application state instead of a wrapper prop.
                </DrawerDescription>
              </div>
              <button
                type="button"
                className={storyStyles.snapToggle}
                onClick={() => setSnapPoint(expanded ? snapPoints[0] : snapPoints[1])}
                aria-label={expanded ? 'Collapse drawer' : 'Expand drawer'}
              >
                {expanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </DrawerHeader>
            <DrawerBody>
              <ScrollArea
                className={storyStyles.scrollArea}
                classNames={{ content: storyStyles.scrollContent }}
              >
                {insideScrollSections.map((item) => (
                  <section key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </section>
                ))}
              </ScrollArea>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  },
};

export const SwipeArea: Story = {
  render: () => (
    <Drawer swipeDirection="right" modal={false}>
      <DrawerSwipeArea />
      <DrawerTrigger render={<Button />}>Open with trigger</DrawerTrigger>
      <DrawerContent className={storyStyles.sideContent}>
        <DrawerHeader>
          <DrawerTitle>Swipe area</DrawerTitle>
          <DrawerDescription>Swipe from the left edge or use the trigger.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>The swipe area part stays available for edge-open gestures.</DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Nested: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger render={<Button />}>Open drawer stack</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Account</DrawerTitle>
          <DrawerDescription>Main drawer with nested flow.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>Open a nested drawer to see stack behavior.</DrawerBody>
        <DrawerFooter>
          <div className={storyStyles.nestedActionsStart}>
            <Drawer>
              <DrawerTrigger render={<Button />}>Open nested</DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Nested drawer</DrawerTitle>
                  <DrawerDescription>Second layer in the stack.</DrawerDescription>
                </DrawerHeader>
                <DrawerBody>Nested content.</DrawerBody>
                <DrawerFooter>
                  <DrawerClose render={<Button variant="outline" />}>Close nested</DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          <DrawerClose render={<Button variant="outline" />}>Close root</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Handle: Story = {
  render: () => {
    const drawerHandle = React.useMemo(() => createDrawerHandle(), []);

    return (
      <>
        <DrawerTrigger handle={drawerHandle} render={<Button variant="outline" />}>
          Open from detached trigger
        </DrawerTrigger>
        <Button type="button" onClick={() => drawerHandle.open(null)}>
          Open programmatically
        </Button>

        <Drawer handle={drawerHandle}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Detached trigger</DrawerTitle>
              <DrawerDescription>createDrawerHandle is preserved from Base UI.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  },
};

export const IndentEffect: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <DrawerProvider>
      <div className={storyStyles.indentStage}>
        <DrawerIndentBackground />
        <DrawerIndent className={storyStyles.indentSurface}>
          <Drawer modal={false}>
            <DrawerTrigger render={<Button />}>Open indented drawer</DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Indent effect</DrawerTitle>
                <DrawerDescription>
                  Provider, indent, and background parts follow Base UI composition.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </DrawerIndent>
      </div>
    </DrawerProvider>
  ),
};

export const CustomComposition: Story = {
  render: () => (
    <Drawer swipeDirection="right">
      <DrawerTrigger render={<Button />}>Open custom drawer</DrawerTrigger>
      <DrawerPortal keepMounted>
        <DrawerBackdrop className={storyStyles.customBackdrop} forceRender />
        <DrawerViewport className={storyStyles.customViewport}>
          <DrawerPopup className={storyStyles.customPopup}>
            <DrawerHandle className={storyStyles.customHandle} />
            <DrawerContentInner>
              <DrawerHeader>
                <DrawerTitle>Custom composition</DrawerTitle>
                <DrawerDescription>
                  Manual composition replaces removed wrapper props and style maps.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                Use the exported structural parts when you need different layout.
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
              </DrawerFooter>
            </DrawerContentInner>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  ),
};