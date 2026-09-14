import { Dialog as ModuixDialog } from '@moduix/solid/dialog';
// shadcn copy-owned: import { Dialog as ModuixDialog } from '@/components/ui/dialog';
import { splitProps, type ComponentProps } from 'solid-js';
import styles from '@/components/examples/composition-patterns/product-dialog.module.css';

type DialogProps = ComponentProps<typeof ModuixDialog>;
type DialogTone = 'default' | 'danger';

type DialogContentProps = ComponentProps<typeof ModuixDialog.Content> & {
  tone?: DialogTone;
};

function DialogRoot(props: DialogProps) {
  return <ModuixDialog {...props} />;
}

export function DialogContent(props: DialogContentProps) {
  const [local, contentProps] = splitProps(props, ['class', 'tone']);

  return (
    <ModuixDialog.Content
      {...contentProps}
      data-dialog-tone={local.tone ?? 'default'}
      class={[styles.content, local.class].filter(Boolean).join(' ')}
    />
  );
}

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