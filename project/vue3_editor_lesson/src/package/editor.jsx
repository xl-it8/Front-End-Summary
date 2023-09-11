
import { defineComponent, computed, inject, ref } from "vue";
import EditorBlock from "./editorBlock";
import { useMenuDrager } from "./hooks";
import { useFocus } from "./useFocus";
import { useBlockDraager } from "./useBlockDraager";
import "./editor.scss";
export default defineComponent({
  props: {
    modelValue: {
      type: Object,
    },
  },
  setup(props, ctx) {
    const data = computed({
      get() {
        return props.modelValue;
      },
      set(newVal) {
        ctx.emit("update:modelValue", newVal);
      },
    });

    const conatinerStyle = computed(() => {
      return {
        width: data.value.containder.width + "px",
        height: data.value.containder.height + "px",
      };
    });

    const containerRef = ref(null);
    //实现菜单拖拽功能
    const { dragStart, dragend } = useMenuDrager(containerRef, data);
    //实现点击选中

    const { blockMouseDown, focusData, contentMouseDown, lastSelectBlock } =
      useFocus(data, (e) => {
        mousedown(e);
      });
    const { mousedown,markLine } = useBlockDraager(focusData, lastSelectBlock,data);
    const config = inject("config");
    return () => (
      <div class="editor">
        <div class="editor_left">
          {config.componentList.map((item) => (
            <div
              class="editor_left_things"
              draggable
              onDragstart={(e) => dragStart(e, item)}
              onDragend={dragend}
            >
              <span>{item.label}</span>
              <div>{item.preview()}</div>
            </div>
          ))}
        </div>
        <div class="editor_top">菜单栏</div>
        <div class="editor_right">属性控制</div>
        <div class="editor_container">
          <div class="editor_container_canvans">
            <div
              class="editor_container_canvans_content"
              style={conatinerStyle.value}
              ref={containerRef}
              onMousedown={contentMouseDown}
            >
              {data.value.blocks.map((block, index) => (
                <EditorBlock
                  block={block}
                  class={block.focus ? "editor_block_focus" : ""}
                  onMousedown={(e) => blockMouseDown(e, block, index)}
                ></EditorBlock>
              ))}
              {
                markLine.x !==null && <div class="line-x" style={{left:markLine.x +'px'}}></div>
              }
              {
                markLine.y !==null && <div class="line-y" style={{top:markLine.y +'px'}}></div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  },
});
