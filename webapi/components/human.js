import tiles from "./tiles.js";
import RiskPanel from './risk_panel.js'

export default {
    props: ['human'],
    methods: {},
    components: {
        tiles,
        RiskPanel,
    },
    template: `<div class="human-container" v-if="human">
    <risk-panel :risksInfo="human.risks_info" :nc="human.nc_safe_tiles" :oc="human.oc_safe_tiles" />
    <div class="human-panel">
        <div class="human-hand-tiles">
            <tiles :tiles="human.hand_tiles" />
        </div>
        <!-- Melds -->
        <div class="human-melds">
            <div class="melds-panel" v-for="meld in human.melds">
                <tiles :tiles="meld" />
            </div>
        </div>
    </div>
</div>`
}