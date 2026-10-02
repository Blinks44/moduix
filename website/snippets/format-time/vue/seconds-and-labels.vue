<script setup lang="ts">
import { Format } from '@ark-ui/vue';
</script>

<template>
  <dl>
    <div>
      <dt>Last sync</dt>
      <dd>
        <Format.Time value="09:08:12" with-seconds />
      </dd>
    </div>
    <div>
      <dt>Support window</dt>
      <dd>
        <Format.Time value="17:15" format="12h" am-label="morning" pm-label="evening" />
      </dd>
    </div>
  </dl>
</template>