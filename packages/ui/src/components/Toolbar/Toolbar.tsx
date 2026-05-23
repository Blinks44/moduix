import { Toolbar as ToolbarPrimitive } from '@base-ui/react/toolbar';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Toolbar.module.css';

type ToolbarVariant = 'default' | 'outline' | 'ghost';
type ToolbarSize = 'sm' | 'md' | 'lg';

type ToolbarProps = ToolbarPrimitive.Root.Props & {
  variant?: ToolbarVariant;
  size?: ToolbarSize;
};

type ToolbarGroupProps = ToolbarPrimitive.Group.Props;
type ToolbarButtonProps = ToolbarPrimitive.Button.Props;
type ToolbarLinkProps = ToolbarPrimitive.Link.Props;
type ToolbarInputProps = ToolbarPrimitive.Input.Props;
type ToolbarSeparatorProps = ToolbarPrimitive.Separator.Props;

const Toolbar = React.forwardRef<React.ComponentRef<typeof ToolbarPrimitive.Root>, ToolbarProps>(
  function Toolbar(
    { className, variant = 'default', size = 'md', orientation = 'horizontal', ...props },
    ref,
  ) {
    return (
      <ToolbarPrimitive.Root
        ref={ref}
        data-slot="toolbar-root"
        data-variant={variant}
        data-size={size}
        orientation={orientation}
        className={mergeClassName(className, styles.root)}
        {...props}
      />
    );
  },
);

const ToolbarGroup = React.forwardRef<
  React.ComponentRef<typeof ToolbarPrimitive.Group>,
  ToolbarGroupProps
>(function ToolbarGroup({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Group
      ref={ref}
      data-slot="toolbar-group"
      className={mergeClassName(className, styles.group)}
      {...props}
    />
  );
});

const ToolbarButton = React.forwardRef<
  React.ComponentRef<typeof ToolbarPrimitive.Button>,
  ToolbarButtonProps
>(function ToolbarButton({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Button
      ref={ref}
      data-slot="toolbar-button"
      className={mergeClassName(className, styles.button)}
      {...props}
    />
  );
});

const ToolbarLink = React.forwardRef<
  React.ComponentRef<typeof ToolbarPrimitive.Link>,
  ToolbarLinkProps
>(function ToolbarLink({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Link
      ref={ref}
      data-slot="toolbar-link"
      className={mergeClassName(className, styles.link)}
      {...props}
    />
  );
});

const ToolbarInput = React.forwardRef<
  React.ComponentRef<typeof ToolbarPrimitive.Input>,
  ToolbarInputProps
>(function ToolbarInput({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Input
      ref={ref}
      data-slot="toolbar-input"
      className={mergeClassName(className, styles.input)}
      {...props}
    />
  );
});

const ToolbarSeparator = React.forwardRef<
  React.ComponentRef<typeof ToolbarPrimitive.Separator>,
  ToolbarSeparatorProps
>(function ToolbarSeparator({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Separator
      ref={ref}
      data-slot="toolbar-separator"
      className={mergeClassName(className, styles.separator)}
      {...props}
    />
  );
});

export { Toolbar, ToolbarGroup, ToolbarButton, ToolbarLink, ToolbarInput, ToolbarSeparator };

export type {
  ToolbarProps,
  ToolbarVariant,
  ToolbarSize,
  ToolbarGroupProps,
  ToolbarButtonProps,
  ToolbarLinkProps,
  ToolbarInputProps,
  ToolbarSeparatorProps,
};