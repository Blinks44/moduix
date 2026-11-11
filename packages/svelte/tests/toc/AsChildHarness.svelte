<script lang="ts">
  import { Toc, TocContent } from '@/components/toc';
  import { items } from './items';

  let rootRef: Element | null = $state(null);
  let contentRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, contentRef });
</script>

<Toc bind:ref={rootRef} {items} aria-label="Table of contents">
  {#snippet asChild(props)}
    <section {...props()}>
      <TocContent bind:ref={contentRef}><h2 id="introduction">Introduction</h2></TocContent>
    </section>
  {/snippet}
</Toc>