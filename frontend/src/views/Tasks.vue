<template>
  <div>
    <h1>Tasks</h1>
    <form @submit.prevent="createTask">
      <input type="text" v-model="title" placeholder="Title" required />
      <button>Create</button>
    </form>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input type="checkbox" :id="task.id" :checked="task.completed" @change="updateTask(task)" />
        <label :for="task.id">{{ task.title }}</label>
        <button @click="deleteTask(task)">Delete</button>
      </li>
    </ul>
    <p>{{ completedTaskCount() }} completed tasks</p>

  </div>
</template>

<script>
import axios from 'axios';
const API_URL = '//localhost:3000';

const instance = axios.create({
  baseURL: API_URL,
});

//const socket = new WebSocket('wss://localhost:3000');

// handle message received from server
//socket.onmessage = function (event){
 // console.log(event.data);
//};


export default {
  data() {
    return {
      title: '',
      tasks: [],
    };
  },


  methods: {

    async getTasks() {
      const response = await instance.get('/tasks');
      this.tasks = response.data;
    },

    async createTask() {
      try {
        const response = await instance.post('/tasks', { title: this.title });
        this.tasks.push(response.data);
        this.title = '';
      } catch (error) {
        console.error(error);
      }
    },

    async updateTask(task) {
      try {
        const response = await instance.put(`/tasks/${task.id}`, {
          title: task.title,
          completed: !task.completed
        });
      } catch (error) {
        console.error(error);
      }
    },

    async deleteTask(task) {
      try {
        const response = await instance.delete(`/tasks/${task.id}`);
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      } catch (error) {
        console.error(error);
      }
    },

    completedTaskCount() {
      return this.tasks.filter(t => t.completed).length;
    }
  },

  created() {
    instance.get('/tasks').then((response) => {
      this.tasks = response.data;
    }).catch((error) => {
      console.log(error);
    });
  },
};

</script>
