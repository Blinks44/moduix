import { cva } from 'class-variance-authority';

export const tagsInputRootVariants = cva(
  'flex w-full max-w-96 flex-col gap-1 text-foreground data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
);