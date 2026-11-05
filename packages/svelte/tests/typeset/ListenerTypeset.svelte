<script lang="ts">
  import { Typeset, TypesetScroll } from '@/components/typeset';

  let clicks = $state(0);
  let rootRef: Element | null = $state(null);
  let scrollRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, scrollRef });
</script>

<Typeset
  bind:ref={rootRef}
  class="consumer-root"
  data-testid="root"
  style="color: red; --moduix-typeset-flow: 2em"
  onclick={() => (clicks += 1)}
>
  Readable content
</Typeset>
<TypesetScroll
  bind:ref={scrollRef}
  class="consumer-scroll"
  data-testid="scroll"
  onclick={() => (clicks += 1)}
>
  Wide content
</TypesetScroll>
<output>{clicks}</output>