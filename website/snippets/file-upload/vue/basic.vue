<script setup lang="ts">
import {
  FileUpload,
  FileUploadHiddenInput,
  FileUploadItemGroup,
  FileUploadItems,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/vue/file-upload';
import styles from '@/components/examples/file-upload/file-upload-basic.module.css';
const maxFiles = 3;
</script>
<template>
  <FileUpload :class="styles.root" :max-files="maxFiles"
    ><FileUploadLabel>Attachments</FileUploadLabel><FileUploadHiddenInput /><FileUploadTrigger
      >Choose files</FileUploadTrigger
    ><FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup
  ></FileUpload>
</template>