import { Field as FieldPrimitive } from '@ark-ui/solid/field';
import type { FieldSelectProps } from '@ark-ui/solid/field';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

type NativeSelectProps = FieldSelectProps & {
  controlProps?: JSX.HTMLAttributes<HTMLSpanElement>;
};

function NativeSelect(props: NativeSelectProps) {
  const [local, others] = splitProps(props, ['class', 'controlProps']);
  const isList = () => props.multiple || Number(props.size) > 1;

  return (
    <span
      {...local.controlProps}
      data-scope="native-select"
      data-part="control"
      data-slot="native-select-control"
      class={cn('relative inline-grid w-fit max-w-full min-w-0', local.controlProps?.class)}
    >
      <FieldPrimitive.Select
        {...others}
        data-scope="field"
        data-part="select"
        data-slot="native-select-root"
        class={cn(
          'peer/native-select box-border h-control-md w-56 max-w-full min-w-0 cursor-pointer appearance-none rounded-md border border-border bg-background ps-3.5 pe-[2.875rem] text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-normal ease-in-out [font:inherit] focus-visible:border-ring focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:outline-destructive data-disabled:pointer-events-none data-disabled:opacity-50 data-invalid:border-destructive data-invalid:outline-destructive forced-colors:appearance-auto forced-colors:pe-3.5',
          isList() && 'h-auto appearance-auto px-3.5 py-2',
          local.class,
        )}
      />
      <span
        aria-hidden="true"
        data-scope="native-select"
        data-part="indicator"
        data-slot="native-select-indicator"
        class={cn(
          'pointer-events-none absolute end-2 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-[background-color,color,opacity] duration-normal ease-in-out peer-hover/native-select:bg-muted peer-hover/native-select:text-foreground peer-disabled/native-select:opacity-50 peer-data-disabled/native-select:opacity-50 forced-colors:hidden [&>svg]:size-4',
          isList() && 'hidden',
        )}
      >
        <ChevronDownIcon />
      </span>
    </span>
  );
}

export { NativeSelect };