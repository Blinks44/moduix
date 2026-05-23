import { Autocomplete as AutocompletePrimitive } from '@base-ui/react/autocomplete';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { clsx } from 'clsx';
import * as React from 'react';
import { CloseLineIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './CommandPalette.module.css';

type CommandPaletteShortcut = false | string;

type CommandPaletteContextValue = {
  handle: CommandPaletteHandle;
};

type CommandPaletteProps<Payload = unknown> = DialogPrimitive.Root.Props<Payload> & {
  shortcut?: CommandPaletteShortcut;
  shortcutTarget?: Document | HTMLElement | null;
};

type CommandPaletteContentClassNames = {
  portal?: DialogPrimitive.Portal.Props['className'];
  backdrop?: DialogPrimitive.Backdrop.Props['className'];
  viewport?: DialogPrimitive.Viewport.Props['className'];
};

type CommandPaletteContentSlotProps = {
  portal?: Omit<DialogPrimitive.Portal.Props, 'className' | 'children'>;
  backdrop?: Omit<DialogPrimitive.Backdrop.Props, 'className'>;
  viewport?: Omit<DialogPrimitive.Viewport.Props, 'className'>;
};

type CommandPaletteContentProps<ItemValue = unknown> = Omit<
  DialogPrimitive.Popup.Props,
  'className'
> & {
  className?: DialogPrimitive.Popup.Props['className'];
  classNames?: CommandPaletteContentClassNames;
  slotProps?: CommandPaletteContentSlotProps;
  container?: DialogPrimitive.Portal.Props['container'];
  withBackdrop?: boolean;
  items?: readonly ItemValue[];
  itemToStringValue?: AutocompletePrimitive.Root.Props<ItemValue>['itemToStringValue'];
  value?: AutocompletePrimitive.Root.Props<ItemValue>['value'];
  defaultValue?: AutocompletePrimitive.Root.Props<ItemValue>['defaultValue'];
  onValueChange?: AutocompletePrimitive.Root.Props<ItemValue>['onValueChange'];
  onAutocompleteOpenChange?: AutocompletePrimitive.Root.Props<ItemValue>['onOpenChange'];
  filter?: AutocompletePrimitive.Root.Props<ItemValue>['filter'];
  limit?: AutocompletePrimitive.Root.Props<ItemValue>['limit'];
  autoHighlight?: AutocompletePrimitive.Root.Props<ItemValue>['autoHighlight'];
  keepHighlight?: AutocompletePrimitive.Root.Props<ItemValue>['keepHighlight'];
  mode?: AutocompletePrimitive.Root.Props<ItemValue>['mode'];
};

type CommandPaletteItemProps = AutocompletePrimitive.Item.Props & {
  closeOnSelect?: boolean;
};

const CommandPaletteContext = React.createContext<CommandPaletteContextValue | null>(null);
const createCommandPaletteHandle = DialogPrimitive.createHandle;
const useCommandPaletteFilter = AutocompletePrimitive.useFilter;
const useCommandPaletteFilteredItems = AutocompletePrimitive.useFilteredItems;
type CommandPaletteHandle = DialogPrimitive.Handle<unknown>;

function useCommandPaletteContext(componentName: string) {
  const context = React.useContext(CommandPaletteContext);

  if (!context) {
    throw new Error(`${componentName} must be used within CommandPalette.`);
  }

  return context;
}

function isShortcutMatch(event: KeyboardEvent, shortcut: string) {
  const parts = shortcut.toLowerCase().split('+');
  const key = parts.at(-1);
  const needsMod = parts.includes('mod');
  const needsCtrl = parts.includes('ctrl') || parts.includes('control');
  const needsMeta = parts.includes('meta') || parts.includes('cmd') || parts.includes('command');
  const needsAlt = parts.includes('alt') || parts.includes('option');
  const needsShift = parts.includes('shift');

  if (!key || event.key.toLowerCase() !== key) {
    return false;
  }

  return (
    (!needsMod || event.metaKey || event.ctrlKey) &&
    (!needsCtrl || event.ctrlKey) &&
    (!needsMeta || event.metaKey) &&
    (!needsAlt || event.altKey) &&
    (!needsShift || event.shiftKey)
  );
}

function CommandPalette<Payload = unknown>({
  shortcut = 'mod+k',
  shortcutTarget,
  handle,
  children,
  ...props
}: CommandPaletteProps<Payload>) {
  const fallbackHandle = React.useMemo(() => createCommandPaletteHandle<Payload>(), []);
  const resolvedHandle = handle ?? fallbackHandle;

  React.useEffect(() => {
    if (shortcut === false) {
      return;
    }

    const target = shortcutTarget ?? document;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || !isShortcutMatch(event, shortcut)) {
        return;
      }

      event.preventDefault();
      resolvedHandle.open(null);
    };

    const eventListener = handleKeyDown as EventListener;
    target.addEventListener('keydown', eventListener);
    return () => target.removeEventListener('keydown', eventListener);
  }, [resolvedHandle, shortcut, shortcutTarget]);

  const contextValue = React.useMemo<CommandPaletteContextValue>(
    () => ({ handle: resolvedHandle as CommandPaletteHandle }),
    [resolvedHandle],
  );

  return (
    <CommandPaletteContext.Provider value={contextValue}>
      <DialogPrimitive.Root handle={resolvedHandle} {...props}>
        {children}
      </DialogPrimitive.Root>
    </CommandPaletteContext.Provider>
  );
}

