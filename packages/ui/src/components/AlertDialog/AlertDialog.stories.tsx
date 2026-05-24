import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { CloseButton } from '@/components/CloseButton';
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
  createAlertDialogHandle,
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
        <AlertDialogContent withCloseButton>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard draft?</AlertDialogTitle>
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

export const AsyncConfirmation: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [pending, setPending] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleArchive = async () => {
      setPending(true);
      setError('');

      try {
        await new Promise((resolve, reject) => {
          window.setTimeout(() => {
            if (Math.random() > 0.5) {
              resolve(null);
              return;
            }

            reject(new Error('Archive failed'));
          }, 900);
        });

        setOpen(false);
      } catch {
        setError('Workspace could not be archived. Review the warning and try again.');
      } finally {
        setPending(false);
      }
    };

    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button />}>Archive workspace</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive workspace?</AlertDialogTitle>
            <AlertDialogDescription>
              Keep the dialog open while the request is pending, then close it only after success.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error ? (
            <AlertDialogBody>
              <p>{error}</p>
            </AlertDialogBody>
          ) : null}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending} render={<Button variant="outline" />}>
              Cancel
            </AlertDialogCancel>
            <Button type="button" disabled={pending} onClick={handleArchive}>
              {pending ? 'Archiving...' : 'Archive'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};

export const WithHandle: Story = {
  render: () => {
    const alertDialogHandle = React.useMemo(() => createAlertDialogHandle(), []);

    return (
      <React.Fragment>
        <AlertDialogTrigger handle={alertDialogHandle} render={<Button />}>
          Open from detached trigger
        </AlertDialogTrigger>
        <Button
          className={storyStyles.detachedTrigger}
          type="button"
          onClick={() => alertDialogHandle.open(null)}
        >
          Open programmatically
        </Button>

        <AlertDialog handle={alertDialogHandle}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete workspace?</AlertDialogTitle>
              <AlertDialogDescription>
                This alert dialog is connected via createAlertDialogHandle().
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
              <AlertDialogAction render={<Button />}>Delete</AlertDialogAction>
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
        <AlertDialogContent
          closeButton={
            <CloseButton aria-label="Close archive dialog" className={storyStyles.customCloseIcon}>
              <CloseLineIcon />
            </CloseButton>
          }
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Archive workspace?</AlertDialogTitle>
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

export const CustomStyles: Story = {
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

export const WithoutBackdrop: Story = {
  render: () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline" />}>
          Open without backdrop
        </AlertDialogTrigger>
        <AlertDialogContent withBackdrop={false}>
          <AlertDialogHeader>
            <AlertDialogTitle>Continue without backdrop?</AlertDialogTitle>
            <AlertDialogDescription>
              Background dimming is removed, but the dialog still behaves as a modal confirmation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
            <AlertDialogAction render={<Button />}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};