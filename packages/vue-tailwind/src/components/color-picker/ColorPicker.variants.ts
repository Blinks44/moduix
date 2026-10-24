export const colorPickerRootClass =
  'box-border flex w-64 max-w-full min-w-0 flex-col gap-2 text-foreground data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

// Ark paints swatches with an inline background color; ::before repaints it over a checkerboard.
export const colorPickerSwatchClass =
  'relative isolate grid size-control-sm shrink-0 place-items-center rounded-sm before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)] before:[background:linear-gradient(var(--color),var(--color)),repeating-conic-gradient(var(--color-muted)_0_25%,var(--color-background)_0_50%)_0_0/0.5rem_0.5rem]';