function CommandPaletteTrigger({ className, render, ...props }: DialogPrimitive.Trigger.Props) {
  const triggerClassName = render ? className : mergeClassName(className, styles.trigger);

  return (
    <DialogPrimitive.Trigger
      data-slot="command-palette-trigger"
      className={triggerClassName}
      render={render}
      {...props}
    />
  );
}

function CommandPalettePortal({ className, ...props }: DialogPrimitive.Portal.Props) {
  return (
    <DialogPrimitive.Portal
      data-slot="command-palette-portal"
      className={mergeClassName(className)}
      {...props}
    />
  );
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

function CommandPaletteContent<ItemValue = unknown>({
  className,
  classNames,
  slotProps,
  container,
  withBackdrop = true,
  children,
  items,
  itemToStringValue,
  value,
  defaultValue,
  onValueChange,
  onAutocompleteOpenChange,
  filter,
  limit,
  autoHighlight = 'always',
  keepHighlight = true,
  mode = 'list',
  onKeyDownCapture,
  ...props
}: CommandPaletteContentProps<ItemValue>) {
  const { handle } = useCommandPaletteContext('CommandPaletteContent');
  const { container: slotPortalContainer, ...restPortalSlotProps } = slotProps?.portal ?? {};
  const portalContainer = container ?? slotPortalContainer;
  const handlePopupKeyDownCapture = React.useCallback<
    NonNullable<DialogPrimitive.Popup.Props['onKeyDownCapture']>
  >(
    (event) => {
      onKeyDownCapture?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        handle.close();
      }
    },
    [handle, onKeyDownCapture],
  );

  return (
    <CommandPalettePortal
      className={classNames?.portal}
      container={portalContainer}
      {...restPortalSlotProps}
    >
      {withBackdrop ? (
        <CommandPaletteBackdrop className={classNames?.backdrop} {...slotProps?.backdrop} />
      ) : null}
      <CommandPaletteViewport
        className={classNames?.viewport}
        data-with-backdrop={withBackdrop ? 'true' : 'false'}
        {...slotProps?.viewport}
      >
        <CommandPalettePopup
          className={className}
          onKeyDownCapture={handlePopupKeyDownCapture}
          {...props}
        >
          <AutocompletePrimitive.Root
            open
            items={items}
            itemToStringValue={itemToStringValue}
            value={value}
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            onOpenChange={onAutocompleteOpenChange}
            filter={filter}
            limit={limit}
            autoHighlight={autoHighlight}
            keepHighlight={keepHighlight}
            mode={mode}
          >
            {children}
          </AutocompletePrimitive.Root>
        </CommandPalettePopup>
      </CommandPaletteViewport>
    </CommandPalettePortal>
  );
}

