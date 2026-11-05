<script lang="ts">
  import { useFieldsetContext } from '@/components/fieldset';

  const fieldset = useFieldsetContext();
</script>

<output data-testid="hook-state">{String(fieldset().invalid)}</output>