<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  // 解决 [Deprecation] Listener added for a 'DOMNodeInserted' 警告
  // #ifdef H5
  if (typeof Node !== 'undefined' && Node.prototype && Node.prototype.addEventListener) {
    ;(() => {
      const A = Node.prototype.addEventListener
      Node.prototype.addEventListener = function (t, l, o) {
        if (t === 'DOMNodeInserted') return
        return A.call(this, t, l, o)
      }
    })()
  }
  // #endif
})

onShow(() => {
  // console.log('App Show')
})

onHide(() => {
  // console.log('App Hide')
})
</script>
