import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment, useMemo, useState } from 'react';
import { insideScrollSections } from '@/data/insideScrollSections';
import { Button } from '../button';
import { ScrollArea } from '../scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
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
        <AlertDialogTrigger>Discard draft</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard draft?</AlertDialogTitle>
            <AlertDialogDescription>You cannot undo this action.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Discard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Fragment>
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
              <AlertDialogCancel>Back to editing</AlertDialogCancel>
              <AlertDialogAction>Publish</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Fragment>
    );
  },
};

export const AsyncConfirmation: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');

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
        <AlertDialogTrigger>Archive workspace</AlertDialogTrigger>
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
            <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
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
    const alertDialogHandle = useMemo(() => createAlertDialogHandle(), []);

    return (
      <Fragment>
        <AlertDialogTrigger handle={alertDialogHandle}>
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
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Fragment>
    );
  },
};

export const WithScrollableViewport: Story = {
  render: () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>Delete project</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes all deployment environments and API keys.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogBody className={storyStyles.scrollBody}>
            <ScrollArea className={storyStyles.scrollArea}>
              <div className={storyStyles.scrollContent}>
                {insideScrollSections.map((item) => (
                  <section key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </section>
                ))}
              </div>
            </ScrollArea>
          </AlertDialogBody>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete permanently</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};

export const CustomComposition: Story = {
  render: () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>Reset environment</AlertDialogTrigger>
        <AlertDialogContent className={storyStyles.customPopup}>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset environment?</AlertDialogTitle>
            <AlertDialogDescription>
              All runtime variables will return to their default values.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Reset</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};