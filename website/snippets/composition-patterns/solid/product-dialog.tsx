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
} from '@moduix/solid/dialog';
// shadcn copy-owned: import { Dialog as ModuixDialog, DialogContent as ModuixDialogContent } from '@/components/ui/dialog';
import { splitProps, type ComponentProps } from 'solid-js';
import styles from '@/components/examples/composition-patterns/product-dialog.module.css';

type DialogProps = ComponentProps<typeof ModuixDialog>;
type DialogTone = 'default' | 'danger';

type DialogContentProps = ComponentProps<typeof ModuixDialogContent> & {
  tone?: DialogTone;
};

export function DialogContent(props: DialogContentProps) {
  const [local, contentProps] = splitProps(props, ['class', 'tone']);

  return (
    <ModuixDialogContent
      {...contentProps}
      data-dialog-tone={local.tone ?? 'default'}
      class={[styles.content, local.class].filter(Boolean).join(' ')}
    />
  );
}

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