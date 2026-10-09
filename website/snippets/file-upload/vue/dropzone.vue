<script setup lang="ts">
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadDropzoneIcon,
  FileUploadHiddenInput,
  FileUploadItemGroup,
  FileUploadItems,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/vue/file-upload';
import styles from '@/components/examples/file-upload/file-upload-dropzone.module.css';
const maxFiles = 5;
</script>
<template>
  <FileUpload :class="styles.root" :max-files="maxFiles"
    ><FileUploadLabel>Project files</FileUploadLabel
    ><FileUploadDropzone disable-click
      ><FileUploadDropzoneIcon />
      <div :class="styles.dropzoneContent">
        <span :class="styles.dropzoneTitle">Drag and drop files here</span
        ><span :class="styles.dropzoneDescription">or browse from your device</span
        ><FileUploadTrigger>Browse files</FileUploadTrigger>
      </div></FileUploadDropzone
    ><FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup><FileUploadHiddenInput
  /></FileUpload>
</template>