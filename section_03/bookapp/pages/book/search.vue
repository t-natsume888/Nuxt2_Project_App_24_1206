<template>
  <div>
    
    <v-row>
        <v-col cols="6">
            <v-text-field
                v-model="keyword"
                label="本のタイトル検索"
                />
        </v-col>
    </v-row>    

    <v-row>
        <v-col cols="3">
            <!-- 検索ボタン -->
            <v-btn
                color="primary"
                @click="search(keyword)"
                >
            検索する
            </v-btn>

        </v-col>
        <v-col cols="3">
            <v-btn
                color="secondary"
                to="/book"
                >
            一覧へ戻る
            </v-btn>
        </v-col>
    </v-row>

    <!-- 検索結果エラーメッセージ -->
    <div v-show="!isFound" class="mt-4">検索結果が 0件です。</div>

    <!-- 検索結果表示 -->
     <v-row>
        <v-col
            v-for="(book, index) in searchResults" :key="index"
            cols="12"
            md="6"
            >

            <v-card class="mx-auto">
                <v-row class="mt-4">
                    <!-- 画像表示 -->
                    <v-col cols="4">
                        <v-img :src="book.image"></v-img>
                    </v-col>
                    
                    <v-col cols="8">
                        <!-- タイトル表示 -->
                        <v-card-title>{{ book.title }}</v-card-title>
                        <!-- 説明文表示 -->
                         {{ book.description }}
                         <v-spacer />
                        
                         <!-- ボタン -->
                         <v-card-actions>
                            <v-btn
                                class="mx-2"
                                fab
                                dark
                                color="indigo"
                                @click="addBookList(index)"
                            >
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                            </v-btn>
                         </v-card-actions>
                    </v-col>
                </v-row>
            </v-card>
        
        </v-col>
     </v-row>
    

  </div>
</template>

<script>
export default {

    data() {
        return {
            keyword: '',
            searchResults: [],
            isFound: true
                }
            },
            methods: {
                addBookList(index){
                    // === 検索結果を渡す
                    this.$emit('add-book-list', this.searchResults[index])
                    console.log("取得オブジェクト表示 =====================")
                    console.log(this.searchResults[index])

                },
                
                async search(keyword) {
                    this.searchResults = []

                    // === google bookes API 処理
                    /**
                     *  １日のクエリ量が多いと code 429 で返される
                     */
                    const baseUrl = "https://www.googleapis.com/books/v1/volumes?"
                    
                    // === JSONPlaceholder: API , URL
                    // const baseUrl = "https://jsonplaceholder.typicode.com/photos?id="
                    // === https://jsonplaceholder.typicode.com/photos?id=2
                    const params = {
                        q: `intitle:${keyword}`,
                        maxResults: 4
                    }
                // === クエリーストリング作成
                const queryParams = new URLSearchParams(params)
                console.log("クエリ文字列================ ")
                console.log(baseUrl + keyword)
                // console.log(baseUrl + queryParams)
                // 出力結果
                // https://www.googleapis.com/books/v1/volumes?q=intitle%3Avue.js&maxResults=40

                // fetch で json取得
                const response = await fetch(baseUrl + queryParams)
                .then( response => response.json())
                
                // console.log("response.items の値 =========================")
                // console.log(response)
                
                // 検索エラー処理
                if (response.items === undefined) {
                    this.isFound = false
                } else {

                    this.isFound = true

                // 取得した情報で、必要な情報を 配列へ push
                
                for (const book of response.items ) {
                    const title = book.volumeInfo.title // タイトル
                    const img = book.volumeInfo.imageLinks // 画像パス
                    const description = book.volumeInfo.description // 説明文

                  //  console.log(title + '\n')
                  //  console.log(img + '\n')
                  //  console.log(description + '\n')

                    // 配列へ挿入
                    this.searchResults.push({
                        title: title ? title : '',  // eslint-disable-line
                        image: img ? img.thumbnail : '',
                        description: description ? description.slice(0, 40) : ''
                    })

                }

                
                }
                
            
                }
               
            }

}
</script>

<style>

</style>