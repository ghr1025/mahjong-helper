import Round from './components/round.js'
import Players from './components/players.js'
import Human from "./components/human.js";
import OptionGroup from "./components/option_group.js";

export default {
    data() {
        return {
            result: {},
        }
    },
    methods: {
        getAnalysisResult() {
            return fetch('/result')
                .then(response => response.json(), err => { console.error(err) })
                .then(data => {
                    this.result = data
                })
        },
        getAnalysisResultLoop() {
            setTimeout(() => {
                this.getAnalysisResult().then(() => { this.getAnalysisResultLoop() })
            }, 500);
        }
    },
    mounted() {
        this.getAnalysisResult()
        this.getAnalysisResultLoop()
    },
    template: `<div class="container">
<div class="header-info">
    <round :round="result.round_info" />
    <players :players="result.players" />
</div>
<Human :human="result.human" />
<span v-if="result.info">{{ result.info }}</span>
<div v-if="result && result.options_groups">
    <option-group v-for="og in result.options_groups" :og="og" />
</div>

</div>`,
    components: {
        Round,
        Players,
        Human,
        OptionGroup,
    }
}