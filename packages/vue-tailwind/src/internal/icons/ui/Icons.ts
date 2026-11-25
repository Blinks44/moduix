/** Portions of this file are derived from Lucide Icons. See THIRD_PARTY_NOTICES.md. */
import { h } from 'vue';
import type { FunctionalComponent, SVGAttributes } from 'vue';

type IconProps = SVGAttributes;

const baseSvgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  'aria-hidden': 'true',
  focusable: 'false',
} as const;

const accessibilityProps = { 'aria-hidden': 'true', focusable: 'false' } as const;

export const ChevronLeftIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, 'stroke-width': '3', ...props }, [
    h('path', { d: 'm15 18-6-6 6-6' }),
  ]);

export const ChevronRightIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, 'stroke-width': '3', ...props }, [h('path', { d: 'm9 18 6-6-6-6' })]);

export const ChevronDownIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, 'stroke-width': '3', ...props }, [h('path', { d: 'm6 9 6 6 6-6' })]);

export const ChevronUpIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, 'stroke-width': '3', ...props }, [
    h('path', { d: 'm18 15-6-6-6 6' }),
  ]);

export const ChevronUpDownIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, 'stroke-width': '3', ...props }, [
    h('path', { d: 'm7 15 5 5 5-5' }),
    h('path', { d: 'm7 9 5-5 5 5' }),
  ]);

export const PlusIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, 'stroke-width': '3', ...props }, [
    h('path', { d: 'M5 12h14' }),
    h('path', { d: 'M12 5v14' }),
  ]);

export const MinusIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, 'stroke-width': '3', ...props }, [h('path', { d: 'M5 12h14' })]);

export const CheckIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, 'stroke-width': '3', ...props }, [
    h('path', { d: 'M20 6 9 17l-5-5' }),
  ]);

export const CopyIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, 'stroke-width': '2.5', ...props }, [
    h('rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2' }),
    h('path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' }),
  ]);

export const CloseIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, 'stroke-width': '3', ...props }, [
    h('path', { d: 'M18 6 6 18' }),
    h('path', { d: 'm6 6 12 12' }),
  ]);

export const IndeterminateIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, 'stroke-width': '3', ...props }, [h('path', { d: 'M5 12h14' })]);

export const CalendarIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, 'stroke-width': '2.5', ...props }, [
    h('path', { d: 'M8 2v4' }),
    h('path', { d: 'M16 2v4' }),
    h('rect', { width: '18', height: '18', x: '3', y: '4', rx: '2' }),
    h('path', { d: 'M3 10h18' }),
  ]);

export const RestoreIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('rect', { width: '14', height: '14', x: '3', y: '3', rx: '2' }),
    h('path', { d: 'M7 21h10a2 2 0 0 0 2-2V9' }),
  ]);

export const PipetteIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, 'stroke-width': '2.5', ...props }, [
    h('path', { d: 'm2 22 1-1h3l9-9' }),
    h('path', { d: 'M3 21v-3l9-9' }),
    h('path', { d: 'm15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9' }),
    h('path', { d: 'm9 12 6 6' }),
    h('path', { d: 'm12 9 3-3 3 3-3 3' }),
  ]);

export const SeparatorMarkIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { viewBox: '0 0 16 4', fill: 'none', ...accessibilityProps, ...props }, [
    h('path', {
      d: 'M1 2h14',
      stroke: 'currentColor',
      'stroke-width': '1.6',
      'stroke-linecap': 'round',
    }),
  ]);

export const EllipsisIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('circle', { cx: '12', cy: '12', r: '1' }),
    h('circle', { cx: '19', cy: '12', r: '1' }),
    h('circle', { cx: '5', cy: '12', r: '1' }),
  ]);

export const EyeClosedIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('path', { d: 'm15 18-.722-3.25' }),
    h('path', { d: 'M2 8a10.645 10.645 0 0 0 20 0' }),
    h('path', { d: 'm20 15-1.726-2.05' }),
    h('path', { d: 'm4 15 1.726-2.05' }),
    h('path', { d: 'm9 18 .722-3.25' }),
  ]);

