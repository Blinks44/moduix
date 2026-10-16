<script setup lang="ts">
import { Button } from '@moduix/vue/button';
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
        ><FileUploadTrigger as-child><Button>Browse files</Button></FileUploadTrigger>
      </div></FileUploadDropzone
    ><FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup><FileUploadHiddenInput
  /></FileUpload>
</template>