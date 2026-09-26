/** Portions of this file are derived from Lucide Icons. See THIRD_PARTY_NOTICES.md. */
import {
  Check as LucideCheckIcon,
  ChevronDown as LucideChevronDownIcon,
  ChevronLeft as LucideChevronLeftIcon,
  ChevronRight as LucideChevronRightIcon,
  ChevronUp as LucideChevronUpIcon,
  ChevronsUpDown as LucideChevronUpDownIcon,
  Minus as LucideMinusIcon,
  Plus as LucidePlusIcon,
  X as LucideCloseIcon,
} from '@lucide/vue';
import { h } from 'vue';
import type { FunctionalComponent, SVGAttributes } from 'vue';

type IconProps = SVGAttributes;
const accessibilityProps = { 'aria-hidden': 'true', focusable: 'false' } as const;

export const ChevronLeftIcon: FunctionalComponent<IconProps> = (props) =>
  h(LucideChevronLeftIcon, { ...accessibilityProps, strokeWidth: 3, ...props });

export const ChevronRightIcon: FunctionalComponent<IconProps> = (props) =>
  h(LucideChevronRightIcon, { ...accessibilityProps, strokeWidth: 3, ...props });

export const ChevronDownIcon: FunctionalComponent<IconProps> = (props) =>
  h(LucideChevronDownIcon, { ...accessibilityProps, strokeWidth: 3, ...props });

export const ChevronUpIcon: FunctionalComponent<IconProps> = (props) =>
  h(LucideChevronUpIcon, { ...accessibilityProps, strokeWidth: 3, ...props });

export const ChevronUpDownIcon: FunctionalComponent<IconProps> = (props) =>
  h(LucideChevronUpDownIcon, { ...accessibilityProps, strokeWidth: 3, ...props });

export const PlusIcon: FunctionalComponent<IconProps> = (props) =>
  h(LucidePlusIcon, { ...accessibilityProps, strokeWidth: 3, ...props });

export const MinusIcon: FunctionalComponent<IconProps> = (props) =>
  h(LucideMinusIcon, { ...accessibilityProps, strokeWidth: 3, ...props });

export const CheckIcon: FunctionalComponent<IconProps> = (props) =>
  h(LucideCheckIcon, { ...accessibilityProps, strokeWidth: 3, ...props });

export const CloseIcon: FunctionalComponent<IconProps> = (props) =>
  h(LucideCloseIcon, { ...accessibilityProps, strokeWidth: 3, ...props });

export const IndeterminateIcon: FunctionalComponent<IconProps> = (props) =>
  h(LucideMinusIcon, { ...accessibilityProps, strokeWidth: 3, ...props });

export const CalendarIcon: FunctionalComponent<IconProps> = (props) =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2.5',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      ...accessibilityProps,
      ...props,
    },
    [
      h('path', { d: 'M8 2v4' }),
      h('path', { d: 'M16 2v4' }),
      h('rect', { width: '18', height: '18', x: '3', y: '4', rx: '2' }),
      h('path', { d: 'M3 10h18' }),
    ],
  );

export const RestoreIcon: FunctionalComponent<IconProps> = (props) =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      ...accessibilityProps,
      ...props,
    },
    [
      h('rect', { width: '14', height: '14', x: '3', y: '3', rx: '2' }),
      h('path', { d: 'M7 21h10a2 2 0 0 0 2-2V9' }),
    ],
  );

export const PipetteIcon: FunctionalComponent<IconProps> = (props) =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2.5',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      ...accessibilityProps,
      ...props,
    },
    [
      h('path', { d: 'm2 22 1-1h3l9-9' }),
      h('path', { d: 'M3 21v-3l9-9' }),
      h('path', { d: 'm15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9' }),
      h('path', { d: 'm9 12 6 6' }),
      h('path', { d: 'm12 9 3-3 3 3-3 3' }),
    ],
  );

export const SeparatorMarkIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { viewBox: '0 0 16 4', fill: 'none', ...accessibilityProps, ...props }, [
    h('path', {
      d: 'M1 2h14',
      stroke: 'currentColor',
      'stroke-width': '1.6',
      'stroke-linecap': 'round',
    }),
  ]);

export { Copy as CopyIcon } from '@lucide/vue';
export { EyeClosed as EyeClosedIcon } from '@lucide/vue';
export { Eye as EyeIcon } from '@lucide/vue';
export { File as FileIcon } from '@lucide/vue';
export { SquareCenterlineDashedHorizontal as FlipHorizontalIcon } from '@lucide/vue';
export { Folder as FolderIcon } from '@lucide/vue';
export { FolderOpen as FolderOpenIcon } from '@lucide/vue';
export { Grip as GripIcon } from '@lucide/vue';
export { ListRestart as RestartIcon } from '@lucide/vue';
export { Maximize2 as MaximizeIcon } from '@lucide/vue';
export { Pause as PauseIcon } from '@lucide/vue';
export { Pencil as PencilIcon } from '@lucide/vue';
export { Play as PlayIcon } from '@lucide/vue';
export { Star as RatingStarIcon } from '@lucide/vue';
export { RotateCcw as RotateCcwIcon } from '@lucide/vue';
export { RotateCw as RotateCwIcon } from '@lucide/vue';
export { Search as SearchIcon } from '@lucide/vue';
export { Trash as TrashIcon } from '@lucide/vue';
export { Upload as UploadIcon } from '@lucide/vue';
export { ZoomIn as ZoomInIcon } from '@lucide/vue';
export { ZoomOut as ZoomOutIcon } from '@lucide/vue';