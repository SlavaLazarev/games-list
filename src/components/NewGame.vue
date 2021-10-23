<template>
  <div>
    <button class="btn btn-dark" @click="isVisibilityFormNewTask = !isVisibilityFormNewTask" style="padding: 5px; width: 40px">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
    </button>
    <div class="modal" v-show="isVisibilityFormNewTask">
      <div class="modal-window">
        <form @submit.prevent="SubmitNewGame">
          <h1>Add new game</h1>

          <div class="form-group">
            <label class="d-block">
              <div class="mb-2">Game name</div>
              <input
                  type="text"
                  class="form-control"
                  v-model.trim="$v.GameName.$model"
                  placeholder="Enter Game name"
                  :class="{'is-invalid' :$v.GameName.$error, 'is-valid' :!$v.GameName.$invalid }"
              >
              <div class="invalid-feedback">Enter Game name</div>
              <div class="valid-feedback">Good</div>
            </label>
          </div>

          <div class="form-group">
            <label class="d-block">
              <div class="mb-2">Avatar game</div>
              <input
                  type="text"
                  class="form-control"
                  v-model.trim="$v.GameUrl.$model"
                  placeholder="Enter url avatar game"
                  :class="{'is-invalid' :$v.GameUrl.$error, 'is-valid' :!$v.GameUrl.$invalid }"
              >
              <div class="invalid-feedback">Enter url avatar game</div>
              <div class="valid-feedback">Good</div>
            </label>
          </div>


          <div class="form-group">
            <label class="d-block">
              <div class="mb-2">Rating game</div>
              <input
                  type="text"
                  class="form-control"
                  v-model.trim="$v.GameRating.$model"
                  v-mask="'##.##'"
                  placeholder="Enter rating game, max 10"
                  :class="{'is-invalid' :$v.GameRating.$error, 'is-valid' :!$v.GameRating.$invalid }"
              >
              <div class="invalid-feedback">Enter rating game</div>
              <div class="valid-feedback">Good</div>
            </label>
          </div>
          <button type="submit" class="btn btn-dark" @click="isVisibilityFormNewTask = false" :disabled="$v.$invalid !== false">Add</button>
        </form>
      </div>
      <div class="overlay" @click="isVisibilityFormNewTask = false"></div>
    </div>
  </div>
</template>

<script>
import {required, minLength, maxLength, between, url} from 'vuelidate/lib/validators'

export default {
  name: "NewGame",
  props: ["games"],
  data() {
    return {
      GameName: '',
      GameUrl: '',
      GameRating: '',
      isVisibilityFormNewTask: false,
    }
  },
  validations: {
    GameName: {required, minLength: minLength(1)},
    GameUrl: {required, url},
    GameRating: {required, minLength: minLength(1), maxLength: maxLength(5), between: between(0,10)},
  },
  methods: {
    SubmitNewGame() {
      this.games.data.push({
        name: this.GameName,
        icon_url: this.GameUrl,
        rating: this.GameRating
      })
      this.GameName =  ''
      this.GameUrl = ''
      this.GameRating = ''
    }
  }
}

</script>

<style scoped>
.modal {
  position: fixed;;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-window {
  position:relative;
  z-index: 2;
  width: 550px;
  box-shadow: 0 10px 15px rgba(0,0,0, .4);
  background-color: #ffffff;
  padding: 30px;
}


.modal .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.7;
  z-index: 0;
}
</style>
