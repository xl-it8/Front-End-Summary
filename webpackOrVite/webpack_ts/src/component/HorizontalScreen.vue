<template>
  <section v-horizontalScreen @touchmove.prevent>
    <slot></slot>
  </section>
</template>


<script>

export default {
  name: 'HorizontalScreen',
  data() {
    return {

    }
  },
  directives: {
    horizontalScreen: {
      bind(el, binding, vnode) {
        let self = vnode.context
        function reset(init) {
          let width = document.documentElement.clientWidth
          let height = document.documentElement.clientHeight

          if (screen.orientation.angle === 0 || screen.orientation.type === 'portrait-primary') { //竖屏状态
            el.style.transform = 'rotate(90deg)'
            el.style.width = `${height}px`
            el.style.height = `${width}px`
            el.style.transformOrigin = `${width / 2}px center`
          } else { //横屏状态
            el.style.transform = `rotate(0)`;
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
          }
        }
        reset(true)

        //做防抖
        let timer = null
        el.fn = function (e) {
          clearTimeout(timer)
          timer = setTimeout(reset, 300)
        }
        window.addEventListener('resize', el.fn, false)

        if ('orientationchange' in window) {
          window.addEventListener('orientationchange', el.fn, false)
        }
      },
      unbind(el) {
        window.removeEventListener('resize', el.fn)
        window.removeEventListener('orientationchange', el.fn);
      }
    }
  }
}
</script>
