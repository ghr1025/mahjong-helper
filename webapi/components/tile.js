import { getMahjongImgUrl, getRiskColor } from './util.js'

export default {
    props: ['tile', 'dora', 'risk'],
    methods: {
        getImgUrl(tile) {
            return getMahjongImgUrl(tile)
        },
        getRiskClass() {
            if (!this.risk || this.risk <= 0) {
                return ''
            }
            return `tile-risk-${getRiskColor(this.risk)}`
        }
    },
    template: `<img class="tile" :class="getRiskClass()" :src="getImgUrl(tile)"/>`
}