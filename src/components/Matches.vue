<template>
  <div v-if="searched" class="col-md-12">
      <b-table class="col-md-12 centered" striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import champs from '../assets/champion.json'
import itemss from '../assets/item.json'
import runes from '../assets/runesReforged.json'
import summss from '../assets/summoner.json'

export default {
  name: 'Matches',
  components: {},
  props: {
    summid: {}
  },
  data () {
    return {
      matchesinfo: {},
      searched: false,
      matchinfo: {},
      items: [],
      fields: {
        Win: { label: 'Victory?', sortable: true, 'class': 'text-center' },
        Champion: { label: 'Champion Name', sortable: true, 'class': 'text-center' },
        Mode: { label: 'Mode', sortable: true, 'class': 'text-center' },
        Length: { label: 'Game Length in Minutes', sortable: true, 'class': 'text-center' },
        Summs: { label: 'Summoner Spells', sortable: true, 'class': 'text-center' },
        Runes: { label: 'Runes', sortable: true, 'class': 'text-center' },
        KDA: { label: 'KDA', sortable: true, 'class': 'text-center' },
        Items: { label: 'Items', sortable: true, 'class': 'text-center' },
        Level: { label: 'Level', sortable: true, 'class': 'text-center' },
        Creeps: { label: 'CS', sortable: true, 'class': 'text-center' },
        CPM: { label: 'Creeps Per Min', sortable: true, 'class': 'text-center' }
      }
    }
  },
  watch: {
    summid: async function (newVal, oldVal) {
      this.items = []
      this.searched = true
      let summid = newVal.data.accountId
      let matches = await axios
        .get('https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + summid + '?beginIndex=0&endIndex=5&api_key=' + process.env.Riot_API)
      for (var i in matches.data.matches) {
        let gid = matches.data.matches[i].gameId
        this.createtable(gid, this.summid)
      }
    }
  },
  methods: {
    // makes entry per match
    createtable: function (matchid, sumid) {
      let data = {
        Win: null,
        Champion: null,
        Mode: null,
        Length: null,
        Summs: [],
        Summsid: [],
        Runesid: [],
        Runes: [],
        KDA: null,
        Items: [],
        Itemsid: [],
        Level: null,
        Creeps: null,
        CPM: null
      }
      let accid = sumid.data.accountId
      axios
        .get('https://na1.api.riotgames.com/lol/match/v3/matches/' + matchid + '?api_key=' + process.env.Riot_API)
        // .then(response => (this.matchesinfo = response))
        .then(response => {
          let partId = response.data.participantIdentities
          let ourIndex = ''
          for (var i in partId) {
            if (partId[i].player.accountId === accid) {
              ourIndex = i
              break
            }
          }
          let gameinfo = response.data.participants[ourIndex]
          data.Win = gameinfo.stats.win
          data.Champion = gameinfo.championId
          data.Mode = response.data.gameMode
          data.Length = Math.floor(response.data.gameDuration / 60)
          data.Summsid = [gameinfo.spell1Id, gameinfo.spell2Id]
          data.Runesid = [
            gameinfo.stats.perk0, gameinfo.stats.perk0Var1, gameinfo.stats.perk0Var2, gameinfo.stats.perk0Var3,
            gameinfo.stats.perk1, gameinfo.stats.perk1Var1, gameinfo.stats.perk1Var2, gameinfo.stats.perk1Var3,
            gameinfo.stats.perk2, gameinfo.stats.perk2Var1, gameinfo.stats.perk2Var2, gameinfo.stats.perk2Var3,
            gameinfo.stats.perk3, gameinfo.stats.perk3Var1, gameinfo.stats.perk3Var2, gameinfo.stats.perk3Var3,
            gameinfo.stats.perk4, gameinfo.stats.perk4Var1, gameinfo.stats.perk4Var2, gameinfo.stats.perk4Var3,
            gameinfo.stats.perk5, gameinfo.stats.perk5Var1, gameinfo.stats.perk5Var2, gameinfo.stats.perk5Var3
          ]
          data.KDA = gameinfo.stats.kills + '/' + gameinfo.stats.deaths + '/' + gameinfo.stats.assists
          data.Itemsid = [
            gameinfo.stats.item0, gameinfo.stats.item1, gameinfo.stats.item2,
            gameinfo.stats.item3, gameinfo.stats.item4, gameinfo.stats.item5, gameinfo.stats.item6
          ]
          data.Level = gameinfo.stats.champLevel
          data.Creeps = gameinfo.stats.totalMinionsKilled
          data.CPM = gameinfo.stats.totalMinionsKilled / data.Length
          // Name fetching
          let chardata = champs.data
          let cid = data.Champion.toString()
          let found = _.find(chardata, function (o) { return o.key === cid })
          data.Champion = found.name

          let itemdata = itemss.data
          for (var m in data.Itemsid) {
            if (data.Itemsid[m] === 0) {
            } else {
              let cid = data.Itemsid[m]
              data.Items.push(itemdata[cid].name)
            }
          }
          let runedata = runes
          let temparr = []
          for (var n in data.Runesid) {
            if (data.Runesid[n] !== 0) {
              temparr.push(data.Runesid[n])
            }
          }
          console.log(temparr)
          console.log(runedata)
          for (var o in temparr) {
            let cid = temparr[o].toString()
            let found = runedata[cid]
            data.Runes.push(found)
          }
          let summdata = summss.data
          for (var u in data.Summsid) {
            let cid = data.Summsid[u].toString()
            let found = _.find(summdata, function (o) { return o.key === cid })
            data.Summs.push(found.id)
          }
          this.items.push(data)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.centered {
  text-align: center;
  padding: auto;
  margin: auto;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
