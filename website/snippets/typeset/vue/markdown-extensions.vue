<script setup lang="ts">
import { Typeset } from '@moduix/vue/typeset';
</script>

<template>
  <Typeset as-child>
    <article>
      <h2 id="markdown-extensions">Markdown extensions</h2>
      <ul class="contains-task-list">
        <li class="task-list-item">
          <input type="checkbox" checked readonly /> Keep rendered task lists readable.
        </li>
      </ul>
      <details>
        <summary>Show implementation note</summary>
        <p>Disclosures, definition lists, and GFM footnotes receive the same reading rhythm.</p>
      </details>
      <dl>
        <dt>Flow</dt>
        <dd>Space before a rendered block.</dd>
      </dl>
      <section class="footnotes">
        <p>1. Footnotes use a compact, separated treatment.</p>
      </section>
    </article>
  </Typeset>
</template>