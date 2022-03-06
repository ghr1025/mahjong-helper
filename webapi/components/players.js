import tiles from "./tiles.js";

export default {
    props: ['players'],
    methods: {},
    components: {
        tiles,
    },
    template: `<div class="players-container">
  <div class="player-panel" v-for="(player, i) in players" v-bind:key="'player-panel' + i">
    <span class="player-name">{{ player.name }}</span>
    <div class="player-discards">
        <tiles :tiles="player.discard_tiles" tsumogiri="true" />
    </div>
  </div>
</div>`
}