import type { ComponentProps, ComponentRef, ForwardedRef } from 'react';
import {
  Combobox as ComboboxPrimitive,
  type CollectionItem,
  type ComboboxRootComponent,
  type ComboboxRootProps,
  type ComboboxRootProviderComponent,
  type ComboboxRootProviderProps,
} from '@ark-ui/react/combobox';
import {
  Dialog as DialogPrimitive,
  type DialogOpenChangeDetails,
  useDialogContext,
} from '@ark-ui/react/dialog';
import { clsx } from 'clsx';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import { Kbd } from '../kbd';
import { ScrollArea } from '../scroll-area';
import styles from './CommandPalette.module.css';

type CommandPaletteRootProps = ComponentProps<typeof DialogPrimitive.Root> & {
  shortcut?: false | string;
  shortcutTarget?: Document | HTMLElement | null;
};

function isShortcutMatch(event: KeyboardEvent, shortcut: string) {
  const parts = shortcut
    .toLowerCase()
    .split('+')
    .map((part) => part.trim())
    .filter(Boolean);
  const [modifier, key] = parts;

  if (!modifier || !key || parts.length !== 2 || event.shiftKey) {
    return false;
  }

  const eventKey = event.key.toLowerCase();
  const eventCode =
    event.code.startsWith('Key') || event.code.startsWith('Digit')
      ? event.code.slice(event.code.startsWith('Key') ? 3 : 5).toLowerCase()
      : event.code.toLowerCase();

  if (eventKey !== key && eventCode !== key) {
    return false;
  }

  if (modifier === 'mod') {
    return (event.metaKey || event.ctrlKey) && !event.altKey;
  }

  if (modifier === 'ctrl' || modifier === 'control') {
    return event.ctrlKey && !event.metaKey && !event.altKey;
  }

  if (modifier === 'meta' || modifier === 'cmd' || modifier === 'command') {
    return event.metaKey && !event.ctrlKey && !event.altKey;
  }

  if (modifier === 'alt' || modifier === 'option') {
    return event.altKey && !event.metaKey && !event.ctrlKey;
  }

  return false;
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }

  return (
    target.closest('input, textarea, select, [contenteditable], [contenteditable="true"]') !== null
  );
}

function CommandPaletteRoot({
  shortcut = false,
  shortcutTarget,
  open,
  defaultOpen = false,
  lazyMount = true,
  unmountOnExit = true,
  onOpenChange,
  children,
  ...props
}: CommandPaletteRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const currentOpen = open ?? uncontrolledOpen;

  const handleOpenChange = useCallback(
    (details: DialogOpenChangeDetails) => {
      if (!isControlled) {
        setUncontrolledOpen(details.open);
      }

      onOpenChange?.(details);
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    if (!shortcut || shortcutTarget === null) {
      return;
    }

    const target = shortcutTarget ?? document;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.isComposing ||
        isEditableTarget(event.target) ||
        !isShortcutMatch(event, shortcut)
      ) {
        return;
      }

      event.preventDefault();
      handleOpenChange({ open: true });
    };

    const eventListener = handleKeyDown as EventListener;
    target.addEventListener('keydown', eventListener);
    return () => target.removeEventListener('keydown', eventListener);
  }, [handleOpenChange, shortcut, shortcutTarget]);

  return (
    <DialogPrimitive.Root
      open={currentOpen}
      lazyMount={lazyMount}
      unmountOnExit={unmountOnExit}
      onOpenChange={handleOpenChange}
      {...props}
    >
      {children}
    </DialogPrimitive.Root>
  );
}

function CommandPaletteRootProvider({
  lazyMount = true,
  unmountOnExit = true,
  ...props
}: ComponentProps<typeof DialogPrimitive.RootProvider>) {
  return (
    <DialogPrimitive.RootProvider lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...props} />
  );
}

const CommandPaletteTrigger = forwardRef<
  ComponentRef<typeof DialogPrimitive.Trigger>,
  ComponentProps<typeof DialogPrimitive.Trigger>
