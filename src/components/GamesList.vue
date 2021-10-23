<template>
  <div>
    <div v-if="games" class="d-flex justify-content-between" style="margin-bottom: 5px">
      <div class="input-group-prepend">
        <span class="btn btn-dark" id="inputGroup-sizing-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </span>
      </div>
      <input
          type="text"
          class="form-control"
          v-model="searchQuery"
          placeholder="Game"
      >
    </div>
    <div v-if="games" class="d-flex justify-content-between" style="margin-bottom: 5px">
      <select v-model="sortingType" class="form-control" id="exampleFormControlSelect1">
        <option value="A-Z">Sort A-Z</option>
        <option value="Z-A">Sort Z-A</option>
        <option value="High rating">High rating</option>
        <option value="Low rating">Low rating</option>
      </select>
      <NewGame :games="games"/>
    </div>

    <div v-if="games">
      <ul class="list-group">
        <li style="list-style-type: none">
          <GameItem
            v-for="(game) in sortedGames"
            :key="game.id"
            :game="game"
            :games="games"
          />
        </li>
      </ul>
    </div>
    <div v-else style="text-align:center">
      <h3>No games</h3>
      <button @click="getGames" type="button" class="btn btn-secondary btn-lg btn-block">Download the list of games</button>
    </div>
  </div>
</template>

<script>
import GameItem from "./CardGame/GameItem";
import NewGame from  "./NewGame";
import axios from "axios";

export default {
  name: "GamesList",
  data() {
    return {
      sortingType: "A-Z",
      searchQuery: '',
      games: null,
    };
  },
  methods: {
    async getGames() {
      await axios
          .get("https://pcg-appstore.s3.amazonaws.com/applications_for_import.json")
          .then((response) => {
            this.games = response.data;
          });
    }
  },
  computed: {
    gamesItems() {
      return this.games.data.map((item, index) => {
        return {
          id: index,
          name: item.name,
          image: item.icon_url,
          rating: item.rating || Math.random() * 10,
        }
      })
    },
    filteredGames() {
      return this.gamesItems.filter(
          item => item.name.toLocaleLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    sortedGames() {
      let filtered = this.filteredGames.slice();
        if (this.sortingType === "A-Z") {
          return filtered.sort((a, b) => (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1));
      } else if (this.sortingType === "Z-A") {
          return filtered.sort((a, b) => (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? -1 : 1));
      } else if (this.sortingType === "High rating") {
          return filtered.sort((a, b) => (a.rating < b.rating ? 1 : -1));
      } else if (this.sortingType === "Low rating") {
          return filtered.sort((a, b) => (a.rating > b.rating ? 1 : -1));
      } else {
          return filtered.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
    },
  },
  components: {GameItem, NewGame}
}
</script>
