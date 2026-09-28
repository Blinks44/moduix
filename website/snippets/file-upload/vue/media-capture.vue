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
import styles from '@/components/examples/file-upload/file-upload-media-capture.module.css';
const capture = 'environment';
const accept = 'image/*';
const maxFiles = 1;
</script>
<template>
  <FileUpload :class="styles.root" :accept="accept" :capture="capture" :max-files="maxFiles"
    ><FileUploadLabel>Photo</FileUploadLabel
    ><FileUploadDropzone disable-click
      ><FileUploadDropzoneIcon />
      <div :class="styles.dropzoneContent">
        <span :class="styles.dropzoneTitle">Drop an image or open the camera</span
        ><span :class="styles.dropzoneDescription">One image from the environment camera</span
        ><FileUploadTrigger>Open camera</FileUploadTrigger>
      </div></FileUploadDropzone
    ><FileUploadItemGroup
      ><FileUploadContext v-slot="{ acceptedFiles }"
        ><FileUploadItem v-for="file in acceptedFiles" :key="file.name + file.size" :file="file"
          ><FileUploadItemName /><FileUploadItemSizeText /><FileUploadItemDeleteTrigger
            :aria-label="
              'Remove ' + file.name
            " /></FileUploadItem></FileUploadContext></FileUploadItemGroup
    ><FileUploadHiddenInput
  /></FileUpload>
</template>