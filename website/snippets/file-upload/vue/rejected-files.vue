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
import styles from '@/components/examples/file-upload/file-upload-rejected-files.module.css';
const accept = 'image/*';
const maxFiles = 2;
const maxFileSize = 120_000;
</script>
<template>
  <FileUpload
    :class="styles.root"
    :accept="accept"
    :max-files="maxFiles"
    :max-file-size="maxFileSize"
    ><FileUploadLabel>Images</FileUploadLabel
    ><FileUploadDropzone disable-click
      ><FileUploadDropzoneIcon />
      <div :class="styles.dropzoneContent">
        <span :class="styles.dropzoneTitle">Drop image files here</span
        ><span :class="styles.dropzoneDescription">PNG or JPEG, up to 120 KB</span
        ><FileUploadTrigger>Select images</FileUploadTrigger>
      </div></FileUploadDropzone
    ><FileUploadItemGroup
      ><FileUploadContext v-slot="{ acceptedFiles }"
        ><FileUploadItem v-for="file in acceptedFiles" :key="file.name + file.size" :file="file"
          ><FileUploadItemName /><FileUploadItemSizeText /><FileUploadItemDeleteTrigger
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
    ><FileUploadHiddenInput
  /></FileUpload>
</template>