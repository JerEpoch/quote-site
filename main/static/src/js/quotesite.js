var app1 = new Vue ({
  el: '#app1',
  data: {
    message: 'Work in Progress'
  }
})

var about = new Vue ({
  el: '#about',
  data: {
    message: 'A collection of the craziest Trump quotes. Just a little sample below.'
  }
})


var app5 = new Vue({
  el: '#app2',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})

var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})

var demo = new Vue({

    // A DOM element to mount our view model.
    el: '#mainBase',

    // This is the model.
    // Define properties and give them initial values.
    data: {
        active: 'home'
    },

    // Functions we will be using.
    methods: {
        makeActive: function(item){
            // When a model is changed, the view will be automatically updated.
            this.active = item;
        }
    }
});