let Mahjong = [
    "1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m",
    "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p",
    "1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s",
    "1z", "2z", "3z", "4z", "5z", "6z", "7z",
]

let YakuMap = {
    '-1': '无役',

    // Special criteria
    0:  "立直", 1: "七对",

    // Yaku based on luck
    2: "自摸", 3: "w立",

    // Yaku based on sequences
    4: "平和", 5: "两杯口", 6: "一杯口", 7: "三色", 8: "一通", // 一气

    // Yaku based on triplets and/or quads
    9: "对对", 10: "三暗刻", 11: "三色同刻", 12: "三杠子",

    // Yaku based on terminal or honor tiles
    13: "断幺", 14: "役牌", 15: "混全", 16: "纯全", 17: "混老头", // 七对也算
    18: "小三元",

    // Yaku based on suits
    19: "混一色", 20: "清一色",

    // Yakuman
    21: "四暗刻", 22: "四暗刻单骑", 23: "大三元", 24: "小四喜", 25: "大四喜",
    26: "字一色", 27: "清老头", 28: "绿一色", 29: "九莲", 30: "纯正九莲", 31: "四杠子",
}

let ShantenZH = [
    "和了", "听牌", "一向听", "两向听", "三向听", "四向听", "五向听", "六向听", "七向听", "八向听"
]

let getMahjongImgUrl = (idx) => {
    let m = Mahjong[idx]
    return `img/${m}.png`
}

let getWaitsCountColor = (shanten, waitsCount) => {
    let waitColor = (fixedWaitsCount) => {
        if (fixedWaitsCount < 13) {
            return 'cyan'
        }
        if (fixedWaitsCount <= 18) {
            return 'yellow'
        }
        return 'red'
    }
    if (shanten === 0) {
        return waitColor(waitsCount * 3)
    }
    let weight = 1;
    for (let i = 1; i < shanten; i++) {
        weight *= 2
    }
    return waitColor(waitsCount / weight)
}

let getRiskColor = (risk) => {
    if (risk <= 0) {
        return ''
    }
    if (risk < 5) {
        return 'cyan'
    }
    if (risk < 10) {
        return 'yellow'
    }
    if (risk < 15) {
        return 'orange'
    }
    return 'red'
}

let getYakusText = (yakus) => {
    let ret = []
    for (let i = 0; i < yakus.length; i++) {
        ret[i] = YakuMap[yakus[i]]
    }
    return ret
}
let getYakuText = (yaku) => {
    return YakuMap[yaku]
}

export {
    ShantenZH,
    Mahjong,
    getMahjongImgUrl,
    getWaitsCountColor,
    getRiskColor,
    getYakusText,
    getYakuText,
}