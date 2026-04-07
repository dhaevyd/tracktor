<script lang="ts">
  import FeatureTabShell from '$appui/FeatureTabShell.svelte';
  import PollutionCertificateForm from './PollutionCertificateForm.svelte';
  import PollutionCertificateList from './PollutionCertificateList.svelte';
  import * as m from '$lib/paraglide/messages';
  import { configStore } from '$stores/config.svelte';
</script>

<FeatureTabShell
  title={configStore.configs.labelPollutionTab || m.pollution_tab_title()}
  listComponent={PollutionCertificateList}
  addSheetTitle={m.pollution_add_action()}
  addSheetComponent={PollutionCertificateForm}
/>
