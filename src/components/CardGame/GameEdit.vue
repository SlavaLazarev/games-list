<template>
  <div class="details">
    <div class="form-group">
      <label class="d-block">
        <div class="mb-2">Rating game</div>
        <input
            type="text"
            class="form-control"
            v-model.trim="$v.ratingValue.$model"
            v-mask="'##.##'"
            placeholder="Enter rating game, max 10"
            :class="{'is-invalid' :$v.ratingValue.$error, 'is-valid' :!$v.ratingValue.$invalid }"
        >
        <div class="invalid-feedback">Enter rating game</div>
        <div class="valid-feedback">Good</div>
      </label>
    </div>
    <button class="btn btn-dark" @click="hideDetails" :disabled="$v.$invalid !== false">edit</button>

  </div>
</template>

<script>
import {required, minLength, maxLength, between} from 'vuelidate/lib/validators'

export default {
  name: "GameEdit",
  props: ["game"],
  data() {
    return {
      ratingValue: ""
    }
  },
  validations: {
    ratingValue: {required, minLength: minLength(1), maxLength: maxLength(5), between: between(0,10)},
  },
  methods: {
    hideDetails() {
      this.game.rating = this.ratingValue
      this.$emit("closeDetails")
    },
  }
}
</script>

<style scoped>

</style>