import {
  Combobox as ComboboxPrimitive,
  type CollectionItem,
  type ComboboxRootComponent,
  type ComboboxRootProps,
} from '@ark-ui/react/combobox';
import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/react/dialog';
import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ForwardedRef } from 'react';
import { forwardRef, useEffect } from 'react';
import { CheckIcon, CloseIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import { Kbd } from '../kbd';
import { ScrollArea } from '../scroll-area';
import styles from './CommandPalette.module.css';

const DEFAULT_CLOSE_TRIGGER_LABEL = 'Close command palette';
const DEFAULT_CLOSE_ICON_LABEL = 'Close command palette';
const DEFAULT_CLEAR_TRIGGER_LABEL = 'Clear search';
const DEFAULT_SEARCH_INPUT_LABEL = 'Search commands';

type CommandPaletteRootProps = ComponentProps<typeof DialogPrimitive.Root> & {
  shortcut?: false | string;
  shortcutTarget?: Document | HTMLElement | null;
} & OverlayPortalProps;

type CommandPaletteRootProviderProps = ComponentProps<typeof DialogPrimitive.RootProvider> &
  OverlayPortalProps;

type CommandPalettePanelProps = ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseIcon?: boolean;
};

type CommandPaletteSearchProps = ComponentProps<typeof ComboboxPrimitive.Input> & {
  controlProps?: ComponentProps<typeof ComboboxPrimitive.Control>;
  clearTriggerProps?: ComponentProps<typeof ComboboxPrimitive.ClearTrigger>;
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
  lazyMount = true,
  unmountOnExit = true,
  immediate,
  onExitComplete,
  portalled,
  present,
  portalRef,
  skipAnimationOnMount,
  children,
  ...props
}: CommandPaletteRootProps) {
  const dialog = useDialog(props);

  useEffect(() => {
    if (!shortcut || shortcutTarget === null) {
      return;
    }

    const target = shortcutTarget ?? document;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.isComposing ||
        !isShortcutMatch(event, shortcut) ||
        (!dialog.open && isEditableTarget(event.target))
      ) {
        return;
      }

      event.preventDefault();
      dialog.setOpen(!dialog.open);
    };

    const eventListener = handleKeyDown as EventListener;
    target.addEventListener('keydown', eventListener);
    return () => target.removeEventListener('keydown', eventListener);
  }, [dialog, shortcut, shortcutTarget]);

  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DialogPrimitive.RootProvider
        value={dialog}
        immediate={immediate}
        lazyMount={lazyMount}
        onExitComplete={onExitComplete}
        present={present}
        skipAnimationOnMount={skipAnimationOnMount}
        unmountOnExit={unmountOnExit}
      >
        {children}
      </DialogPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

function CommandPaletteRootProvider({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: CommandPaletteRootProviderProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DialogPrimitive.RootProvider
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
      />
    </OverlayPortalProvider>
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
    <OverlayPortal>
      <DialogPrimitive.Backdrop
        ref={ref}
        data-slot="command-palette-backdrop"
        className={clsx(styles.backdrop, normalizeClassName(className))}
        {...props}
      />
    </OverlayPortal>
  );
});

const CommandPalettePositioner = forwardRef<
  ComponentRef<typeof DialogPrimitive.Positioner>,
  ComponentProps<typeof DialogPrimitive.Positioner>
