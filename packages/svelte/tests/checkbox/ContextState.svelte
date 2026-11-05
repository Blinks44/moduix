<script lang="ts">
  import { useCheckboxContext } from '@/components/checkbox';

  const checkbox = useCheckboxContext();
</script>

<output>State: {checkbox().checked ? 'checked' : 'unchecked'}</output>