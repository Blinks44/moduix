<script lang="ts">
  import { Format } from '@ark-ui/svelte/format';
  import { LocaleProvider } from '@ark-ui/svelte/locale';
</script>

<LocaleProvider locale="de-DE">
  <p>Price: <Format.Number currency="EUR" style="currency" value={1234.5} /></p>
</LocaleProvider>