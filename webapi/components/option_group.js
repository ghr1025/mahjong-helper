import { ShantenZH, getMahjongImgUrl } from './util.js'
import Opt from "./option.js";

export default {
    props: ['og'],
    data() {
        return {}
    },
    methods: {
        getImgUrl(tile) {
            return getMahjongImgUrl(tile)
        },
        shantenText() {
            return ShantenZH[this.og.shanten + 1]
        }
    },
    components: {
        Opt,
    },
    template: `<div class="options-group-panel" v-if="og">
    <h3 class="title">
        <template v-if="og.info">{{ og.info }}</template>
        {{ shantenText() }}
    </h3>
    <table class="options-group">
        <thead><tr>
            <th style="width: 10%">进张数</th>
            <th style="width: 10%">切牌</th>
            <th style="width: 15%">后续进张数加权均值</th>
            <th style="width: 10%">手牌速度</th>
            <th style="width: 10%">期望打点</th>
            <th style="width: 10%">役种</th>
            <th>进张牌</th>
        </tr></thead>
        <tbody>
            <opt v-for="option in og.options" :shanten="og.shanten" :option="option" />
        </tbody>
    </table>
</div>`
}