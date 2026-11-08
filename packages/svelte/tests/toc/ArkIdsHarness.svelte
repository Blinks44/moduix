<script lang="ts">
  import { TocNav, TocRoot } from '@ark-ui/svelte/toc';
  import { items } from './items';
</script>

<TocRoot {items}>
  <TocNav />
</TocRoot>