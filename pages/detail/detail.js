/**
 * 用户详情页面
 * 展示单个用户的详细信息
 */

// 导入 API 服务
const api = require('../../utils/api.js')

/**
 * 页面实例
 */
Page({
  /**
   * 页面数据
   */
  data: {
    user: null  // 用户详情数据
  },
  
  /**
   * 页面加载时触发
   * @param {Object} options - 页面参数
   */
  onLoad(options) {
    // 获取从列表页面传递的用户 ID
    const id = options.id
    
    // 如果有 ID，则加载用户详情
    if (id) {
      this.loadUserDetail(id)
    }
  },
  
  /**
   * 加载用户详情
   * @param {number} id - 用户 ID
   */
  async loadUserDetail(id) {
    try {
      // 显示加载动画
      wx.showLoading({ title: '加载中...' })
      
      // 调用 API 获取用户详情
      const user = await api.getUser(id)
      
      // 更新页面数据
      this.setData({ user })
      
      // 隐藏加载动画
      wx.hideLoading()
    } catch (err) {
      // 加载失败处理
      wx.hideLoading()
      wx.showToast({
        title: '加载失败',
        icon: 'error'
      })
    }
  },
  
  /**
   * 返回上一页
   */
  onBack() {
    wx.navigateBack()
  }
})