<script lang="ts">
  import { Format } from '@ark-ui/svelte/format';
  import { LocaleProvider } from '@ark-ui/svelte/locale';
</script>

<LocaleProvider locale="fr-FR">
  <section>
    <h2>Billing summary</h2>
    <p>Formatting follows one locale context.</p>
    <p>
      Plan price:
      <strong><Format.Number currency="EUR" style="currency" value={1234.5} /></strong>
    </p>
  </section>
</LocaleProvider>