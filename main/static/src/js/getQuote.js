
var getQuotes = new Vue({
    el: '#getQuote',
    data: {
        results: [],
        cursor_page: '',
        moreQuotes: true
        // offset: 2
    },
    methods: {
        getquote: function(e){
            axios.get('/api/quotes', {
                params: {
                  cursor_page: this.cursor_page
                    // offset: 2
                }
            })
            .then(response => {
                //console.log(this.offset)
                this.results = this.results.concat(response.data.quotes)
                console.log(response)
                console.log(response.data.cursor_page)
                this.cursor_page = response.data.cursor_page
                if (this.cursor_page == null) {
                  getQuotes.moreQuotes = false
                  console.log("is null")
                }
            })
            .catch(function(err){
                console.log(err);
            })
        }
    }
});
