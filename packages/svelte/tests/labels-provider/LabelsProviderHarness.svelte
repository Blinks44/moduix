<script lang="ts">
  import { CloseButton, LabelsProvider, ModuixProvider, Spinner } from '@/index';
</script>

<LabelsProvider labels={{ close: 'Fermer', loading: 'Chargement' }}>
  <CloseButton data-testid="outer-close" />
  <Spinner data-testid="outer-spinner" />
  <LabelsProvider labels={{ close: 'Schliessen' }}>
    <CloseButton data-testid="inner-close" />
    <Spinner data-testid="inner-spinner" />
    <CloseButton data-testid="explicit-close" aria-label="Custom close" />
  </LabelsProvider>
</LabelsProvider>

<ModuixProvider locale="ar-SA" labels={{ close: 'إغلاق' }}>
  <CloseButton data-testid="rtl-close" />
</ModuixProvider>