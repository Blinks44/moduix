<script setup lang="ts">
import {
  FileUpload,
  FileUploadContext,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/vue/file-upload';
import { ref } from 'vue';
import styles from '@/components/examples/file-upload/file-upload-controlled.module.css';
const files = ref([new File(['Welcome to moduix'], 'README.md', { type: 'text/plain' })]);
</script>
<template>
  <FileUpload
    :class="styles.root"
    :accepted-files="files"
    @file-change="files = $event.acceptedFiles"
    ><FileUploadLabel>Attachments</FileUploadLabel
    ><FileUploadTrigger>Choose files</FileUploadTrigger
    ><FileUploadItemGroup
      ><FileUploadContext v-slot="{ acceptedFiles }"
        ><FileUploadItem v-for="file in acceptedFiles" :key="file.name + file.size" :file="file"
          ><FileUploadItemName /><FileUploadItemDeleteTrigger
            :aria-label="
              'Remove ' + file.name
            " /></FileUploadItem></FileUploadContext></FileUploadItemGroup
    ><FileUploadHiddenInput /></FileUpload
  ><output>Selected: {{ files.length }}</output>
</template>