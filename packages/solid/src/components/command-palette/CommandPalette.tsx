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
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, createEffect, onCleanup, splitProps } from 'solid-js';
import { CheckIcon, CloseIcon } from '@/lib/moduix/icons/ui/Icons';
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
      class={clsx(!local.asChild && styles.trigger, local.class)}
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

function CommandPaletteBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div class={clsx(styles.body, local.class)} {...others} data-slot="command-palette-body" />
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
} as ComboboxRootComponent;

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
          class={clsx(closeButtonStyles.root, styles.clearTrigger, local.class)}
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
      class={clsx(styles.list, local.class)}
      {...others}
      data-slot="command-palette-list"
    >
      <ScrollArea data-slot="command-palette-scroll-area" class={styles.scrollArea}>
        <ScrollArea.Viewport
          data-slot="command-palette-scroll-viewport"
          class={styles.scrollViewport}
        >
          <ScrollArea.Content
            data-slot="command-palette-scroll-content"
            class={styles.scrollContent}
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

function CommandPaletteKbd(props: ComponentProps<typeof Kbd.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <Kbd.Root class={clsx(styles.kbd, local.class)} {...others} data-slot="command-palette-kbd" />
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