import type { ToastManager as BaseToastManager, ToastObject } from '@base-ui/react/toast';
import { Toast as ToastPrimitive } from '@base-ui/react/toast';
import {
  createContext,
  Fragment,
  useContext,
  useMemo,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { CloseIcon, PopupArrowIcon } from '@/lib/moduix/icons/ui';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './Toast.module.css';

export type ToastPlacement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';
export type ToastStackBehavior = 'stacked' | 'expanded';
type ToastItem = ToastObject<any>;
type DataSlotProps = { 'data-slot'?: string };
export type AnchoredToastOptions = Omit<
  Parameters<BaseToastManager['add']>[0],
  'id' | 'positionerProps'
> & {
  anchor: Element;
  id?: string;
  positionerProps?: NonNullable<Parameters<BaseToastManager['add']>[0]['positionerProps']>;
};

const DEFAULT_TOAST_PLACEMENT: ToastPlacement = 'bottom-right';
const DEFAULT_STACK_BEHAVIOR: ToastStackBehavior = 'stacked';
const DEFAULT_ANCHORED_SIDE_OFFSET = 8;
const TOP_TOAST_SWIPE_DIRECTIONS: Array<'left' | 'right' | 'up'> = ['left', 'right', 'up'];
const BOTTOM_TOAST_SWIPE_DIRECTIONS: Array<'left' | 'right' | 'down'> = ['left', 'right', 'down'];

const ToastPlacementContext = createContext<ToastPlacement>(DEFAULT_TOAST_PLACEMENT);
const ToastStackBehaviorContext = createContext<ToastStackBehavior>(DEFAULT_STACK_BEHAVIOR);
const ToastStyleContext = createContext<'stacked' | 'anchored'>('stacked');
const AnchoredToastManagerContext = createContext<{
  manager: BaseToastManager;
  show: (options: AnchoredToastOptions) => string;
  closeByAnchor: (anchor: Element | null) => void;
  closeAll: () => void;
} | null>(null);

const createToastManager = ToastPrimitive.createToastManager;
const useToastManager = ToastPrimitive.useToastManager;

function isAnchoredToast(toast: ToastItem) {
  return Boolean(toast.positionerProps?.anchor);
}

function getToastSwipeDirection(placement: ToastPlacement) {
  return placement.startsWith('top') ? TOP_TOAST_SWIPE_DIRECTIONS : BOTTOM_TOAST_SWIPE_DIRECTIONS;
}

function ToastProvider({
  children,
  toastManager,
  anchoredToastManager,
  ...props
}: ToastPrimitive.Provider.Props & {
  anchoredToastManager?: BaseToastManager;
}) {
  const defaultToastManager = useMemo(() => createToastManager(), []);
  const defaultAnchoredToastManager = useMemo(() => createToastManager(), []);
  const resolvedToastManager = toastManager ?? defaultToastManager;
  const resolvedAnchoredToastManager = anchoredToastManager ?? defaultAnchoredToastManager;
  const anchoredToast = useMemo(
    () => createAnchoredToastManager(resolvedAnchoredToastManager),
    [resolvedAnchoredToastManager],
  );

  return (
    <AnchoredToastManagerContext.Provider value={anchoredToast}>
      <ToastPrimitive.Provider toastManager={resolvedToastManager} {...props}>
        {children}
      </ToastPrimitive.Provider>
    </AnchoredToastManagerContext.Provider>
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
}: ToastPrimitive.Viewport.Props & {
  placement?: ToastPlacement;
  stackBehavior?: ToastStackBehavior;
}) {
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

function ToastRoot(
  props: ToastPrimitive.Root.Props & {
    placement?: ToastPlacement;
  },
) {
  const { className, placement, swipeDirection, toast, ...rootProps } = props;
  const contextPlacement = useContext(ToastPlacementContext);
  const stackBehavior = useContext(ToastStackBehaviorContext);
  const anchored = isAnchoredToast(toast);
  const resolvedPlacement = placement ?? contextPlacement;
  const dataSlot = (props as DataSlotProps)['data-slot'];

  return (
    <ToastStyleContext.Provider value={anchored ? 'anchored' : 'stacked'}>
      <ToastPrimitive.Root
        {...rootProps}
        toast={toast}
        data-slot={dataSlot ?? (anchored ? 'toast-anchored-root' : 'toast-root')}
        data-placement={resolvedPlacement}
        data-stack-behavior={stackBehavior}
        swipeDirection={
          anchored ? swipeDirection : (swipeDirection ?? getToastSwipeDirection(resolvedPlacement))
        }
        className={mergeClassName(className, anchored ? styles.anchoredRoot : styles.root)}
      />
    </ToastStyleContext.Provider>
  );
}

function ToastContent(props: ToastPrimitive.Content.Props) {
  const { className, ...contentProps } = props;
  const style = useContext(ToastStyleContext);
  const stackBehavior = useContext(ToastStackBehaviorContext);
  const dataSlot = (props as DataSlotProps)['data-slot'];

  return (
    <ToastPrimitive.Content
      {...contentProps}
      data-slot={dataSlot ?? (style === 'anchored' ? 'toast-anchored-content' : 'toast-content')}
      data-stack-behavior={style === 'stacked' ? stackBehavior : undefined}
      className={mergeClassName(
        className,
        style === 'anchored' ? styles.anchoredContent : styles.content,
      )}
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

function ToastDescription(props: ToastPrimitive.Description.Props) {
  const { className, ...descriptionProps } = props;
  const style = useContext(ToastStyleContext);
  const dataSlot = (props as DataSlotProps)['data-slot'];

  return (
    <ToastPrimitive.Description
      {...descriptionProps}
      data-slot={
        dataSlot ?? (style === 'anchored' ? 'toast-anchored-description' : 'toast-description')
      }
      className={mergeClassName(
        className,
        style === 'anchored' ? styles.anchoredDescription : styles.description,
      )}
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
      {children ?? <CloseIcon className={styles.closeIcon} />}
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

function ToastArrow(props: ToastPrimitive.Arrow.Props) {
  const { className, children, ...arrowProps } = props;
  const dataSlot = (props as DataSlotProps)['data-slot'];

  return (
    <ToastPrimitive.Arrow
      {...arrowProps}
      data-slot={dataSlot ?? 'toast-anchored-arrow'}
      className={mergeClassName(className, styles.anchoredArrow)}
    >
      {children ?? <AnchoredArrowSvg className={styles.anchoredArrowSvg} />}
    </ToastPrimitive.Arrow>
  );
}

function ToastRegion({
  className,
  container,
  renderToast,
  placement = DEFAULT_TOAST_PLACEMENT,
  stackBehavior = DEFAULT_STACK_BEHAVIOR,
  ...props
}: Omit<ToastPrimitive.Viewport.Props, 'children'> & {
  placement?: ToastPlacement;
  stackBehavior?: ToastStackBehavior;
  container?: ToastPrimitive.Portal.Props['container'];
  renderToast?: (toast: ToastItem, index: number) => ReactNode;
}) {
  const { toasts: allToasts } = useToastManager();
  const toasts = allToasts.filter((toast) => !isAnchoredToast(toast));

  return (
    <ToastPortal container={container}>
      <ToastViewport
        placement={placement}
        stackBehavior={stackBehavior}
        className={className}
        {...props}
      >
        {toasts.map((toast, index) =>
          renderToast ? (
            <Fragment key={toast.id}>{renderToast(toast, index)}</Fragment>
          ) : (
            <DefaultToast key={toast.id} toast={toast} />
          ),
        )}
      </ToastViewport>
    </ToastPortal>
  );
}

function ToastAnchoredRegion({
  className,
  container,
  renderToast,
  ...props
}: Omit<ToastPrimitive.Viewport.Props, 'children'> & {
  container?: ToastPrimitive.Portal.Props['container'];
  renderToast?: (toast: ToastItem, index: number) => ReactNode;
}) {
  const anchoredToast = useContext(AnchoredToastManagerContext);

  if (!anchoredToast) {
    throw new Error('ToastAnchoredRegion must be used within ToastProvider.');
  }

  return (
    <ToastPrimitive.Provider toastManager={anchoredToast.manager}>
      <ToastAnchoredRegionContent
        className={className}
        container={container}
        renderToast={renderToast}
        {...props}
      />
    </ToastPrimitive.Provider>
  );
}

function ToastAnchoredRegionContent({
  className,
  container,
  renderToast,
  ...props
}: Omit<ToastPrimitive.Viewport.Props, 'children'> & {
  container?: ToastPrimitive.Portal.Props['container'];
  renderToast?: (toast: ToastItem, index: number) => ReactNode;
}) {
  const { toasts } = useToastManager();

  return (
    <ToastPortal container={container}>
      <ToastPrimitive.Viewport
        data-slot="toast-anchored-viewport"
        className={mergeClassName(className, styles.anchoredViewport)}
        {...props}
      >
        {toasts.map((toast, index) => (
          <ToastPositioner key={toast.id} toast={toast} className={styles.anchoredPositioner}>
            {renderToast ? renderToast(toast, index) : <DefaultAnchoredToast toast={toast} />}
          </ToastPositioner>
        ))}
      </ToastPrimitive.Viewport>
    </ToastPortal>
  );
}

function DefaultToast({ toast }: { toast: ToastItem }) {
  return (
    <ToastRoot toast={toast}>
      <ToastContent>
        <ToastTitle />
        <ToastDescription />
        {toast.actionProps ? <ToastAction /> : null}
        <ToastClose aria-label="Close toast" />
      </ToastContent>
    </ToastRoot>
  );
}

function DefaultAnchoredToast({ toast }: { toast: ToastItem }) {
  return (
    <ToastRoot toast={toast}>
      <ToastArrow />
      <ToastContent>
        <ToastDescription />
      </ToastContent>
    </ToastRoot>
  );
}

function AnchoredArrowSvg(props: ComponentProps<'svg'>) {
  return (
    <PopupArrowIcon
      fillClassName={styles.anchoredArrowFill}
      outerStrokeClassName={styles.anchoredArrowOuterStroke}
      innerStrokeClassName={styles.anchoredArrowInnerStroke}
      {...props}
    />
  );
}

function createAnchoredToastManager(manager: BaseToastManager = createToastManager()) {
  const anchorIds = new WeakMap<Element, string>();
  let idCounter = 0;

  const show = ({ anchor, id, positionerProps, onRemove, ...options }: AnchoredToastOptions) => {
    const existingId = anchorIds.get(anchor);
    const resolvedId = existingId ?? id ?? `anchored-${Date.now()}-${++idCounter}`;

    manager.add({
      ...options,
      id: resolvedId,
      positionerProps: {
        sideOffset: DEFAULT_ANCHORED_SIDE_OFFSET,
        ...positionerProps,
        anchor,
      },
      onRemove: () => {
        if (anchorIds.get(anchor) === resolvedId) {
          anchorIds.delete(anchor);
        }

        onRemove?.();
      },
    });

    anchorIds.set(anchor, resolvedId);

    return resolvedId;
  };

  const closeByAnchor = (anchor: Element | null) => {
    if (!anchor) {
      return;
    }

    const toastId = anchorIds.get(anchor);

    if (!toastId) {
      return;
    }

    manager.close(toastId);
    anchorIds.delete(anchor);
  };

  const closeAll = () => {
    manager.close();
  };

  return { manager, show, closeByAnchor, closeAll };
}

function useAnchoredToastManager() {
  const anchoredToast = useContext(AnchoredToastManagerContext);

  if (!anchoredToast) {
    throw new Error('useAnchoredToastManager must be used within ToastProvider.');
  }

  return anchoredToast;
}

export {
  ToastProvider,
  ToastPortal,
  ToastViewport,
  ToastRoot,
  ToastContent,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  ToastPositioner,
  ToastArrow,
  ToastRegion,
  ToastAnchoredRegion,
  createToastManager,
  useToastManager,
  useAnchoredToastManager,
};