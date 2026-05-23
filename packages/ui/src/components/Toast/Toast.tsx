import type {
  ToastManager as BaseToastManager,
  ToastManagerAddOptions,
  ToastManagerPromiseOptions,
  ToastManagerUpdateOptions,
  ToastObject,
  UseToastManagerReturnValue,
} from '@base-ui/react/toast';
import { Toast as ToastPrimitive } from '@base-ui/react/toast';
import * as React from 'react';
import { CloseLineIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Toast.module.css';

type ToastPlacement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';
type ToastItem = ToastPrimitive.Root.ToastObject;
type ToastRenderFunction = (toast: ToastItem, index: number) => React.ReactNode;

type ToastRootProps = ToastPrimitive.Root.Props & {
  placement?: ToastPlacement;
};

type ToastViewportProps = ToastPrimitive.Viewport.Props & {
  placement?: ToastPlacement;
  stackBehavior?: ToastStackBehavior;
};

type ToastRegionClassNames = {
  portal?: ToastPrimitive.Portal.Props['className'];
  viewport?: ToastPrimitive.Viewport.Props['className'];
  content?: ToastPrimitive.Content.Props['className'];
  title?: ToastPrimitive.Title.Props['className'];
  description?: ToastPrimitive.Description.Props['className'];
  action?: ToastPrimitive.Action.Props['className'];
  close?: ToastPrimitive.Close.Props['className'];
};

type ToastRegionProps = Omit<ToastViewportProps, 'children'> & {
  className?: ToastPrimitive.Root.Props['className'];
  classNames?: ToastRegionClassNames;
  container?: ToastPrimitive.Portal.Props['container'];
  renderToast?: ToastRenderFunction;
};

type ToastAnchoredRegionClassNames = {
  portal?: ToastPrimitive.Portal.Props['className'];
  viewport?: ToastPrimitive.Viewport.Props['className'];
  positioner?: ToastPrimitive.Positioner.Props['className'];
  content?: ToastPrimitive.Content.Props['className'];
  arrow?: ToastPrimitive.Arrow.Props['className'];
};

type ToastAnchoredRegionProps = Omit<ToastPrimitive.Viewport.Props, 'className' | 'children'> & {
  className?: ToastPrimitive.Root.Props['className'];
  classNames?: ToastAnchoredRegionClassNames;
  container?: ToastPrimitive.Portal.Props['container'];
  renderToast?: ToastRenderFunction;
};

type ToastStackBehavior = 'stacked' | 'expanded';
type ToastContentProps = ToastPrimitive.Content.Props;
type ToastTitleProps = ToastPrimitive.Title.Props;
type ToastDescriptionProps = ToastPrimitive.Description.Props;
type ToastActionProps = ToastPrimitive.Action.Props;
type ToastCloseProps = ToastPrimitive.Close.Props;
type ToastManager<Data extends object = any> = BaseToastManager<Data>;
type ToastProviderProps = Omit<ToastPrimitive.Provider.Props, 'children'> & {
  children?: React.ReactNode;
  anchoredToastController?: AnchoredToastController;
  anchoredToastManager?: ToastManager;
};
type AnchoredToastShowOptions = Omit<
  Parameters<ToastManager['add']>[0],
  'id' | 'positionerProps'
> & {
  anchor: Element;
  id?: string;
  positionerProps?: NonNullable<Parameters<ToastManager['add']>[0]['positionerProps']>;
};

type AnchoredToastController = {
  manager: ToastManager;
  show: (options: AnchoredToastShowOptions) => string;
  closeByAnchor: (anchor: Element | null) => void;
  closeAll: () => void;
};

const DEFAULT_TOAST_PLACEMENT: ToastPlacement = 'bottom-right';
const DEFAULT_STACK_BEHAVIOR: ToastStackBehavior = 'stacked';
const DEFAULT_ANCHORED_SIDE_OFFSET = 8;
const TOP_TOAST_SWIPE_DIRECTIONS: Array<'left' | 'right' | 'up'> = ['left', 'right', 'up'];
const BOTTOM_TOAST_SWIPE_DIRECTIONS: Array<'left' | 'right' | 'down'> = ['left', 'right', 'down'];

const ToastPlacementContext = React.createContext<ToastPlacement>(DEFAULT_TOAST_PLACEMENT);
const ToastStackBehaviorContext = React.createContext<ToastStackBehavior>(DEFAULT_STACK_BEHAVIOR);
const AnchoredToastControllerContext = React.createContext<AnchoredToastController | null>(null);

const createToastManager = ToastPrimitive.createToastManager;
const useToastManager = ToastPrimitive.useToastManager;

function isAnchoredToast(toast: ToastItem) {
  return Boolean(toast.positionerProps?.anchor);
}

function ToastProvider({
  children,
  toastManager,
  anchoredToastController,
  anchoredToastManager,
  ...props
}: ToastProviderProps) {
  const defaultToastManager = React.useMemo(() => createToastManager(), []);
  const resolvedToastManager = toastManager ?? defaultToastManager;
  const defaultAnchoredToastManager = React.useMemo(() => createToastManager(), []);
  const resolvedAnchoredToastManager =
    anchoredToastManager ?? anchoredToastController?.manager ?? defaultAnchoredToastManager;
  const defaultAnchoredToastController = React.useMemo(
    () => createAnchoredToastController(resolvedAnchoredToastManager),
    [resolvedAnchoredToastManager],
  );
  const resolvedAnchoredToastController = anchoredToastController ?? defaultAnchoredToastController;

  return (
    <AnchoredToastControllerContext.Provider value={resolvedAnchoredToastController}>
      <ToastPrimitive.Provider toastManager={resolvedToastManager} {...props}>
        {children}
      </ToastPrimitive.Provider>
    </AnchoredToastControllerContext.Provider>
  );
}

function ToastPortal({ className, ...props }: ToastPrimitive.Portal.Props) {
  return (
    <ToastPrimitive.Portal
      data-slot="toast-portal"
      className={mergeClassName(className, styles.portal)}
      {...props}
    />
  );
}

function ToastViewport({
  className,
  placement = DEFAULT_TOAST_PLACEMENT,
  stackBehavior = DEFAULT_STACK_BEHAVIOR,
  ...props
}: ToastViewportProps) {
  return (
    <ToastPlacementContext.Provider value={placement}>
      <ToastStackBehaviorContext.Provider value={stackBehavior}>
        <ToastPrimitive.Viewport
          data-slot="toast-viewport"
          data-placement={placement}
          data-stack-behavior={stackBehavior}
          className={mergeClassName(className, styles.viewport)}
          {...props}
        />
      </ToastStackBehaviorContext.Provider>
    </ToastPlacementContext.Provider>
  );
}

function ToastRoot({ className, placement, swipeDirection, ...props }: ToastRootProps) {
  const contextPlacement = React.useContext(ToastPlacementContext);
  const stackBehavior = React.useContext(ToastStackBehaviorContext);
  const resolvedPlacement = placement ?? contextPlacement;
  const fallbackSwipeDirection = resolvedPlacement.startsWith('top')
    ? TOP_TOAST_SWIPE_DIRECTIONS
    : BOTTOM_TOAST_SWIPE_DIRECTIONS;

  return (
    <ToastPrimitive.Root
      data-slot="toast-root"
      data-placement={resolvedPlacement}
      data-stack-behavior={stackBehavior}
      swipeDirection={swipeDirection ?? fallbackSwipeDirection}
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  const stackBehavior = React.useContext(ToastStackBehaviorContext);

  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      data-stack-behavior={stackBehavior}
      className={mergeClassName(className, styles.content)}
      {...props}
    />
  );
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={mergeClassName(className, styles.title)}
      {...props}
    />
  );
}

