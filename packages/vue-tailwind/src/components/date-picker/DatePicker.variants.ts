export const rootClass =
  "group/date-picker inline-flex w-75 max-w-full flex-col items-start gap-1 text-foreground has-[input[data-index='1']]:w-96 data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100";
export const actionClass =
  'box-border inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm bg-transparent p-0 leading-none text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color] duration-normal ease-in-out focus-visible:outline-ring disabled:cursor-default [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):hover]:text-foreground';
export const tableHeaderClass =
  'h-7 w-control-sm text-center text-xs leading-4 font-medium text-muted-foreground tabular-nums';
export const selectControlClass = 'relative grid min-w-0';
export const selectClass =
  'peer/date-picker-select box-border h-control-sm w-full min-w-0 cursor-pointer appearance-none rounded-md border border-border bg-background py-1 ps-3.5 pe-[calc(var(--moduix-spacing-2)+var(--moduix-size-xs)+var(--moduix-spacing-3-5))] text-sm leading-5 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default disabled:opacity-disabled forced-colors:appearance-auto forced-colors:pe-3.5';
export const selectIndicatorClass =
  'pointer-events-none absolute end-2 top-1/2 inline-flex size-control-xs -translate-y-1/2 items-center justify-center text-muted-foreground peer-disabled/date-picker-select:opacity-disabled forced-colors:hidden [&>svg]:block [&>svg]:size-4';