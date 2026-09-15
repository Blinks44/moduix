import {
  Combobox as ComboboxPrimitive,
  type CollectionItem,
  type ComboboxRootComponent,
  type ComboboxRootProps,
} from '@ark-ui/solid/combobox';
import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/solid/dialog';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { isHotKey } from '@zag-js/hotkeys';
import type { ComponentProps } from 'solid-js';
import { children, createEffect, onCleanup, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, CloseIcon } from '@/lib/moduix/icons/ui/Icons';
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

function CommandPaletteRoot(props: CommandPaletteRootProps) {
  const [local, others] = splitProps(props, [
    'children',
    'shortcut',
    'lazyMount',
    'onExitComplete',
    'portalled',
    'present',
    'portalRef',
    'skipAnimationOnMount',
    'unmountOnExit',
  ]);
  const dialog = useDialog(others);

  createEffect(() => {
    const shortcut = local.shortcut;

    if (!shortcut) {
      return;
    }

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

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <DialogPrimitive.RootProvider
        value={dialog}
        lazyMount={local.lazyMount ?? true}
        onExitComplete={local.onExitComplete}
        present={local.present}
        skipAnimationOnMount={local.skipAnimationOnMount}
        unmountOnExit={local.unmountOnExit ?? true}
      >
        {local.children}
      </DialogPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

function CommandPaletteRootProvider(props: CommandPaletteRootProviderProps) {
  const [local, others] = splitProps(props, [
    'children',
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
        {local.children}
      </DialogPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

function CommandPaletteTrigger(props: ComponentProps<typeof DialogPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <DialogPrimitive.Trigger
      asChild={local.asChild}
      class={cn(
        !local.asChild &&
          'inline-flex min-h-control-md cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
      {...others}
      data-slot="command-palette-trigger"
    />
  );
}

function CommandPaletteBackdrop(props: ComponentProps<typeof DialogPrimitive.Backdrop>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DialogPrimitive.Backdrop
        class={cn(
          'fixed inset-0 z-[calc(40+var(--layer-index,0))] bg-overlay backdrop-blur-[4px] data-[state=closed]:animate-[moduix-fade-out_200ms_ease-in-out_forwards] data-[state=open]:animate-[moduix-fade-in_200ms_ease-in-out] motion-reduce:animate-none',
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
          'fixed inset-0 z-[calc(50+var(--layer-index,0))] grid items-start justify-items-center overflow-hidden overscroll-contain px-4 pt-[10dvh] pb-4',
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
        'flex max-h-[min(34rem,calc(100dvh-5rem))] w-[min(37.5rem,calc(100vw-2rem))] origin-top flex-col overflow-hidden rounded-lg border border-border/84 bg-popover bg-linear-to-b from-white/4 to-transparent text-popover-foreground shadow-lg outline-0 data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none',
        local.class,
      )}
      {...others}
      data-slot="command-palette-content"
    />
  );
}

function CommandPalettePanel(props: ComponentProps<typeof DialogPrimitive.Content>) {
  const [local, others] = splitProps(props, ['children']);

  return (
    <>
      <CommandPaletteBackdrop />
      <CommandPalettePositioner>
        <CommandPaletteContent {...others}>
          <CommandPaletteBody>{local.children}</CommandPaletteBody>
        </CommandPaletteContent>
      </CommandPalettePositioner>
    </>
  );
}

function CommandPaletteTitle(props: ComponentProps<typeof DialogPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Title
      class={cn('text-md leading-6 font-semibold text-popover-foreground', local.class)}
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

function CommandPaletteBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={cn('flex min-h-0 flex-1 flex-col', local.class)}
      {...others}
      data-slot="command-palette-body"
    />
  );
}

type CommandPaletteComboboxProps<T extends CollectionItem> = ComboboxRootProps<T>;

const CommandPaletteCombobox = function CommandPaletteCombobox<T extends CollectionItem>(
  props: CommandPaletteComboboxProps<T>,
) {
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
} as ComboboxRootComponent;

function CommandPaletteControl(props: ComponentProps<typeof ComboboxPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Control
      class={cn(
        'relative mx-3 mt-3 flex min-h-control-md flex-none items-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-foreground transition-[background-color,border-color] duration-200 ease-in-out has-[[aria-invalid=true]]:border-destructive has-[[data-invalid]]:border-destructive',
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
        'h-auto w-full min-w-0 flex-1 bg-transparent text-sm leading-5 text-inherit outline-0 placeholder:text-muted-foreground data-invalid:text-destructive',
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
      <CommandPaletteInput
        aria-label={
          local['aria-label'] ??
          (local['aria-labelledby'] == null ? DEFAULT_SEARCH_INPUT_LABEL : undefined)
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
  const resolvedChildren = children(() => local.children);

  return (
    <ComboboxPrimitive.Context>
      {(combobox) => (
        <ComboboxPrimitive.ClearTrigger
          asChild={local.asChild}
          hidden={combobox().inputValue.length === 0}
          aria-label={
            local['aria-label'] ??
            (!local.asChild && local.children == null && local['aria-labelledby'] == null
              ? DEFAULT_CLEAR_TRIGGER_LABEL
              : undefined)
          }
          aria-labelledby={local['aria-labelledby']}
          class={cn(
            'inline-flex size-6 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-md bg-transparent text-muted-foreground transition-[background-color,color,opacity,translate,scale] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:size-3 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-popover-foreground',
            local.class,
          )}
          onClick={(event) => {
            (local.onClick as ((event: MouseEvent) => void) | undefined)?.(event);

            if (!event.defaultPrevented) {
              combobox().setInputValue('');
            }
          }}
          onPointerDown={(event) => {
            (local.onPointerDown as ((event: PointerEvent) => void) | undefined)?.(event);

            if (event.button === 0) {
              event.preventDefault();
              combobox().setInputValue('');
            }
          }}
          {...others}
          data-slot="command-palette-clear-trigger"
        >
          {resolvedChildren() ?? <CloseIcon />}
        </ComboboxPrimitive.ClearTrigger>
      )}
    </ComboboxPrimitive.Context>
  );
}

function CommandPaletteList(props: ComponentProps<typeof ComboboxPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class', 'children']);

  return (
    <ComboboxPrimitive.Content
      class={cn('group/list flex min-h-0 flex-1 overflow-hidden outline-0', local.class)}
      {...others}
      data-slot="command-palette-list"
    >
      <ScrollArea data-slot="command-palette-scroll-area" class="h-auto min-h-0 flex-1">
        <ScrollArea.Viewport data-slot="command-palette-scroll-viewport" class="scroll-py-2">
          <ScrollArea.Content
            data-slot="command-palette-scroll-content"
            class="min-h-full px-3 py-3 group-data-[empty]/list:p-0"
          >
            {local.children}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
      </ScrollArea>
    </ComboboxPrimitive.Content>
  );
}

function CommandPaletteEmpty(props: ComponentProps<typeof ComboboxPrimitive.Empty>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Empty
      class={cn(
        '[&:not(:empty)]:px-4 [&:not(:empty)]:py-3 [&:not(:empty)]:text-sm [&:not(:empty)]:leading-5 [&:not(:empty)]:text-muted-foreground',
        local.class,
      )}
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
        'sticky top-0 z-1 block bg-popover px-3 py-1 text-xs leading-4 font-normal text-muted-foreground',
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
        'relative z-0 grid min-h-control-sm cursor-default grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3 rounded-md px-3 py-1 text-sm leading-5 text-popover-foreground outline-0 select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-foreground data-[state=checked]:text-foreground',
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
      class={cn('grid min-w-0 gap-1', local.class)}
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
        'inline-flex size-8 items-center justify-center justify-self-end rounded-md border border-transparent bg-transparent text-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0',
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
        'inline-flex size-8 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0',
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
      class={cn('min-w-0 overflow-hidden font-medium text-ellipsis whitespace-nowrap', local.class)}
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
        'min-w-0 overflow-hidden text-xs leading-4 text-ellipsis whitespace-nowrap text-muted-foreground',
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
        'justify-self-end text-xs leading-4 whitespace-nowrap text-muted-foreground',
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
      class={cn('mx-2 my-2 h-px bg-border', local.class)}
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

function CommandPaletteKbd(props: ComponentProps<typeof Kbd.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <Kbd.Root
      class={cn(
        'min-h-5 min-w-5 rounded-sm px-1 text-xs leading-4 text-muted-foreground',
        local.class,
      )}
      {...others}
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