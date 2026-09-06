import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: [
        'space-xs',
        'space-sm',
        'space-md',
        'space-lg',
        'space-xl',
        'space-2xl',
        'control-xs',
        'control-sm',
        'control-md',
        'control-lg',
        'control-xl',
      ],
      text: ['md'],
      'font-weight': ['regular'],
      tracking: ['text-xs', 'text-sm'],
      ease: ['standard', 'spring', 'emphasized'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}