export const EyeIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('path', {
      d: 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0',
    }),
    h('circle', { cx: '12', cy: '12', r: '3' }),
  ]);

export const FileIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('path', {
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    }),
    h('path', { d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  ]);

export const FlipHorizontalIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('path', { d: 'M12 14v2' }),
    h('path', { d: 'M12 20v2' }),
    h('path', { d: 'M12 2v2' }),
    h('path', { d: 'M12 8v2' }),
    h('path', { d: 'M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3' }),
    h('path', { d: 'M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3' }),
  ]);

export const FolderIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('path', {
      d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
    }),
  ]);

export const FolderOpenIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('path', {
      d: 'm6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2',
    }),
  ]);

export const GripIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('circle', { cx: '12', cy: '5', r: '1' }),
    h('circle', { cx: '19', cy: '5', r: '1' }),
    h('circle', { cx: '5', cy: '5', r: '1' }),
    h('circle', { cx: '12', cy: '12', r: '1' }),
    h('circle', { cx: '19', cy: '12', r: '1' }),
    h('circle', { cx: '5', cy: '12', r: '1' }),
    h('circle', { cx: '12', cy: '19', r: '1' }),
    h('circle', { cx: '19', cy: '19', r: '1' }),
    h('circle', { cx: '5', cy: '19', r: '1' }),
  ]);

export const RestartIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('path', { d: 'M21 5H3' }),
    h('path', { d: 'M7 12H3' }),
    h('path', { d: 'M7 19H3' }),
    h('path', {
      d: 'M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14',
    }),
    h('path', { d: 'M11 10v4h4' }),
  ]);

export const MaximizeIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('path', { d: 'M15 3h6v6' }),
    h('path', { d: 'm21 3-7 7' }),
    h('path', { d: 'm3 21 7-7' }),
    h('path', { d: 'M9 21H3v-6' }),
  ]);

export const PauseIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('rect', { x: '14', y: '3', width: '5', height: '18', rx: '1' }),
    h('rect', { x: '5', y: '3', width: '5', height: '18', rx: '1' }),
  ]);

export const PencilIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('path', {
      d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
    }),
    h('path', { d: 'm15 5 4 4' }),
  ]);

export const PlayIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('path', {
      d: 'M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z',
    }),
  ]);

export const RatingStarIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('path', {
      d: 'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z',
    }),
  ]);

export const RotateCcwIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('path', { d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' }),
    h('path', { d: 'M3 3v5h5' }),
  ]);

export const RotateCwIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('path', { d: 'M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8' }),
    h('path', { d: 'M21 3v5h-5' }),
  ]);

export const SearchIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('path', { d: 'm21 21-4.34-4.34' }),
    h('circle', { cx: '11', cy: '11', r: '8' }),
  ]);

export const TrashIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('path', { d: 'M10 11v6' }),
    h('path', { d: 'M14 11v6' }),
    h('path', { d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6' }),
    h('path', { d: 'M3 6h18' }),
    h('path', { d: 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' }),
  ]);

export const UploadIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('path', { d: 'M12 3v12' }),
    h('path', { d: 'm17 8-5-5-5 5' }),
    h('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
  ]);

export const ZoomInIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('circle', { cx: '11', cy: '11', r: '8' }),
    h('line', { x1: '21', x2: '16.65', y1: '21', y2: '16.65' }),
    h('line', { x1: '11', x2: '11', y1: '8', y2: '14' }),
    h('line', { x1: '8', x2: '14', y1: '11', y2: '11' }),
  ]);

export const ZoomOutIcon: FunctionalComponent<IconProps> = (props) =>
  h('svg', { ...baseSvgProps, ...props }, [
    h('circle', { cx: '11', cy: '11', r: '8' }),
    h('line', { x1: '21', x2: '16.65', y1: '21', y2: '16.65' }),
    h('line', { x1: '8', x2: '14', y1: '11', y2: '11' }),
  ]);