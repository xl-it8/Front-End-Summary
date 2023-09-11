//拖拽事件 的流程 dragstart -》 dragenter -》dragover =》drop=》 dragleave  =》 dragend

export function useMenuDrager(containerRef, data) {
  var currentComponent = null; //保存拖拽的元素
  const dragenter = (e) => {
    // console.log(e)
    e.dataTransfer.dropEffect = "move";
  };
  const dragover = (e) => {
    e.preventDefault(); //组织默认行为 否则不触发drop
  };
  const dragleave = (e) => {
    e.dataTransfer.dropEffect = "none";
  };
  const drop = (e) => {
    const blocks = data.value.blocks;
    data.value = {
      ...data.value,
      blocks: [
        ...blocks,
        {
          top: e.offsetY,
          left: e.offsetX,
          "z-index": 2,
          key: currentComponent.key,
          alignCenter: true, //指定但是拖拽放置的时候需要让元素居中
        },
      ],
    };
    currentComponent = null;
  };

  const dragStart = (e, component) => {
    containerRef.value.addEventListener("dragenter", dragenter);
    containerRef.value.addEventListener("dragover", dragover);
    containerRef.value.addEventListener("dragleave", dragleave);
    containerRef.value.addEventListener("drop", drop);
    currentComponent = component;
  };

  //当拖拽结束后 清除事件
  const dragend = () => {
    containerRef.value.removeEventListener("dragenter", dragenter);
    containerRef.value.removeEventListener("dragover", dragover);
    containerRef.value.removeEventListener("dragleave", dragleave);
    containerRef.value.removeEventListener("drop", drop);
  };
  return {
    dragStart,
    dragend 
  };
}
