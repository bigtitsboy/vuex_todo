import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num: 1,
    list: [],
    list2: [],
    inputvalue: ''
  },
  mutations: {
    setlist (state, res) {
      state.list = res
      this.state.list2 = this.state.list
      console.log(this.state.list)
      console.log(this.state.list2)
    },
    listpush (state, key) {
      // console.log(this.state.list)
      state.list.push(key)
      if (state.num !== 1) {
        state.list2.push(key)
      }
      // console.log(this.state.list)
      // state.list2.push(key)
    },
    listdelete (state, id) {
      const i = state.list.findIndex(x => x.id === id)
      state.list.splice(i, 1)
      if (state.num !== 1) {
        const a = state.list2.findIndex(x => x.id === id)
        state.list2.splice(a, 1)
      }
    },
    itemdonechange (state, id) {
      const i = state.list.findIndex(x => x.id === id)
      state.list[i].done = !state.list[i].done
    },
    edittext (state, obj) {
      const i = state.list.findIndex(x => x.id === obj.id)
      state.list[i].value = obj.text
      // console.log(obj.id, obj.text)
    },
    cleardone (state) {
      state.list = state.list.filter(x => x.done === false)
      state.list2 = state.list2.filter(x => x.done === false)
    },
    changelist (state, name) {
      state.num++
      if (name === 'Active') {
        this.state.list = this.state.list2.filter(x => x.done === false)
        // console.log(this.state.list)
        // console.log(this.state.list2)
      } else if (name === 'Completed') {
        this.state.list = this.state.list2.filter(x => x.done === true)
      } else {
        this.state.list = this.state.list2
        state.num = 1
        // console.log(this.state.list)
        // console.log(this.state.list2)
      }
      console.log(state.num)
    }

  },
  getters: {
    left (state) {
      return state.list.filter(x => x.done === false).length
    }
  },
  actions: {},
  modules: {}
})
