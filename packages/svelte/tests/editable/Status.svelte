<script lang="ts">
  import { useEditableContext } from '@/components/editable';

  const editable = useEditableContext();
</script>

<output>{editable().value}:{String(editable().editing)}</output>