<script lang="ts">
  import { Format } from '@ark-ui/svelte/format';

  const storageSize = 1_024_000;
</script>

<dl>
  <div>
    <dt>Decimal (1000)</dt>
    <dd>
      <Format.Byte unitSystem="decimal" value={storageSize} />
    </dd>
  </div>
  <div>
    <dt>Binary (1024)</dt>
    <dd>
      <Format.Byte unitSystem="binary" value={storageSize} />
    </dd>
  </div>
</dl>