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
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, createEffect, onCleanup, Show, splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { callEventHandler } from '@/lib/moduix/callEventHandler';
import { CheckIcon, CloseIcon, SearchIcon } from '@/lib/moduix/icons/ui';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import closeButtonStyles from '../close-button/CloseButton.module.css';
import { Kbd } from '../kbd';
import { ScrollArea, ScrollAreaContent, ScrollAreaViewport } from '../scroll-area';
import styles from './CommandPalette.module.css';

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
        class={clsx(styles.backdrop, local.class)}
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
        class={clsx(styles.positioner, local.class)}
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
      class={clsx(styles.content, local.class)}
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
      class={clsx(styles.title, local.class)}
      {...others}
      data-slot="command-palette-title"
    />
  );
}

function CommandPaletteDescription(props: ComponentProps<typeof DialogPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Description
      class={clsx(styles.description, local.class)}
      {...others}
      data-slot="command-palette-description"
    />
  );
}

function CommandPaletteHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={clsx(styles.header, local.class)}
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
      class={clsx(styles.combobox, local.class)}
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
      class={clsx(styles.control, local.class)}
      {...others}
      data-slot="command-palette-control"
    />
  );
}

function CommandPaletteInput(props: ComponentProps<typeof ComboboxPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Input
      class={clsx(styles.input, local.class)}
      {...others}
      data-slot="command-palette-input"
    />
  );
}

function CommandPaletteSearch(props: ComponentProps<typeof ComboboxPrimitive.Input>) {
  const [local, others] = splitProps(props, ['aria-label', 'aria-labelledby']);

  return (
    <CommandPaletteControl>
      <SearchIcon data-slot="command-palette-search-icon" class={styles.searchIcon} />
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
      class={clsx(closeButtonStyles.root, styles.clearTrigger, local.class)}
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
      class={clsx(styles.list, local.class)}
      {...others}
      data-slot="command-palette-list"
    >
      <ScrollArea data-slot="command-palette-scroll-area" class={styles.scrollArea}>
        <ScrollAreaViewport
          data-slot="command-palette-scroll-viewport"
          class={styles.scrollViewport}
        >
          <ScrollAreaContent
            data-slot="command-palette-scroll-content"
            class={styles.scrollContent}
          >
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
      class={clsx(styles.empty, local.class)}
      {...others}
      data-slot="command-palette-empty"
    />
  );
}

function CommandPaletteItemGroup(props: ComponentProps<typeof ComboboxPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.ItemGroup
      class={clsx(styles.itemGroup, local.class)}
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
      class={clsx(styles.itemGroupLabel, local.class)}
      {...others}
      data-slot="command-palette-item-group-label"
    />
  );
}

function CommandPaletteItem(props: ComponentProps<typeof ComboboxPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Item
      class={clsx(styles.item, local.class)}
      {...others}
      data-slot="command-palette-item"
    />
  );
}

function CommandPaletteItemText(props: ComponentProps<typeof ComboboxPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.ItemText
      class={clsx(styles.itemText, local.class)}
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
      class={clsx(styles.itemIndicator, local.class)}
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
      class={clsx(styles.itemIcon, local.class)}
      {...others}
      data-slot="command-palette-item-icon"
    />
  );
}

function CommandPaletteItemLabel(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={clsx(styles.itemLabel, local.class)}
      {...others}
      data-slot="command-palette-item-label"
    />
  );
}

function CommandPaletteItemDescription(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={clsx(styles.itemDescription, local.class)}
      {...others}
      data-slot="command-palette-item-description"
    />
  );
}

function CommandPaletteItemMeta(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={clsx(styles.itemMeta, local.class)}
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
      class={clsx(styles.separator, local.class)}
      {...others}
      data-slot="command-palette-separator"
    />
  );
}

function CommandPaletteFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={clsx(styles.footer, local.class)}
      {...others}
      data-slot="command-palette-footer"
    />
  );
}

function CommandPaletteKbd(props: ComponentProps<typeof Kbd>) {
  const [local, others] = splitProps(props, ['class']);

  return <Kbd class={clsx(styles.kbd, local.class)} {...others} data-slot="command-palette-kbd" />;
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