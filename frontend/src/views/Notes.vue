<template>
  <div>
    <h1>Notes file</h1>
    <div v-if="loading">Loading...</div>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" type="text" placeholder="Add New Todo">
      <button type="submit">Add</button>
    </form>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        {{ todo.title }}
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      todos: [],
      newTodo: '',
      loading: true
    }
  },
  mounted() {
    axios.get('/todos')
        .then(response => {
          this.todos = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.error(error);
          this.loading = false;
        });
  },
  methods: {
    addTodo() {
      axios.post('/todos', {
        title: this.newTodo,
        description: ''
      })
          .then(response => {
            this.todos.push(response.data);
            this.newTodo = '';
          })
          .catch(error => {
            console.error(error);
          });
    },
    deleteTodo(id) {
      axios.delete(`/todos/${id}`)
          .then(() => {
            this.todos = this.todos.filter(todo => todo.id !== id);
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
}

</script>

<style scoped>
h1 {
  font-size: 1.5em;
  margin-bottom: 10px;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
  margin-bottom: 5px;
}
input[type="text"], button[type="submit"] {
  font-size: 1em;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
  margin-right: 5px;
}
button[type="submit"] {
  background-color: #ccc;
  color: #fff;
  border: none;
  cursor: pointer;
}
button[type="submit"]:hover {
  background-color: #aaa;
}
button {
  font-size: 1em;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
  cursor: pointer;
}
button:hover {
  background-color: #eee;
}
</style>
