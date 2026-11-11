<script lang="ts">
  import { Toc, TocNav, TocTitle } from '@/components/toc';

  const items = [
    { value: 'introduction', depth: 2 },
    { value: 'configuration', depth: 3 },
  ];
</script>

<Toc class="w-auto" {items}>
  <TocNav class="p-0"><TocTitle>On this page</TocTitle></TocNav>
</Toc>