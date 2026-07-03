import type { ComponentProps, ComponentRef } from 'react';
import { Field as FieldPrimitive } from '@ark-ui/react/field';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './NativeSelect.module.css';

const NativeSelectRoot = forwardRef<
  ComponentRef<typeof FieldPrimitive.Select>,
  ComponentProps<typeof FieldPrimitive.Select>
>(function NativeSelectRoot({ className, ...props }, ref) {
  return (
    <span
      data-scope="native-select"
      data-part="control"
      data-slot="native-select-control"
      className={styles.control}
    >
      <FieldPrimitive.Select
        {...props}
        ref={ref}
        data-slot="native-select-root"
        className={clsx(styles.root, normalizeClassName(className))}
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
});

const NativeSelect = Object.assign(NativeSelectRoot, {
  Root: NativeSelectRoot,
});

export { NativeSelect };