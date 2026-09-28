<script setup lang="ts">
import {
  FileUpload,
  FileUploadContext,
  FileUploadDropzone,
  FileUploadDropzoneIcon,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadItemSizeText,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/vue/file-upload';
import styles from '@/components/examples/file-upload/file-upload-accepted-file-types.module.css';

const accept = 'image/png,image/jpeg';
const maxFiles = 4;
</script>
<template>
  <FileUpload :class="styles.root" :accept="accept" :max-files="maxFiles">
    <FileUploadLabel>Images</FileUploadLabel>
    <FileUploadDropzone disable-click>
      <FileUploadDropzoneIcon />
      <div :class="styles.dropzoneContent">
        <span :class="styles.dropzoneTitle">Drop PNG or JPEG files here</span
        ><span :class="styles.dropzoneDescription">Only PNG and JPEG files are accepted</span
        ><FileUploadTrigger>Select images</FileUploadTrigger>
      </div>
    </FileUploadDropzone>
    <FileUploadItemGroup>
      <FileUploadContext v-slot="{ acceptedFiles }">
        <FileUploadItem v-for="file in acceptedFiles" :key="file.name + file.size" :file="file"
          ><FileUploadItemName /><FileUploadItemSizeText /><FileUploadItemDeleteTrigger
            :aria-label="'Remove ' + file.name"
        /></FileUploadItem>
      </FileUploadContext>
    </FileUploadItemGroup>
    <FileUploadHiddenInput />
  </FileUpload>
</template>