import type { JSX } from 'solid-js';
import { createContext, Show, splitProps, useContext } from 'solid-js';
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

  return (
    <Show when={context.portalled !== false} fallback={props.children}>
      <Portal mount={resolvePortalMount(context.portalRef)}>{props.children}</Portal>
    </Show>
  );
}