function CommandPaletteInputWrap({ className, ...props }: React.ComponentProps<'div'>) {
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
      {children ?? <CloseLineIcon className={styles.iconSvg} />}
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
}: CommandPaletteItemProps) {
  const { handle } = useCommandPaletteContext('CommandPaletteItem');

  const handleClick: CommandPaletteItemProps['onClick'] = (event) => {
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

function CommandPaletteItemIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-palette-item-icon"
      className={clsx(styles.itemIcon, className)}
      {...props}
    />
  );
}

function CommandPaletteItemText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-palette-item-text"
      className={clsx(styles.itemText, className)}
      {...props}
    />
  );
}

function CommandPaletteItemLabel({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-palette-item-label"
      className={clsx(styles.itemLabel, className)}
      {...props}
    />
  );
}

function CommandPaletteItemDescription({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-palette-item-description"
      className={clsx(styles.itemDescription, className)}
      {...props}
    />
  );
}

function CommandPaletteItemMeta({ className, ...props }: React.ComponentProps<'span'>) {
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

function CommandPaletteFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="command-palette-footer" className={clsx(styles.footer, className)} {...props} />
  );
}

function CommandPaletteKbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return <kbd data-slot="command-palette-kbd" className={clsx(styles.kbd, className)} {...props} />;
}

type CommandPalettePublicHandle<Payload = unknown> = DialogPrimitive.Handle<Payload>;
type CommandPaletteTriggerProps = DialogPrimitive.Trigger.Props;
type CommandPaletteInputWrapProps = React.ComponentProps<'div'>;
type CommandPaletteInputProps = AutocompletePrimitive.Input.Props;
type CommandPaletteClearProps = AutocompletePrimitive.Clear.Props;
type CommandPaletteStatusProps = AutocompletePrimitive.Status.Props;
type CommandPaletteEmptyProps = AutocompletePrimitive.Empty.Props;
type CommandPaletteListProps = AutocompletePrimitive.List.Props;
type CommandPaletteGroupProps = AutocompletePrimitive.Group.Props;
type CommandPaletteGroupLabelProps = AutocompletePrimitive.GroupLabel.Props;
type CommandPaletteCollectionProps = AutocompletePrimitive.Collection.Props;
type CommandPaletteItemIconProps = React.ComponentProps<'span'>;
type CommandPaletteItemTextProps = React.ComponentProps<'span'>;
type CommandPaletteItemLabelProps = React.ComponentProps<'span'>;
type CommandPaletteItemDescriptionProps = React.ComponentProps<'span'>;
type CommandPaletteItemMetaProps = React.ComponentProps<'span'>;
type CommandPaletteSeparatorProps = AutocompletePrimitive.Separator.Props;
type CommandPaletteFooterProps = React.ComponentProps<'div'>;
type CommandPaletteKbdProps = React.ComponentProps<'kbd'>;

export {
  CommandPalette,
  createCommandPaletteHandle,
  CommandPaletteTrigger,
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
  useCommandPaletteFilter,
  useCommandPaletteFilteredItems,
};

export type {
  CommandPaletteProps,
  CommandPalettePublicHandle as CommandPaletteHandle,
  CommandPaletteTriggerProps,
  CommandPaletteContentProps,
  CommandPaletteContentClassNames,
  CommandPaletteContentSlotProps,
  CommandPaletteInputWrapProps,
  CommandPaletteInputProps,
  CommandPaletteClearProps,
  CommandPaletteStatusProps,
  CommandPaletteEmptyProps,
  CommandPaletteListProps,
  CommandPaletteGroupProps,
  CommandPaletteGroupLabelProps,
  CommandPaletteCollectionProps,
  CommandPaletteItemProps,
  CommandPaletteItemIconProps,
  CommandPaletteItemTextProps,
  CommandPaletteItemLabelProps,
  CommandPaletteItemDescriptionProps,
  CommandPaletteItemMetaProps,
  CommandPaletteSeparatorProps,
  CommandPaletteFooterProps,
  CommandPaletteKbdProps,
};