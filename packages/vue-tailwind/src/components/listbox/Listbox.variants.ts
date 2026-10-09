import { cva } from 'class-variance-authority';

export const listboxRootVariants = cva(
  'box-border flex w-64 max-w-full min-w-0 flex-col gap-3 text-foreground data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
);