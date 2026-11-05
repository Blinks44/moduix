<script lang="ts">
  import { Textarea } from '@/components/textarea';

  let { defaultValue }: { defaultValue?: string } = $props();
</script>

<form aria-label="Project form" id="project-form"></form>
<Textarea aria-label="Summary" {defaultValue} form="project-form" name="summary" />