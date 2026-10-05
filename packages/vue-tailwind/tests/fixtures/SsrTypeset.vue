<script setup lang="ts">
import { Typeset, TypesetScroll } from '../../src';
</script>

<template>
  <Typeset as-child>
    <article>
      <h1>Readable content</h1>
      <TypesetScroll aria-label="Wide comparison table">
        <table>
          <tbody>
            <tr>
              <td>Wide content</td>
            </tr>
          </tbody>
        </table>
      </TypesetScroll>
    </article>
  </Typeset>
</template>