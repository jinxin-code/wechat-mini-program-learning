/**
 * 微信小程序入口文件
 * 负责初始化小程序实例，管理全局数据和生命周期
 */

// 模拟用户数据 - 当 API 请求失败时使用
// 包含5个用户的详细信息，结构与真实 API 一致
const mockUsers = [
  {
    id: 1,
    name: 'User One',
    username: 'user1',
    email: 'user1@example.com',
    phone: '13800138001',
    website: 'user1.example.com',
    company: {
      name: 'Company A',
      catchPhrase: 'Demo catch phrase',
      bs: 'Demo business service'
    },
    address: {
      street: 'Demo Street',
      suite: 'Suite 101',
      city: 'Demo City',
      zipcode: '000000',
      geo: {
        lat: '0.0000',
        lng: '0.0000'
      }
    }
  },
  {
    id: 2,
    name: 'User Two',
    username: 'user2',
    email: 'user2@example.com',
    phone: '13800138002',
    website: 'user2.example.com',
    company: {
      name: 'Company B',
      catchPhrase: 'Demo catch phrase',
      bs: 'Demo business service'
    },
    address: {
      street: 'Demo Street',
      suite: 'Suite 102',
      city: 'Demo City',
      zipcode: '000000',
      geo: {
        lat: '0.0000',
        lng: '0.0000'
      }
    }
  },
  {
    id: 3,
    name: 'User Three',
    username: 'user3',
    email: 'user3@example.com',
    phone: '13800138003',
    website: 'user3.example.com',
    company: {
      name: 'Company C',
      catchPhrase: 'Demo catch phrase',
      bs: 'Demo business service'
    },
    address: {
      street: 'Demo Street',
      suite: 'Suite 103',
      city: 'Demo City',
      zipcode: '000000',
      geo: {
        lat: '0.0000',
        lng: '0.0000'
      }
    }
  },
  {
    id: 4,
    name: 'User Four',
    username: 'user4',
    email: 'user4@example.com',
    phone: '13800138004',
    website: 'user4.example.com',
    company: {
      name: 'Company D',
      catchPhrase: 'Demo catch phrase',
      bs: 'Demo business service'
    },
    address: {
      street: 'Demo Street',
      suite: 'Suite 104',
      city: 'Demo City',
      zipcode: '000000',
      geo: {
        lat: '0.0000',
        lng: '0.0000'
      }
    }
  },
  {
    id: 5,
    name: 'User Five',
    username: 'user5',
    email: 'user5@example.com',
    phone: '13800138005',
    website: 'user5.example.com',
    company: {
      name: 'Company E',
      catchPhrase: 'Demo catch phrase',
      bs: 'Demo business service'
    },
    address: {
      street: 'Demo Street',
      suite: 'Suite 105',
      city: 'Demo City',
      zipcode: '000000',
      geo: {
        lat: '0.0000',
        lng: '0.0000'
      }
    }
  }
]

/**
 * 小程序实例
 * 每个小程序都需要在 app.js 中调用 App 方法注册小程序实例
 */
App({
  /**
   * 全局数据
   * 可以在所有页面中通过 getApp().globalData 访问
   */
  globalData: {
    users: [],  // 用户列表数据
    apiUrl: 'https://jsonplaceholder.typicode.com/users'  // API 接口地址
  },

  /**
   * 小程序初始化时触发
   * 只会执行一次
   */
  onLaunch() {
    // 初始化时加载用户数据
    this.loadUsers()
  },

  /**
   * 加载用户数据
   * 从 API 获取数据，失败时使用模拟数据
   */
  loadUsers() {
    const that = this
    
    // 发起网络请求获取用户数据
    wx.request({
      url: this.globalData.apiUrl,  // 请求地址
      method: 'GET',  // 请求方法
      
      /**
       * 请求成功回调
       * @param {Object} res - 响应数据
       */
      success(res) {
        // 检查响应状态码
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 请求成功，更新全局数据
          that.globalData.users = res.data
          
          // 更新当前页面的数据
          const pages = getCurrentPages()
          const currentPage = pages[pages.length - 1]
          if (currentPage && currentPage.setData) {
            currentPage.setData({ users: res.data })
          }
        } else {
          // API 失败时使用模拟数据
          console.warn('API 请求失败，使用模拟数据', res.statusCode)
          that.globalData.users = mockUsers
          
          // 更新当前页面的数据
          const pages = getCurrentPages()
          const currentPage = pages[pages.length - 1]
          if (currentPage && currentPage.setData) {
            currentPage.setData({ users: mockUsers })
          }
        }
      },
      
      /**
       * 请求失败回调
       * @param {Object} err - 错误信息
       */
      fail(err) {
        // 网络失败时使用模拟数据
        console.warn('网络请求失败，使用模拟数据', err)
        that.globalData.users = mockUsers
        
        // 更新当前页面的数据
        const pages = getCurrentPages()
        const currentPage = pages[pages.length - 1]
        if (currentPage && currentPage.setData) {
          currentPage.setData({ users: mockUsers })
        }
      }
    })
  }
})