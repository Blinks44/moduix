<script lang="ts">
  import { useQrCodeContext } from '@/components/qr-code';

  const qrCode = useQrCodeContext();
</script>

<output>Hook: {qrCode().value}</output>