import { getWaitsCountColor, getYakuText, ShantenZH } from './util.js'
import tile from "./tile.js";
import tiles from "./tiles.js";

export default {
    props: ['shanten', 'option'],
    data() {
        return {}
    },
    methods: {
        getWaitsCountClass(shanten, waitsCount) {
            return `waits-count-${getWaitsCountColor(shanten, waitsCount)}`
        },
        getYakuText(yaku) {
            return getYakuText(yaku)
        },
        getShantenText(shanten) {
            return ShantenZH[shanten]
        }
    },
    components: {
        tile,
        tiles,
    },
    template: `<tr class="option-row" v-if="option">
    <td>
        <span class="waits-count" :class="getWaitsCountClass(shanten, option.waits_count)">{{ option.waits_count }}</span> <!-- 进张数 -->
        <span class="improve-waits-count" :class="{ highlight :option.highlight_avg_improve_waits_count }" v-if="option.avg_improve_waits_count > 0">
            [{{ option.avg_improve_waits_count.toFixed(2) }}]
        </span> <!-- 改良进张均值 -->
    </td>
    <td>
        <div class="meld-panel" v-if="option.meld_type">
            <span class="option-meld">{{ option.meld_type }}</span>
            <tiles :tiles="option.open_tiles" />
        </div>
        <div class="discard-tile" class="option-discard">
            <tile :tile="option.discard_tile" :dora="option.is_discard_tile_dora" :risk="option.discard_risk" />
        </div>
    </td>
    <td>
        <div class="next-shanten-waits-count" v-if="option.shanten > 0">
            <span :class="getWaitsCountClass(shanten-1, option.avg_next_shanten_waits_count)">{{ option.avg_next_shanten_waits_count.toFixed(2) }}</span> <!-- 前进后的进张数均值 -->
            <span class="shanten-text">{{ getShantenText(shanten) + '数' }}</span>
        </div>
        <div class="shanten" v-if="option.shanten == 0">
            <span v-if="option.furiten_rate || option.is_part_wait">{{ option.avg_agari_rate.toFixed(2) + '% 参考和率' }}</span>
        </div>
    </td>
    <td>
        <div class="waits-score" v-if="option.mixed_waits_score > 0 && option.shanten >= 1 && option.shanten <= 2">
            <span :class="{ highlight: option.highlight_mixed_score }">{{ option.mixed_waits_score.toFixed(2) + '速度' }}</span>
        </div>
    </td>
    <td>
        <div class="round-point" v-if="option.mixed_round_point !== 0">
            <span>{{ '局收支 ' + option.mixed_round_point }}</span>
        </div>
        <div class="dama" v-if="option.dama_point > 0">
            <span>{{ option.ron_type + ' ' + option.dama_point }}</span>
        </div>
        <div class="riichi" v-if="option.riichi_point > 0">
            <span>{{ '立直 ' + option.riichi_point }}</span>
        </div>
    </td>
    <td>
        <div class="yaku-panel" v-if="option.yaku_types && option.yaku_types.length > 0">
            <span class="yaku-none" v-if="option.yaku_types[0] == -1">{{ getYakuText(-1) }}</span>
            <span class="yaku" v-else v-for="yaku in option.yaku_types">{{ getYakuText(yaku) }}</span>
            <span class="dora" v-if="option.dora_count > 0">{{ option.dora_count + '宝牌'}}</span>
            <span class="part-wait" v-if="option.is_part_wait">片听</span>
        </div>
        <div class="furiten-panel" v-if="option.furiten_rate > 0">
            <span class="furiten-maybe" v-if="option.furiten_rate < 1">可能振听</span>
            <span class="furiten" v-else>振听</span>
        </div>
    </td>
    <td>
        <div class="wait-tiles" v-if="option.wait_tiles && option.wait_tiles.length > 0">
            <tiles :tiles="option.wait_tiles" />
        </div>
    </td>
</tr>`
}