import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { clsx } from 'clsx';
import * as React from 'react';
import styles from './Breadcrumbs.module.css';

type BreadcrumbsItemRenderProps = Omit<React.ComponentProps<'a'>, 'children'> & {
  children: React.ReactNode;
};

type BreadcrumbsItem = {
  key?: React.Key;
  label: React.ReactNode;
  href?: string;
  target?: React.ComponentProps<'a'>['target'];
  rel?: React.ComponentProps<'a'>['rel'];
  onClick?: React.ComponentProps<'a'>['onClick'];
  render?: (props: BreadcrumbsItemRenderProps) => React.ReactElement;
};

type BreadcrumbsClassNames = {
  ellipsisTrigger?: MenuPrimitive.Trigger.Props['className'];
  popup?: MenuPrimitive.Popup.Props['className'];
  popupItem?: MenuPrimitive.Item.Props['className'];
  popupLinkItem?: MenuPrimitive.LinkItem.Props['className'];
  portal?: MenuPrimitive.Portal.Props['className'];
  positioner?: MenuPrimitive.Positioner.Props['className'];
};

type BreadcrumbsSlotProps = {
  ellipsisTrigger?: Omit<MenuPrimitive.Trigger.Props, 'children' | 'className'>;
  popup?: Omit<MenuPrimitive.Popup.Props, 'children' | 'className'>;
  popupItem?: Omit<MenuPrimitive.Item.Props, 'children' | 'className'>;
  popupLinkItem?: Omit<MenuPrimitive.LinkItem.Props, 'children' | 'className' | 'href' | 'render'>;
  portal?: Omit<MenuPrimitive.Portal.Props, 'children' | 'className'>;
  positioner?: Omit<MenuPrimitive.Positioner.Props, 'children' | 'className'>;
};

type BreadcrumbsProps = Omit<React.ComponentProps<'nav'>, 'children'> & {
  items: BreadcrumbsItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  ellipsisLabel?: React.ReactNode;
  hiddenItemsMenuLabel?: string;
  classNames?: BreadcrumbsClassNames;
  slotProps?: BreadcrumbsSlotProps;
};

