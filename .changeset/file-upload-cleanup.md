---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

FileUpload: `FileUploadTrigger` and `FileUploadClearTrigger` are unstyled, like the Dialog and Drawer triggers, so compose them with `asChild` and a `Button`. The clear trigger no longer renders a `CloseButton` or a default `Clear files` label. `FileUploadItems` no longer passes a hard-coded `Remove <name>` label to the delete button, so Ark `translations.deleteFile` names it (`delete file <name>` by default). The root fills its container instead of stopping at 28rem; set `max-width` with a class to limit it. A disabled upload dims the label, dropzone, and items once: the delete button inside an item no longer dims again, and nothing dims again inside a disabled `Field` or `Fieldset`. Items lay out through the named grid areas `preview`, `name`, `meta`, and `delete`, and delete buttons use the foundation focus ring.
CSS Modules drop all 82 `--moduix-file-upload-*` variables; styles come from foundation tokens, so override them with a plain class on the part. React and Solid now re-export the Ark FileUpload part props, callback details, and hook types.