<template>
  <div>
    book
    <!-- Nuxt2 で子コンポーネントの呼び出し -->
    <NuxtChild 
    :books="books"
    @add-book-list = "addBook"
    />
  </div>
</template>

<script>

const STORAGE_KEY = 'books'
export default {
    data () {
      return {
            books: [],
            newBook: null
                  }
              },

    //  mounted() {
      created() {
                  if (localStorage.getItem(STORAGE_KEY)) {
                  try {
                      // json => 文字列デシリアライズ 
                      this.books = JSON.parse(localStorage.getItem(STORAGE_KEY));
                  } catch(e) {
                      localStorage.removeItem(STORAGE_KEY);
                  }
                  }
              },

      methods: {
              addBook(e) {
               
                  // this.cats.push(this.newCat);

                  // 子要素（search.vue）からの情報を e で取得
                  // this.books.push(this.newBook);
                  this.books.push({
                    id: this.books.length,
                    title: e.title,
                    image: e.image,
                    description: e.description,
                    readDate: '',
                    memo: ''
                  })
                 
                  this.saveBook();
                  // id 出力（最後に取得した）
                  // console.log(this.books.slice(-1)[0].id)
                  
                  this.goToEditPage(this.books.slice(-1)[0].id)
},
              removeBook(x) {
                  // this.cats.splice(x, 1);
                  this.books.splice(x, 1);
                  this.saveBook(); // ローカルストレージ 保存
              },
              saveBook() {
                  // ローカルストレージ保存の為 json をシリアライズ 
                  const parsed = JSON.stringify(this.books);
                  localStorage.setItem(STORAGE_KEY, parsed);
              },
              goToEditPage(id) {
                // vue ルータで ページの切り替え
                this.$router.push(`/book/edit/${id}`)
              }
      }

}
</script>

<style>

</style>