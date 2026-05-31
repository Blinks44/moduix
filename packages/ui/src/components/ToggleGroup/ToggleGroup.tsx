import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  type ComponentProps,
  type ComponentRef,
} from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import { Toggle } from '../Toggle';
import styles from './ToggleGroup.module.css';

type ToggleVariant = ComponentProps<typeof Toggle>['variant'];
type ToggleSize = ComponentProps<typeof Toggle>['size'];

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

const ToggleGroupItem = forwardRef<ComponentRef<typeof Toggle>, ComponentProps<typeof Toggle>>(
  function ToggleGroupItem({ className, variant, size, ...props }, ref) {
    const inherited = useContext(ToggleGroupContext);

    return (
      <Toggle
        ref={ref}
        data-slot="toggle-group-item"
        variant={variant ?? inherited.variant}
        size={size ?? inherited.size}
        className={mergeClassName(className, styles.item)}
        {...props}
      />
    );
  },
);

export { ToggleGroup, ToggleGroupItem };