function ToastDescription({ className, ...props }: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={mergeClassName(className, styles.description)}
      {...props}
    />
  );
}

function ToastAction({ className, ...props }: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      className={mergeClassName(className, styles.action)}
      {...props}
    />
  );
}

function ToastClose({ className, children, ...props }: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      className={mergeClassName(className, styles.close)}
      {...props}
    >
      {children ?? <CloseLineIcon className={styles.closeIcon} />}
    </ToastPrimitive.Close>
  );
}

function ToastPositioner({ className, ...props }: ToastPrimitive.Positioner.Props) {
  return (
    <ToastPrimitive.Positioner
      data-slot="toast-positioner"
      className={mergeClassName(className, styles.positioner)}
      {...props}
    />
  );
}

function ToastRegion({
  className,
  classNames,
  container,
  renderToast,
  placement = DEFAULT_TOAST_PLACEMENT,
  ...props
}: ToastRegionProps) {
  const { toasts: allToasts } = useToastManager();
  const toasts = allToasts.filter((toast) => !isAnchoredToast(toast));

  return (
    <ToastPortal className={classNames?.portal} container={container}>
      <ToastViewport className={classNames?.viewport} placement={placement} {...props}>
        {toasts.map((toast, index) => (
          <React.Fragment key={toast.id}>
            {renderToast ? (
              renderToast(toast, index)
            ) : (
              <DefaultToast
                toast={toast}
                className={className}
                contentClassName={classNames?.content}
                titleClassName={classNames?.title}
                descriptionClassName={classNames?.description}
                actionClassName={classNames?.action}
                closeClassName={classNames?.close}
              />
            )}
          </React.Fragment>
        ))}
      </ToastViewport>
    </ToastPortal>
  );
}

