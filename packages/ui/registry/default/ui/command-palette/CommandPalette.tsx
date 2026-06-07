import type { ComponentProps } from 'react';
import { Autocomplete as AutocompletePrimitive } from '@base-ui/react/autocomplete';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { clsx } from 'clsx';
import { createContext, useContext, useEffect, useMemo } from 'react';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './CommandPalette.module.css';

const createCommandPaletteHandle = DialogPrimitive.createHandle;

const CommandPaletteContext = createContext<{
  handle: DialogPrimitive.Handle<unknown>;
  modal: DialogPrimitive.Root.Props['modal'];
} | null>(null);

function useCommandPaletteContext(componentName: string) {
  const context = useContext(CommandPaletteContext);

  if (!context) {
    throw new Error(`${componentName} must be used within CommandPalette.`);
  }

  return context;
}

function isMacLikePlatform() {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const platform =
    (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ??
    navigator.platform;
  return /mac|iphone|ipad|ipod/i.test(platform);
}

function isShortcutMatch(event: KeyboardEvent, shortcut: string) {
  const parts = shortcut
    .toLowerCase()
    .split('+')
    .map((part) => part.trim())
    .filter(Boolean);
  const key = parts.at(-1);
  const primaryModifier = parts.includes('mod') ? (isMacLikePlatform() ? 'meta' : 'ctrl') : null;
  const needsCtrl =
    parts.includes('ctrl') || parts.includes('control') || primaryModifier === 'ctrl';
  const needsMeta =
    parts.includes('meta') ||
    parts.includes('cmd') ||
    parts.includes('command') ||
    primaryModifier === 'meta';
  const needsAlt = parts.includes('alt') || parts.includes('option');
  const needsShift = parts.includes('shift');
  const eventKey = event.key.toLowerCase();
  const eventCode =
    event.code.startsWith('Key') || event.code.startsWith('Digit')
      ? event.code.slice(event.code.startsWith('Key') ? 3 : 5).toLowerCase()
      : event.code.toLowerCase();

  if (!key || (eventKey !== key && eventCode !== key)) {
    return false;
  }

  return (
    event.ctrlKey === needsCtrl &&
    event.metaKey === needsMeta &&
    event.altKey === needsAlt &&
    event.shiftKey === needsShift
  );
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }

  return (
    target.closest('input, textarea, select, [contenteditable], [contenteditable="true"]') !== null
  );
}

// AutocompletePrimitive.Root has two overloads: one for grouped items and one for flat items.
// TypeScript requires a type guard to resolve the correct overload signature; both branches
// inside CommandPaletteContent are functionally identical at runtime.
function isGroupedItems<ItemValue>(
  items: readonly ItemValue[] | readonly { items: readonly unknown[] }[] | undefined,
): items is readonly { items: readonly unknown[] }[] {
  return Boolean(
    items?.[0] && typeof items[0] === 'object' && items[0] !== null && 'items' in items[0],
  );
}

function CommandPalette<Payload = unknown>({
  modal = true,
  shortcut = 'mod+k',
  shortcutTarget,
  handle,
  children,
  ...props
}: DialogPrimitive.Root.Props<Payload> & {
  shortcut?: false | string;
  shortcutTarget?: Document | HTMLElement | null;
}) {
  const fallbackHandle = useMemo(() => createCommandPaletteHandle<Payload>(), []);
  const resolvedHandle = handle ?? fallbackHandle;

  useEffect(() => {
    if (shortcut === false || shortcutTarget === null) {
      return;
    }

    const target = shortcutTarget ?? document;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.isComposing ||
        isEditableTarget(event.target) ||
        !isShortcutMatch(event, shortcut)
      ) {
        return;
      }

      event.preventDefault();
      resolvedHandle.open(null);
    };

    const eventListener = handleKeyDown as EventListener;
    target.addEventListener('keydown', eventListener);
    return () => target.removeEventListener('keydown', eventListener);
  }, [resolvedHandle, shortcut, shortcutTarget]);

  return (
    <CommandPaletteContext.Provider value={{ handle: resolvedHandle, modal }}>
      <DialogPrimitive.Root modal={modal} handle={resolvedHandle} {...props}>
        {children}
      </DialogPrimitive.Root>
    </CommandPaletteContext.Provider>
  );
}

