import tile from "./tile.js";
import tiles from "./tiles.js";
import RiskInfo from "./risk_info.js";

export default {
    props: ['risksInfo', 'nc', 'oc'],
    methods: {},
    components: {
        tile,
        tiles,
        RiskInfo,
    },
    template: `<div class="risk-panel" v-if="risksInfo">
<risk-info v-if="risksInfo[3].tiles_risk" :risk="risksInfo[3]" name="上家" />
<risk-info v-if="risksInfo[2].tiles_risk" :risk="risksInfo[2]" name="对家" />
<risk-info v-if="risksInfo[1].tiles_risk" :risk="risksInfo[1]" name="下家" />
<risk-info v-if="risksInfo[0].tiles_risk" :risk="risksInfo[0]" name="综合" />
<div class="risk-tiles" v-if="nc.length">
    <div>NC</div>
    <tiles :tiles="nc" />
</div>
<div class="risk-tiles" v-if="oc.length">
    <div>OC</div>
    <tiles :tiles="oc" />
</div>
</div>`
}