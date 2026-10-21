import {
  Combobox as ComboboxPrimitive,
  type CollectionItem,
  type ComboboxRootProps,
  useComboboxContext,
} from '@ark-ui/solid/combobox';
import { Dialog as DialogPrimitive, useDialogContext } from '@ark-ui/solid/dialog';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { isHotKey } from '@ark-ui/solid/hotkeys';
import type { ComponentProps } from 'solid-js';
import { children, createEffect, onCleanup, Show, splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { callEventHandler } from '@/lib/moduix/callEventHandler';
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

function CommandPaletteShortcut(props: { shortcut: string }) {
  const dialog = useDialogContext();

  createEffect(() => {
    const shortcut = props.shortcut;

    const handleKeyDown = (event: KeyboardEvent) => {
      const currentDialog = dialog();

      if (
        event.defaultPrevented ||
        event.repeat ||
        event.isComposing ||
        !isHotKey(shortcut, event, {
          enableOnContentEditable: currentDialog.open,
          enableOnFormTags: currentDialog.open,
        })
      ) {
        return;
      }

      event.preventDefault();
      currentDialog.setOpen(!currentDialog.open);
    };

    document.addEventListener('keydown', handleKeyDown);
    onCleanup(() => document.removeEventListener('keydown', handleKeyDown));
  });

  return null;
}

function CommandPalette(props: CommandPaletteRootProps) {
  const [local, others] = splitProps(props, [
    'children',
    'shortcut',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <DialogPrimitive.Root
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        <Show when={local.shortcut}>
          {(shortcut) => <CommandPaletteShortcut shortcut={shortcut()} />}
        </Show>
        {local.children}
      </DialogPrimitive.Root>
    </OverlayPortalProvider>
  );
}

function CommandPaletteRootProvider(props: CommandPaletteRootProviderProps) {
  const [local, others] = splitProps(props, [
    'children',
    'shortcut',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <DialogPrimitive.RootProvider
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        <Show when={local.shortcut}>
          {(shortcut) => <CommandPaletteShortcut shortcut={shortcut()} />}
        </Show>
        {local.children}
      </DialogPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

function CommandPaletteTrigger(props: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props} data-slot="command-palette-trigger" />;
}

function CommandPaletteBackdrop(props: ComponentProps<typeof DialogPrimitive.Backdrop>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DialogPrimitive.Backdrop
        class={cn(
          'fixed inset-0 z-[calc(var(--z-index,var(--moduix-z-popup))-1)] bg-overlay backdrop-blur-[4px] data-[state=closed]:animate-moduix-command-palette-backdrop-out data-[state=open]:animate-moduix-command-palette-backdrop-in motion-reduce:data-[state]:animate-none',
          local.class,
        )}
        {...others}
        data-slot="command-palette-backdrop"
      />
    </OverlayPortal>
  );
}

function CommandPalettePositioner(props: ComponentProps<typeof DialogPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DialogPrimitive.Positioner
        class={cn(
          'fixed inset-0 z-[var(--z-index,var(--moduix-z-popup))] grid items-start justify-items-center overflow-hidden overscroll-contain px-4 pt-[10dvh] pb-4',
          local.class,
        )}
        {...others}
        data-slot="command-palette-positioner"
      />
    </OverlayPortal>
  );
}

function CommandPaletteContent(props: ComponentProps<typeof DialogPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Content
      class={cn(
        'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] flex max-h-[min(34rem,calc(100dvh-5rem))] w-[37.5rem] max-w-full origin-top flex-col overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg outline-0 data-[state=closed]:animate-moduix-command-palette-content-out data-[state=open]:animate-moduix-command-palette-content-in motion-reduce:data-[state]:animate-none',
        local.class,
      )}
      {...others}
      data-slot="command-palette-content"
    />
  );
}

function CommandPalettePanel(props: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <>
      <CommandPaletteBackdrop />
      <CommandPalettePositioner>
        <CommandPaletteContent {...props} />
      </CommandPalettePositioner>
    </>
  );
}

function CommandPaletteTitle(props: ComponentProps<typeof DialogPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Title
      class={cn('text-md leading-6 font-semibold', local.class)}
      {...others}
      data-slot="command-palette-title"
    />
  );
}

function CommandPaletteDescription(props: ComponentProps<typeof DialogPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Description
      class={cn('text-sm leading-5 text-muted-foreground', local.class)}
      {...others}
      data-slot="command-palette-description"
    />
  );
}

function CommandPaletteHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={cn('grid gap-1 px-4 pt-4', local.class)}
      {...others}
      data-slot="command-palette-header"
    />
  );
}

type CommandPaletteComboboxProps<T extends CollectionItem> = ComboboxRootProps<T>;

function CommandPaletteCombobox<T extends CollectionItem>(props: CommandPaletteComboboxProps<T>) {
  const [local, others] = splitProps(props, [
    'children',
    'class',
    'open',
    'inputBehavior',
    'selectionBehavior',
    'closeOnSelect',
    'disableLayer',
    'onSelect',
  ]);
  const dialog = useDialogContext();
  const handleSelect: ComboboxRootProps<T>['onSelect'] = (details) => {
    local.onSelect?.(details);

    if (local.closeOnSelect ?? true) {
      dialog().setOpen(false);
    }
  };

  return (
    <ComboboxPrimitive.Root
      class={cn('flex min-h-0 flex-1 flex-col overflow-hidden', local.class)}
      open={local.open ?? true}
      inputBehavior={local.inputBehavior ?? 'autohighlight'}
      selectionBehavior={local.selectionBehavior ?? 'preserve'}
      closeOnSelect={local.closeOnSelect ?? true}
      disableLayer={local.disableLayer ?? true}
      onSelect={handleSelect}
      {...others}
      data-slot="command-palette-combobox"
    >
      {local.children}
    </ComboboxPrimitive.Root>
  );
}

function CommandPaletteControl(props: ComponentProps<typeof ComboboxPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Control
      class={cn(
        'mx-3 mt-3 flex min-h-control-md flex-none items-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-foreground transition-[border-color] duration-normal ease-in-out data-invalid:border-destructive',
        local.class,
      )}
      {...others}
      data-slot="command-palette-control"
    />
  );
}

function CommandPaletteInput(props: ComponentProps<typeof ComboboxPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Input
      class={cn(
        'min-w-0 flex-1 bg-transparent text-sm leading-5 outline-0 placeholder:text-muted-foreground',
        local.class,
      )}
      {...others}
      data-slot="command-palette-input"
    />
  );
}

function CommandPaletteSearch(props: ComponentProps<typeof ComboboxPrimitive.Input>) {
  const [local, others] = splitProps(props, ['aria-label', 'aria-labelledby']);

  return (
    <CommandPaletteControl>
      <SearchIcon
        data-slot="command-palette-search-icon"
        class="pointer-events-none size-4 shrink-0 text-muted-foreground"
      />
      <CommandPaletteInput
        aria-label={
          local['aria-label'] ??
          (local['aria-labelledby'] == null ? a11yLabels.searchCommands : undefined)
        }
        aria-labelledby={local['aria-labelledby']}
        {...others}
      />
      <CommandPaletteClearTrigger />
    </CommandPaletteControl>
  );
}

function CommandPaletteClearTrigger(props: ComponentProps<typeof ComboboxPrimitive.ClearTrigger>) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'children',
    'onClick',
    'onPointerDown',
    'aria-label',
    'aria-labelledby',
  ]);
  const combobox = useComboboxContext();
  const resolvedChildren = children(() => local.children);

  return (
    <ComboboxPrimitive.ClearTrigger
      asChild={local.asChild}
      aria-label={
        local['aria-label'] ??
        (!local.asChild && local['aria-labelledby'] == null ? a11yLabels.clearSearch : undefined)
      }
      aria-labelledby={local['aria-labelledby']}
      class={cn(
        "m-0 box-border inline-flex size-control-xs shrink-0 cursor-pointer appearance-none items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color,opacity] duration-normal ease-in-out select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-foreground",
        local.class,
      )}
      {...others}
      hidden={combobox().inputValue === ''}
      onClick={(event) => {
        callEventHandler(local.onClick, event);

        // Clear only the query; Ark's own handler would also clear the selected value.
        if (!event.defaultPrevented) {
          event.preventDefault();
          combobox().setInputValue('');
        }
      }}
      onPointerDown={(event) => {
        callEventHandler(local.onPointerDown, event);

        // Ark merges only function handlers, so a bound handler would replace its focus guard.
        if (event.button === 0) {
          event.preventDefault();
        }
      }}
      data-slot="command-palette-clear-trigger"
    >
      {resolvedChildren() ?? <CloseIcon />}
    </ComboboxPrimitive.ClearTrigger>
  );
}