function CommandPaletteTrigger({ className, render, ...props }: DialogPrimitive.Trigger.Props) {
  return (
    <DialogPrimitive.Trigger
      data-slot="command-palette-trigger"
      className={render ? className : mergeClassName(className, styles.trigger)}
      render={render}
      {...props}
    />
  );
}

function CommandPalettePortal(props: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal {...props} />;
}

function CommandPaletteBackdrop({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="command-palette-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
}

function CommandPaletteViewport({ className, ...props }: DialogPrimitive.Viewport.Props) {
  return (
    <DialogPrimitive.Viewport
      data-slot="command-palette-viewport"
      className={mergeClassName(className, styles.viewport)}
      {...props}
    />
  );
}

function CommandPalettePopup({ className, ...props }: DialogPrimitive.Popup.Props) {
  return (
    <DialogPrimitive.Popup
      data-slot="command-palette-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
}

function CommandPaletteClose({ className, ...props }: DialogPrimitive.Close.Props) {
  return (
    <DialogPrimitive.Close
      data-slot="command-palette-close"
      className={mergeClassName(className, styles.close)}
      {...props}
    />
  );
}

function CommandPaletteContent<ItemValue = unknown>({
  className,
  children,
  items,
  itemToStringValue,
  value,
  defaultValue,
  onValueChange,
  filter,
  filteredItems,
  limit,
  ...props
}: DialogPrimitive.Popup.Props & {
  items?: AutocompletePrimitive.Root.Props<ItemValue>['items'];
  itemToStringValue?: AutocompletePrimitive.Root.Props<ItemValue>['itemToStringValue'];
  value?: AutocompletePrimitive.Root.Props<ItemValue>['value'];
  defaultValue?: AutocompletePrimitive.Root.Props<ItemValue>['defaultValue'];
  onValueChange?: AutocompletePrimitive.Root.Props<ItemValue>['onValueChange'];
  filter?: AutocompletePrimitive.Root.Props<ItemValue>['filter'];
  filteredItems?: AutocompletePrimitive.Root.Props<ItemValue>['filteredItems'];
  limit?: AutocompletePrimitive.Root.Props<ItemValue>['limit'];
}) {
  const { modal } = useCommandPaletteContext('CommandPaletteContent');
  const autocompleteProps = {
    autoHighlight: 'always' as const,
    defaultValue,
    filter,
    filteredItems,
    inline: true,
    itemToStringValue,
    keepHighlight: true,
    limit,
    onValueChange,
    open: true,
    value,
  };

  return (
    <CommandPalettePortal>
      {modal === true ? <CommandPaletteBackdrop /> : null}
      <CommandPaletteViewport className={modal === true ? undefined : styles.viewportNonModal}>
        <CommandPalettePopup className={className} {...props}>
          {isGroupedItems(items) ? (
            <AutocompletePrimitive.Root {...autocompleteProps} items={items}>
              {children}
            </AutocompletePrimitive.Root>
          ) : (
            <AutocompletePrimitive.Root {...autocompleteProps} items={items}>
              {children}
            </AutocompletePrimitive.Root>
          )}
        </CommandPalettePopup>
      </CommandPaletteViewport>
    </CommandPalettePortal>
  );
}

function CommandPaletteInputWrap({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="command-palette-input-wrap"
      className={clsx(styles.inputWrap, className)}
      {...props}
    />
  );
}

function CommandPaletteInput({ className, ...props }: AutocompletePrimitive.Input.Props) {
  return (
    <AutocompletePrimitive.Input
      data-slot="command-palette-input"
      className={mergeClassName(className, styles.input)}
      {...props}
    />
  );
}

function CommandPaletteClear({ className, children, ...props }: AutocompletePrimitive.Clear.Props) {
  return (
    <AutocompletePrimitive.Clear
      data-slot="command-palette-clear"
      className={mergeClassName(className, styles.clear)}
      {...props}
    >
      {children ?? <CloseIcon className={styles.iconSvg} />}
    </AutocompletePrimitive.Clear>
  );
}

function CommandPaletteStatus({ className, ...props }: AutocompletePrimitive.Status.Props) {
  return (
    <AutocompletePrimitive.Status
      data-slot="command-palette-status"
      className={mergeClassName(className, styles.status)}
      {...props}
    />
  );
}

function CommandPaletteEmpty({ className, ...props }: AutocompletePrimitive.Empty.Props) {
  return (
    <AutocompletePrimitive.Empty
      data-slot="command-palette-empty"
      className={mergeClassName(className, styles.empty)}
      {...props}
    />
  );
}

function CommandPaletteList({ className, ...props }: AutocompletePrimitive.List.Props) {
  return (
    <AutocompletePrimitive.List
      data-slot="command-palette-list"
      className={mergeClassName(className, styles.list)}
      {...props}
    />
  );
}

function CommandPaletteGroup({ className, ...props }: AutocompletePrimitive.Group.Props) {
  return (
    <AutocompletePrimitive.Group
      data-slot="command-palette-group"
      className={mergeClassName(className, styles.group)}
      {...props}
    />
  );
}

function CommandPaletteGroupLabel({ className, ...props }: AutocompletePrimitive.GroupLabel.Props) {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="command-palette-group-label"
      className={mergeClassName(className, styles.groupLabel)}
      {...props}
    />
  );
}

function CommandPaletteCollection(props: AutocompletePrimitive.Collection.Props) {
  return <AutocompletePrimitive.Collection data-slot="command-palette-collection" {...props} />;
}

function CommandPaletteItem({
  className,
  closeOnSelect = true,
  onClick,
  ...props
}: AutocompletePrimitive.Item.Props & {
  closeOnSelect?: boolean;
}) {
  const { handle } = useCommandPaletteContext('CommandPaletteItem');

  const handleClick: AutocompletePrimitive.Item.Props['onClick'] = (event) => {
    onClick?.(event);

    if (!event.defaultPrevented && closeOnSelect) {
      handle.close();
    }
  };

  return (
    <AutocompletePrimitive.Item
      data-slot="command-palette-item"
      className={mergeClassName(className, styles.item)}
      onClick={handleClick}
      {...props}
    />
  );
}

function CommandPaletteItemIcon({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-palette-item-icon"
      className={clsx(styles.itemIcon, className)}
      {...props}
    />
  );
}

function CommandPaletteItemText({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-palette-item-text"
      className={clsx(styles.itemText, className)}
      {...props}
    />
  );
}

function CommandPaletteItemLabel({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-palette-item-label"
      className={clsx(styles.itemLabel, className)}
      {...props}
    />
  );
}

function CommandPaletteItemDescription({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-palette-item-description"
      className={clsx(styles.itemDescription, className)}
      {...props}
    />
  );
}

function CommandPaletteItemMeta({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-palette-item-meta"
      className={clsx(styles.itemMeta, className)}
      {...props}
    />
  );
}

function CommandPaletteSeparator({ className, ...props }: AutocompletePrimitive.Separator.Props) {
  return (
    <AutocompletePrimitive.Separator
      data-slot="command-palette-separator"
      className={mergeClassName(className, styles.separator)}
      {...props}
    />
  );
}

function CommandPaletteFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="command-palette-footer" className={clsx(styles.footer, className)} {...props} />
  );
}

function CommandPaletteKbd({ className, ...props }: ComponentProps<'kbd'>) {
  return <kbd data-slot="command-palette-kbd" className={clsx(styles.kbd, className)} {...props} />;
}

export {
  CommandPalette,
  createCommandPaletteHandle,
  CommandPaletteTrigger,
  CommandPalettePortal,
  CommandPaletteBackdrop,
  CommandPaletteViewport,
  CommandPalettePopup,
  CommandPaletteClose,
  CommandPaletteContent,
  CommandPaletteInputWrap,
  CommandPaletteInput,
  CommandPaletteClear,
  CommandPaletteStatus,
  CommandPaletteEmpty,
  CommandPaletteList,
  CommandPaletteGroup,
  CommandPaletteGroupLabel,
  CommandPaletteCollection,
  CommandPaletteItem,
  CommandPaletteItemIcon,
  CommandPaletteItemText,
  CommandPaletteItemLabel,
  CommandPaletteItemDescription,
  CommandPaletteItemMeta,
  CommandPaletteSeparator,
  CommandPaletteFooter,
  CommandPaletteKbd,
};