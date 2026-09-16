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
import type { ComponentProps, ComponentRef, ForwardedRef } from 'react';
import { forwardRef, useEffect } from 'react';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, CloseIcon } from '@/lib/moduix/icons/ui';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { Kbd } from '../kbd';
import { ScrollArea } from '../scroll-area';

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
      className={cn(
        !asChild &&
          'inline-flex min-h-control-md cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
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
        className={cn(
          'fixed inset-0 z-[calc(40+var(--layer-index,0))] bg-overlay backdrop-blur-[4px] data-[state=closed]:animate-[moduix-fade-out_200ms_ease-in-out_forwards] data-[state=open]:animate-[moduix-fade-in_200ms_ease-in-out] motion-reduce:animate-none',
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
          'fixed inset-0 z-[calc(50+var(--layer-index,0))] grid items-start justify-items-center overflow-hidden overscroll-contain px-4 pt-[10dvh] pb-4',
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
        'flex max-h-[min(34rem,calc(100dvh-5rem))] w-[min(37.5rem,calc(100vw-2rem))] origin-top flex-col overflow-hidden rounded-lg border border-border/84 bg-popover bg-linear-to-b from-white/4 to-transparent text-popover-foreground shadow-lg outline-0 data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none',
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
      className={cn('text-md leading-6 font-semibold text-popover-foreground', className)}
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

const CommandPaletteBody = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function CommandPaletteBody({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={cn('flex min-h-0 flex-1 flex-col', className)}
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
        'relative mx-3 mt-3 flex min-h-control-md flex-none items-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-foreground transition-[background-color,border-color] duration-200 ease-in-out has-[[aria-invalid=true]]:border-destructive has-[[data-invalid]]:border-destructive',
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
        'h-auto w-full min-w-0 flex-1 bg-transparent text-sm leading-5 text-inherit outline-0 placeholder:text-muted-foreground data-invalid:text-destructive',
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
          className={cn(
            'inline-flex size-6 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-md bg-transparent text-muted-foreground transition-[background-color,color,opacity,translate,scale] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:size-3 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-popover-foreground',
            className,
          )}
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
      className={cn('group/list flex min-h-0 flex-1 overflow-hidden outline-0', className)}
      {...props}
      data-slot="command-palette-list"
    >
      <ScrollArea data-slot="command-palette-scroll-area" className="h-auto min-h-0 flex-1">
        <ScrollArea.Viewport data-slot="command-palette-scroll-viewport" className="scroll-py-2">
          <ScrollArea.Content
            data-slot="command-palette-scroll-content"
            className="min-h-full px-3 py-3 group-data-[empty]/list:p-0"
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
      className={cn(
        '[&:not(:empty)]:px-4 [&:not(:empty)]:py-3 [&:not(:empty)]:text-sm [&:not(:empty)]:leading-5 [&:not(:empty)]:text-muted-foreground',
        className,
      )}
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
        'sticky top-0 z-1 block bg-popover px-3 py-1 text-xs leading-4 font-normal text-muted-foreground',
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
        'relative z-0 grid min-h-control-sm cursor-default grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3 rounded-md px-3 py-1 text-sm leading-5 text-popover-foreground outline-0 select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-foreground data-[state=checked]:text-foreground',
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
      className={cn('grid min-w-0 gap-1', className)}
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
        'inline-flex size-8 items-center justify-center justify-self-end rounded-md border border-transparent bg-transparent text-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0',
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
          'inline-flex size-8 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0',
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
        className={cn(
          'min-w-0 overflow-hidden font-medium text-ellipsis whitespace-nowrap',
          className,
        )}
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
          'min-w-0 overflow-hidden text-xs leading-4 text-ellipsis whitespace-nowrap text-muted-foreground',
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
          'justify-self-end text-xs leading-4 whitespace-nowrap text-muted-foreground',
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
        className={cn('mx-2 my-2 h-px bg-border', className)}
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

function CommandPaletteKbd({ className, ...props }: ComponentProps<typeof Kbd.Root>) {
  return (
    <Kbd.Root
      className={cn(
        'min-h-5 min-w-5 rounded-sm px-1 text-xs leading-4 text-muted-foreground',
        className,
      )}
      {...props}
      data-slot="command-palette-kbd"
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