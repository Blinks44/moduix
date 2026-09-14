/** Portions of this file are derived from Lucide Icons. See THIRD_PARTY_NOTICES.md. */
import LucideCheckIcon from 'lucide-solid/icons/check';
import LucideChevronDownIcon from 'lucide-solid/icons/chevron-down';
import LucideChevronLeftIcon from 'lucide-solid/icons/chevron-left';
import LucideChevronRightIcon from 'lucide-solid/icons/chevron-right';
import LucideChevronUpIcon from 'lucide-solid/icons/chevron-up';
import LucideChevronUpDownIcon from 'lucide-solid/icons/chevrons-up-down';
import LucideMinusIcon from 'lucide-solid/icons/minus';
import LucidePlusIcon from 'lucide-solid/icons/plus';
import LucideCloseIcon from 'lucide-solid/icons/x';
import type { JSX } from 'solid-js';

type IconProps = JSX.SvgSVGAttributes<SVGSVGElement>;
const accessibilityProps = { 'aria-hidden': 'true', focusable: 'false' } as const;

export function ChevronLeftIcon(props: IconProps) {
  return <LucideChevronLeftIcon {...accessibilityProps} strokeWidth={3} {...props} />;
}

export function ChevronRightIcon(props: IconProps) {
  return <LucideChevronRightIcon {...accessibilityProps} strokeWidth={3} {...props} />;
}

export function ChevronDownIcon(props: IconProps) {
  return <LucideChevronDownIcon {...accessibilityProps} strokeWidth={3} {...props} />;
}

export function ChevronUpIcon(props: IconProps) {
  return <LucideChevronUpIcon {...accessibilityProps} strokeWidth={3} {...props} />;
}

export function ChevronUpDownIcon(props: IconProps) {
  return <LucideChevronUpDownIcon {...accessibilityProps} strokeWidth={3} {...props} />;
}

export function PlusIcon(props: IconProps) {
  return <LucidePlusIcon {...accessibilityProps} strokeWidth={3} {...props} />;
}

export function MinusIcon(props: IconProps) {
  return <LucideMinusIcon {...accessibilityProps} strokeWidth={3} {...props} />;
}

export function CheckIcon(props: IconProps) {
  return <LucideCheckIcon {...accessibilityProps} strokeWidth={3} {...props} />;
}

export function CloseIcon(props: IconProps) {
  return <LucideCloseIcon {...accessibilityProps} strokeWidth={3} {...props} />;
}

export function IndeterminateIcon(props: IconProps) {
  return <LucideMinusIcon {...accessibilityProps} strokeWidth={3} {...props} />;
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...accessibilityProps}
      {...props}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

export function RestoreIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...accessibilityProps}
      {...props}
    >
      <rect width="14" height="14" x="3" y="3" rx="2" />
      <path d="M7 21h10a2 2 0 0 0 2-2V9" />
    </svg>
  );
}

export function PipetteIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...accessibilityProps}
      {...props}
    >
      <path d="m2 22 1-1h3l9-9" />
      <path d="M3 21v-3l9-9" />
      <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9" />
      <path d="m9 12 6 6" />
      <path d="m12 9 3-3 3 3-3 3" />
    </svg>
  );
}

export function SeparatorMarkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 4" fill="none" {...accessibilityProps} {...props}>
      <path d="M1 2h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </svg>
  );
}

export { default as CopyIcon } from 'lucide-solid/icons/copy';
export { default as EyeClosedIcon } from 'lucide-solid/icons/eye-closed';
export { default as EyeIcon } from 'lucide-solid/icons/eye';
export { default as FileIcon } from 'lucide-solid/icons/file';
export { default as FlipHorizontalIcon } from 'lucide-solid/icons/square-centerline-dashed-horizontal';
export { default as FolderIcon } from 'lucide-solid/icons/folder';
export { default as FolderOpenIcon } from 'lucide-solid/icons/folder-open';
export { default as GripIcon } from 'lucide-solid/icons/grip';
export { default as RestartIcon } from 'lucide-solid/icons/list-restart';
export { default as MaximizeIcon } from 'lucide-solid/icons/maximize-2';
export { default as PauseIcon } from 'lucide-solid/icons/pause';
export { default as PencilIcon } from 'lucide-solid/icons/pencil';
export { default as PlayIcon } from 'lucide-solid/icons/play';
export { default as RatingStarIcon } from 'lucide-solid/icons/star';
export { default as RotateCcwIcon } from 'lucide-solid/icons/rotate-ccw';
export { default as RotateCwIcon } from 'lucide-solid/icons/rotate-cw';
export { default as SearchIcon } from 'lucide-solid/icons/search';
export { default as TrashIcon } from 'lucide-solid/icons/trash';
export { default as UploadIcon } from 'lucide-solid/icons/upload';
export { default as ZoomInIcon } from 'lucide-solid/icons/zoom-in';
export { default as ZoomOutIcon } from 'lucide-solid/icons/zoom-out';