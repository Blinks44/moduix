import {
  Dialog as ModuixDialog,
  DialogBackdrop as ModuixDialogBackdrop,
  DialogBody as ModuixDialogBody,
  DialogCloseIcon as ModuixDialogCloseIcon,
  DialogCloseTrigger as ModuixDialogCloseTrigger,
  DialogContext as ModuixDialogContext,
  DialogContent as ModuixDialogContent,
  DialogDescription as ModuixDialogDescription,
  DialogFooter as ModuixDialogFooter,
  DialogHeader as ModuixDialogHeader,
  DialogPositioner as ModuixDialogPositioner,
  DialogRootProvider as ModuixDialogRootProvider,
  DialogTitle as ModuixDialogTitle,
  DialogTrigger as ModuixDialogTrigger,
} from '@moduix/react/dialog';
// shadcn copy-owned: import { Dialog as ModuixDialog, DialogContent as ModuixDialogContent } from '@/components/ui/dialog';
import { forwardRef, type ComponentProps, type ComponentRef } from 'react';
import styles from './product-dialog.module.css';

type DialogProps = ComponentProps<typeof ModuixDialog>;
type DialogTone = 'default' | 'danger';

type DialogContentProps = ComponentProps<typeof ModuixDialogContent> & {
  tone?: DialogTone;
};

export const DialogContent = forwardRef<
  ComponentRef<typeof ModuixDialogContent>,
  DialogContentProps
>(function DialogContent({ className, tone = 'default', ...props }, ref) {
  return (
    <ModuixDialogContent
      {...props}
      ref={ref}
      data-dialog-tone={tone}
      className={[styles.content, className].filter(Boolean).join(' ')}
    />
  );
});

export const Dialog = ModuixDialog;
export const DialogRootProvider = ModuixDialogRootProvider;
export const DialogContext = ModuixDialogContext;
export const DialogTrigger = ModuixDialogTrigger;
export const DialogBackdrop = ModuixDialogBackdrop;
export const DialogPositioner = ModuixDialogPositioner;
export const DialogTitle = ModuixDialogTitle;
export const DialogDescription = ModuixDialogDescription;
export const DialogCloseTrigger = ModuixDialogCloseTrigger;
export const DialogCloseIcon = ModuixDialogCloseIcon;
export const DialogHeader = ModuixDialogHeader;
export const DialogBody = ModuixDialogBody;
export const DialogFooter = ModuixDialogFooter;

export type { DialogContentProps, DialogProps, DialogTone };