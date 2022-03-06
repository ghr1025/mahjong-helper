import tile from "./tile.js";
import tiles from "./tiles.js";

export default {
    props: ['risk', 'name'],
    methods: {},
    components: {
        tile,
        tiles,
    },
    template: `<div class="risk-info" v-if="risk">
    <div class="risk-info-name">{{name}}</div>
    <div class="risk-info-tiles">
        <tile v-for="(tr, idx) in risk.tiles_risk" :tile="tr.tile" :risk="tr.risk" v-bind:key="'tr-'+idx" />
    </div>
    <div class="risk-info-text" v-if="risk.tenpai_rate > 0">
        {{ risk.tenpai_rate }}%听牌率
    </div>
    <div class="risk-info-text" v-if="risk.left_no_suji_tiles > 0">
        {{ risk.left_no_suji_tiles }}无筋
        <template v-if="risk.no_suji_info">: {{ risk.no_suji_info }}</template>
    </div>
</div>`
}