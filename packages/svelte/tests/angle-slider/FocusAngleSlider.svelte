<script lang="ts">
  import { AngleSlider, AngleSliderDial } from '@/components/angle-slider';

  const states = ['default', 'prevented', 'disabled', 'read-only'];
</script>

{#each states as state (state)}
  <AngleSlider defaultValue={45} disabled={state === 'disabled'} readOnly={state === 'read-only'}>
    <AngleSliderDial onpointerdown={(event) => state === 'prevented' && event.preventDefault()} />
  </AngleSlider>
{/each}