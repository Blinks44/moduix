<script lang="ts">
  import { useMenuContext } from '@/components/menu';

  const menu = useMenuContext();
</script>

<output>{menu().open ? 'Open' : 'Closed'}</output>