/**
 * 添加用户页面
 * 用于创建新用户
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
   * 提交表单
   */
  async onSubmit() {
    const { formData } = this.data
    
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
      wx.showLoading({ title: '提交中...' })
      
      // 构建用户数据
      const userData = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone || '',
        website: formData.website || '',
        company: {
          name: formData.companyName || ''
        },
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: ''
        }
      }
      
      // 调用 API 创建用户
      await api.createUser(userData)
      
      // 隐藏加载动画
      wx.hideLoading()
      
      // 显示添加成功提示
      wx.showToast({
        title: '添加成功',
        icon: 'success'
      })
      
      // 延迟返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    } catch (err) {
      // 添加失败处理
      wx.hideLoading()
      wx.showToast({
        title: '添加失败',
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