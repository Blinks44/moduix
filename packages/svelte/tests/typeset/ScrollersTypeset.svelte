<script lang="ts">
  import { TypesetScroll } from '@/components/typeset';
</script>

<TypesetScroll data-testid="unnamed-scroll">Wide content</TypesetScroll>
<TypesetScroll aria-label="Custom scroller" data-testid="custom-scroll" role="group" tabindex={-1}>
  Wide content
</TypesetScroll>