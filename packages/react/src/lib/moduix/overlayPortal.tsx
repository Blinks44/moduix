import type { ReactNode, RefObject } from 'react';
import { Portal } from '@ark-ui/react/portal';
import { createContext, useContext } from 'react';

type OverlayPortalProps = {
  portalled?: boolean;
  portalRef?: RefObject<HTMLElement | null>;
};

const OverlayPortalContext = createContext<OverlayPortalProps>({});

function OverlayPortalProvider({
  children,
  ...value
}: OverlayPortalProps & { children: ReactNode }) {
  return <OverlayPortalContext.Provider value={value}>{children}</OverlayPortalContext.Provider>;
}

function OverlayPortal({ children }: { children: ReactNode }) {
  const { portalled = true, portalRef } = useContext(OverlayPortalContext);

  return (
    <Portal disabled={!portalled} container={portalRef}>
      {children}
    </Portal>
  );
}

export { OverlayPortal, OverlayPortalProvider };
export type { OverlayPortalProps };