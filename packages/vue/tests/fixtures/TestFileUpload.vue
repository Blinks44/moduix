<script setup lang="ts">
import {
  FileUpload,
  FileUploadClearTrigger,
  FileUploadDropzone,
  FileUploadDropzoneIcon,
  FileUploadHiddenInput,
  FileUploadItemGroup,
  FileUploadItems,
  FileUploadLabel,
} from '../../src';
const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });
</script>

<template>
  <FileUpload :default-accepted-files="[file]">
    <FileUploadLabel>Attachments</FileUploadLabel>
    <FileUploadDropzone><FileUploadDropzoneIcon /></FileUploadDropzone>
    <FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup>
    <FileUploadClearTrigger />
    <FileUploadHiddenInput />
  </FileUpload>
</template>