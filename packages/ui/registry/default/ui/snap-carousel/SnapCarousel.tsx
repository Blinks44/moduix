import { clsx } from 'clsx';
import {
  Children,
  createContext,
  useCallback,
  useContext,
  useRef,
  type ComponentProps,
  type MouseEvent,
} from 'react';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@/lib/moduix/icons/ui';
import styles from './SnapCarousel.module.css';

type SnapCarouselOrientation = 'horizontal' | 'vertical';
type SnapCarouselAlign = 'start' | 'center' | 'end';
type SnapCarouselControlDirection = 'next' | 'previous';

type SnapCarouselContextValue = {
  orientation: SnapCarouselOrientation;
  scrollViewport: (direction: SnapCarouselControlDirection) => void;
  setViewport: (viewport: HTMLDivElement | null) => void;
};

type SnapCarouselProps = ComponentProps<'div'> & {
  align?: SnapCarouselAlign;
  orientation?: SnapCarouselOrientation;
};

type SnapCarouselContentProps = ComponentProps<'div'> & {
  itemClassName?: string;
};

const SnapCarouselContext = createContext<SnapCarouselContextValue | null>(null);
const SnapCarouselViewportPresenceContext = createContext(false);

function useSnapCarouselContext(componentName: string) {
  const context = useContext(SnapCarouselContext);

  if (!context) {
    throw new Error(`${componentName} must be used within SnapCarousel.`);
  }

  return context;
}

function SnapCarousel({
  align = 'start',
  className,
  orientation = 'horizontal',
  ...props
}: SnapCarouselProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const setViewport = useCallback((viewport: HTMLDivElement | null) => {
    viewportRef.current = viewport;
  }, []);

  const scrollViewport = useCallback(
    (direction: SnapCarouselControlDirection) => {
      if (!viewportRef.current) {
        return;
      }

      const viewport = viewportRef.current;
      const distance =
        (orientation === 'horizontal' ? viewport.clientWidth : viewport.clientHeight) * 0.85;
      const scrollDistance = direction === 'previous' ? -distance : distance;

      viewport.scrollBy(
        orientation === 'horizontal'
          ? { behavior: 'smooth', left: scrollDistance }
          : { behavior: 'smooth', top: scrollDistance },
      );
    },
    [orientation],
  );

  return (
    <SnapCarouselContext.Provider
      value={{
        orientation,
        scrollViewport,
        setViewport,
      }}
    >
      <div
        data-slot="snap-carousel-root"
        data-align={align}
        data-orientation={orientation}
        className={clsx(styles.root, className)}
        {...props}
      />
    </SnapCarouselContext.Provider>
  );
}

function SnapCarouselViewport({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
  role,
  tabIndex = 0,
  ...props
}: ComponentProps<'div'>) {
  const context = useSnapCarouselContext('SnapCarouselViewport');
  const resolvedRole = role ?? (ariaLabel || ariaLabelledBy ? 'region' : undefined);

  return (
    <SnapCarouselViewportPresenceContext.Provider value>
      <div
        data-slot="snap-carousel-viewport"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        role={resolvedRole}
        tabIndex={tabIndex}
        className={clsx(styles.viewport, className)}
        {...props}
        ref={context.setViewport}
      />
    </SnapCarouselViewportPresenceContext.Provider>
  );
}

function SnapCarouselContent({
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  children,
  className,
  itemClassName,
  onKeyDown,
  tabIndex,
  ...props
}: SnapCarouselContentProps) {
  const isInsideViewport = useContext(SnapCarouselViewportPresenceContext);
  const contentChildren = isInsideViewport
    ? children
    : Children.map(children, (child) => (
        <SnapCarouselItem className={itemClassName}>{child}</SnapCarouselItem>
      ));
  const content = (
    <div data-slot="snap-carousel-content" className={clsx(styles.content, className)} {...props}>
      {contentChildren}
    </div>
  );

  if (isInsideViewport) {
    return content;
  }

  return (
    <SnapCarouselViewport
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
    >
      {content}
    </SnapCarouselViewport>
  );
}

function SnapCarouselItem({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="snap-carousel-item" className={clsx(styles.item, className)} {...props} />;
}

function SnapCarouselControl({
  children,
  className,
  direction,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
  ...props
}: ComponentProps<'button'> & { direction: SnapCarouselControlDirection }) {
  const context = useSnapCarouselContext(
    direction === 'previous' ? 'SnapCarouselPrevious' : 'SnapCarouselNext',
  );
  const isPrevious = direction === 'previous';
  const Icon = isPrevious
    ? context.orientation === 'vertical'
      ? ChevronUpIcon
      : ChevronLeftIcon
    : context.orientation === 'vertical'
      ? ChevronDownIcon
      : ChevronRightIcon;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    context.scrollViewport(direction);
  };

  return (
    <button
      data-slot={`snap-carousel-${direction}`}
      aria-label={
        children ? ariaLabel : (ariaLabel ?? (isPrevious ? 'Previous slide' : 'Next slide'))
      }
      className={clsx(styles.control, isPrevious ? styles.previous : styles.next, className)}
      type={type}
      onClick={handleClick}
      {...props}
    >
      {children ?? <Icon />}
    </button>
  );
}

function SnapCarouselPrevious(props: ComponentProps<'button'>) {
  return <SnapCarouselControl direction="previous" {...props} />;
}

function SnapCarouselNext(props: ComponentProps<'button'>) {
  return <SnapCarouselControl direction="next" {...props} />;
}

export {
  SnapCarousel,
  SnapCarouselViewport,
  SnapCarouselContent,
  SnapCarouselItem,
  SnapCarouselPrevious,
  SnapCarouselNext,
};
export type {
  SnapCarouselAlign,
  SnapCarouselContentProps,
  SnapCarouselOrientation,
  SnapCarouselProps,
};