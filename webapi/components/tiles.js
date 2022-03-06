import { getMahjongImgUrl } from './util.js'

export default {
    props: ['tiles', 'tsumogiri', 'size'],
    methods: {
        getImgUrl(tile) {
            if (tile < 0) {
                tile = Math.abs(tile) - 1
            }
            return getMahjongImgUrl(tile)
        },
        isTsumogiri(tile) {
            if (!this.tsumogiri) {
                return false
            }
            return tile < 0
        }
    },
    template: `<div class="tiles">
    <img class="tile" v-for="(tile, idx) in tiles" :src="getImgUrl(tile)" v-bind:alt="idx" :class="{ tsumogiri: isTsumogiri(tile) }"/>
</div>`
}