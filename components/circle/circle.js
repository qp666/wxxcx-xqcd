// components/circle/circle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    canvasId: Number,
    width: {
      type: Number,
      value: 100
    },
    height: {
      type: Number,
      value: 100
    },
    lineWidth: {
      type: Number,
      value: 5
    },
    backgroundColor:{
      type: String,
      value: '#f3f3f3'
    },
    foregroundColor:{
      type: String,
      value: '#B4D66E'
    },
    progress: {
      type: Number,
      value: 100
    }
  },

  lifetimes: {
    ready() {
      // 开始绘制进度
      this.drawProgress()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    drawProgress() {
      const {canvasId,backgroundColor,lineWidth,width,height,progress}= this.properties

      var foregroundColor = null
      if (progress <= 30) {
        foregroundColor = '#ff0000'
      } else if (progress > 30 && progress <= 70) {
        foregroundColor = '#FF783B'
      } else  {
        foregroundColor = '#B4D66E'
      }

      // 拿到绘图的上下文
      const ctx = wx.createCanvasContext(canvasId, this); // 子组件中必须第二个参数写this
      
      // 接下来就可以开始一笔一笔的画了
      // 第一笔画背景
      ctx.beginPath() // 开启路径
      ctx.strokeStyle = backgroundColor
      ctx.lineWidth = lineWidth
      ctx.arc(width/2,height/2,(width-lineWidth)/2,0,2 * Math.PI)
      ctx.stroke() // 非填充式画

      // 第二笔画进度
      ctx.beginPath() // 开启路径
      ctx.strokeStyle = foregroundColor
      ctx.lineCap = 'round'
      const endAngle = (progress / 100) * 2 * Math.PI - 0.5 * Math.PI
      ctx.arc(width/2,height/2,(width-lineWidth)/2,-0.5*Math.PI,endAngle)
      ctx.stroke()

      // 第三笔画文字
      ctx.beginPath() // 开启路径
      ctx.fillStyle = foregroundColor
      const font_size = 12
      ctx.font = font_size + 'px Helvetica'
      if (progress > 99) {
        ctx.fillText(parseInt(progress)+'%',width / 2 - 13,height / 2 + 5)
      } else {
        ctx.fillText(parseInt(progress)+'%',width / 2 - 10,height / 2 + 5)
      }

      // 小程序中必须调用这个draw
      ctx.draw()
    }
  }
})
