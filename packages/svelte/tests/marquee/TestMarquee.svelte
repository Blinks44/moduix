<script lang="ts">
  import {
    Marquee,
    MarqueeContent,
    MarqueeEdge,
    MarqueeItem,
    MarqueeViewport,
  } from '@/components/marquee';
  import { LocaleProvider } from '@/locale';

  let {
    defaultPaused,
    locale,
    paused,
  }: { defaultPaused?: boolean; locale?: string; paused?: boolean } = $props();
</script>

{#snippet marquee()}
  <Marquee aria-label="Partner logos" {defaultPaused} {paused}>
    <MarqueeEdge side="start" />
    <MarqueeViewport>
      <MarqueeContent>
        <MarqueeItem>Atlas</MarqueeItem>
        <MarqueeItem>Beacon</MarqueeItem>
      </MarqueeContent>
    </MarqueeViewport>
    <MarqueeEdge side="end" />
  </Marquee>
{/snippet}

{#if locale}
  <LocaleProvider {locale}>{@render marquee()}</LocaleProvider>
{:else}
  {@render marquee()}
{/if}