>(function CommandPaletteTrigger({ asChild, className, ...props }, ref) {
  return (
    <DialogPrimitive.Trigger
      ref={ref}
      asChild={asChild}
      data-slot="command-palette-trigger"
      className={clsx(!asChild && styles.trigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const CommandPaletteBackdrop = forwardRef<
  ComponentRef<typeof DialogPrimitive.Backdrop>,
  ComponentProps<typeof DialogPrimitive.Backdrop>
>(function CommandPaletteBackdrop({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Backdrop
      ref={ref}
      data-slot="command-palette-backdrop"
      className={clsx(styles.backdrop, normalizeClassName(className))}
      {...props}
    />
  );
});

const CommandPalettePositioner = forwardRef<
  ComponentRef<typeof DialogPrimitive.Positioner>,
  ComponentProps<typeof DialogPrimitive.Positioner>
>(function CommandPalettePositioner({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Positioner
      ref={ref}
      data-slot="command-palette-positioner"
      className={clsx(styles.positioner, normalizeClassName(className))}
      {...props}
    />
  );
});

const CommandPaletteContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  ComponentProps<typeof DialogPrimitive.Content>
>(function CommandPaletteContent({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Content
      ref={ref}
      data-slot="command-palette-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
    />
  );
});

const CommandPaletteTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentProps<typeof DialogPrimitive.Title>
>(function CommandPaletteTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      data-slot="command-palette-title"
      className={normalizeClassName(className)}
      {...props}
    />
  );
});

const CommandPaletteDescription = forwardRef<
  ComponentRef<typeof DialogPrimitive.Description>,
  ComponentProps<typeof DialogPrimitive.Description>
>(function CommandPaletteDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      data-slot="command-palette-description"
      className={normalizeClassName(className)}
      {...props}
    />
  );
});

const CommandPaletteCloseTrigger = forwardRef<
  ComponentRef<typeof DialogPrimitive.CloseTrigger>,
  ComponentProps<typeof DialogPrimitive.CloseTrigger>
>(function CommandPaletteCloseTrigger({ className, children, ...props }, ref) {
  return (
    <DialogPrimitive.CloseTrigger
      ref={ref}
      data-slot="command-palette-close-trigger"
      className={clsx(styles.closeTrigger, normalizeClassName(className))}
      {...props}
    >
      {children ?? <CloseIcon className={styles.iconSvg} />}
    </DialogPrimitive.CloseTrigger>
  );
});

const CommandPaletteCombobox = forwardRef(function CommandPaletteCombobox<T extends CollectionItem>(
  {
    className,
    open = true,
    inputBehavior = 'autohighlight',
    selectionBehavior = 'preserve',
    closeOnSelect = true,
    disableLayer = true,
    onSelect,
    ...props
  }: ComboboxRootProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const dialog = useDialogContext();
  const handleSelect: ComboboxRootProps<T>['onSelect'] = (details) => {
    onSelect?.(details);

    if (closeOnSelect) {
      dialog.setOpen(false);
    }
  };

  return (
    <ComboboxPrimitive.Root
      ref={ref}
      data-slot="command-palette-combobox"
      className={clsx(styles.combobox, normalizeClassName(className))}
      open={open}
      inputBehavior={inputBehavior}
      selectionBehavior={selectionBehavior}
      closeOnSelect={closeOnSelect}
      disableLayer={disableLayer}
      onSelect={handleSelect}
      {...props}
    />
  );
}) as ComboboxRootComponent;

const CommandPaletteComboboxRootProvider = forwardRef(function CommandPaletteComboboxRootProvider<
  T extends CollectionItem,
>({ className, ...props }: ComboboxRootProviderProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <ComboboxPrimitive.RootProvider
      ref={ref}
      data-slot="command-palette-combobox-root-provider"
      className={clsx(styles.combobox, normalizeClassName(className))}
      {...props}
    />
  );
}) as ComboboxRootProviderComponent;

const CommandPaletteControl = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Control>,
  ComponentProps<typeof ComboboxPrimitive.Control>
>(function CommandPaletteControl({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Control
      ref={ref}
      data-slot="command-palette-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
    />
  );
});

const CommandPaletteInput = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Input>,
  ComponentProps<typeof ComboboxPrimitive.Input>
>(function CommandPaletteInput({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Input
      ref={ref}
      data-slot="command-palette-input"
      className={clsx(styles.input, normalizeClassName(className))}
      {...props}
    />
  );
});

const CommandPaletteClearTrigger = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ClearTrigger>,
  ComponentProps<typeof ComboboxPrimitive.ClearTrigger>
>(function CommandPaletteClearTrigger({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.ClearTrigger
      ref={ref}
      data-slot="command-palette-clear-trigger"
      className={clsx(styles.clearTrigger, normalizeClassName(className))}
      {...props}
    >
      {children ?? <CloseIcon className={styles.iconSvg} />}
    </ComboboxPrimitive.ClearTrigger>
  );
});

const CommandPaletteList = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Content>,
  ComponentProps<typeof ComboboxPrimitive.Content>
>(function CommandPaletteList({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.Content
      ref={ref}
      data-slot="command-palette-list"
      className={clsx(styles.list, normalizeClassName(className))}
      {...props}
    >
      <ScrollArea data-slot="command-palette-scroll-area" className={styles.scrollArea}>
        <ScrollArea.Viewport
          data-slot="command-palette-scroll-viewport"
          className={styles.scrollViewport}
        >
          <ScrollArea.Content
            data-slot="command-palette-scroll-content"
            className={styles.scrollContent}
          >
            {children}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar data-slot="command-palette-scrollbar" className={styles.scrollbar}>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea>
    </ComboboxPrimitive.Content>
  );
});

const CommandPaletteEmpty = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Empty>,
  ComponentProps<typeof ComboboxPrimitive.Empty>
