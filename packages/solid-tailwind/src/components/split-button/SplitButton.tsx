import { cva } from 'class-variance-authority';
import type { Accessor, ComponentProps, JSX } from 'solid-js';
import { children, createContext, splitProps, useContext } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import { Button } from '../button';
import { Menu } from '../menu';

type ButtonProps = ComponentProps<typeof Button>;
type SplitButtonVariant = Exclude<NonNullable<ButtonProps['variant']>, 'link'>;
type SplitButtonSize = Exclude<NonNullable<ButtonProps['size']>, 'icon-sm' | 'icon-md' | 'icon-lg'>;

type SplitButtonContextValue = {
  size: Accessor<SplitButtonSize>;
  variant: Accessor<SplitButtonVariant>;
};

type SplitButtonRootProps = Omit<ComponentProps<typeof Menu.Root>, 'children'> & {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  children?: JSX.Element;
  class?: string;
  ref?: HTMLDivElement | ((element: HTMLDivElement) => void);
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
};

type SplitButtonActionProps = Omit<ButtonProps, 'size' | 'variant'> & {
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
};

type SplitButtonTriggerProps = Omit<
  ComponentProps<typeof Menu.Trigger>,
  'asChild' | 'children' | 'class'
> & {
  children?: JSX.Element;
  class?: string;
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
};

type SplitButtonContentProps = ComponentProps<typeof Menu.Content>;
type SplitButtonPositionerProps = ComponentProps<typeof Menu.Positioner>;

const splitButtonTriggerVariants = cva(
  "relative min-w-0 -ms-px rounded-s-none px-3 before:pointer-events-none before:absolute before:inset-y-1.5 before:start-0 before:w-px before:bg-current before:opacity-[0.16] before:content-['']",
  {
    variants: {
      size: {
        xs: 'px-2',
        sm: 'px-2.5',
        md: 'px-3',
        lg: 'px-3.5',
        xl: 'px-4',
      },
      variant: {
        default: '',
        outline: 'before:opacity-0',
        secondary: '',
        destructive: '',
        'destructive-outline': 'before:opacity-0',
        ghost: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);

const SplitButtonContext = createContext<SplitButtonContextValue>();

function useSplitButtonContext(componentName: string) {
  const context = useContext(SplitButtonContext);

  if (!context) {
    throw new Error(`${componentName} must be used within SplitButton.Root.`);
  }

  return context;
}

function SplitButtonRoot(props: SplitButtonRootProps) {
  const [local, others] = splitProps(props, [
    'aria-label',
    'aria-labelledby',
    'children',
    'class',
    'onSelect',
    'positioning',
    'ref',
    'size',
    'variant',
  ]);

  return (
    <SplitButtonContext.Provider
      value={{
        size: () => local.size ?? 'md',
        variant: () => local.variant ?? 'default',
      }}
    >
      <Menu.Root
        onSelect={local.onSelect}
        positioning={{ placement: 'bottom-end', gutter: 4, ...local.positioning }}
        {...others}
      >
        <div
          role="group"
          aria-label={local['aria-label']}
          aria-labelledby={local['aria-labelledby']}
          data-scope="split-button"
          data-part="root"
          data-slot="split-button-root"
          class={cn('inline-flex items-stretch', local.class)}
          ref={local.ref}
        >
          {local.children}
        </div>
      </Menu.Root>
    </SplitButtonContext.Provider>
  );
}

function SplitButtonAction(props: SplitButtonActionProps) {
  const [local, others] = splitProps(props, ['class', 'size', 'variant']);
  const context = useSplitButtonContext('SplitButton.Action');

  return (
    <Button
      {...others}
      data-slot="split-button-action"
      size={local.size ?? context.size()}
      variant={local.variant ?? context.variant()}
      class={cn('rounded-e-none', local.class)}
    />
  );
}

function SplitButtonTrigger(props: SplitButtonTriggerProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'size', 'variant', 'aria-label']);
  const context = useSplitButtonContext('SplitButton.Trigger');
  const resolvedChildren = children(() => local.children);
  const resolvedSize = () => local.size ?? context.size();
  const resolvedVariant = () => local.variant ?? context.variant();
  const isIconOnly = () => resolvedChildren() == null;
  const ariaLabel = () =>
    isIconOnly() ? (local['aria-label'] ?? 'More actions') : local['aria-label'];
  const triggerClass = () =>
    cn(
      splitButtonTriggerVariants({ size: resolvedSize(), variant: resolvedVariant() }),
      local.class,
    );

  return (
    <Menu.Trigger
      {...others}
      asChild={(triggerProps) => (
        <Button
          {...triggerProps()}
          data-slot="split-button-trigger"
          size={resolvedSize()}
          variant={resolvedVariant()}
          class={triggerClass()}
          aria-label={ariaLabel()}
        >
          {resolvedChildren() ?? <ChevronDownIcon />}
        </Button>
      )}
      data-slot="split-button-trigger"
      aria-label={ariaLabel()}
      class={triggerClass()}
    />
  );
}

function SplitButtonPositioner(props: SplitButtonPositionerProps) {
  const [local, others] = splitProps(props, ['class']);

  return <Menu.Positioner {...others} data-slot="split-button-positioner" class={local.class} />;
}

function SplitButtonContent(props: SplitButtonContentProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <Menu.Content
      {...others}
      asChild={local.asChild}
      data-slot="split-button-content"
      class={local.class}
    >
      {local.asChild ? local.children : <Menu.Viewport>{local.children}</Menu.Viewport>}
    </Menu.Content>
  );
}

type SplitButtonComponent = typeof SplitButtonRoot & {
  Root: typeof SplitButtonRoot;
  Action: typeof SplitButtonAction;
  Trigger: typeof SplitButtonTrigger;
  Positioner: typeof SplitButtonPositioner;
  Content: typeof SplitButtonContent;
};

const SplitButton: SplitButtonComponent = Object.assign(SplitButtonRoot, {
  Root: SplitButtonRoot,
  Action: SplitButtonAction,
  Trigger: SplitButtonTrigger,
  Positioner: SplitButtonPositioner,
  Content: SplitButtonContent,
});

export { SplitButton };