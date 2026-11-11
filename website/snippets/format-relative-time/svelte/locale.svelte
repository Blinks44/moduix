<script lang="ts">
  import { Format } from '@ark-ui/svelte/format';
  import { LocaleProvider } from '@ark-ui/svelte/locale';

  const lastUpdatedAt = new Date(Date.now() - 24 * 60 * 60 * 1000);
</script>

<LocaleProvider locale="fr-FR">
  <p>
    Last updated:
    <time datetime={lastUpdatedAt.toISOString()}>
      <Format.RelativeTime numeric="auto" value={lastUpdatedAt} />
    </time>
  </p>
</LocaleProvider>