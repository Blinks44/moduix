<script lang="ts">
  import { useComboboxItemContext } from '@/components/combobox';

  const item = useComboboxItemContext();
</script>

<span>{item().highlighted ? 'Highlighted' : 'Not highlighted'}</span>