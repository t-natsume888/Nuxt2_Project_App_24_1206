<template>
  <div>
    book/edit/_id
    {{ $route.params.id }}

    <!-- // 親 => 子 , book.vue => _id.vue へ情報を表示 -->
    <p>
      {{ books[$route.params.id].title }}
    </p>

    <p>
      {{book.title }}
    </p>
  
  </div>
</template>

<script>
export default {
   // vue ルーターを使って、books配列の $route.params.id のアイテムを取得する
   beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.book = vm.books[vm.$route.params.id]
    })
  },

  // 親 => 子 , book.vue => _id.vue へ情報を渡す ,default: () => {} で初期化、初期値設定
  props: {
    books: {
      type: Array,
      default: () => {}
    }
  },

  data() {
    return {
      book: ''
    }
  }
 
}
</script>

<style>

</style>