/**
 * API 服务模块
 * 封装了所有与后端 API 的交互操作
 * 包含错误处理和模拟数据功能
 */

// API 基础地址
const API_BASE_URL = 'https://jsonplaceholder.typicode.com/users'

/**
 * 模拟用户数据
 * 当 API 请求失败时使用，确保应用在无网络环境下也能正常运行
 */
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
 * 网络请求封装函数
 * @param {Object} options - 请求配置选项
 * @param {string} options.url - 请求地址
 * @param {string} options.method - 请求方法（GET、POST、PUT、DELETE）
 * @param {Object} options.data - 请求数据
 * @param {Object} options.header - 请求头
 * @returns {Promise} - 返回 Promise 对象
 */
function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url || API_BASE_URL,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        ...options.header
      },
      /**
       * 请求成功回调
       * @param {Object} res - 响应数据
       */
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else {
          // API 失败时使用模拟数据
          console.warn('API 请求失败，使用模拟数据', res.statusCode)
          resolve(getMockData(options))
        }
      },
      /**
       * 请求失败回调
       * @param {Object} err - 错误信息
       */
      fail(err) {
        // 网络失败时使用模拟数据
        console.warn('网络请求失败，使用模拟数据', err)
        resolve(getMockData(options))
      }
    })
  })
}

/**
 * 获取模拟数据
 * 根据请求类型和地址返回相应的模拟数据
 * @param {Object} options - 请求配置选项
 * @returns {Object|Array} - 返回模拟数据
 */
function getMockData(options) {
  const url = options.url || API_BASE_URL
  const method = options.method || 'GET'
  
  // 处理 GET 请求
  if (method === 'GET') {
    // 获取用户列表
    if (url === API_BASE_URL) {
      return mockUsers
    }
    // 获取单个用户详情
    const id = url.split('/').pop()
    const user = mockUsers.find(u => u.id === parseInt(id))
    return user || mockUsers[0]
  }
  
  // 处理 POST 请求（创建用户）
  if (method === 'POST') {
    const newUser = {
      id: mockUsers.length + 1,
      ...options.data,
      phone: options.data.phone || '',
      website: options.data.website || '',
      company: options.data.company || { name: '' },
      address: { street: '', suite: '', city: '', zipcode: '' }
    }
    mockUsers.push(newUser)
    return newUser
  }
  
  // 处理 PUT 请求（更新用户）
  if (method === 'PUT') {
    const id = url.split('/').pop()
    const userIndex = mockUsers.findIndex(u => u.id === parseInt(id))
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...options.data }
      return mockUsers[userIndex]
    }
    return mockUsers[0]
  }
  
  // 处理 DELETE 请求（删除用户）
  if (method === 'DELETE') {
    const id = url.split('/').pop()
    const userIndex = mockUsers.findIndex(u => u.id === parseInt(id))
    if (userIndex !== -1) {
      mockUsers.splice(userIndex, 1)
    }
    return { success: true }
  }
  
  return mockUsers
}

/**
 * API 接口对象
 * 封装了所有用户相关的 API 操作
 */
const api = {
  /**
   * 获取所有用户
   * @returns {Promise} - 返回用户列表
   */
  getUsers() {
    return request({
      url: API_BASE_URL
    })
  },
  
  /**
   * 获取单个用户详情
   * @param {number} id - 用户 ID
   * @returns {Promise} - 返回用户详情
   */
  getUser(id) {
    return request({
      url: `${API_BASE_URL}/${id}`
    })
  },
  
  /**
   * 创建新用户
   * @param {Object} data - 用户数据
   * @returns {Promise} - 返回创建的用户
   */
  createUser(data) {
    return request({
      url: API_BASE_URL,
      method: 'POST',
      data: data
    })
  },
  
  /**
   * 更新用户信息
   * @param {number} id - 用户 ID
   * @param {Object} data - 更新的用户数据
   * @returns {Promise} - 返回更新后的用户
   */
  updateUser(id, data) {
    return request({
      url: `${API_BASE_URL}/${id}`,
      method: 'PUT',
      data: data
    })
  },
  
  /**
   * 删除用户
   * @param {number} id - 用户 ID
   * @returns {Promise} - 返回删除结果
   */
  deleteUser(id) {
    return request({
      url: `${API_BASE_URL}/${id}`,
      method: 'DELETE'
    })
  }
}

// 导出 API 接口
module.exports = api