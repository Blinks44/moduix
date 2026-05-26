import { NavigationMenu as NavigationMenuPrimitive } from '@base-ui/react/navigation-menu';
import * as React from 'react';
import { ChevronDownSmallIcon, PopupArrowIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './NavigationMenu.module.css';

const DEFAULT_SIDE_OFFSET = 10;
const DEFAULT_COLLISION_AVOIDANCE = { side: 'none' } as const;
const DEFAULT_COLLISION_PADDING = { top: 5, bottom: 5, left: 20, right: 20 } as const;

function NavigationMenu({
  className,
  children,
  showArrow = true,
  showPopup = true,
  side,
  sideOffset = DEFAULT_SIDE_OFFSET,
  align,
  alignOffset,
  arrowPadding,
  anchor,
  collisionAvoidance = DEFAULT_COLLISION_AVOIDANCE,
  collisionBoundary,
  collisionPadding = DEFAULT_COLLISION_PADDING,
  sticky,
  positionMethod,
  disableAnchorTracking,
  ...props
}: NavigationMenuPrimitive.Root.Props & {
  showArrow?: boolean;
  showPopup?: boolean;
} & Pick<
    NavigationMenuPrimitive.Positioner.Props,
    | 'side'
    | 'sideOffset'
    | 'align'
    | 'alignOffset'
    | 'arrowPadding'
    | 'anchor'
    | 'collisionAvoidance'
    | 'collisionBoundary'
    | 'collisionPadding'
    | 'sticky'
    | 'positionMethod'
    | 'disableAnchorTracking'
  >) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    >
      {children}
      {showPopup ? (
        <NavigationMenuPortal>
          <NavigationMenuPositioner
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
            arrowPadding={arrowPadding}
            anchor={anchor}
            collisionAvoidance={collisionAvoidance}
            collisionBoundary={collisionBoundary}
            collisionPadding={collisionPadding}
            sticky={sticky}
            positionMethod={positionMethod}
            disableAnchorTracking={disableAnchorTracking}
          >
            <NavigationMenuPopup>
              {showArrow ? <NavigationMenuArrow /> : null}
              <NavigationMenuViewport />
            </NavigationMenuPopup>
          </NavigationMenuPositioner>
        </NavigationMenuPortal>
      ) : null}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({ className, ...props }: NavigationMenuPrimitive.List.Props) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={mergeClassName(className, styles.list)}
      {...props}
    />
  );
}

function NavigationMenuItem(props: NavigationMenuPrimitive.Item.Props) {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" {...props} />;
}

function NavigationMenuTrigger({
  className,
  children,
  icon,
  hideIcon = false,
  ...props
}: NavigationMenuPrimitive.Trigger.Props & {
  icon?: React.ReactNode;
  hideIcon?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={mergeClassName(className, styles.trigger)}
      {...props}
    >
      {children}
      {!hideIcon ? <NavigationMenuIcon>{icon}</NavigationMenuIcon> : null}
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuIcon({ className, children, ...props }: NavigationMenuPrimitive.Icon.Props) {
  return (
    <NavigationMenuPrimitive.Icon
      data-slot="navigation-menu-icon"
      className={mergeClassName(className, styles.icon)}
      {...props}
    >
      {children ?? <ChevronDownSmallIcon />}
    </NavigationMenuPrimitive.Icon>
  );
}

function NavigationMenuContent({ className, ...props }: NavigationMenuPrimitive.Content.Props) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={mergeClassName(className, styles.content)}
      {...props}
    />
  );
}

function NavigationMenuLink({ className, ...props }: NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={mergeClassName(className, styles.link)}
      {...props}
    />
  );
}

function NavigationMenuPortal({ className, ...props }: NavigationMenuPrimitive.Portal.Props) {
  return (
    <NavigationMenuPrimitive.Portal
      data-slot="navigation-menu-portal"
      className={mergeClassName(className, styles.portal)}
      {...props}
    />
  );
}

function NavigationMenuBackdrop({ className, ...props }: NavigationMenuPrimitive.Backdrop.Props) {
  return (
    <NavigationMenuPrimitive.Backdrop
      data-slot="navigation-menu-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
}

function NavigationMenuPositioner({
  className,
  ...props
}: NavigationMenuPrimitive.Positioner.Props) {
  return (
    <NavigationMenuPrimitive.Positioner
      data-slot="navigation-menu-positioner"
      className={mergeClassName(className, styles.positioner)}
      {...props}
    />
  );
}

function NavigationMenuPopup({ className, ...props }: NavigationMenuPrimitive.Popup.Props) {
  return (
    <NavigationMenuPrimitive.Popup
      data-slot="navigation-menu-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
}

function NavigationMenuArrow({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Arrow.Props) {
  return (
    <NavigationMenuPrimitive.Arrow
      data-slot="navigation-menu-arrow"
      className={mergeClassName(className, styles.arrow)}
      {...props}
    >
      {children ?? <ArrowSvg />}
    </NavigationMenuPrimitive.Arrow>
  );
}

function NavigationMenuViewport({ className, ...props }: NavigationMenuPrimitive.Viewport.Props) {
  return (
    <NavigationMenuPrimitive.Viewport
      data-slot="navigation-menu-viewport"
      className={mergeClassName(className, styles.viewport)}
      {...props}
    />
  );
}

function ArrowSvg(props: React.ComponentProps<'svg'>) {
  return (
    <PopupArrowIcon
      fillClassName={styles.arrowFill}
      outerStrokeClassName={styles.arrowOuterStroke}
      innerStrokeClassName={styles.arrowInnerStroke}
      {...props}
    />
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuIcon,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuPortal,
  NavigationMenuBackdrop,
  NavigationMenuPositioner,
  NavigationMenuPopup,
  NavigationMenuArrow,
  NavigationMenuViewport,
};