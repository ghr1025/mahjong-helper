package webapi

import (
	"bytes"
	"io"
	"os"
)

type ApiData struct {
	// 数据更新时间戳
	Timestamp int `json:"timestamp"`

	// 自家手牌 一个长度为 34 的整数数组
	Counts []int `json:"counts"`

	// 手牌危险度 一个长度为 34 的浮点数组
	RiskTable []float64 `json:"risk"`

	// 显示终端结果
	Outputs string `json:"outputs"`

	output_buffer bytes.Buffer
}

type RoundInfo struct {
	RoundWindTile  int   `json:"round_wind_tile"`
	SelfWindTile   int   `json:"self_wind_tile"`
	DoraIndicators []int `json:"dora_indicators"`
}

type OptionImprove struct {
	Tile       int   `json:"tile"`
	WaitsCount int   `json:"waits_count"`
	Indexes    []int `json:"indexes"`
}

type Option struct {
	WaitsCount                    int     `json:"waits_count"`
	AvgImproveWaitsCount          float64 `json:"avg_improve_waits_count"`
	HighlightAvgImproveWaitsCount bool    `json:"highlight_avg_improve_waits_count"`
	Shanten                       int     `json:"shanten"`

	// 鸣牌
	OpenTiles []int  `json:"open_tiles"`
	MeldType  string `json:"meld_type"`

	// 切牌
	IsDiscardTileDora bool    `json:"is_discard_tile_dora"`
	DiscardTile       int     `json:"discard_tile"`
	DiscardRisk       float64 `json:"discard_risk"`

	AvgNextShantenWaitsCount float64         `json:"avg_next_shanten_waits_count"`
	FuritenRate              float64         `json:"furiten_rate"`
	IsPartWait               bool            `json:"is_part_wait"`
	AvgAgariRate             float64         `json:"avg_agari_rate"`
	MixedWaitsScore          float64         `json:"mixed_waits_score"`
	HighlightMixedScore      bool            `json:"highlight_mixed_score"`
	MixedRoundPoint          int             `json:"mixed_round_point"`
	RonType                  string          `json:"ron_type"`
	DamaPoint                int             `json:"dama_point"`
	RiichiPoint              int             `json:"riichi_point"`
	YakuTypes                []int           `json:"yaku_types"`
	DoraCount                int             `json:"dora_count"`
	WaitTiles                []int           `json:"wait_tiles"`
	Improves                 []OptionImprove `json:"improves"`
}

type Options struct {
	Shanten int      `json:"shanten"`
	Info    string   `json:"info"`
	Options []Option `json:"options"`
}

type TileRisk struct {
	Tile int     `json:"tile"`
	Risk float64 `json:"risk"`
}

type RiskInfo struct {
	TilesRisk       []TileRisk `json:"tiles_risk"`
	TenpaiRate      float64    `json:"tenpai_rate"`
	LeftNoSujiTiles int        `json:"left_no_suji_tiles"`
	NoSujiInfo      string     `json:"no_suji_info"`
}

type PlayerInfo struct {
	Name           string `json:"name"`
	IsNaki         bool   `json:"isNaki"`
	DiscardTiles   []int  `json:"discard_tiles"`
	MeldDiscardsAt []int  `json:"meld_discards_at"`
}

type Human struct {
	HandTiles   []int      `json:"hand_tiles"`
	Melds       [][]int    `json:"melds"`
	RisksInfo   []RiskInfo `json:"risks_info"`
	NCSafeTiles []int      `json:"nc_safe_tiles"`
	OCSafeTiles []int      `json:"oc_safe_tiles"`
}

type Result struct {
	RoundInfo RoundInfo    `json:"round_info"`
	Players   []PlayerInfo `json:"players"`
	Human     Human        `json:"human"`
	Info      string       `json:"info"`
	Options   []Options    `json:"options_groups"`
}

func NewResult() Result {
	return Result{
		Players: []PlayerInfo{},
		Human: Human{
			HandTiles: []int{},
			Melds:     [][]int{},
		},
	}
}

func (r *Result) InitRound(roundWind, selfWind int, dora []int) {
	r.RoundInfo = RoundInfo{
		RoundWindTile:  roundWind,
		SelfWindTile:   selfWind,
		DoraIndicators: dora,
	}
}

func (r *Result) Reset() {
	r.Human = Human{
		HandTiles: []int{},
		Melds:     [][]int{},
	}
	r.Options = []Options{}
}

func (h *Human) SetHandTiles(tiles []int) {
	var ret []int
	for i, c := range tiles {
		if c > 0 {
			for j := 0; j < c; j++ {
				ret = append(ret, i)
			}

		}
	}
	h.HandTiles = ret
}

func (data *ApiData) Init() {
	data.output_buffer.Reset()
}

func (data *ApiData) GetOutput() {
	s := data.output_buffer.String()
	if len(s) > 0 {
		data.Outputs = s
	}
}

// implement the io.Writer interface
var _ io.Writer = (*ApiDataConvertor)(nil)

type ApiDataConvertor struct {
	*ApiData
}

func (writer ApiDataConvertor) Write(p []byte) (n int, err error) {
	n, e := writer.output_buffer.Write(p)
	if e != nil {
		return n, e
	}
	return os.Stdout.Write(p)
}
