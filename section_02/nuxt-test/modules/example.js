export default function() {

    // モジュール実行
    this.nuxt.hook('ready', async nuxt => {
        console.log('Nuxt id ready')
    })

}
