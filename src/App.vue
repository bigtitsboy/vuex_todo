<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="'What needs to be done?'" :value="inputvalue" autofocus
               @keyup.enter="add($event)">
      </header>
      <!-- This section should be hidden by default and shown when there are todos -->
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <!-- These are here just to show the structure of the list items -->
          <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
          <!--          <li class="completed">-->
          <!--            <div class="view">-->
          <!--              <input class="toggle" type="checkbox" checked>-->
          <!--              <label>Taste JavaScript</label>-->
          <!--              <button class="destroy"></button>-->
          <!--            </div>-->
          <!--            <input class="edit" value="Create a TodoMVC template">-->
          <!--          </li>-->
          <li v-for=" item in list" :key="item.id" :class="item.done?'completed' : ' '">
            <div class="view">
              <input :id="item.id" class="toggle" type="checkbox" :checked="item.done" @click="changecheck(item.id)">
              <label :for="item.id">
                <input type="text"
                       :style="'height:50px;width:100%;border: hidden;font-size: 24px;text-decoration:'+[item.done?'line-through':'']"
                       :readonly="item.done" :value="item.value" @change="valuechange($event,item.id)">
                <!--                {{ item.value }}-->
              </label>
              <button class="destroy" @click="deleteobj(item.id)"></button>
            </div>
            <input class="edit" value="Rule the web">
          </li>
        </ul>
      </section>
      <!-- This footer should hidden by default and shown when there are todos -->
      <footer class="footer">
        <!-- This should be `0 items left` by default -->
        <span class="todo-count"><strong>{{ left }}</strong> item left</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
          <li>
            <a class="" href="#/" @click="select($event)" name="All" ref="All">All</a>
          </li>
          <li>
            <a class="" href="#/active" @click="select($event)" name="Active" ref="Active">Active</a>
          </li>
          <li>
            <a class="" href="#/completed" @click="select($event)" name="Completed" ref="Completed">Completed</a>
          </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed" @click="Clearcompleted()">Clear completed</button>
      </footer>
    </section>
    <footer class="info">
      <p>click to edit a todo</p>
      <!-- Remove the below line ↓ -->
      <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
      <!-- Change this out with your name and url ↓ -->
      <p>Created by <a href="http://todomvc.com">you</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>

  </div>
</template>

<script>
import Vue from 'vue'
import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'
import { mapState, mapGetters } from 'vuex'
import axios from 'axios'
import Mock from 'mockjs'

Mock.mock(/\/studentinfo/, {
  'data|7': [{
    'id|+1': 0,
    'value|1': '@guid',
    // '\'@csentence(3, 5)\''.split('\'').join(''),
    'done|1': true
  }]
})

Vue.prototype.$axios = axios
export default {
  name: 'App',
  data: function () {
    return {
      id: 0
      // list: [123]
    }
  },
  methods: {
    add (e) {
      this.$store.commit('listpush', {
        id: this.id,
        value: e.target.value,
        done: false
      })
      this.id++
    },
    deleteobj (id) {
      this.$store.commit('listdelete', id)
    },
    changecheck (id) {
      // console.log(id)
      this.$store.commit('itemdonechange', id)
    },
    valuechange (e, id) {
      // console.log(e.target.value)
      const text = e.target.value
      // console.log(typeof text)
      this.$store.commit('edittext', {
        id: id,
        text: text
      })
    },
    Clearcompleted () {
      this.$store.commit('cleardone')
    },
    select (e) {
      this.$store.commit('changelist', e.target.name)
      // console.log(e.target.name)
      // console.log(for  this.$refs)
      for (const key in this.$refs) {
        // console.log(this.$refs[key])
        this.$refs[key].className = ' '
      }
      // console.log(e.target.parentNode.parentNode.children.length)
      e.target.className = 'selected'
    }
  },
  computed: {
    ...mapState(['list', 'inputvalue']),
    ...mapGetters(['left'])
  },
  created () {
    this.$axios.get('/studentinfo').then((res) => {
      // console.log(res.data.data)
      // console.log(typeof res)
      this.$store.commit('setlist', res.data.data)
      // console.log(this.list.length)
      this.id = this.list.length
      // console.log(this.id)
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
