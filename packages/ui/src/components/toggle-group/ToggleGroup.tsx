import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  type ComponentProps,
  type ComponentRef,
} from 'react';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import toggleStyles from '../toggle/Toggle.module.css';
import styles from './ToggleGroup.module.css';

type ToggleVariant = 'default' | 'outline' | 'ghost';
type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg';

const ToggleGroupContext = createContext<{
  variant: ToggleVariant;
  size: ToggleSize;
}>({
  variant: 'default',
  size: 'md',
});

const ToggleGroup = forwardRef<
  ComponentRef<typeof ToggleGroupPrimitive>,
  ToggleGroupPrimitive.Props & {
    variant?: ToggleVariant;
    size?: ToggleSize;
  }
>(function ToggleGroup({ className, variant = 'default', size = 'md', ...props }, ref) {
  const contextValue = useMemo(() => ({ variant, size }), [size, variant]);

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <ToggleGroupPrimitive
        ref={ref}
        data-slot="toggle-group-root"
        data-variant={variant}
        data-size={size}
        className={mergeClassName(className, styles.root)}
        {...props}
      />
    </ToggleGroupContext.Provider>
  );
});

const ToggleGroupItem = forwardRef<
  ComponentRef<typeof TogglePrimitive>,
  ComponentProps<typeof TogglePrimitive> & {
    variant?: ToggleVariant;
    size?: ToggleSize;
  }
>(function ToggleGroupItem({ className, variant, size, ...props }, ref) {
  const inherited = useContext(ToggleGroupContext);

  return (
    <TogglePrimitive
      ref={ref}
      data-slot="toggle-group-item"
      data-variant={variant ?? inherited.variant}
      data-size={size ?? inherited.size}
      className={mergeClassName(className, toggleStyles.root, styles.item)}
      {...props}
    />
  );
});

export { ToggleGroup, ToggleGroupItem };