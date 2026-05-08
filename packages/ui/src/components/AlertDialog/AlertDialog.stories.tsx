import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { insideScrollSections } from '@/data/insideScrollSections';
import { CloseLineIcon } from '@/primitives';
import { Button } from '../Button';
import { ScrollArea } from '../ScrollArea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogCloseIcon,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './AlertDialog';
import storyStyles from './AlertDialog.stories.module.css';

const meta = {
  title: 'Components/AlertDialog',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger render={<Button />}>Discard draft</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard draft?</AlertDialogTitle>
            <AlertDialogCloseIcon />
            <AlertDialogDescription>You cannot undo this action.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
            <AlertDialogAction render={<Button />}>Discard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <Button type="button" onClick={() => setOpen(true)}>
          Open controlled dialog
        </Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Publish changes?</AlertDialogTitle>
              <AlertDialogDescription>
                This will make the latest version visible to all users.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel render={<Button variant="outline" />}>
                Back to editing
              </AlertDialogCancel>
              <AlertDialogAction render={<Button />}>Publish</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </React.Fragment>
    );
  },
};

export const WithScrollableViewport: Story = {
  render: () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger render={<Button />}>Delete project</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogCloseIcon />
            <AlertDialogDescription>
              This removes all deployment environments and API keys.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogBody className={storyStyles.scrollBody}>
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
          </AlertDialogBody>
          <AlertDialogFooter>
            <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
            <AlertDialogAction render={<Button />}>Delete permanently</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};

export const CustomCloseIcon: Story = {
  render: () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger render={<Button />}>Archive workspace</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive workspace?</AlertDialogTitle>
            <AlertDialogCloseIcon aria-label="Close archive dialog">
              <CloseLineIcon />
            </AlertDialogCloseIcon>
            <AlertDialogDescription>
              Team members will lose access until the workspace is restored.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
            <AlertDialogAction render={<Button />}>Archive</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};

export const CustomInternalSlots: Story = {
  render: () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger render={<Button />}>Reset environment</AlertDialogTrigger>
        <AlertDialogContent
          className={storyStyles.customPopup}
          classNames={{
            backdrop: storyStyles.customBackdrop,
            viewport: storyStyles.customViewport,
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Reset environment?</AlertDialogTitle>
            <AlertDialogDescription>
              All runtime variables will return to their default values.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
            <AlertDialogAction render={<Button />}>Reset</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};