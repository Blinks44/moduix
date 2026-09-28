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
import styles from '@/components/examples/file-upload/file-upload-error-handling.module.css';
const accept = 'image/*';
const maxFiles = 2;
const maxFileSize = 120_000;
const message = ref('');
</script>
<template>
  <FileUpload
    :class="styles.root"
    :accept="accept"
    :max-files="maxFiles"
    :max-file-size="maxFileSize"
    @file-reject="message = $event.files.length + ' file(s) rejected'"
    @file-accept="message = 'Files accepted'"
    ><FileUploadLabel>Images</FileUploadLabel><FileUploadTrigger>Select images</FileUploadTrigger
    ><FileUploadItemGroup
      ><FileUploadContext v-slot="{ acceptedFiles }"
        ><FileUploadItem v-for="file in acceptedFiles" :key="file.name + file.size" :file="file"
          ><FileUploadItemName /><FileUploadItemDeleteTrigger
            :aria-label="
              'Remove ' + file.name
            " /></FileUploadItem></FileUploadContext></FileUploadItemGroup
    ><FileUploadItemGroup type="rejected"
      ><FileUploadContext v-slot="{ rejectedFiles }"
        ><FileUploadItem
          v-for="{ file, errors } in rejectedFiles"
          :key="file.name + file.size"
          :file="file"
          ><FileUploadItemName />
          <p :class="styles.error">{{ errors.join(', ') }}</p>
          <FileUploadItemDeleteTrigger
            :aria-label="
              'Remove ' + file.name
            " /></FileUploadItem></FileUploadContext></FileUploadItemGroup
    ><FileUploadHiddenInput /></FileUpload
  ><output>Status: {{ message || 'No files selected' }}</output>
</template>