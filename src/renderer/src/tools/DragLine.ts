export class DragLine {
  direction = 'Horizontal'
  lineDom: HTMLDivElement | undefined
  dom: HTMLDivElement
  max: number
  min: number
  start = 0


  /**
   * @param direction 方向
   * @param targetDom 挂在的dom元素
   * @param max 元素最大宽度/长度
   * @param min 元素最小宽度/长度
   */
  constructor(direction: string, targetDom: HTMLDivElement, max: number, min: number) {
    this.direction = direction
    this.dom = targetDom
    this.max = max
    this.min = min
    this.init()
  }

  public init(): void {
    if (this.direction === 'Horizontal') {
      //创建拖拽区域在元素右侧
      const dom = document.createElement('div')
      dom.style.position = 'absolute'
      dom.style.top = '0'
      dom.style.right = '0'
      dom.style.width = '5px'
      dom.style.height = '100%'
      dom.style.cursor = 'e-resize'
      this.dom.append(dom)
      this.lineDom = dom
      this.lineDom.addEventListener('mousedown', this.mouseDown)
    }
  }

  mouseDown = (e): void => {
    // 禁止拖动时出发浏览器默认事件
    e.preventDefault && e.preventDefault()
    if (e.target) {
      this.start = e.clientX || 0
      document.addEventListener('mousemove', this.mouseMove)
      document.addEventListener('mouseup', this.mouseUp)
    }
  }

  mouseMove = (e): void => {
    document.body.style.cursor = 'e-resize'
    const domRect: DOMRect | undefined = this.dom.getBoundingClientRect()
    const lineDomRect: DOMRect | undefined = this.lineDom?.getBoundingClientRect()
    console.log(this.dom.style.width)
    this.start = lineDomRect?.x || 0
    const offset: number = e.clientX - this.start
    if (this.dom && domRect) {
      const width = domRect.width
      const newWidth = width + offset
      if (newWidth >= this.min && newWidth <= this.max) {
        this.dom.style.width = newWidth + 'px'
      }
    }
  }

  mouseUp = (): void => {
    console.log('mouseup')
    document.body.style.cursor = 'default'
    document.removeEventListener('mousemove', this.mouseMove)
    document.removeEventListener('mouseup', this.mouseUp)
  }
}
