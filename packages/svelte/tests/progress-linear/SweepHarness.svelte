<script lang="ts">
  import { LocaleProvider } from '@ark-ui/svelte/locale';
  import {
    ProgressLinear,
    ProgressLinearRange,
    ProgressLinearTrack,
  } from '@/components/progress-linear';
</script>

<ProgressLinear value={null}>
  <ProgressLinearTrack aria-label="Sweep horizontal"><ProgressLinearRange /></ProgressLinearTrack>
</ProgressLinear>
<ProgressLinear value={null} orientation="vertical">
  <ProgressLinearTrack aria-label="Sweep vertical"><ProgressLinearRange /></ProgressLinearTrack>
</ProgressLinear>
<LocaleProvider locale="ar">
  <div lang="ar" dir="rtl">
    <ProgressLinear value={null}>
      <ProgressLinearTrack aria-label="Sweep rtl"><ProgressLinearRange /></ProgressLinearTrack>
    </ProgressLinear>
  </div>
</LocaleProvider>