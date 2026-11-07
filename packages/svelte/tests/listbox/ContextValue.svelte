<script lang="ts">
  import { useListboxContext } from '@/components/listbox';

  const listbox = useListboxContext();
</script>

<output>{listbox().value.join(',')}</output>