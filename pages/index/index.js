/**
 * 用户列表页面
 * 展示所有用户，支持搜索、筛选、查看详情、编辑和删除功能
 */

// 导入 API 服务
const api = require('../../utils/api.js')

/**
 * 页面实例
 * 每个页面都需要在对应 js 文件中调用 Page 方法注册页面实例
 */
Page({
  /**
   * 页面数据
   * 用于存储页面所需的所有数据
   */
  data: {
    users: [],           // 原始用户列表
    filteredUsers: [],   // 过滤后的用户列表
    searchKeyword: '',   // 搜索关键词
    filterType: 'all'    // 筛选类型：all（全部）、username（按用户名）、email（按邮箱）
  },
  
  /**
   * 页面加载时触发
   * 只会执行一次
   */
  onLoad() {
    // 加载用户数据
    this.loadUsers()
  },
  
  /**
   * 页面显示时触发
   * 每次页面显示都会执行
   */
  onShow() {
    // 重新加载用户数据，确保数据最新
    this.loadUsers()
  },
  
  /**
   * 加载用户数据
   * 从 API 获取用户列表
   */
  async loadUsers() {
    try {
      // 显示加载动画
      wx.showLoading({ title: '加载中...' })
      
      // 调用 API 获取用户列表
      const users = await api.getUsers()
      
      // 更新页面数据
      this.setData({ 
        users: users,
        filteredUsers: users  // 初始时过滤列表等于原始列表
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
   * 搜索输入事件处理
   * @param {Object} e - 事件对象
   */
  onSearchInput(e) {
    // 获取输入的关键词
    const keyword = e.detail.value
    
    // 更新搜索关键词
    this.setData({ searchKeyword: keyword })
    
    // 执行筛选
    this.filterUsers()
  },
  
  /**
   * 筛选按钮点击事件处理
   * @param {Object} e - 事件对象
   */
  onFilter(e) {
    // 获取筛选类型
    const filterType = e.currentTarget.dataset.type
    
    // 更新筛选类型
    this.setData({ filterType })
    
    // 执行筛选
    this.filterUsers()
  },
  
  /**
   * 筛选用户列表
   * 根据搜索关键词和筛选类型过滤用户
   */
  filterUsers() {
    const { users, searchKeyword, filterType } = this.data
    let filtered = users
    
    // 根据搜索关键词过滤
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase()
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(keyword) || 
        user.username.toLowerCase().includes(keyword)
      )
    }
    
    // 根据筛选类型排序
    if (filterType === 'username') {
      // 按用户名排序
      filtered = filtered.sort((a, b) => a.username.localeCompare(b.username))
    } else if (filterType === 'email') {
      // 按邮箱排序
      filtered = filtered.sort((a, b) => a.email.localeCompare(b.email))
    }
    
    // 更新过滤后的用户列表
    this.setData({ filteredUsers: filtered })
  },
  
  /**
   * 查看用户详情
   * @param {Object} e - 事件对象
   */
  onViewDetail(e) {
    // 获取用户 ID
    const id = e.currentTarget.dataset.id
    
    // 跳转到详情页面
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },
  
  /**
   * 编辑用户
   * @param {Object} e - 事件对象
   */
  onEditUser(e) {
    // 获取用户 ID
    const id = e.currentTarget.dataset.id
    
    // 跳转到编辑页面
    wx.navigateTo({
      url: `/pages/edit/edit?id=${id}`
    })
  },
  
  /**
   * 添加用户
   */
  onAddUser() {
    // 跳转到添加页面
    wx.navigateTo({
      url: '/pages/add/add'
    })
  },
  
  /**
   * 删除用户
   * @param {Object} e - 事件对象
   */
  onDeleteUser(e) {
    // 获取用户 ID
    const id = e.currentTarget.dataset.id
    
    // 显示确认对话框
    wx.showModal({
      title: '确认删除',
      content: '确定要删除该用户吗？',
      success: async (res) => {
        // 用户确认删除
        if (res.confirm) {
          try {
            // 显示加载动画
            wx.showLoading({ title: '删除中...' })
            
            // 调用 API 删除用户
            await api.deleteUser(id)
            
            // 从本地数据中移除删除的用户
            const users = this.data.users.filter(user => user.id !== id)
            this.setData({ users })
            
            // 重新筛选用户列表
            this.filterUsers()
            
            // 隐藏加载动画
            wx.hideLoading()
            
            // 显示删除成功提示
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            })
          } catch (err) {
            // 删除失败处理
            wx.hideLoading()
            wx.showToast({
              title: '删除失败',
              icon: 'error'
            })
          }
        }
      }
    })
  }
})