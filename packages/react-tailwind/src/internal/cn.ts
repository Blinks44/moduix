import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: ['control-xs', 'control-sm', 'control-md', 'control-lg', 'control-xl'],
      text: ['md'],
      'font-weight': ['regular'],
      ease: ['spring'],
    },
    classGroups: {
      duration: [{ duration: ['fast', 'normal', 'slow', 'slower'] }],
      opacity: [{ opacity: ['disabled', 'hover'] }],
      'outline-w': [{ outline: ['focus', 'focus-inset'] }],
      'outline-offset': [{ 'outline-offset': ['focus', 'focus-inset'] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}