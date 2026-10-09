import type { InjectionKey } from 'vue';

export type PortalRef = HTMLElement | (() => HTMLElement | null | undefined);

export type OverlayPortalProps = {
  portalled?: boolean;
  portalRef?: PortalRef;
};

export type OverlayPortalContext = {
  portalled: () => boolean | undefined;
  portalRef: () => PortalRef | undefined;
};

export const OverlayPortalContextKey: InjectionKey<OverlayPortalContext> =
  Symbol('OverlayPortalContext');

export const defaultOverlayPortalContext: OverlayPortalContext = {
  portalled: () => undefined,
  portalRef: () => undefined,
};