>(function CommandPalettePositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <DialogPrimitive.Positioner
        ref={ref}
        data-slot="command-palette-positioner"
        className={clsx(styles.positioner, normalizeClassName(className))}
        {...props}
      />
    </OverlayPortal>
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

const CommandPalettePanel = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  CommandPalettePanelProps
>(function CommandPalettePanel({ children, showCloseIcon = false, ...props }, ref) {
  return (
    <>
      <CommandPaletteBackdrop />
      <CommandPalettePositioner>
        <CommandPaletteContent ref={ref} {...props}>
          {showCloseIcon ? <CommandPaletteCloseIcon /> : null}
          <CommandPaletteBody>{children}</CommandPaletteBody>
        </CommandPaletteContent>
      </CommandPalettePositioner>
    </>
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
      className={clsx(styles.title, normalizeClassName(className))}
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
      className={clsx(styles.description, normalizeClassName(className))}
      {...props}
    />
  );
});

const CommandPaletteCloseTrigger = forwardRef<
  ComponentRef<typeof DialogPrimitive.CloseTrigger>,
  ComponentProps<typeof DialogPrimitive.CloseTrigger>
>(function CommandPaletteCloseTrigger(
  {
    asChild,
    className,
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  },
  ref,
) {
  return (
    <DialogPrimitive.CloseTrigger
      ref={ref}
      asChild={asChild}
      data-slot="command-palette-close-trigger"
      aria-label={
        ariaLabel ??
        (!asChild && children == null && ariaLabelledBy == null
          ? DEFAULT_CLOSE_TRIGGER_LABEL
          : undefined)
      }
      aria-labelledby={ariaLabelledBy}
      className={clsx(!asChild && styles.closeTrigger, normalizeClassName(className))}
      {...props}
    >
      {children ?? (!asChild ? <CloseIcon className={styles.iconSvg} /> : undefined)}
    </DialogPrimitive.CloseTrigger>
  );
});

const CommandPaletteCloseIcon = forwardRef<
  ComponentRef<typeof CloseButton.Root>,
  Omit<ComponentProps<typeof DialogPrimitive.CloseTrigger>, 'asChild'>
>(function CommandPaletteCloseIcon(
  { className, children, 'aria-label': ariaLabel = DEFAULT_CLOSE_ICON_LABEL, ...props },
  ref,
) {
  return (
    <DialogPrimitive.CloseTrigger asChild {...props}>
      <CloseButton.Root
        ref={ref}
        data-slot="command-palette-close-icon"
        aria-label={ariaLabel}
        className={clsx(styles.closeIcon, normalizeClassName(className))}
      >
        {children}
      </CloseButton.Root>
    </DialogPrimitive.CloseTrigger>
  );
});

const CommandPaletteHeader = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function CommandPaletteHeader({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-slot="command-palette-header"
        className={clsx(styles.header, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const CommandPaletteBody = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function CommandPaletteBody({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-slot="command-palette-body"
        className={clsx(styles.body, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

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

const CommandPaletteSearch = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Input>,
  CommandPaletteSearchProps
>(function CommandPaletteSearch(
  {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    clearTriggerProps,
    controlProps,
    ...props
  },
  ref,
) {
  return (
    <CommandPaletteControl {...controlProps}>
      <CommandPaletteInput
        ref={ref}
        aria-label={ariaLabel ?? (ariaLabelledBy == null ? DEFAULT_SEARCH_INPUT_LABEL : undefined)}
        aria-labelledby={ariaLabelledBy}
        {...props}
      />
      <CommandPaletteClearTrigger {...clearTriggerProps} />
    </CommandPaletteControl>
  );
});

const CommandPaletteClearTrigger = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ClearTrigger>,
  ComponentProps<typeof ComboboxPrimitive.ClearTrigger>
>(function CommandPaletteClearTrigger(
  {
    asChild,
    className,
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  },
  ref,
) {
  return (
    <ComboboxPrimitive.ClearTrigger
      ref={ref}
      asChild={asChild}
      data-slot="command-palette-clear-trigger"
      aria-label={
        ariaLabel ??
        (!asChild && children == null && ariaLabelledBy == null
          ? DEFAULT_CLEAR_TRIGGER_LABEL
          : undefined)
      }
      aria-labelledby={ariaLabelledBy}
      className={clsx(!asChild && styles.clearTrigger, normalizeClassName(className))}
      {...props}
    >
      {children ?? (!asChild ? <CloseIcon className={styles.iconSvg} /> : undefined)}
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
>(function CommandPaletteItemIndicator({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemIndicator
      ref={ref}
      data-slot="command-palette-item-indicator"
      className={clsx(styles.itemIndicator, normalizeClassName(className))}
      {...props}
    >
      {children ?? <CheckIcon />}
    </ComboboxPrimitive.ItemIndicator>
  );
});

const CommandPaletteItemIcon = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(
  function CommandPaletteItemIcon({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        data-slot="command-palette-item-icon"
        className={clsx(styles.itemIcon, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const CommandPaletteItemLabel = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(
  function CommandPaletteItemLabel({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        data-slot="command-palette-item-label"
        className={clsx(styles.itemLabel, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const CommandPaletteItemDescription = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(
  function CommandPaletteItemDescription({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        data-slot="command-palette-item-description"
        className={clsx(styles.itemDescription, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const CommandPaletteItemMeta = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(
  function CommandPaletteItemMeta({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        data-slot="command-palette-item-meta"
        className={clsx(styles.itemMeta, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const CommandPaletteSeparator = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function CommandPaletteSeparator({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        role="separator"
        data-slot="command-palette-separator"
        className={clsx(styles.separator, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const CommandPaletteFooter = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function CommandPaletteFooter({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-slot="command-palette-footer"
        className={clsx(styles.footer, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

function CommandPaletteKbd({ className, ...props }: ComponentProps<typeof Kbd.Root>) {
  return (
    <Kbd.Root
      data-slot="command-palette-kbd"
      className={clsx(styles.kbd, normalizeClassName(className))}
      {...props}
    />
  );
}

const CommandPalette = Object.assign(CommandPaletteRoot, {
  Root: CommandPaletteRoot,
  RootProvider: CommandPaletteRootProvider,
  Trigger: CommandPaletteTrigger,
  Backdrop: CommandPaletteBackdrop,
  Positioner: CommandPalettePositioner,
  Content: CommandPaletteContent,
  Panel: CommandPalettePanel,
  Title: CommandPaletteTitle,
  Description: CommandPaletteDescription,
  CloseTrigger: CommandPaletteCloseTrigger,
  CloseIcon: CommandPaletteCloseIcon,
  Header: CommandPaletteHeader,
  Body: CommandPaletteBody,
  Combobox: CommandPaletteCombobox,
  Control: CommandPaletteControl,
  Input: CommandPaletteInput,
  Search: CommandPaletteSearch,
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
});

export { CommandPalette };