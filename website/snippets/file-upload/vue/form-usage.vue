<script setup lang="ts">
import { Button } from '@moduix/vue/button';
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
import styles from '@/components/examples/file-upload/file-upload-form-usage.module.css';
const name = 'project-assets';
const maxFiles = 3;
const submitted = ref('Nothing submitted');
const handleSubmit = (event: SubmitEvent) => {
  event.preventDefault();
  submitted.value = `${new FormData(event.currentTarget as HTMLFormElement).getAll(name).length} file(s) submitted`;
};
</script>
<template>
  <form :class="styles.stack" @submit="handleSubmit">
    <FileUpload :class="styles.root" :name="name" :max-files="maxFiles"
      ><FileUploadLabel>Project assets</FileUploadLabel><FileUploadHiddenInput /><FileUploadTrigger
        >Choose files</FileUploadTrigger
      ><FileUploadItemGroup
        ><FileUploadContext v-slot="{ acceptedFiles }"
          ><FileUploadItem v-for="file in acceptedFiles" :key="file.name + file.size" :file="file"
            ><FileUploadItemName /><FileUploadItemDeleteTrigger
              :aria-label="
                'Remove ' + file.name
              " /></FileUploadItem></FileUploadContext></FileUploadItemGroup
    ></FileUpload>
    <div>
      <output>Submitted: {{ submitted }}</output
      ><Button type="submit" size="sm">Submit</Button>
    </div>
  </form>
</template>