function ToastAnchoredRegion({
  className,
  classNames,
  container,
  renderToast,
  ...props
}: ToastAnchoredRegionProps) {
  const anchoredToastController = React.useContext(AnchoredToastControllerContext);
  const content = (
    <ToastAnchoredRegionContent
      className={className}
      classNames={classNames}
      container={container}
      renderToast={renderToast}
      {...props}
    />
  );

  if (anchoredToastController) {
    return (
      <ToastPrimitive.Provider toastManager={anchoredToastController.manager}>
        {content}
      </ToastPrimitive.Provider>
    );
  }

  return content;
}

function ToastAnchoredRegionContent({
  className,
  classNames,
  container,
  renderToast,
  ...props
}: ToastAnchoredRegionProps) {
  const { toasts: allToasts } = useToastManager();
  const toasts = allToasts.filter(isAnchoredToast);

  return (
    <ToastPortal className={classNames?.portal} container={container}>
      <ToastPrimitive.Viewport
        data-slot="toast-anchored-viewport"
        className={mergeClassName(classNames?.viewport, styles.anchoredViewport)}
        {...props}
      >
        {toasts.map((toast, index) => (
          <ToastPositioner
            key={toast.id}
            toast={toast}
            className={mergeClassName(classNames?.positioner, styles.anchoredPositioner)}
          >
            {renderToast ? (
              renderToast(toast, index)
            ) : (
              <DefaultAnchoredToast
                toast={toast}
                className={className}
                contentClassName={classNames?.content}
                arrowClassName={classNames?.arrow}
              />
            )}
          </ToastPositioner>
        ))}
      </ToastPrimitive.Viewport>
    </ToastPortal>
  );
}

function DefaultToast({
  toast,
  className,
  contentClassName,
  titleClassName,
  descriptionClassName,
  actionClassName,
  closeClassName,
}: {
  toast: ToastItem;
  className?: ToastPrimitive.Root.Props['className'];
  contentClassName?: ToastPrimitive.Content.Props['className'];
  titleClassName?: ToastPrimitive.Title.Props['className'];
  descriptionClassName?: ToastPrimitive.Description.Props['className'];
  actionClassName?: ToastPrimitive.Action.Props['className'];
  closeClassName?: ToastPrimitive.Close.Props['className'];
}) {
  return (
    <ToastRoot toast={toast} className={className}>
      <ToastContent className={contentClassName}>
        <ToastTitle className={titleClassName} />
        <ToastDescription className={descriptionClassName} />
        {toast.actionProps ? <ToastAction className={actionClassName} /> : null}
        <ToastClose className={closeClassName} aria-label="Close toast" />
      </ToastContent>
    </ToastRoot>
  );
}

