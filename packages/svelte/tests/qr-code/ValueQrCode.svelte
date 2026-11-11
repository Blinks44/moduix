<script lang="ts">
  import { QrCode, QrCodeFrame, QrCodePattern } from '@/components/qr-code';

  let value = $state('https://ark-ui.com');
</script>

<QrCode bind:value>
  <QrCodeFrame><QrCodePattern /></QrCodeFrame>
</QrCode>
<button type="button" onclick={() => (value = 'https://moduix.dev')}>Update code</button>
<output>{value}</output>