function Breadcrumbs({
  className,
  items,
  separator = '/',
  maxItems = 3,
  ellipsisLabel = '...',
  hiddenItemsMenuLabel = 'Show hidden path items',
  classNames,
  slotProps,
  ...props
}: BreadcrumbsProps) {
  const { startItems, collapsedItems, endItems } = getVisibleItems({ items, maxItems });
  const lastGlobalItemIndex = items.length - 1;
  const parts: Array<
    { type: 'item'; item: BreadcrumbsItem; globalIndex: number } | { type: 'collapsed' }
  > = [];

  startItems.forEach((item, index) => {
    parts.push({ type: 'item', item, globalIndex: index });
  });

  if (collapsedItems.length > 0) {
    parts.push({ type: 'collapsed' });
  }

  endItems.forEach((item, index) => {
    parts.push({
      type: 'item',
      item,
      globalIndex: startItems.length + collapsedItems.length + index,
    });
  });

  return (
    <nav
      data-slot="breadcrumbs-root"
      aria-label="Breadcrumb"
      className={clsx(styles.root, className)}
      {...props}
    >
      <ol data-slot="breadcrumbs-list" className={styles.list}>
        {parts.map((part, index) => {
          const isLast = index === parts.length - 1;

          if (part.type === 'collapsed') {
            return (
              <React.Fragment key={`collapsed-${index}`}>
                <li data-slot="breadcrumbs-item" className={styles.item}>
                  <BreadcrumbsCollapsedMenu
                    items={collapsedItems}
                    ellipsisLabel={ellipsisLabel}
                    hiddenItemsMenuLabel={hiddenItemsMenuLabel}
                    classNames={classNames}
                    slotProps={slotProps}
                  />
                </li>
                {!isLast ? <BreadcrumbsSeparator separator={separator} /> : null}
              </React.Fragment>
            );
          }

          const isCurrent = part.globalIndex === lastGlobalItemIndex;

          return (
            <React.Fragment key={part.item.key ?? `item-${part.globalIndex}`}>
              <BreadcrumbsListItem item={part.item} isCurrent={isCurrent} />
              {!isLast ? <BreadcrumbsSeparator separator={separator} /> : null}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

function BreadcrumbsListItem({ item, isCurrent }: { item: BreadcrumbsItem; isCurrent: boolean }) {
  const content = (
    <span data-slot="breadcrumbs-item-label" className={styles.itemLabel}>
      {item.label}
    </span>
  );

  return (
    <li data-slot="breadcrumbs-item" className={styles.item}>
      {isCurrent || (!item.href && !item.render) ? (
        <span
          data-slot="breadcrumbs-page"
          className={styles.page}
          aria-current={isCurrent ? 'page' : undefined}
        >
          {content}
        </span>
      ) : (
        <BreadcrumbsLink item={item}>{content}</BreadcrumbsLink>
      )}
    </li>
  );
}

function BreadcrumbsLink({ item, children }: { item: BreadcrumbsItem; children: React.ReactNode }) {
  const anchorProps: BreadcrumbsItemRenderProps = {
    href: item.href,
    target: item.target,
    rel: item.rel,
    onClick: item.onClick,
    className: styles.link,
    children,
  };

  if (item.render) {
    return item.render(anchorProps);
  }

  return <a {...anchorProps} />;
}

function BreadcrumbsSeparator({ separator }: { separator: React.ReactNode }) {
  return (
    <li data-slot="breadcrumbs-separator" aria-hidden="true" className={styles.separator}>
      {separator}
    </li>
  );
}

function BreadcrumbsCollapsedMenu({
  items,
  ellipsisLabel,
  hiddenItemsMenuLabel,
  classNames,
  slotProps,
}: {
  items: BreadcrumbsItem[];
  ellipsisLabel: React.ReactNode;
  hiddenItemsMenuLabel: string;
  classNames?: BreadcrumbsClassNames;
  slotProps?: BreadcrumbsSlotProps;
}) {
  return (
    <MenuPrimitive.Root>
      <MenuPrimitive.Trigger
        data-slot="breadcrumbs-ellipsis-trigger"
        aria-label={hiddenItemsMenuLabel}
        className={clsx(styles.ellipsisTrigger, classNames?.ellipsisTrigger)}
        {...slotProps?.ellipsisTrigger}
      >
        {ellipsisLabel}
      </MenuPrimitive.Trigger>

      <MenuPrimitive.Portal className={classNames?.portal} {...slotProps?.portal}>
        <MenuPrimitive.Positioner
          align="start"
          sideOffset={4}
          className={classNames?.positioner}
          {...slotProps?.positioner}
        >
          <MenuPrimitive.Popup
            data-slot="breadcrumbs-ellipsis-popup"
            className={clsx(styles.popup, classNames?.popup)}
            {...slotProps?.popup}
          >
            {items.map((item, index) => {
              const popupItemClassName = clsx(styles.popupItem, classNames?.popupItem);
              const popupLinkItemClassName = clsx(
                styles.popupItem,
                classNames?.popupItem,
                classNames?.popupLinkItem,
              );
              const renderItem = item.render;

              return item.href || renderItem ? (
                <MenuPrimitive.LinkItem
                  key={item.key ?? `hidden-link-${index}`}
                  data-slot="breadcrumbs-ellipsis-link-item"
                  href={item.href}
                  className={popupLinkItemClassName}
                  {...slotProps?.popupLinkItem}
                  render={
                    renderItem
                      ? ({ className, ...renderProps }) =>
                          renderItem({
                            ...renderProps,
                            className: clsx(popupLinkItemClassName, className),
                            children: item.label,
                          })
                      : undefined
                  }
                >
                  {item.label}
                </MenuPrimitive.LinkItem>
              ) : (
                <MenuPrimitive.Item
                  key={item.key ?? `hidden-item-${index}`}
                  data-slot="breadcrumbs-ellipsis-item"
                  className={popupItemClassName}
                  {...slotProps?.popupItem}
                >
                  {item.label}
                </MenuPrimitive.Item>
              );
            })}
          </MenuPrimitive.Popup>
        </MenuPrimitive.Positioner>
      </MenuPrimitive.Portal>
    </MenuPrimitive.Root>
  );
}

function getVisibleItems({ items, maxItems }: { items: BreadcrumbsItem[]; maxItems?: number }) {
  if (items.length <= 2) {
    return {
      startItems: items,
      collapsedItems: [] as BreadcrumbsItem[],
      endItems: [] as BreadcrumbsItem[],
    };
  }

  const maxMiddleItems = Math.max(0, Math.floor(maxItems ?? Number.POSITIVE_INFINITY));
  const middleItems = items.slice(1, -1);

  if (middleItems.length <= maxMiddleItems) {
    return {
      startItems: items,
      collapsedItems: [] as BreadcrumbsItem[],
      endItems: [] as BreadcrumbsItem[],
    };
  }

  const visibleMiddleItems =
    maxMiddleItems > 0 ? middleItems.slice(middleItems.length - maxMiddleItems) : [];
  const collapsedItems = middleItems.slice(0, middleItems.length - visibleMiddleItems.length);
  const startItems = [items[0]];
  const endItems = [...visibleMiddleItems, items[items.length - 1]];

  if (collapsedItems.length === 0) {
    return {
      startItems: items,
      collapsedItems,
      endItems: [] as BreadcrumbsItem[],
    };
  }

  return { startItems, collapsedItems, endItems };
}

export { Breadcrumbs };
export type {
  BreadcrumbsProps,
  BreadcrumbsItem,
  BreadcrumbsItemRenderProps,
  BreadcrumbsClassNames,
  BreadcrumbsSlotProps,
};