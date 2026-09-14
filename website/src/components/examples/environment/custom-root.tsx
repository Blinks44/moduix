import { EnvironmentProvider } from '@ark-ui/react/environment';
import { Button } from '@moduix/react/button';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ShadowDomSettings() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    setShadowRoot(host.shadowRoot ?? host.attachShadow({ mode: 'open' }));
  }, []);

  return (
    <>
      <div ref={hostRef} />
      {shadowRoot
        ? createPortal(
            <EnvironmentProvider value={shadowRoot}>
              <Button type="button">Save settings</Button>
            </EnvironmentProvider>,
            shadowRoot,
          )
        : null}
    </>
  );
}