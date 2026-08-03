import { Dialog as DialogBase } from '@moduix/react/dialog';
// shadcn copy-owned: import { Dialog as DialogBase } from '@/components/moduix/dialog';
import { forwardRef, type ComponentProps, type ComponentRef } from 'react';
import styles from './product-dialog.module.css';

function mergeClassName(base: string, className: unknown) {
  return typeof className === 'string' ? `${base} ${className}` : base;
}

export const Dialog = DialogBase;
export const DialogTrigger = DialogBase.Trigger;
export const DialogPositioner = DialogBase.Positioner;
export const DialogTitle = DialogBase.Title;
export const DialogDescription = DialogBase.Description;
export const DialogCloseTrigger = DialogBase.CloseTrigger;

export const DialogContent = forwardRef<
  ComponentRef<typeof DialogBase.Content>,
  ComponentProps<typeof DialogBase.Content>
>(function DialogContent({ className, ...props }, ref) {
  return (
    <DialogBase.Content
      ref={ref}
      className={mergeClassName(styles.content, className)}
      {...props}
    />
  );
});

export const DialogBackdrop = forwardRef<
  ComponentRef<typeof DialogBase.Backdrop>,
  ComponentProps<typeof DialogBase.Backdrop>
>(function DialogBackdrop({ className, ...props }, ref) {
  return (
    <DialogBase.Backdrop
      ref={ref}
      className={mergeClassName(styles.backdrop, className)}
      {...props}
    />
  );
});

export function DeleteProjectDialog() {
  return (
    <Dialog>
      <DialogTrigger>Delete project</DialogTrigger>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Delete this project?</DialogTitle>
          <DialogDescription>This cannot be undone.</DialogDescription>
          <DialogCloseTrigger>Cancel</DialogCloseTrigger>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}