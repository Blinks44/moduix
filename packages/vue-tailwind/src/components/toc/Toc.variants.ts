import { cva } from 'class-variance-authority';

export const tocRootVariants = cva(
  'group/toc box-border grid w-full min-w-0 grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] gap-6 text-foreground has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)] max-md:grid-cols-[minmax(0,1fr)] max-md:has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(0,1fr)]',
);