import { computed, ref } from "vue";
export function useFocus(data, cb) {
  let lastIndex = ref(-1);
  let lastSelectBlock = computed(() => {
    return data.value.blocks[lastIndex.value];
  });
  const focusData = computed(() => {
    let focus = [];
    let unFocus = [];
    data.value.blocks.forEach((block) =>
      (block.focus ? focus : unFocus).push(block)
    );
    return {
      focus,
      unFocus,
    };
  });
  const clearSelectBlock = () => {
    data.value.blocks.forEach((block) => {
      block.focus = false;
    });
  };
  const contentMouseDown = () => {
    lastIndex.value = -1;
    clearSelectBlock();
  };
  const blockMouseDown = (e, block, index) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.shiftKey) {
      //代表键盘按住了shift
      if (focusData.value.focus.length <= 1) {
        block.focus = true;
      } else {
        block.focus = !block.focus;
      }
    } else {
      if (!block.focus) {
        clearSelectBlock(); //排他思想
        block.focus = true; //当前选中的元素
      }
    }
     console.log(index)
     lastIndex.value = index;
    cb(e);
   
   
  };

  return {
    contentMouseDown,
    blockMouseDown,
    focusData,
    lastSelectBlock,
  };
}
