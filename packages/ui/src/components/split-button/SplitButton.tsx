import type { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { clsx } from 'clsx';
import { forwardRef, createContext, useContext, type ComponentRef, type ReactNode } from 'react';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from '../button';
import { Menu, MenuContent, MenuTrigger, type MenuContentProps } from '../menu';
import styles from './SplitButton.module.css';

type SplitButtonVariant = Exclude<ButtonVariant, 'link'>;
type SplitButtonSize = Exclude<ButtonSize, 'icon-sm' | 'icon-md' | 'icon-lg'>;

type SplitButtonContextValue = {
  size: SplitButtonSize;
  variant: SplitButtonVariant;
};

type SplitButtonProps = Omit<MenuPrimitive.Root.Props, 'children'> & {
  children?: ReactNode;
  className?: string;
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
};

type SplitButtonActionProps = Omit<ButtonProps, 'size' | 'variant'> & {
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
};

type SplitButtonTriggerProps = Omit<MenuPrimitive.Trigger.Props, 'render'> & {
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
};

type SplitButtonContentProps = MenuContentProps;

const SplitButtonContext = createContext<SplitButtonContextValue | null>(null);

function useSplitButtonContext(componentName: string) {
  const context = useContext(SplitButtonContext);

  if (!context) {
    throw new Error(`${componentName} must be used within SplitButton.`);
  }

  return context;
}

function SplitButton({
  children,
  className,
  size = 'md',
  variant = 'default',
  ...props
}: SplitButtonProps) {
  return (
    <SplitButtonContext.Provider value={{ size, variant }}>
      <Menu {...props}>
        <div data-slot="split-button-root" className={clsx(styles.root, className)}>
          {children}
        </div>
      </Menu>
    </SplitButtonContext.Provider>
  );
}

const SplitButtonAction = forwardRef<ComponentRef<typeof Button>, SplitButtonActionProps>(
  function SplitButtonAction({ className, size, variant, ...props }, ref) {
    const context = useSplitButtonContext('SplitButtonAction');

    return (
      <Button
        ref={ref}
        data-slot="split-button-action"
        size={size ?? context.size}
        variant={variant ?? context.variant}
        className={mergeClassName(className, styles.action)}
        {...props}
      />
    );
  },
);

function SplitButtonTrigger({
  children,
  className,
  size,
  variant,
  'aria-label': ariaLabel,
  ...props
}: SplitButtonTriggerProps) {
  const context = useSplitButtonContext('SplitButtonTrigger');
  const resolvedChildren = children ?? <ChevronDownIcon />;

  return (
    <MenuTrigger
      data-slot="split-button-trigger"
      aria-label={children ? ariaLabel : (ariaLabel ?? 'More actions')}
      className={mergeClassName(className, styles.trigger)}
      render={<Button size={size ?? context.size} variant={variant ?? context.variant} />}
      {...props}
    >
      {resolvedChildren}
    </MenuTrigger>
  );
}

function SplitButtonContent({ align = 'end', sideOffset = 4, ...props }: SplitButtonContentProps) {
  return <MenuContent align={align} sideOffset={sideOffset} {...props} />;
}

export { SplitButton, SplitButtonAction, SplitButtonTrigger, SplitButtonContent };
export type {
  SplitButtonActionProps,
  SplitButtonContentProps,
  SplitButtonProps,
  SplitButtonSize,
  SplitButtonTriggerProps,
  SplitButtonVariant,
};