/** Portions of this file are derived from Lucide Icons. See THIRD_PARTY_NOTICES.md. */
import {
  CheckIcon as LucideCheckIcon,
  ChevronDownIcon as LucideChevronDownIcon,
  ChevronLeftIcon as LucideChevronLeftIcon,
  ChevronRightIcon as LucideChevronRightIcon,
  ChevronsUpDownIcon as LucideChevronUpDownIcon,
  ChevronUpIcon as LucideChevronUpIcon,
  MinusIcon as LucideMinusIcon,
  PlusIcon as LucidePlusIcon,
  XIcon as LucideCloseIcon,
} from 'lucide-react';
import type { ComponentProps } from 'react';

type IconProps = ComponentProps<'svg'>;

export function ChevronLeftIcon(props: IconProps) {
  return <LucideChevronLeftIcon aria-hidden="true" focusable="false" strokeWidth={3} {...props} />;
}

export function ChevronRightIcon(props: IconProps) {
  return <LucideChevronRightIcon aria-hidden="true" focusable="false" strokeWidth={3} {...props} />;
}

export function ChevronDownIcon(props: IconProps) {
  return <LucideChevronDownIcon aria-hidden="true" focusable="false" strokeWidth={3} {...props} />;
}

export function ChevronUpIcon(props: IconProps) {
  return <LucideChevronUpIcon aria-hidden="true" focusable="false" strokeWidth={3} {...props} />;
}

export function ChevronUpDownIcon(props: IconProps) {
  return (
    <LucideChevronUpDownIcon aria-hidden="true" focusable="false" strokeWidth={3} {...props} />
  );
}

export function PlusIcon(props: IconProps) {
  return <LucidePlusIcon aria-hidden="true" focusable="false" strokeWidth={3} {...props} />;
}

export function MinusIcon(props: IconProps) {
  return <LucideMinusIcon aria-hidden="true" focusable="false" strokeWidth={3} {...props} />;
}

export function CheckIcon(props: IconProps) {
  return <LucideCheckIcon aria-hidden="true" focusable="false" strokeWidth={3} {...props} />;
}

export function CloseIcon(props: IconProps) {
  return <LucideCloseIcon aria-hidden="true" focusable="false" strokeWidth={3} {...props} />;
}

export function IndeterminateIcon(props: IconProps) {
  return <LucideMinusIcon aria-hidden="true" focusable="false" strokeWidth={3} {...props} />;
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
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
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
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
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
    <svg viewBox="0 0 16 4" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path d="M1 2h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ScrubCursorIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 25 14"
      fill="black"
      stroke="white"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M19.5 5.5H6.5V2L1 7l5.5 5v-3.5h13V12L25 7l-5.5-5z" />
    </svg>
  );
}

type PopupArrowIconProps = IconProps & {
  fillClassName?: string;
  outerStrokeClassName?: string;
  innerStrokeClassName?: string;
};

export function PopupArrowIcon({
  fillClassName,
  outerStrokeClassName,
  innerStrokeClassName,
  ...props
}: PopupArrowIconProps) {
  return (
    <svg viewBox="0 0 20 10" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className={fillClassName}
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className={outerStrokeClassName}
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className={innerStrokeClassName}
      />
    </svg>
  );
}

export {
  CopyIcon,
  EyeClosedIcon,
  EyeIcon,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  SquareCenterlineDashedHorizontalIcon as FlipHorizontalIcon,
  GripIcon,
  ListRestartIcon as RestartIcon,
  Maximize2Icon as MaximizeIcon,
  PauseIcon,
  PencilIcon,
  PlayIcon,
  StarIcon as RatingStarIcon,
  RotateCcwIcon,
  RotateCwIcon,
  SearchIcon,
  Trash2Icon as TrashIcon,
  UploadIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from 'lucide-react';