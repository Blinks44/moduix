<script setup lang="ts">
import { useLocaleContext } from '@ark-ui/vue/locale';
// Render this component inside <LocaleProvider locale="ar-EG">.
const locale = useLocaleContext();
</script>
<template>
  <section aria-labelledby="locale-heading" :dir="locale.dir" lang="ar">
    <h2 id="locale-heading">إعدادات الحساب</h2>
    <p>{{ locale.locale }} · {{ locale.dir }}</p>
    <p>تُستخدم اللغة والاتجاه نفسيهما في هذه المساحة.</p>
    <button type="button">حفظ التغييرات</button>
  </section>
</template>