<script lang="ts">
  import { useStepsContext } from '@/components/steps';

  const steps = useStepsContext();
</script>

<output>Root step: {steps().value + 1}</output>