function CommandPaletteList(props: ComponentProps<typeof ComboboxPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class', 'children']);

  return (
    <ComboboxPrimitive.Content
      class={cn('flex min-h-0 flex-1 overflow-hidden outline-0', local.class)}
      {...others}
      data-slot="command-palette-list"
    >
      <ScrollArea data-slot="command-palette-scroll-area" class="h-auto min-h-0 flex-1">
        <ScrollAreaViewport data-slot="command-palette-scroll-viewport" class="scroll-py-2">
          <ScrollAreaContent data-slot="command-palette-scroll-content" class="min-h-full p-3">
            {local.children}
          </ScrollAreaContent>
        </ScrollAreaViewport>
      </ScrollArea>
    </ComboboxPrimitive.Content>
  );
}

function CommandPaletteEmpty(props: ComponentProps<typeof ComboboxPrimitive.Empty>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Empty
      class={cn('px-1 text-sm leading-5 text-muted-foreground', local.class)}
      {...others}
      data-slot="command-palette-empty"
    />
  );
}

function CommandPaletteItemGroup(props: ComponentProps<typeof ComboboxPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.ItemGroup
      class={cn('grid gap-1 [&:not(:last-child)]:pb-2', local.class)}
      {...others}
      data-slot="command-palette-item-group"
    />
  );
}

function CommandPaletteItemGroupLabel(
  props: ComponentProps<typeof ComboboxPrimitive.ItemGroupLabel>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.ItemGroupLabel
      class={cn(
        'sticky top-0 z-1 bg-popover px-3 py-1 text-xs leading-4 font-normal text-muted-foreground',
        local.class,
      )}
      {...others}
      data-slot="command-palette-item-group-label"
    />
  );
}

function CommandPaletteItem(props: ComponentProps<typeof ComboboxPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Item
      class={cn(
        'flex min-h-control-sm cursor-default items-center gap-3 rounded-md px-3 py-1 text-sm leading-5 outline-0 select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        local.class,
      )}
      {...others}
      data-slot="command-palette-item"
    />
  );
}

function CommandPaletteItemText(props: ComponentProps<typeof ComboboxPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.ItemText
      class={cn('grid min-w-0 flex-1 gap-1', local.class)}
      {...others}
      data-slot="command-palette-item-text"
    />
  );
}

function CommandPaletteItemIndicator(
  props: ComponentProps<typeof ComboboxPrimitive.ItemIndicator>,
) {
  const [local, others] = splitProps(props, ['class', 'children']);
  const resolvedChildren = children(() => local.children);

  return (
    <ComboboxPrimitive.ItemIndicator
      class={cn(
        'ms-auto inline-flex shrink-0 text-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0',
        local.class,
      )}
      {...others}
      data-slot="command-palette-item-indicator"
    >
      {resolvedChildren() ?? <CheckIcon />}
    </ComboboxPrimitive.ItemIndicator>
  );
}

function CommandPaletteItemIcon(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={cn(
        'inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0',
        local.class,
      )}
      {...others}
      data-slot="command-palette-item-icon"
    />
  );
}

function CommandPaletteItemLabel(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={cn('overflow-hidden font-medium text-ellipsis whitespace-nowrap', local.class)}
      {...others}
      data-slot="command-palette-item-label"
    />
  );
}

function CommandPaletteItemDescription(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={cn(
        'overflow-hidden text-xs leading-4 text-ellipsis whitespace-nowrap text-muted-foreground',
        local.class,
      )}
      {...others}
      data-slot="command-palette-item-description"
    />
  );
}

function CommandPaletteItemMeta(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={cn(
        'ms-auto shrink-0 text-xs leading-4 whitespace-nowrap text-muted-foreground',
        local.class,
      )}
      {...others}
      data-slot="command-palette-item-meta"
    />
  );
}

function CommandPaletteSeparator(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      role="separator"
      class={cn('m-2 h-px bg-border', local.class)}
      {...others}
      data-slot="command-palette-separator"
    />
  );
}

function CommandPaletteFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={cn(
        'flex flex-none items-center justify-between gap-3 border-t border-border px-4 py-2 text-xs leading-4 text-muted-foreground',
        local.class,
      )}
      {...others}
      data-slot="command-palette-footer"
    />
  );
}

function CommandPaletteKbd(props: ComponentProps<typeof Kbd>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <Kbd
      class={cn('min-h-5 min-w-5 px-1 text-muted-foreground', local.class)}
      {...others}
      data-slot="command-palette-kbd"
    />
  );
}

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