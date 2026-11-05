<script lang="ts">
  import { useSwitchContext } from '@/components/switch';

  const switchApi = useSwitchContext();
</script>

<output>State: {switchApi().checked ? 'checked' : 'unchecked'}</output>