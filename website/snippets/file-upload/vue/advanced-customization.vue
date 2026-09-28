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
  FileUploadItemMetadata,
  FileUploadItemName,
  FileUploadItemPreview,
  FileUploadItemPreviewIcon,
  FileUploadItemPreviewImage,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/vue/file-upload';
import styles from '@/components/examples/file-upload/file-upload-advanced-customization.module.css';
const maxFiles = 5;
const isImageFile = (file: File) => file.type.startsWith('image/');
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
    ><FileUploadItemGroup
      ><FileUploadContext v-slot="{ acceptedFiles }"
        ><FileUploadItem v-for="file in acceptedFiles" :key="file.name + file.size" :file="file"
          ><FileUploadItemPreview
            ><FileUploadItemPreviewImage v-if="isImageFile(file)" /><FileUploadItemPreviewIcon
              v-else /></FileUploadItemPreview
          ><FileUploadItemName /><FileUploadItemMetadata :file="file" /><FileUploadItemDeleteTrigger
            :aria-label="
              'Remove ' + file.name
            " /></FileUploadItem></FileUploadContext></FileUploadItemGroup
    ><FileUploadHiddenInput
  /></FileUpload>
</template>