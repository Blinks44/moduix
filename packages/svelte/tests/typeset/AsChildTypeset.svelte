<script lang="ts">
  import { Typeset, TypesetScroll } from '@/components/typeset';

  let rootRef: Element | null = $state(null);
  let scrollRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, scrollRef });
</script>

<Typeset bind:ref={rootRef}>
  {#snippet asChild(props)}
    <article {...props()}>
      <TypesetScroll bind:ref={scrollRef} aria-label="Wide comparison table">
        {#snippet asChild(scrollProps)}
          <section {...scrollProps()}>Scrollable content</section>
        {/snippet}
      </TypesetScroll>
    </article>
  {/snippet}
</Typeset>