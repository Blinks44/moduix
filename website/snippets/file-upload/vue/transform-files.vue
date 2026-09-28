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
import styles from '@/components/examples/file-upload/file-upload-transform-files.module.css';
const accept = 'image/*';
const transformFiles = async (files: File[]) =>
  files.map((file) => new File([file], file.name.toLowerCase(), { type: file.type }));
</script>
<template>
  <FileUpload :class="styles.root" :accept="accept" :transform-files="transformFiles"
    ><FileUploadLabel>Images</FileUploadLabel><FileUploadTrigger>Choose images</FileUploadTrigger
    ><FileUploadItemGroup
      ><FileUploadContext v-slot="{ acceptedFiles }"
        ><FileUploadItem v-for="file in acceptedFiles" :key="file.name + file.size" :file="file"
          ><FileUploadItemName /><FileUploadItemDeleteTrigger
            :aria-label="
              'Remove ' + file.name
            " /></FileUploadItem></FileUploadContext></FileUploadItemGroup
    ><FileUploadHiddenInput
  /></FileUpload>
</template>