<script lang="ts">
  import {
    EditableArea,
    EditableControls,
    EditableInput,
    EditableLabel,
    EditablePreview,
    EditableRootProvider,
    useEditable,
  } from '@/components/editable';

  let controlsRef: Element | null = $state(null);
  const editable = useEditable({ defaultValue: 'Provider value' });

  export const getControlsRef = () => controlsRef;
</script>

<div>
  <button type="button" onclick={() => editable().edit()}>Edit externally</button>
  <EditableRootProvider value={editable}>
    <EditableLabel>Provider name</EditableLabel>
    <EditableArea><EditableInput /><EditablePreview /></EditableArea>
    <EditableControls bind:ref={controlsRef} />
  </EditableRootProvider>
</div>