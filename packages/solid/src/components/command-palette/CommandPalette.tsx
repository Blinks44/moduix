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
      data-slot="command-palette-trigger"
      class={clsx(!local.asChild && styles.trigger, local.class)}
      {...others}
    />
  );
}

function CommandPaletteBackdrop(props: ComponentProps<typeof DialogPrimitive.Backdrop>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DialogPrimitive.Backdrop
        data-slot="command-palette-backdrop"
        class={clsx(styles.backdrop, local.class)}
        {...others}
      />
    </OverlayPortal>
  );
}

function CommandPalettePositioner(props: ComponentProps<typeof DialogPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DialogPrimitive.Positioner
        data-slot="command-palette-positioner"
        class={clsx(styles.positioner, local.class)}
        {...others}
      />
    </OverlayPortal>
  );
}

function CommandPaletteContent(props: ComponentProps<typeof DialogPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Content
      data-slot="command-palette-content"
      class={clsx(styles.content, local.class)}
      {...others}
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
      data-slot="command-palette-title"
      class={clsx(styles.title, local.class)}
      {...others}
    />
  );
}

function CommandPaletteDescription(props: ComponentProps<typeof DialogPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Description
      data-slot="command-palette-description"
      class={clsx(styles.description, local.class)}
      {...others}
    />
  );
}

function CommandPaletteHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-slot="command-palette-header"
      class={clsx(styles.header, local.class)}
      {...others}
    />
  );
}

function CommandPaletteBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div data-slot="command-palette-body" class={clsx(styles.body, local.class)} {...others} />
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
      data-slot="command-palette-combobox"
      class={clsx(styles.combobox, local.class)}
      open={local.open ?? true}
      inputBehavior={local.inputBehavior ?? 'autohighlight'}
      selectionBehavior={local.selectionBehavior ?? 'preserve'}
      closeOnSelect={local.closeOnSelect ?? true}
      disableLayer={local.disableLayer ?? true}
      onSelect={handleSelect}
      {...others}
    >
      {local.children}
    </ComboboxPrimitive.Root>
  );
} as ComboboxRootComponent;

function CommandPaletteControl(props: ComponentProps<typeof ComboboxPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Control
      data-slot="command-palette-control"
      class={clsx(styles.control, local.class)}
      {...others}
    />
  );
}

function CommandPaletteInput(props: ComponentProps<typeof ComboboxPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Input
      data-slot="command-palette-input"
      class={clsx(styles.input, local.class)}
      {...others}
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
          data-slot="command-palette-clear-trigger"
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
      data-slot="command-palette-list"
      class={clsx(styles.list, local.class)}
      {...others}
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
      data-slot="command-palette-empty"
      class={clsx(styles.empty, local.class)}
      {...others}
    />
  );
}

function CommandPaletteItemGroup(props: ComponentProps<typeof ComboboxPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.ItemGroup
      data-slot="command-palette-item-group"
      class={clsx(styles.itemGroup, local.class)}
      {...others}
    />
  );
}

function CommandPaletteItemGroupLabel(
  props: ComponentProps<typeof ComboboxPrimitive.ItemGroupLabel>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.ItemGroupLabel
      data-slot="command-palette-item-group-label"
      class={clsx(styles.itemGroupLabel, local.class)}
      {...others}
    />
  );
}

function CommandPaletteItem(props: ComponentProps<typeof ComboboxPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.Item
      data-slot="command-palette-item"
      class={clsx(styles.item, local.class)}
      {...others}
    />
  );
}

function CommandPaletteItemText(props: ComponentProps<typeof ComboboxPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ComboboxPrimitive.ItemText
      data-slot="command-palette-item-text"
      class={clsx(styles.itemText, local.class)}
      {...others}
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
      data-slot="command-palette-item-indicator"
      class={clsx(styles.itemIndicator, local.class)}
      {...others}
    >
      {resolvedChildren() ?? <CheckIcon />}
    </ComboboxPrimitive.ItemIndicator>
  );
}

function CommandPaletteItemIcon(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-slot="command-palette-item-icon"
      class={clsx(styles.itemIcon, local.class)}
      {...others}
    />
  );
}

function CommandPaletteItemLabel(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-slot="command-palette-item-label"
      class={clsx(styles.itemLabel, local.class)}
      {...others}
    />
  );
}

function CommandPaletteItemDescription(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-slot="command-palette-item-description"
      class={clsx(styles.itemDescription, local.class)}
      {...others}
    />
  );
}

function CommandPaletteItemMeta(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-slot="command-palette-item-meta"
      class={clsx(styles.itemMeta, local.class)}
      {...others}
    />
  );
}

function CommandPaletteSeparator(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      role="separator"
      data-slot="command-palette-separator"
      class={clsx(styles.separator, local.class)}
      {...others}
    />
  );
}

function CommandPaletteFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-slot="command-palette-footer"
      class={clsx(styles.footer, local.class)}
      {...others}
    />
  );
}

function CommandPaletteKbd(props: ComponentProps<typeof Kbd.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <Kbd.Root data-slot="command-palette-kbd" class={clsx(styles.kbd, local.class)} {...others} />
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