>(function CommandPaletteEmpty({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Empty
      ref={ref}
      data-slot="command-palette-empty"
      className={clsx(styles.empty, normalizeClassName(className))}
      {...props}
    />
  );
});

const CommandPaletteItemGroup = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ItemGroup>,
  ComponentProps<typeof ComboboxPrimitive.ItemGroup>
>(function CommandPaletteItemGroup({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemGroup
      ref={ref}
      data-slot="command-palette-item-group"
      className={clsx(styles.itemGroup, normalizeClassName(className))}
      {...props}
    />
  );
});

const CommandPaletteItemGroupLabel = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ItemGroupLabel>,
  ComponentProps<typeof ComboboxPrimitive.ItemGroupLabel>
>(function CommandPaletteItemGroupLabel({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemGroupLabel
      ref={ref}
      data-slot="command-palette-item-group-label"
      className={clsx(styles.itemGroupLabel, normalizeClassName(className))}
      {...props}
    />
  );
});

const CommandPaletteItem = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Item>,
  ComponentProps<typeof ComboboxPrimitive.Item>
>(function CommandPaletteItem({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Item
      ref={ref}
      data-slot="command-palette-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
    />
  );
});

const CommandPaletteItemText = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ItemText>,
  ComponentProps<typeof ComboboxPrimitive.ItemText>
>(function CommandPaletteItemText({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemText
      ref={ref}
      data-slot="command-palette-item-text"
      className={clsx(styles.itemText, normalizeClassName(className))}
      {...props}
    />
  );
});

const CommandPaletteItemIndicator = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ItemIndicator>,
  ComponentProps<typeof ComboboxPrimitive.ItemIndicator>
>(function CommandPaletteItemIndicator({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemIndicator
      ref={ref}
      data-slot="command-palette-item-indicator"
      className={clsx(styles.itemIndicator, normalizeClassName(className))}
      {...props}
    />
  );
});

function CommandPaletteItemIcon({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-palette-item-icon"
      className={clsx(styles.itemIcon, normalizeClassName(className))}
      {...props}
    />
  );
}

function CommandPaletteItemLabel({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-palette-item-label"
      className={clsx(styles.itemLabel, normalizeClassName(className))}
      {...props}
    />
  );
}

function CommandPaletteItemDescription({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-palette-item-description"
      className={clsx(styles.itemDescription, normalizeClassName(className))}
      {...props}
    />
  );
}

function CommandPaletteItemMeta({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-palette-item-meta"
      className={clsx(styles.itemMeta, normalizeClassName(className))}
      {...props}
    />
  );
}

function CommandPaletteSeparator({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      role="separator"
      data-slot="command-palette-separator"
      className={clsx(styles.separator, normalizeClassName(className))}
      {...props}
    />
  );
}

function CommandPaletteFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="command-palette-footer"
      className={clsx(styles.footer, normalizeClassName(className))}
      {...props}
    />
  );
}

function CommandPaletteKbd({ className, ...props }: ComponentProps<typeof Kbd.Root>) {
  return (
    <Kbd.Root
      data-slot="command-palette-kbd"
      className={clsx(styles.kbd, normalizeClassName(className))}
      {...props}
    />
  );
}

const CommandPaletteContext = DialogPrimitive.Context;
const CommandPaletteComboboxContext = ComboboxPrimitive.Context;
const CommandPaletteItemContext = ComboboxPrimitive.ItemContext;

const CommandPalette = Object.assign(CommandPaletteRoot, {
  Root: CommandPaletteRoot,
  RootProvider: CommandPaletteRootProvider,
  Trigger: CommandPaletteTrigger,
  Backdrop: CommandPaletteBackdrop,
  Positioner: CommandPalettePositioner,
  Content: CommandPaletteContent,
  Title: CommandPaletteTitle,
  Description: CommandPaletteDescription,
  CloseTrigger: CommandPaletteCloseTrigger,
  Combobox: CommandPaletteCombobox,
  ComboboxRootProvider: CommandPaletteComboboxRootProvider,
  Control: CommandPaletteControl,
  Input: CommandPaletteInput,
  ClearTrigger: CommandPaletteClearTrigger,
  List: CommandPaletteList,
  Empty: CommandPaletteEmpty,
  ItemGroup: CommandPaletteItemGroup,
  ItemGroupLabel: CommandPaletteItemGroupLabel,
  Item: CommandPaletteItem,
  ItemText: CommandPaletteItemText,
  ItemIndicator: CommandPaletteItemIndicator,
  ItemIcon: CommandPaletteItemIcon,
  ItemLabel: CommandPaletteItemLabel,
  ItemDescription: CommandPaletteItemDescription,
  ItemMeta: CommandPaletteItemMeta,
  Separator: CommandPaletteSeparator,
  Footer: CommandPaletteFooter,
  Kbd: CommandPaletteKbd,
  Context: CommandPaletteContext,
  ComboboxContext: CommandPaletteComboboxContext,
  ItemContext: CommandPaletteItemContext,
});

export { CommandPalette };