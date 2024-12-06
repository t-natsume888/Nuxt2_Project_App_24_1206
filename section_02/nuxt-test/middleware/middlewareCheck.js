
// ミドルウェア
export default function ({route}) {
   console.log('middleware Check')
   console.log('middleware:' , route.name)
}

