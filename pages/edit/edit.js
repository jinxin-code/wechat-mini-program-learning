/**
 * 编辑用户页面
 * 用于修改用户信息
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
    user: null,          // 用户详情数据
    userId: null,        // 用户 ID
    formData: {
      name: '',           // 姓名
      username: '',       // 用户名
      email: '',          // 邮箱
      phone: '',          // 电话
      website: '',        // 网站
      companyName: ''     // 公司名称
    }
  },
  
  /**
   * 页面加载时触发
   * @param {Object} options - 页面参数
   */
  onLoad(options) {
    // 获取从列表页面传递的用户 ID
    const id = options.id
    
    // 如果有 ID，则设置用户 ID 并加载用户详情
    if (id) {
      this.setData({ userId: id })
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
      
      // 更新页面数据，填充表单
      this.setData({
        user,
        formData: {
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone || '',
          website: user.website || '',
          companyName: user.company?.name || ''
        }
      })
      
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
   * 输入框变化事件处理
   * @param {Object} e - 事件对象
   */
  onInputChange(e) {
    // 获取字段名和输入值
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    
    // 更新表单数据
    this.setData({
      [`formData.${field}`]: value
    })
  },
  
  /**
   * 保存修改
   */
  async onSave() {
    const { formData, userId, user } = this.data
    
    // 验证必填项
    if (!formData.name || !formData.username || !formData.email) {
      wx.showToast({
        title: '请填写必填项',
        icon: 'error'
      })
      return
    }
    
    try {
      // 显示加载动画
      wx.showLoading({ title: '保存中...' })
      
      // 构建更新的用户数据
      const userData = {
        ...user,
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        company: {
          ...user.company,
          name: formData.companyName
        }
      }
      
      // 调用 API 更新用户
      await api.updateUser(userId, userData)
      
      // 隐藏加载动画
      wx.hideLoading()
      
      // 显示保存成功提示
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      })
      
      // 延迟返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    } catch (err) {
      // 保存失败处理
      wx.hideLoading()
      wx.showToast({
        title: '保存失败',
        icon: 'error'
      })
    }
  },
  
  /**
   * 取消操作
   */
  onCancel() {
    wx.navigateBack()
  }
})