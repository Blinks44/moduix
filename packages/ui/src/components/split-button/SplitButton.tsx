import { Portal } from '@ark-ui/react/portal';
import { clsx } from 'clsx';
import { forwardRef, createContext, useContext, type ComponentRef, type ReactNode } from 'react';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import { Button, type ButtonRootProps, type ButtonSize, type ButtonVariant } from '../button';
import {
  Menu,
  MenuContent,
  MenuPositioner,
  MenuTrigger,
  type MenuContentProps,
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

type SplitButtonProps = Omit<MenuRootProps, 'children'> & {
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
  positioning,
  size = 'md',
  variant = 'default',
  ...props
}: SplitButtonProps) {
  return (
    <SplitButtonContext.Provider value={{ size, variant }}>
      <Menu positioning={{ placement: 'bottom-end', gutter: 4, ...positioning }} {...props}>
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
        className={clsx(styles.action, normalizeClassName(className))}
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
      asChild
      data-slot="split-button-trigger"
      aria-label={children ? ariaLabel : (ariaLabel ?? 'More actions')}
      className={clsx(styles.trigger, normalizeClassName(className))}
      {...props}
    >
      <Button size={size ?? context.size} variant={variant ?? context.variant}>
        {resolvedChildren}
      </Button>
    </MenuTrigger>
  );
}

function SplitButtonContent(props: SplitButtonContentProps) {
  return (
    <Portal>
      <MenuPositioner>
        <MenuContent {...props} />
      </MenuPositioner>
    </Portal>
  );
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