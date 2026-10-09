<script setup lang="ts">
import { Typeset } from '@moduix/vue/typeset';
import styles from '@/components/examples/typeset/typeset-streaming-content.module.css';
</script>

<template>
  <Typeset :class="styles.root">
    <p>The first rendered block keeps its spacing as content arrives.</p>
    <p>Each new block contributes only its own margin, so the message does not jump.</p>
    <pre><code>const answer = await streamText(prompt);</code></pre>
  </Typeset>
</template>