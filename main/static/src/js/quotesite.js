

new Vue ({
  el: '#about',
  data: {
    message: 'A collection of the craziest Trump quotes.'
  }
});


var addQuote = new Vue ({
  el: '#addQuote',
  data : {
    quote: {
      text: '',
      source: ''
    },
    errors: '',
    success: '',
    addedSuccess: false
  },

  methods: {
    newQuote: function(e){
      const quote = this;
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
        // addQuote.success = "Quote Added!"
        addQuote.addedSuccess = !addQuote.addedSuccess
      })
      .catch(function(error){
        console.log(error);
      });

      
      this.quote.text = '';
      this.quote.source = '';
    },

    showFlash: function(){
      addQuote.this.success = "Added!"
    }
  }
});

