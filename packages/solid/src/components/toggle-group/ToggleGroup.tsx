import {
  ToggleGroup as ToggleGroupPrimitive,
  useToggleGroup,
  useToggleGroupContext,
} from '@ark-ui/solid/toggle-group';
import { clsx } from 'clsx';
import type { Accessor, ComponentProps } from 'solid-js';
import { createContext, splitProps, useContext } from 'solid-js';
import type { ToggleSize, ToggleVariant } from '../toggle/Toggle';
import toggleStyles from '../toggle/Toggle.module.css';
import styles from './ToggleGroup.module.css';

type ToggleGroupStyleProps = {
  variant?: ToggleVariant;
  size?: ToggleSize;
};

const ToggleGroupStyleContext = createContext<{
  variant: Accessor<ToggleVariant>;
  size: Accessor<ToggleSize>;
}>({
  variant: (): ToggleVariant => 'default',
  size: (): ToggleSize => 'md',
});

type ToggleGroupRootProps = ComponentProps<typeof ToggleGroupPrimitive.Root> &
  ToggleGroupStyleProps;

type ToggleGroupRootProviderProps = ComponentProps<typeof ToggleGroupPrimitive.RootProvider> &
  ToggleGroupStyleProps;

type ToggleGroupItemProps = ComponentProps<typeof ToggleGroupPrimitive.Item> &
  ToggleGroupStyleProps;

function ToggleGroup(props: ToggleGroupRootProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'size', 'variant']);
  const variant = () => local.variant ?? 'default';
  const size = () => local.size ?? 'md';

  return (
    <ToggleGroupStyleContext.Provider value={{ variant, size }}>
      <ToggleGroupPrimitive.Root
        {...others}
        data-slot="toggle-group-root"
        data-variant={variant()}
        data-size={size()}
        class={clsx(styles.root, local.class)}
      >
        {local.children}
      </ToggleGroupPrimitive.Root>
    </ToggleGroupStyleContext.Provider>
  );
}

function ToggleGroupRootProvider(props: ToggleGroupRootProviderProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'size', 'variant']);
  const variant = () => local.variant ?? 'default';
  const size = () => local.size ?? 'md';

  return (
    <ToggleGroupStyleContext.Provider value={{ variant, size }}>
      <ToggleGroupPrimitive.RootProvider
        {...others}
        data-slot="toggle-group-root-provider"
        data-variant={variant()}
        data-size={size()}
        class={clsx(styles.root, local.class)}
      >
        {local.children}
      </ToggleGroupPrimitive.RootProvider>
    </ToggleGroupStyleContext.Provider>
  );
}

function ToggleGroupItem(props: ToggleGroupItemProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'size', 'variant']);
  const inherited = useContext(ToggleGroupStyleContext);
  const variant = () => local.variant ?? inherited.variant();
  const size = () => local.size ?? inherited.size();

  return (
    <ToggleGroupPrimitive.Item
      {...others}
      data-slot="toggle-group-item"
      data-variant={variant()}
      data-size={size()}
      class={clsx(toggleStyles.root, styles.item, local.class)}
    >
      {local.children}
    </ToggleGroupPrimitive.Item>
  );
}

const ToggleGroupContext = ToggleGroupPrimitive.Context;

export {
  ToggleGroup,
  ToggleGroupContext,
  ToggleGroupItem,
  ToggleGroupRootProvider,
  useToggleGroup,
  useToggleGroupContext,
};
export type {
  ToggleGroupContextProps,
  ToggleGroupValueChangeDetails,
  UseToggleGroupContext,
  UseToggleGroupProps,
  UseToggleGroupReturn,
} from '@ark-ui/solid/toggle-group';
export type {
  ToggleGroupItemProps,
  ToggleGroupRootProps,
  ToggleGroupRootProviderProps,
  ToggleSize,
  ToggleVariant,
};