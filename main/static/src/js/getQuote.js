
var getQuotes = new Vue({
    el: '#getQuote',
    data: {
        results: []
    },
    methods: {
        getquote: function(e){
            axios.get('/api/quotes')
            .then(response => {
                this.results = response.data
                console.log(this.results[0].body)
            })
        }
    }
});