'use client';

import {
  Combobox as ComboboxPrimitive,
  type CollectionItem,
  type ComboboxRootComponent,
  type ComboboxRootProps,
} from '@ark-ui/react/combobox';
import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/react/dialog';
import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { isHotKey } from '@zag-js/hotkeys';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ForwardedRef } from 'react';
import { forwardRef, useEffect } from 'react';
import { CheckIcon, CloseIcon } from '@/lib/moduix/icons/ui';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import closeButtonStyles from '../close-button/CloseButton.module.css';
import { Kbd } from '../kbd';
import { ScrollArea } from '../scroll-area';
import styles from './CommandPalette.module.css';

const DEFAULT_CLEAR_TRIGGER_LABEL = 'Clear search';
const DEFAULT_SEARCH_INPUT_LABEL = 'Search commands';

type CommandPaletteRootProps = ComponentProps<typeof DialogPrimitive.Root> & {
  shortcut?: false | string;
} & OverlayPortalProps;

type CommandPaletteRootProviderProps = ComponentProps<typeof DialogPrimitive.RootProvider> &
  OverlayPortalProps;

function CommandPaletteRoot({
  shortcut = false,
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
    if (!shortcut) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.isComposing ||
        !isHotKey(shortcut, event, {
          enableOnContentEditable: dialog.open,
          enableOnFormTags: dialog.open,
        })
      ) {
        return;
      }

      event.preventDefault();
      dialog.setOpen(!dialog.open);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dialog, shortcut]);

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
      className={clsx(!asChild && styles.trigger, className)}
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
        className={clsx(styles.backdrop, className)}
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
        className={clsx(styles.positioner, className)}
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
      className={clsx(styles.content, className)}
      {...props}
    />
  );
});

const CommandPalettePanel = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  ComponentProps<typeof DialogPrimitive.Content>
>(function CommandPalettePanel({ children, ...props }, ref) {
  return (
    <>
      <CommandPaletteBackdrop />
      <CommandPalettePositioner>
        <CommandPaletteContent ref={ref} {...props}>
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
      className={clsx(styles.title, className)}
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
      className={clsx(styles.description, className)}
      {...props}
    />
  );
});

const CommandPaletteHeader = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function CommandPaletteHeader({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-slot="command-palette-header"
        className={clsx(styles.header, className)}
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
        className={clsx(styles.body, className)}
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
      className={clsx(styles.combobox, className)}
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
      className={clsx(styles.control, className)}
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
      className={clsx(styles.input, className)}
      {...props}
    />
  );
});

const CommandPaletteSearch = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Input>,
  ComponentProps<typeof ComboboxPrimitive.Input>
>(function CommandPaletteSearch(
  { 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, ...props },
  ref,
) {
  return (
    <CommandPaletteControl>
      <CommandPaletteInput
        ref={ref}
        aria-label={ariaLabel ?? (ariaLabelledBy == null ? DEFAULT_SEARCH_INPUT_LABEL : undefined)}
        aria-labelledby={ariaLabelledBy}
        {...props}
      />
      <CommandPaletteClearTrigger />
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
    onClick,
    onPointerDown,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  },
  ref,
) {
  return (
    <ComboboxPrimitive.Context>
      {(combobox) => (
        <ComboboxPrimitive.ClearTrigger
          ref={ref}
          asChild={asChild}
          {...props}
          data-slot="command-palette-clear-trigger"
          hidden={combobox.inputValue.length === 0}
          aria-label={
            ariaLabel ??
            (!asChild && children == null && ariaLabelledBy == null
              ? DEFAULT_CLEAR_TRIGGER_LABEL
              : undefined)
          }
          aria-labelledby={ariaLabelledBy}
          className={clsx(closeButtonStyles.root, styles.clearTrigger, className)}
          onClick={(event) => {
            onClick?.(event);

            if (!event.defaultPrevented) {
              combobox.setInputValue('');
            }
          }}
          onPointerDown={(event) => {
            onPointerDown?.(event);

            if (event.button === 0) {
              event.preventDefault();
              combobox.setInputValue('');
            }
          }}
        >
          {children ?? <CloseIcon />}
        </ComboboxPrimitive.ClearTrigger>
      )}
    </ComboboxPrimitive.Context>
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
      className={clsx(styles.list, className)}
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
      className={clsx(styles.empty, className)}
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
      className={clsx(styles.itemGroup, className)}
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
      className={clsx(styles.itemGroupLabel, className)}
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
      className={clsx(styles.item, className)}
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
      className={clsx(styles.itemText, className)}
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
      className={clsx(styles.itemIndicator, className)}
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
        className={clsx(styles.itemIcon, className)}
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
        className={clsx(styles.itemLabel, className)}
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
        className={clsx(styles.itemDescription, className)}
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
        className={clsx(styles.itemMeta, className)}
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
        className={clsx(styles.separator, className)}
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
        className={clsx(styles.footer, className)}
        {...props}
      />
    );
  },
);

function CommandPaletteKbd({ className, ...props }: ComponentProps<typeof Kbd.Root>) {
  return (
    <Kbd.Root data-slot="command-palette-kbd" className={clsx(styles.kbd, className)} {...props} />
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