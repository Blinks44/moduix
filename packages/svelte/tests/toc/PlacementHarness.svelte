<script lang="ts">
  import { Toc, TocNav, TocTitle } from '@/components/toc';
  import { items } from './items';
</script>

<Toc {items}>
  <TocNav placement="left"><TocTitle>Left navigation</TocTitle></TocNav>
</Toc>