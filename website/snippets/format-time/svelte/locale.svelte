<script lang="ts">
  import { Format } from '@ark-ui/svelte/format';
  import { LocaleProvider } from '@ark-ui/svelte/locale';

  const updatedAt = new Date('2026-01-15T17:15:00Z');
</script>

<LocaleProvider locale="fr-FR">
  <dl>
    <div>
      <dt>Schedule</dt>
      <dd>
        <Format.Time value="17:15" />
      </dd>
    </div>
    <div>
      <dt>Updated</dt>
      <dd>
        <Format.Time value={updatedAt} />
      </dd>
    </div>
  </dl>
</LocaleProvider>