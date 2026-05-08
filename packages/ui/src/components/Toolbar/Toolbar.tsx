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

const ToolbarOrientationContext =
  React.createContext<ToolbarPrimitive.Root.Orientation>('horizontal');

function Toolbar({
  className,
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  ...props
}: ToolbarProps) {
  return (
    <ToolbarOrientationContext.Provider value={orientation}>
      <ToolbarPrimitive.Root
        data-slot="toolbar-root"
        data-variant={variant}
        data-size={size}
        orientation={orientation}
        className={mergeClassName(className, styles.root)}
        {...props}
      />
    </ToolbarOrientationContext.Provider>
  );
}

function ToolbarGroup({ className, ...props }: ToolbarGroupProps) {
  return (
    <ToolbarPrimitive.Group
      data-slot="toolbar-group"
      className={mergeClassName(className, styles.group)}
      {...props}
    />
  );
}

function ToolbarButton({ className, ...props }: ToolbarButtonProps) {
  return (
    <ToolbarPrimitive.Button
      data-slot="toolbar-button"
      className={mergeClassName(className, styles.button)}
      {...props}
    />
  );
}

function ToolbarLink({ className, ...props }: ToolbarLinkProps) {
  return (
    <ToolbarPrimitive.Link
      data-slot="toolbar-link"
      className={mergeClassName(className, styles.link)}
      {...props}
    />
  );
}

function ToolbarInput({ className, ...props }: ToolbarInputProps) {
  return (
    <ToolbarPrimitive.Input
      data-slot="toolbar-input"
      className={mergeClassName(className, styles.input)}
      {...props}
    />
  );
}

function ToolbarSeparator({ className, orientation, ...props }: ToolbarSeparatorProps) {
  const toolbarOrientation = React.useContext(ToolbarOrientationContext);
  const resolvedOrientation =
    orientation ?? (toolbarOrientation === 'vertical' ? 'horizontal' : 'vertical');

  return (
    <ToolbarPrimitive.Separator
      data-slot="toolbar-separator"
      orientation={resolvedOrientation}
      className={mergeClassName(className, styles.separator)}
      {...props}
    />
  );
}

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