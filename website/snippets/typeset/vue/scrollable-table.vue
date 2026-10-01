<script setup lang="ts">
import { Typeset, TypesetScroll } from '@moduix/vue/typeset';
import styles from '@/components/examples/typeset/typeset-scrollable-table.module.css';
</script>

<template>
  <Typeset>
    <TypesetScroll aria-label="Typeset settings comparison">
      <table :class="styles.table">
        <thead>
          <tr>
            <th>Context</th>
            <th>Size</th>
            <th>Leading</th>
            <th>Flow</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Documentation</td>
            <td>1.125rem</td>
            <td>1.9</td>
            <td>1.75em</td>
          </tr>
        </tbody>
      </table>
    </TypesetScroll>
  </Typeset>
</template>