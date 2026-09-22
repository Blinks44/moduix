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
import { isHotKey } from '@ark-ui/react/hotkeys';
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
import { ScrollArea, ScrollAreaContent, ScrollAreaViewport } from '../scroll-area';
import styles from './CommandPalette.module.css';

const DEFAULT_CLEAR_TRIGGER_LABEL = 'Clear search';
const DEFAULT_SEARCH_INPUT_LABEL = 'Search commands';

type CommandPaletteProps = ComponentProps<typeof DialogPrimitive.Root> & {
  shortcut?: false | string;
} & OverlayPortalProps;

type CommandPaletteRootProviderProps = ComponentProps<typeof DialogPrimitive.RootProvider> &
  OverlayPortalProps;

function CommandPalette({
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
}: CommandPaletteProps) {
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
      className={clsx(!asChild && styles.trigger, className)}
      {...props}
      data-slot="command-palette-trigger"
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
        className={clsx(styles.backdrop, className)}
        {...props}
        data-slot="command-palette-backdrop"
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
        className={clsx(styles.positioner, className)}
        {...props}
        data-slot="command-palette-positioner"
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
      className={clsx(styles.content, className)}
      {...props}
      data-slot="command-palette-content"
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
      className={clsx(styles.title, className)}
      {...props}
      data-slot="command-palette-title"
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
      className={clsx(styles.description, className)}
      {...props}
      data-slot="command-palette-description"
    />
  );
});

const CommandPaletteHeader = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function CommandPaletteHeader({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.header, className)}
        {...props}
        data-slot="command-palette-header"
      />
    );
  },
);

const CommandPaletteBody = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function CommandPaletteBody({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.body, className)}
        {...props}
        data-slot="command-palette-body"
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
      className={clsx(styles.combobox, className)}
      open={open}
      inputBehavior={inputBehavior}
      selectionBehavior={selectionBehavior}
      closeOnSelect={closeOnSelect}
      disableLayer={disableLayer}
      onSelect={handleSelect}
      {...props}
      data-slot="command-palette-combobox"
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
      className={clsx(styles.control, className)}
      {...props}
      data-slot="command-palette-control"
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
      className={clsx(styles.input, className)}
      {...props}
      data-slot="command-palette-input"
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
              event.preventDefault();
              combobox.setInputValue('');
            }
          }}
          onPointerDown={(event) => {
            onPointerDown?.(event);

            if (event.button === 0) {
              event.preventDefault();
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
      className={clsx(styles.list, className)}
      {...props}
      data-slot="command-palette-list"
    >
      <ScrollArea data-slot="command-palette-scroll-area" className={styles.scrollArea}>
        <ScrollAreaViewport
          data-slot="command-palette-scroll-viewport"
          className={styles.scrollViewport}
        >
          <ScrollAreaContent
            data-slot="command-palette-scroll-content"
            className={styles.scrollContent}
          >
            {children}
          </ScrollAreaContent>
        </ScrollAreaViewport>
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
      className={clsx(styles.empty, className)}
      {...props}
      data-slot="command-palette-empty"
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
      className={clsx(styles.itemGroup, className)}
      {...props}
      data-slot="command-palette-item-group"
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
      className={clsx(styles.itemGroupLabel, className)}
      {...props}
      data-slot="command-palette-item-group-label"
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
      className={clsx(styles.item, className)}
      {...props}
      data-slot="command-palette-item"
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
      className={clsx(styles.itemText, className)}
      {...props}
      data-slot="command-palette-item-text"
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
      className={clsx(styles.itemIndicator, className)}
      {...props}
      data-slot="command-palette-item-indicator"
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
        className={clsx(styles.itemIcon, className)}
        {...props}
        data-slot="command-palette-item-icon"
      />
    );
  },
);

const CommandPaletteItemLabel = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(
  function CommandPaletteItemLabel({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        className={clsx(styles.itemLabel, className)}
        {...props}
        data-slot="command-palette-item-label"
      />
    );
  },
);

const CommandPaletteItemDescription = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(
  function CommandPaletteItemDescription({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        className={clsx(styles.itemDescription, className)}
        {...props}
        data-slot="command-palette-item-description"
      />
    );
  },
);

const CommandPaletteItemMeta = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(
  function CommandPaletteItemMeta({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        className={clsx(styles.itemMeta, className)}
        {...props}
        data-slot="command-palette-item-meta"
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
        className={clsx(styles.separator, className)}
        {...props}
        data-slot="command-palette-separator"
      />
    );
  },
);

const CommandPaletteFooter = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function CommandPaletteFooter({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.footer, className)}
        {...props}
        data-slot="command-palette-footer"
      />
    );
  },
);

function CommandPaletteKbd({ className, ...props }: ComponentProps<typeof Kbd>) {
  return <Kbd className={clsx(styles.kbd, className)} {...props} data-slot="command-palette-kbd" />;
}

export {
  CommandPalette,
  CommandPaletteBackdrop,
  CommandPaletteBody,
  CommandPaletteClearTrigger,
  CommandPaletteCombobox,
  CommandPaletteContent,
  CommandPaletteControl,
  CommandPaletteDescription,
  CommandPaletteEmpty,
  CommandPaletteFooter,
  CommandPaletteHeader,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteItemDescription,
  CommandPaletteItemGroup,
  CommandPaletteItemGroupLabel,
  CommandPaletteItemIcon,
  CommandPaletteItemIndicator,
  CommandPaletteItemLabel,
  CommandPaletteItemMeta,
  CommandPaletteItemText,
  CommandPaletteKbd,
  CommandPaletteList,
  CommandPalettePanel,
  CommandPalettePositioner,
  CommandPaletteRootProvider,
  CommandPaletteSearch,
  CommandPaletteSeparator,
  CommandPaletteTitle,
  CommandPaletteTrigger,
};