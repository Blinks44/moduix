import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { insideScrollSections } from '@/data/insideScrollSections';
import { Button } from '../Button';
import { ScrollArea } from '../ScrollArea';
import {
  Dialog,
  createDialogHandle,
  DialogClose,
  DialogCloseIcon,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog';
import storyStyles from './Dialog.stories.module.css';

const meta = {
  title: 'Components/Dialog',
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
      <Dialog>
        <DialogTrigger render={<Button />}>View notifications</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogCloseIcon className={storyStyles.insideCloseIcon} />
            <DialogDescription>You are all caught up. Good job!</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Publish changes?</DialogTitle>
              <DialogDescription>
                This will make the latest version visible to all users.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>Back to editing</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  },
};

export const WithHandle: Story = {
  render: () => {
    const dialogHandle = React.useMemo(() => createDialogHandle(), []);

    return (
      <React.Fragment>
        <DialogTrigger handle={dialogHandle} render={<Button />}>
          Open from detached trigger
        </DialogTrigger>
        <Button
          className={storyStyles.detachedTrigger}
          type="button"
          onClick={() => dialogHandle.open(null)}
        >
          Open programmatically
        </Button>

        <Dialog handle={dialogHandle}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detached trigger</DialogTitle>
              <DialogDescription>
                This dialog is connected via createDialogHandle().
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  },
};

export const WithScrollableViewport: Story = {
  render: () => {
    return (
      <Dialog>
        <DialogTrigger render={<Button />}>Open long content</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Release checklist</DialogTitle>
            <DialogDescription>Review all items before publishing to production.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>Confirm migration scripts are idempotent and have rollback steps.</p>
            <p>Check that the monitoring dashboard includes new API endpoints.</p>
            <p>Verify analytics events for the onboarding funnel are firing.</p>
            <p>Run smoke tests in staging with a production-like dataset.</p>
            <p>Ensure feature flags are configured for gradual rollout.</p>
            <p>Notify support about possible temporary UI inconsistencies.</p>
          </DialogBody>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const Nested: Story = {
  render: () => {
    return (
      <Dialog>
        <DialogTrigger render={<Button />}>View notifications</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogDescription>You are all caught up. Good job!</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className={storyStyles.nestedActionsStart}>
              <Dialog>
                <DialogTrigger render={<Button />}>Customize</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Customize notifications</DialogTitle>
                    <DialogDescription>Review your settings here.</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const InsideScrollDialog: Story = {
  render: () => {
    return (
      <Dialog>
        <DialogTrigger render={<Button />}>Open inside scroll dialog</DialogTrigger>
        <DialogContent
          className={storyStyles.insidePopup}
          classNames={{ viewport: storyStyles.insideViewport }}
        >
          <DialogHeader>
            <DialogTitle>Dialog</DialogTitle>
            <DialogCloseIcon className={storyStyles.insideCloseIcon} />
            <DialogDescription>
              This layout keeps the popup fully on screen while allowing its content to scroll.
            </DialogDescription>
          </DialogHeader>

          <DialogBody className={storyStyles.insideBodyWrapper}>
            <ScrollArea
              className={storyStyles.insideBody}
              classNames={{
                viewport: storyStyles.insideBodyViewport,
                content: storyStyles.insideBodyContent,
              }}
            >
              {insideScrollSections.map((item) => (
                <section key={item.title}>
                  <h3 className={storyStyles.insideSectionTitle}>{item.title}</h3>
                  <p className={storyStyles.insideSectionBody}>{item.body}</p>
                </section>
              ))}
            </ScrollArea>
          </DialogBody>

          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <Dialog>
        <DialogTrigger render={<Button />}>Open outside close icon</DialogTrigger>
        <DialogContent
          className={storyStyles.customPopup}
          classNames={{
            portal: storyStyles.customPortal,
            backdrop: storyStyles.customBackdrop,
            viewport: storyStyles.customViewport,
          }}
        >
          <DialogCloseIcon className={storyStyles.customCloseIcon} />
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              This popup, backdrop, viewport, and close icon are styled with className and
              classNames.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>Update the public profile fields and save changes.</p>
          </DialogBody>
          <DialogFooter>
            <DialogClose render={<Button />}>Save</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};