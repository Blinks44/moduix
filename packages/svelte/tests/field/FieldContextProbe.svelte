<script lang="ts">
  import { useFieldContext } from '@/components/field';

  const field = useFieldContext();
</script>

<output>{field?.()?.required ? 'required' : 'optional'}</output>