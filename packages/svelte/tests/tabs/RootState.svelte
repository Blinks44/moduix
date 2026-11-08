<script lang="ts">
  import { useTabsContext } from '@/components/tabs';

  const tabs = useTabsContext();
</script>

<button type="button" onclick={() => tabs().setValue('projects')}>Select projects</button>