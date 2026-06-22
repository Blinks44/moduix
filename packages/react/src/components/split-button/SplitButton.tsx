import { clsx } from 'clsx';
import { createContext, forwardRef, useContext, type ComponentRef, type ReactNode } from 'react';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import { Button, type ButtonRootProps, type ButtonSize, type ButtonVariant } from '../button';
import {
  Menu,
  type MenuContentProps,
  type MenuPositionerProps,
  type MenuRootProps,
  type MenuTriggerProps,
} from '../menu';
import styles from './SplitButton.module.css';

type SplitButtonVariant = Exclude<ButtonVariant, 'link'>;
type SplitButtonSize = Exclude<ButtonSize, 'icon-sm' | 'icon-md' | 'icon-lg'>;

type SplitButtonContextValue = {
  size: SplitButtonSize;
  variant: SplitButtonVariant;
};

type SplitButtonRootProps = Omit<MenuRootProps, 'children'> & {
  children?: ReactNode;
  className?: string;
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
};

type SplitButtonActionProps = Omit<ButtonRootProps, 'size' | 'variant'> & {
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
};

type SplitButtonTriggerProps = MenuTriggerProps & {
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
};

type SplitButtonContentProps = MenuContentProps;
type SplitButtonPositionerProps = MenuPositionerProps;

const SplitButtonContext = createContext<SplitButtonContextValue | null>(null);

function useSplitButtonContext(componentName: string) {
  const context = useContext(SplitButtonContext);

  if (!context) {
    throw new Error(`${componentName} must be used within SplitButton.Root.`);
  }

  return context;
}

const SplitButtonRoot = forwardRef<HTMLDivElement, SplitButtonRootProps>(function SplitButtonRoot(
  { children, className, positioning, size = 'md', variant = 'default', ...props },
  ref,
) {
  return (
    <SplitButtonContext.Provider value={{ size, variant }}>
      <Menu.Root positioning={{ placement: 'bottom-end', gutter: 4, ...positioning }} {...props}>
        <div
          ref={ref}
          data-scope="split-button"
          data-part="root"
          data-slot="split-button-root"
          className={clsx(styles.root, normalizeClassName(className))}
        >
          {children}
        </div>
      </Menu.Root>
    </SplitButtonContext.Provider>
  );
});

const SplitButtonAction = forwardRef<ComponentRef<typeof Button>, SplitButtonActionProps>(
  function SplitButtonAction({ className, size, variant, ...props }, ref) {
    const context = useSplitButtonContext('SplitButton.Action');

    return (
      <Button
        ref={ref}
        data-slot="split-button-action"
        size={size ?? context.size}
        variant={variant ?? context.variant}
        className={clsx(styles.action, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const SplitButtonTrigger = forwardRef<ComponentRef<typeof Menu.Trigger>, SplitButtonTriggerProps>(
  function SplitButtonTrigger(
    { asChild, children, className, size, variant, 'aria-label': ariaLabel, ...props },
    ref,
  ) {
    const context = useSplitButtonContext('SplitButton.Trigger');
    const resolvedChildren = children ?? <ChevronDownIcon />;

    return (
      <Menu.Trigger
        ref={ref}
        asChild
        data-slot="split-button-trigger"
        aria-label={children ? ariaLabel : (ariaLabel ?? 'More actions')}
        className={clsx(styles.trigger, normalizeClassName(className))}
        {...props}
      >
        <Button asChild={asChild} size={size ?? context.size} variant={variant ?? context.variant}>
          {resolvedChildren}
        </Button>
      </Menu.Trigger>
    );
  },
);

const SplitButtonPositioner = forwardRef<
  ComponentRef<typeof Menu.Positioner>,
  SplitButtonPositionerProps
>(function SplitButtonPositioner({ className, ...props }, ref) {
  return (
    <Menu.Positioner
      ref={ref}
      data-slot="split-button-positioner"
      className={normalizeClassName(className)}
      {...props}
    />
  );
});

const SplitButtonContent = forwardRef<ComponentRef<typeof Menu.Content>, SplitButtonContentProps>(
  function SplitButtonContent({ className, ...props }, ref) {
    return (
      <Menu.Content
        ref={ref}
        data-slot="split-button-content"
        className={normalizeClassName(className)}
        {...props}
      />
    );
  },
);

const SplitButton = Object.assign(SplitButtonRoot, {
  Root: SplitButtonRoot,
  Action: SplitButtonAction,
  Trigger: SplitButtonTrigger,
  Positioner: SplitButtonPositioner,
  Content: SplitButtonContent,
});

export { SplitButton };
export type {
  SplitButtonActionProps,
  SplitButtonContentProps,
  SplitButtonPositionerProps,
  SplitButtonRootProps,
  SplitButtonSize,
  SplitButtonTriggerProps,
  SplitButtonVariant,
};