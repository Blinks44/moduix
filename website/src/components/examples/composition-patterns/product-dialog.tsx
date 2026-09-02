import { Dialog as ModuixDialog } from '@moduix/react/dialog';
// shadcn copy-owned: import { Dialog as ModuixDialog } from '@/components/moduix/dialog';
import { forwardRef, type ComponentProps, type ComponentRef } from 'react';
import styles from './product-dialog.module.css';

type DialogProps = ComponentProps<typeof ModuixDialog>;
type DialogTone = 'default' | 'danger';

type DialogContentProps = ComponentProps<typeof ModuixDialog.Content> & {
  tone?: DialogTone;
};

function DialogRoot(props: DialogProps) {
  return <ModuixDialog {...props} />;
}

export const DialogContent = forwardRef<
  ComponentRef<typeof ModuixDialog.Content>,
  DialogContentProps
>(function DialogContent({ className, tone = 'default', ...props }, ref) {
  return (
    <ModuixDialog.Content
      {...props}
      ref={ref}
      data-dialog-tone={tone}
      className={[styles.content, className].filter(Boolean).join(' ')}
    />
  );
});

export const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  RootProvider: ModuixDialog.RootProvider,
  Context: ModuixDialog.Context,
  Trigger: ModuixDialog.Trigger,
  Backdrop: ModuixDialog.Backdrop,
  Positioner: ModuixDialog.Positioner,
  Content: DialogContent,
  Title: ModuixDialog.Title,
  Description: ModuixDialog.Description,
  CloseTrigger: ModuixDialog.CloseTrigger,
  CloseIcon: ModuixDialog.CloseIcon,
  Header: ModuixDialog.Header,
  Body: ModuixDialog.Body,
  Footer: ModuixDialog.Footer,
});

export type { DialogContentProps, DialogProps, DialogTone };