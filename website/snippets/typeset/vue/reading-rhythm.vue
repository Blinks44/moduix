<script setup lang="ts">
import { Typeset } from '@moduix/vue/typeset';
import styles from '@/components/examples/typeset/typeset-reading-rhythm.module.css';
</script>

<template>
  <Typeset :class="styles.root" as-child>
    <article>
      <h2>Reading mode</h2>
      <p>A roomier preset can make long-form content more comfortable without adding props.</p>
      <p>Use a class to keep the page and its layout in control of the rhythm.</p>
    </article>
  </Typeset>
</template>