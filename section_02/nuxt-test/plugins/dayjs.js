import 'dayjs/locale/ja'
import dayjs from 'dayjs'

// ロケール日本
dayjs.locale('ja')

export default(({ app }, inject) => {
    inject('dayjs', string => dayjs(string))
})