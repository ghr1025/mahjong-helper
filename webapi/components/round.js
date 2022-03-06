import tile from "./tile.js";
import tiles from "./tiles.js";

export default {
    props: ['round'],
    methods: {},
    components: {
        tile,
        tiles,
    },
    template: `<div class="round-info-container" v-if="round">
  <div class="round-wind">
    <span class="round-wind-name">场风</span>
    <tile :tile="round.round_wind_tile" />
  </div>
  <div class="self-wind">
    <span class="round-wind-name">自风</span>
    <tile :tile="round.self_wind_tile" />
  </div>
  <div class="dora">
    <span>宝牌</span>
    <tiles :tiles="round.dora_indicators" />
  </div>
</div>`
}