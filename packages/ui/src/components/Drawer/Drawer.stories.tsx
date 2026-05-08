import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { insideScrollSections } from '@/data/insideScrollSections';
import { Button } from '../Button';
import { ScrollArea } from '../ScrollArea';
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerProvider,
  DrawerSnapToggle,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
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
  render: () => {
    return (
      <Drawer>
        <DrawerTrigger render={<Button />}>Open bottom drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Notifications</DrawerTitle>
            <DrawerDescription>You are all caught up. Good job!</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>Bottom drawer with default swipe direction and handle.</DrawerBody>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

export const Top: Story = {
  render: () => {
    return (
      <Drawer swipeDirection="up">
        <DrawerTrigger render={<Button />}>Open top drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Top panel</DrawerTitle>
            <DrawerDescription>Handle is available for top direction.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>Swipe up to dismiss.</DrawerBody>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

export const Left: Story = {
  render: () => {
    return (
      <Drawer swipeDirection="left">
        <DrawerTrigger render={<Button />}>Open left drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerDescription>The handle is hidden for side drawers.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>Swipe left to dismiss.</DrawerBody>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

export const Right: Story = {
  render: () => {
    return (
      <Drawer swipeDirection="right">
        <DrawerTrigger render={<Button />}>Open right drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Details</DrawerTitle>
            <DrawerDescription>The handle is hidden for side drawers.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>Swipe right to dismiss.</DrawerBody>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
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

export const WithoutBackdrop: Story = {
  render: () => {
    return (
      <Drawer>
        <DrawerTrigger render={<Button />}>Open drawer without backdrop</DrawerTrigger>
        <DrawerContent withBackdrop={false}>
          <DrawerHeader>
            <DrawerTitle>No backdrop</DrawerTitle>
            <DrawerDescription>Background stays visible and interactive.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>This drawer renders without overlay.</DrawerBody>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

export const Nested: Story = {
  render: () => {
    return (
      <Drawer>
        <DrawerTrigger render={<Button />}>Open drawer stack</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Account</DrawerTitle>
            <DrawerDescription>Main drawer with nested flow.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>Open a nested drawer to see stack behavior from the docs.</DrawerBody>
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
    );
  },
};

export const BottomIsland: Story = {
  render: () => {
    return (
      <Drawer>
        <DrawerTrigger render={<Button />}>Open bottom island</DrawerTrigger>
        <DrawerContent variant="island">
          <DrawerHeader>
            <DrawerTitle>Bottom island</DrawerTitle>
            <DrawerDescription>Bottom drawer without bleed tail.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

export const TopIsland: Story = {
  render: () => {
    return (
      <Drawer swipeDirection="up">
        <DrawerTrigger render={<Button />}>Open top island</DrawerTrigger>
        <DrawerContent variant="island">
          <DrawerHeader>
            <DrawerTitle>Top island</DrawerTitle>
            <DrawerDescription>Top drawer without bleed tail.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

export const LeftIsland: Story = {
  render: () => {
    return (
      <Drawer swipeDirection="left">
        <DrawerTrigger render={<Button />}>Open left island</DrawerTrigger>
        <DrawerContent variant="island">
          <DrawerHeader>
            <DrawerTitle>Left island</DrawerTitle>
            <DrawerDescription>Left drawer without bleed tail.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

export const RightIsland: Story = {
  render: () => {
    return (
      <Drawer swipeDirection="right">
        <DrawerTrigger render={<Button />}>Open right island</DrawerTrigger>
        <DrawerContent variant="island" className={storyStyles.rightIsland}>
          <DrawerHeader>
            <DrawerTitle>Right island</DrawerTitle>
            <DrawerDescription>Right drawer without bleed tail (max 500px).</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

export const PersistentSnap: Story = {
  render: () => {
    const snapPoints = [0.35, 0.85] as const;
    const [snapPoint, setSnapPoint] = React.useState<number | string | null>(snapPoints[0]);
    const expanded = snapPoint === snapPoints[1];

    return (
      <Drawer
        defaultOpen
        persistent
        modal={false}
        disablePointerDismissal
        snapPoints={[...snapPoints]}
        defaultSnapPoint={snapPoints[0]}
        snapPoint={snapPoint}
        onSnapPointChange={setSnapPoint}
      >
        <DrawerContent snapLayout withBackdrop={false} disableInitialAnimation>
          <DrawerHeader>
            <DrawerTitle>Persistent drawer</DrawerTitle>
            <DrawerSnapToggle
              expanded={expanded}
              onClick={() => setSnapPoint(expanded ? snapPoints[0] : snapPoints[1])}
            />
            <DrawerDescription>
              This drawer stays open and can only switch between compact and expanded states.
            </DrawerDescription>
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
    );
  },
};

export const SwipeArea: Story = {
  render: () => {
    return (
      <Drawer swipeDirection="right" modal={false}>
        <DrawerSwipeArea />
        <DrawerTrigger render={<Button />}>Open with trigger</DrawerTrigger>
        <DrawerContent withBackdrop={false}>
          <DrawerHeader>
            <DrawerTitle>Swipe area</DrawerTitle>
            <DrawerDescription>Swipe from the left edge or use the trigger.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>The swipe area part is available for edge-open gestures.</DrawerBody>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

export const IndentEffect: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    return (
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
    );
  },
};