<script lang="ts">
  import { Format } from '@ark-ui/svelte/format';
  import { LocaleProvider } from '@ark-ui/svelte/locale';
</script>

<LocaleProvider locale="fr-FR">
  <Format.Byte value={1_450.45} />
</LocaleProvider>