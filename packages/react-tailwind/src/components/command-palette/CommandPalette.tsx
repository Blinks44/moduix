'use client';

import {
  Combobox as ComboboxPrimitive,
  type CollectionItem,
  type ComboboxRootComponent,
  type ComboboxRootProps,
  useComboboxContext,
} from '@ark-ui/react/combobox';
import { Dialog as DialogPrimitive, useDialogContext } from '@ark-ui/react/dialog';
import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { isHotKey } from '@ark-ui/react/hotkeys';
import type { ComponentProps, ComponentRef, ForwardedRef } from 'react';
import { forwardRef, useEffect } from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, CloseIcon, SearchIcon } from '@/lib/moduix/icons/ui';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { Kbd } from '../kbd';
import { ScrollArea, ScrollAreaContent, ScrollAreaViewport } from '../scroll-area';

type CommandPaletteShortcutProps = {
  shortcut?: false | string;
};

type CommandPaletteRootProps = ComponentProps<typeof DialogPrimitive.Root> &
  CommandPaletteShortcutProps &
  OverlayPortalProps;

type CommandPaletteRootProviderProps = ComponentProps<typeof DialogPrimitive.RootProvider> &
  CommandPaletteShortcutProps &
  OverlayPortalProps;

function CommandPaletteShortcut({ shortcut }: { shortcut: string }) {
  const dialog = useDialogContext();

  useEffect(() => {
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

  return null;
}

function CommandPalette({
  shortcut = false,
  lazyMount = true,
  unmountOnExit = true,
  portalled,
  portalRef,
  children,
  ...props
}: CommandPaletteRootProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DialogPrimitive.Root lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...props}>
        {shortcut ? <CommandPaletteShortcut shortcut={shortcut} /> : null}
        {children}
      </DialogPrimitive.Root>
    </OverlayPortalProvider>
  );
}

function CommandPaletteRootProvider({
  shortcut = false,
  lazyMount = true,
  unmountOnExit = true,
  portalled,
  portalRef,
  children,
  ...props
}: CommandPaletteRootProviderProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DialogPrimitive.RootProvider lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...props}>
        {shortcut ? <CommandPaletteShortcut shortcut={shortcut} /> : null}
        {children}
      </DialogPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

const CommandPaletteTrigger = forwardRef<
  ComponentRef<typeof DialogPrimitive.Trigger>,
  ComponentProps<typeof DialogPrimitive.Trigger>
>(function CommandPaletteTrigger(props, ref) {
  return <DialogPrimitive.Trigger ref={ref} {...props} data-slot="command-palette-trigger" />;
});

const CommandPaletteBackdrop = forwardRef<
  ComponentRef<typeof DialogPrimitive.Backdrop>,
  ComponentProps<typeof DialogPrimitive.Backdrop>
>(function CommandPaletteBackdrop({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <DialogPrimitive.Backdrop
        ref={ref}
        className={cn(
          'fixed inset-0 z-[calc(var(--z-index,var(--moduix-z-popup))-1)] bg-overlay backdrop-blur-[4px] data-[state=closed]:animate-moduix-command-palette-backdrop-out data-[state=open]:animate-moduix-command-palette-backdrop-in motion-reduce:data-[state]:animate-none',
          className,
        )}
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
        className={cn(
          'fixed inset-0 z-[var(--z-index,var(--moduix-z-popup))] grid items-start justify-items-center overflow-hidden overscroll-contain px-4 pt-[10dvh] pb-4',
          className,
        )}
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
      className={cn(
        'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] flex max-h-[min(34rem,calc(100dvh-5rem))] w-[37.5rem] max-w-full origin-top flex-col overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg outline-0 data-[state=closed]:animate-moduix-command-palette-content-out data-[state=open]:animate-moduix-command-palette-content-in motion-reduce:data-[state]:animate-none',
        className,
      )}
      {...props}
      data-slot="command-palette-content"
    />
  );
});

