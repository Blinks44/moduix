import { Field as FieldPrimitive } from '@ark-ui/react/field';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import styles from './NativeSelect.module.css';

type NativeSelectProps = ComponentProps<typeof FieldPrimitive.Select> & {
  controlProps?: ComponentProps<'span'>;
};

const NativeSelect = forwardRef<ComponentRef<typeof FieldPrimitive.Select>, NativeSelectProps>(
  function NativeSelect({ className, controlProps, ...props }, ref) {
    return (
      <span
        {...controlProps}
        data-scope="native-select"
        data-part="control"
        data-slot="native-select-control"
        className={clsx(styles.control, controlProps?.className)}
      >
        <FieldPrimitive.Select
          {...props}
          ref={ref}
          data-scope="field"
          data-part="select"
          data-slot="native-select-root"
          className={clsx(styles.root, className)}
        />
        <span
          aria-hidden="true"
          data-scope="native-select"
          data-part="indicator"
          data-slot="native-select-indicator"
          className={styles.indicator}
        >
          <ChevronDownIcon />
        </span>
      </span>
    );
  },
);

export { NativeSelect };