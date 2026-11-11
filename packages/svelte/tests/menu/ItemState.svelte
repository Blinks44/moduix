<script lang="ts">
  import { useMenuItemContext } from '@/components/menu';

  const item = useMenuItemContext();
</script>

<span>{item().checked ? 'Checked' : 'Unchecked'}</span>