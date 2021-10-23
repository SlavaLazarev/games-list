<template>
  <div class="card">
    <div class="card-header" style="background-color: #ffffff">
      <div class="d-flex align-items-center">
        <div class="flex-shrink-0">
          <img
              :src="game.image"
              alt="game icon"
              style="width:50px; height:50px; border-radius: 10px"
          >
        </div>
        <div class="flex-grow-1 ms-3">
          <h4 style="padding: 0 10px">{{ game.name }}</h4>
        </div>
        <div class="flex-grow-2 ms-3">
          <p>
            <button class="btn btn-default" @click="editRating">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
            </button>

            <button class="btn default" @click="deleteGame">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
            {{ parseFloat(game.rating).toFixed(2) + ' ' }}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
            </svg>
          </p>
        </div>
      </div>
      <GameEdit
          v-if="isGameVisibility"
          :game="game"
          @closeDetails="closeDetails"
      />
    </div>
  </div>
</template>

<script>
import GameEdit from "./GameEdit";

export default {
  name: "GameItem",
  props: ["game", "games"],
  data() {
    return {
      isGameVisibility: false
    }
  },
  methods: {
    editRating() {
      this.isGameVisibility = !this.isGameVisibility ;
    },
    closeDetails() {
      this.isGameVisibility = false;
    },
    deleteGame() {
      console.log(this.game, 'game')
      this.games.data.splice(this.game.id , 1)
    }
  },
  components: {GameEdit},
}
</script>
