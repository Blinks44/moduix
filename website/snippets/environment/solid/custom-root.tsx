import { EnvironmentProvider } from '@ark-ui/solid/environment';
import { Button } from '@moduix/solid/button';
import { Show, createSignal, onMount } from 'solid-js';
import { Portal } from 'solid-js/web';

export default function ShadowDomSettings() {
  let host: HTMLDivElement | undefined;
  const [shadowRoot, setShadowRoot] = createSignal<ShadowRoot>();

  onMount(() => {
    if (!host) return;
    setShadowRoot(host.shadowRoot ?? host.attachShadow({ mode: 'open' }));
  });

  return (
    <>
      <div ref={(element) => (host = element)} />
      <Show when={shadowRoot()}>
        {(root) => (
          <Portal mount={root()}>
            <EnvironmentProvider value={root()}>
              <Button type="button">Save settings</Button>
            </EnvironmentProvider>
          </Portal>
        )}
      </Show>
    </>
  );
}