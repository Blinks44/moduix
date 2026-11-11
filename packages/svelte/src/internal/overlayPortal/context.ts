import { getContext, setContext } from 'svelte';

export type PortalRef = HTMLElement | (() => HTMLElement | null | undefined);

export type OverlayPortalProps = {
  portalled?: boolean;
  portalRef?: PortalRef;
};

type OverlayPortalContext = {
  portalled: () => boolean | undefined;
  portalRef: () => PortalRef | undefined;
};

const key = Symbol('OverlayPortalContext');

const defaultContext: OverlayPortalContext = {
  portalled: () => undefined,
  portalRef: () => undefined,
};

export const setOverlayPortalContext = (context: OverlayPortalContext) => {
  setContext(key, context);
};

export const getOverlayPortalContext = () =>
  getContext<OverlayPortalContext | undefined>(key) ?? defaultContext;