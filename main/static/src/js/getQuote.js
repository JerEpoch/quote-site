
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
                // console.log(this.results[1].body + " " + this.results[1].source)
                // var qs = JSON.parse(this.results)
                // console.log(qs)
                // var quoteLen = 0
                // for(var k in this.results)
                //     quoteLen++;
                // console.log(quoteLen)
            })
            .catch(function(err){
                console.log(err);
            })
        }
    }
});



const api = 'http://hn.algolia.com/api/v1/search_by_date';
new Vue({
    el:'#testQuote',
  data: {
      list: [],
      tag: 'story',
  },
  methods: {
    infiniteHandler($state) {
      axios.get(api, {
        params: {
          tags: this.tag,
          page: this.list.length / 20 + 1,
        },
      }).then(({ data }) => {
        if (data.hits.length) {
          this.list = this.list.concat(data.hits);
          $state.loaded();
          if (this.list.length / 20 === 10) {
            $state.complete();
          }
        } else {
          $state.complete();
        }
      });
    },
    changeFilter() {
      this.list = [];
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      });
    },
  }

})