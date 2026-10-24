'use client';

import { Field as FieldPrimitive } from '@ark-ui/react/field';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

type NativeSelectProps = ComponentProps<typeof FieldPrimitive.Select> & {
  controlProps?: ComponentProps<'span'>;
};

const NativeSelect = forwardRef<ComponentRef<typeof FieldPrimitive.Select>, NativeSelectProps>(
  function NativeSelect({ className, controlProps, ...props }, ref) {
    const isList = props.multiple || Number(props.size) > 1;

    return (
      <span
        {...controlProps}
        data-scope="native-select"
        data-part="control"
        data-slot="native-select-control"
        className={cn('relative inline-grid w-fit max-w-full min-w-0', controlProps?.className)}
      >
        <FieldPrimitive.Select
          {...props}
          ref={ref}
          data-scope="field"
          data-part="select"
          data-slot="native-select-root"
          className={cn(
            'peer/native-select h-control-md w-56 max-w-full min-w-0 cursor-pointer appearance-none rounded-md border border-border bg-background ps-3.5 pe-[2.875rem] text-foreground outline-focus-inset outline-offset-focus-inset outline-transparent transition-[border-color,outline-color,opacity] duration-normal ease-in-out [font:inherit] focus-visible:border-ring focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-disabled aria-invalid:border-destructive aria-invalid:outline-destructive data-disabled:pointer-events-none data-disabled:opacity-disabled data-invalid:border-destructive data-invalid:outline-destructive forced-colors:appearance-auto forced-colors:pe-3.5',
            isList && 'h-auto appearance-auto px-3.5 py-2',
            className,
          )}
        />
        <span
          aria-hidden="true"
          data-scope="native-select"
          data-part="indicator"
          data-slot="native-select-indicator"
          className={cn(
            'pointer-events-none absolute end-2 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-[background-color,color,opacity] duration-normal ease-in-out peer-hover/native-select:bg-muted peer-hover/native-select:text-foreground peer-disabled/native-select:opacity-disabled peer-data-disabled/native-select:opacity-disabled forced-colors:hidden [&>svg]:size-4',
            isList && 'hidden',
          )}
        >
          <ChevronDownIcon />
        </span>
      </span>
    );
  },
);

export { NativeSelect };