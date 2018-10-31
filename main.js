var app = new Vue({
  el: '#app',
  data: {
    appname: 'Todo App with vue',
    list: []
  },
  created: function() {
    this.getAllTasks();
  },
  methods: {
    createTask: function(event) {
      event.preventDefault();
      var formValue = this.getFormData(event.target);
      this.axios().post('/todos', formValue).then(res => {
        event.target.reset();
        console.log('create task', this.parsedata(res))
        this.getAllTasks();
      })
    },
    getAllTasks: function() {
      this.axios().get('/todos').then(response => {
        this.list = response.data.results;
      })
    },
    getFormData: function(form) {
      var formValue = {};
      for (var i =0; i < form.length; i++) {
        if (form[i].name) {
          formValue[form[i].name] = form[i].value;
        }
      }
      return formValue;
    },
    axios: function() {
      return axios.create({
        baseURL: 'http://localhost:8001/parse/classes',
        headers: {
          'X-Parse-Application-Id': 'parseapp',
          "X-Parse-REST-API-Key": "EE9UtETxqFZV2awN",
          "Content-Type": "application/json",
        }
      });
    },
    parsedata: function(response) {
      return {
        data: response.data,
        status: response.status
      }
    }
  }
})