function DefaultAnchoredToast({
  toast,
  className,
  contentClassName,
  arrowClassName,
}: {
  toast: ToastItem;
  className?: ToastPrimitive.Root.Props['className'];
  contentClassName?: ToastPrimitive.Content.Props['className'];
  arrowClassName?: ToastPrimitive.Arrow.Props['className'];
}) {
  return (
    <ToastAnchoredRoot toast={toast} className={className}>
      <ToastAnchoredArrow className={arrowClassName} />
      <ToastAnchoredContent className={contentClassName}>
        <ToastAnchoredDescription />
      </ToastAnchoredContent>
    </ToastAnchoredRoot>
  );
}

function ToastAnchoredRoot({ className, ...props }: ToastPrimitive.Root.Props) {
  return (
    <ToastPrimitive.Root
      data-slot="toast-anchored-root"
      className={mergeClassName(className, styles.anchoredRoot)}
      {...props}
    />
  );
}

function ToastAnchoredArrow({ className, children, ...props }: ToastPrimitive.Arrow.Props) {
  return (
    <ToastPrimitive.Arrow
      data-slot="toast-anchored-arrow"
      className={mergeClassName(className, styles.anchoredArrow)}
      {...props}
    >
      {children ?? <AnchoredArrowSvg className={styles.anchoredArrowSvg} />}
    </ToastPrimitive.Arrow>
  );
}

function ToastAnchoredContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-anchored-content"
      className={mergeClassName(className, styles.anchoredContent)}
      {...props}
    />
  );
}

function ToastAnchoredDescription({ className, ...props }: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-anchored-description"
      className={mergeClassName(className, styles.anchoredDescription)}
      {...props}
    />
  );
}

function AnchoredArrowSvg(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className={styles.anchoredArrowFill}
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className={styles.anchoredArrowStroke}
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className={styles.anchoredArrowOutline}
      />
    </svg>
  );
}

function createAnchoredToastController(
  manager: ToastManager = createToastManager(),
): AnchoredToastController {
  const anchorIds = new WeakMap<Element, string>();
  let idCounter = 0;

  function show({
    anchor,
    id,
    positionerProps,
    onClose,
    onRemove,
    ...options
  }: AnchoredToastShowOptions) {
    const existingId = anchorIds.get(anchor);
    const resolvedId = existingId ?? id ?? `anchored-${Date.now()}-${++idCounter}`;

    const handleCleanup = () => {
      if (anchorIds.get(anchor) === resolvedId) {
        anchorIds.delete(anchor);
      }
    };

    manager.add({
      ...options,
      id: resolvedId,
      positionerProps: {
        sideOffset: DEFAULT_ANCHORED_SIDE_OFFSET,
        ...positionerProps,
        anchor,
      },
      onClose: () => {
        onClose?.();
      },
      onRemove: () => {
        handleCleanup();
        onRemove?.();
      },
    });

    anchorIds.set(anchor, resolvedId);

    return resolvedId;
  }

  function closeByAnchor(anchor: Element | null) {
    if (!anchor) {
      return;
    }

    const toastId = anchorIds.get(anchor);
    if (!toastId) {
      return;
    }

    manager.close(toastId);
    anchorIds.delete(anchor);
  }

  function closeAll() {
    manager.close();
  }

  return { manager, show, closeByAnchor, closeAll };
}

function useAnchoredToastManager() {
  const anchoredToastController = React.useContext(AnchoredToastControllerContext);

  if (!anchoredToastController) {
    throw new Error('useAnchoredToastManager must be used within ToastProvider.');
  }

  return anchoredToastController;
}

export {
  ToastProvider,
  ToastRoot,
  ToastContent,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  ToastRegion,
  ToastAnchoredRegion,
  createToastManager,
  createAnchoredToastController,
  useToastManager,
  useAnchoredToastManager,
};

export type {
  ToastPlacement,
  ToastStackBehavior,
  ToastProviderProps,
  ToastRootProps,
  ToastContentProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastActionProps,
  ToastCloseProps,
  ToastRegionClassNames,
  ToastRegionProps,
  ToastAnchoredRegionClassNames,
  ToastAnchoredRegionProps,
  ToastObject,
  ToastManager,
  ToastManagerAddOptions,
  ToastManagerUpdateOptions,
  ToastManagerPromiseOptions,
  UseToastManagerReturnValue,
  AnchoredToastShowOptions,
  AnchoredToastController,
};