const CommandPalettePanel = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  ComponentProps<typeof DialogPrimitive.Content>
>(function CommandPalettePanel(props, ref) {
  return (
    <>
      <CommandPaletteBackdrop />
      <CommandPalettePositioner>
        <CommandPaletteContent ref={ref} {...props} />
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
      className={cn('text-md leading-6 font-semibold', className)}
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
      className={cn('text-sm leading-5 text-muted-foreground', className)}
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
        className={cn('grid gap-1 px-4 pt-4', className)}
        {...props}
        data-slot="command-palette-header"
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
      className={cn('flex min-h-0 flex-1 flex-col overflow-hidden', className)}
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
      className={cn(
        'mx-3 mt-3 flex min-h-control-md flex-none items-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-foreground transition-[border-color] duration-normal ease-in-out data-invalid:border-destructive',
        className,
      )}
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
      className={cn(
        'min-w-0 flex-1 bg-transparent text-sm leading-5 outline-0 placeholder:text-muted-foreground',
        className,
      )}
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
      <SearchIcon
        data-slot="command-palette-search-icon"
        className="pointer-events-none size-4 shrink-0 text-muted-foreground"
      />
      <CommandPaletteInput
        ref={ref}
        aria-label={ariaLabel ?? (ariaLabelledBy == null ? a11yLabels.searchCommands : undefined)}
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
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  },
  ref,
) {
  const combobox = useComboboxContext();

  return (
    <ComboboxPrimitive.ClearTrigger
      ref={ref}
      asChild={asChild}
      aria-label={
        ariaLabel ?? (!asChild && ariaLabelledBy == null ? a11yLabels.clearSearch : undefined)
      }
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "m-0 box-border inline-flex size-control-xs shrink-0 cursor-pointer appearance-none items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color,opacity] duration-normal ease-in-out select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-disabled [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-foreground",
        className,
      )}
      {...props}
      hidden={combobox.inputValue === ''}
      onClick={(event) => {
        onClick?.(event);

        // Clear only the query; Ark's own handler would also clear the selected value.
        if (!event.defaultPrevented) {
          event.preventDefault();
          combobox.setInputValue('');
        }
      }}
      data-slot="command-palette-clear-trigger"
    >
      {children ?? <CloseIcon />}
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
      className={cn('flex min-h-0 flex-1 overflow-hidden outline-0', className)}
      {...props}
      data-slot="command-palette-list"
    >
      <ScrollArea className="h-auto min-h-0 flex-1">
        <ScrollAreaViewport className="scroll-py-2">
          <ScrollAreaContent className="min-h-full p-3">{children}</ScrollAreaContent>
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
      className={cn('px-1 text-sm leading-5 text-muted-foreground', className)}
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
      className={cn('grid gap-1 [&:not(:last-child)]:pb-2', className)}
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
      className={cn(
        'sticky top-0 z-1 bg-popover px-3 py-1 text-xs leading-4 font-normal text-muted-foreground',
        className,
      )}
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
      className={cn(
        'flex min-h-control-sm cursor-default items-center gap-3 rounded-md px-3 py-1 text-sm leading-5 outline-0 select-none data-disabled:pointer-events-none data-disabled:opacity-disabled data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        className,
      )}
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
      className={cn('grid min-w-0 flex-1 gap-1', className)}
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
      className={cn(
        'ms-auto inline-flex shrink-0 text-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0',
        className,
      )}
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
        className={cn(
          "inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4",
          className,
        )}
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
        className={cn('overflow-hidden font-medium text-ellipsis whitespace-nowrap', className)}
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
        className={cn(
          'overflow-hidden text-xs leading-4 text-ellipsis whitespace-nowrap text-muted-foreground',
          className,
        )}
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
        className={cn(
          'ms-auto shrink-0 text-xs leading-4 whitespace-nowrap text-muted-foreground',
          className,
        )}
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
        className={cn('m-2 h-px bg-border', className)}
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
        className={cn(
          'flex flex-none items-center justify-between gap-3 border-t border-border px-4 py-2 text-xs leading-4 text-muted-foreground',
          className,
        )}
        {...props}
        data-slot="command-palette-footer"
      />
    );
  },
);

const CommandPaletteKbd = forwardRef<ComponentRef<typeof Kbd>, ComponentProps<typeof Kbd>>(
  function CommandPaletteKbd({ className, ...props }, ref) {
    return (
      <Kbd
        ref={ref}
        className={cn('min-h-5 min-w-5 px-1 text-muted-foreground', className)}
        {...props}
        data-slot="command-palette-kbd"
      />
    );
  },
);

export {
  CommandPalette,
  CommandPaletteBackdrop,
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

export type { CommandPaletteRootProps, CommandPaletteRootProviderProps };