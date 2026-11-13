import type { JSX } from 'solid-js';
import { children, createContext, Show, splitProps, useContext } from 'solid-js';
import { Portal } from 'solid-js/web';

type PortalRef = HTMLElement | (() => HTMLElement | null | undefined);

export type OverlayPortalProps = {
  portalled?: boolean;
  portalRef?: PortalRef;
};

const OverlayPortalContext = createContext<OverlayPortalProps>({});

export function OverlayPortalProvider(props: OverlayPortalProps & { children: JSX.Element }) {
  const [local, value] = splitProps(props, ['children']);

  return (
    <OverlayPortalContext.Provider value={value}>{local.children}</OverlayPortalContext.Provider>
  );
}

function resolvePortalMount(portalRef: PortalRef | undefined): HTMLElement | undefined {
  return typeof portalRef === 'function' ? (portalRef() ?? undefined) : portalRef;
}

export function OverlayPortal(props: { children: JSX.Element }) {
  const context = useContext(OverlayPortalContext);
  const content = children(() => props.children);

  // Solid's Portal mounts a wrapper element. Create it only with content: a modal dialog hides the
  // wrappers that exist when it opens, and a lazily mounted overlay would then render inside one.
  return (
    <Show when={context.portalled !== false} fallback={content()}>
      <Show when={content.toArray().length > 0}>
        <Portal mount={resolvePortalMount(context.portalRef)}>{content()}</Portal>
      </Show>
    </Show>
  );
}