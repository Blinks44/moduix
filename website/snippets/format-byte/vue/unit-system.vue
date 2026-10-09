<script setup lang="ts">
import { Format } from '@ark-ui/vue';

const storageSize = 1_024_000;
</script>

<template>
  <dl>
    <div>
      <dt>Decimal (1000)</dt>
      <dd>
        <Format.Byte unit-system="decimal" :value="storageSize" />
      </dd>
    </div>
    <div>
      <dt>Binary (1024)</dt>
      <dd>
        <Format.Byte unit-system="binary" :value="storageSize" />
      </dd>
    </div>
  </dl>
</template>