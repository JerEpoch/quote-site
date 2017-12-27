

new Vue ({
  el: '#app1',
  data: {
    message: 'Work in Progress'
  }
});

new Vue ({
  el: '#about',
  data: {
    message: 'A collection of the craziest Trump quotes. Just a little sample below.'
  }
});
https://github.com/tysweezy/postit-sanic/blob/master/public/js/app.js



var addQuote = new Vue ({
  el: '#addQuote',
  data : {
    quote: {
      text: '',
      source: ''
    },
    errors: ''
  },

  methods: {
    newQuote: function(e){
      // alert(this.quote.source)
      if(!this.quote.text || !this.quote.source){
        this.errors = "You must include text and source!"
        return;
      }
      axios.post('/api/newquote', {
        text: this.quote.text,
        source: this.quote.source
      })
      .then(function(response){
        console.log(response);

      })
      .catch(function(error){
        console.log(error);
      });

      
      this.quote.text = '';
      this.quote.source = '';
    }
  }
});




// var app5 = new Vue({
//   el: '#app2',
//   data: {
//     message: 'Hello Vue.js!'
//   },
//   methods: {
//     reverseMessage: function () {
//       this.message = this.message.split('').reverse().join('')
//     }
//   }
// })

// var example1 = new Vue({
//   el: '#example-1',
//   data: {
//     counter: 0
//   }
// })

// var demo = new Vue({

//     // A DOM element to mount our view model.
//     el: '#mainBase',

//     // This is the model.
//     // Define properties and give them initial values.
//     data: {
//         active: 'home'
//     },

//     methods: {
//       submit: function  () {
//         axios.post('/newquote')
//       }
//     }
    

//     // Functions we will be using.
//     // methods: {
//     //     makeActive: function(item){
//     //         // When a model is changed, the view will be automatically updated.
//     //         this.active = item;
//     //     }
//     // }
// });