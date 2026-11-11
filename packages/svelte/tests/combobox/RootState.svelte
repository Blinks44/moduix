<script lang="ts">
  import { useComboboxContext } from '@/components/combobox';

  const combobox = useComboboxContext();
</script>

<output>{combobox().open ? 'Open' : 'Closed'}</output>