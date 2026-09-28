<script setup lang="ts">
import {
  FileUpload,
  FileUploadClearTrigger,
  FileUploadContext,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/vue/file-upload';
import styles from '@/components/examples/file-upload/file-upload-clear-trigger.module.css';
const maxFiles = 3;
</script>
<template>
  <FileUpload :class="styles.root" :max-files="maxFiles"
    ><FileUploadLabel>Attachments</FileUploadLabel>
    <div :class="styles.actions">
      <FileUploadTrigger>Choose files</FileUploadTrigger
      ><FileUploadClearTrigger>Clear files</FileUploadClearTrigger>
    </div>
    <FileUploadItemGroup
      ><FileUploadContext v-slot="{ acceptedFiles }"
        ><FileUploadItem v-for="file in acceptedFiles" :key="file.name + file.size" :file="file"
          ><FileUploadItemName /><FileUploadItemDeleteTrigger
            :aria-label="
              'Remove ' + file.name
            " /></FileUploadItem></FileUploadContext></FileUploadItemGroup
    ><FileUploadHiddenInput
  /></FileUpload>
</template>