# 用户管理系统 - 微信小程序
# User Management System - WeChat Mini Program

一个基于微信小程序框架开发的用户管理系统，支持用户的增删改查操作，具有良好的用户体验和完整的功能。
A user management system developed based on WeChat Mini Program framework, supporting CRUD operations for users, with good user experience and complete functionality.

## 功能特点 | Features

- 📱 **用户卡片展示**：以卡片形式展示所有用户信息 | **User Card Display**: Display all user information in card format
- 🔍 **实时搜索**：支持按用户名或姓名搜索用户 | **Real-time Search**: Support searching users by username or name
- 📋 **用户筛选**：支持按用户名或邮箱排序筛选 | **User Filtering**: Support sorting and filtering by username or email
- 📄 **用户详情**：查看用户的详细信息 | **User Details**: View detailed user information
- ✏️ **用户编辑**：修改用户信息 | **User Editing**: Modify user information
- ➕ **用户新增**：添加新用户 | **User Addition**: Add new users
- 🗑️ **用户删除**：删除用户（带确认提示） | **User Deletion**: Delete users (with confirmation prompt)
- 🛡️ **错误处理**：网络请求失败时使用模拟数据，确保应用正常运行 | **Error Handling**: Use mock data when network requests fail to ensure the app runs normally
- 🎨 **响应式设计**：适配不同屏幕尺寸 | **Responsive Design**: Adapt to different screen sizes

## 技术栈 | Technology Stack

- **前端框架**：微信小程序原生框架 | **Frontend Framework**: WeChat Mini Program native framework
- **数据请求**：微信小程序 `wx.request` API | **Data Request**: WeChat Mini Program `wx.request` API
- **样式**：WXSS (微信小程序样式语言) | **Styling**: WXSS (WeChat Mini Program Style Sheet)
- **数据管理**：页面级数据管理 + 全局数据 | **Data Management**: Page-level data management + global data
- **API**：使用 [JSONPlaceholder](https://jsonplaceholder.typicode.com) 提供的 REST API | **API**: Using REST API provided by [JSONPlaceholder](https://jsonplaceholder.typicode.com)

## 项目结构 | Project Structure

```
user-manager-app/
├── pages/              # 页面目录 | Pages directory
│   ├── index/          # 用户列表页面 | User list page
│   ├── detail/         # 用户详情页面 | User detail page
│   ├── add/            # 添加用户页面 | Add user page
│   └── edit/           # 编辑用户页面 | Edit user page
├── utils/              # 工具目录 | Utils directory
│   └── api.js          # API 请求服务 | API request service
├── app.js              # 小程序入口文件 | Mini program entry file
├── app.json            # 小程序配置文件 | Mini program configuration file
├── app.wxss            # 全局样式文件 | Global style file
└── sitemap.json        # 站点地图配置 | Sitemap configuration
```

## 快速开始 | Quick Start

### 环境要求 | Environment Requirements

- 微信开发者工具 | WeChat Developer Tools
- 微信小程序账号 | WeChat Mini Program account

### 安装步骤 | Installation Steps

1. **克隆项目** | **Clone the project**
   ```bash
   git clone <repository-url>
   cd user-manager-app
   ```

2. **打开项目** | **Open the project**
   - 打开微信开发者工具 | Open WeChat Developer Tools
   - 选择「导入项目」 | Select "Import Project"
   - 选择项目目录 | Select the project directory
   - 填写 AppID（如果没有，可以使用测试号） | Fill in AppID (you can use a test account if you don't have one)

3. **运行项目** | **Run the project**
   - 点击「编译」按钮 | Click the "Compile" button
   - 在模拟器中查看效果 | View the effect in the simulator
   - 或使用微信扫码在真机上预览 | Or use WeChat to scan the code to preview on a real device

## 核心功能说明 | Core Functionality

### 1. 用户列表页面 | User List Page
- 展示所有用户的卡片列表 | Display card list of all users
- 顶部搜索框支持实时搜索 | Top search box supports real-time search
- 筛选按钮支持按用户名或邮箱排序 | Filter buttons support sorting by username or email
- 每个卡片包含用户的姓名、用户名、邮箱 | Each card contains user's name, username, and email
- 提供「查看详情」、「编辑」、「删除」按钮 | Provide "View Details", "Edit", "Delete" buttons

### 2. 用户详情页面 | User Detail Page
- 展示用户的完整信息 | Display complete user information
- 包括 ID、姓名、用户名、邮箱、电话、网站、公司、地址等 | Including ID, name, username, email, phone, website, company, address, etc.
- 提供「返回列表」按钮 | Provide "Back to List" button

### 3. 添加用户页面 | Add User Page
- 表单输入新用户信息 | Form input for new user information
- 必填项验证（姓名、用户名、邮箱） | Required field validation (name, username, email)
- 提交后添加到用户列表 | Add to user list after submission

### 4. 编辑用户页面 | Edit User Page
- 加载并展示用户当前信息 | Load and display current user information
- 支持修改用户的各项信息 | Support modifying various user information
- 保存后更新用户列表 | Update user list after saving

## API 接口说明 | API Interface Description

项目使用 JSONPlaceholder 提供的 REST API：
The project uses REST API provided by JSONPlaceholder:

- **GET /users** - 获取所有用户 | Get all users
- **GET /users/{id}** - 获取单个用户详情 | Get single user details
- **POST /users** - 创建新用户 | Create new user
- **PUT /users/{id}** - 更新用户信息 | Update user information
- **DELETE /users/{id}** - 删除用户 | Delete user

## 模拟数据 | Mock Data

当网络请求失败或 API 不可用时，系统会自动使用内置的模拟数据，确保应用可以正常运行。模拟数据包含 5 个用户的详细信息，结构与真实 API 一致。
When network requests fail or the API is unavailable, the system automatically uses built-in mock data to ensure the app runs normally. The mock data contains detailed information for 5 users, with the same structure as the real API.

## 注意事项 | Notes

1. **网络请求域名**：由于微信小程序的安全限制，需要在小程序管理后台配置 `https://jsonplaceholder.typicode.com` 为合法域名 | **Network Request Domain**: Due to WeChat Mini Program security restrictions, you need to configure `https://jsonplaceholder.typicode.com` as a legitimate domain in the Mini Program management backend
2. **模拟数据**：在开发环境中，即使没有配置域名，应用也能通过模拟数据正常运行 | **Mock Data**: In the development environment, even if the domain is not configured, the app can run normally through mock data
3. **数据持久化**：由于使用的是 JSONPlaceholder 的测试 API，所有修改操作不会真正持久化到服务器 | **Data Persistence**: Since JSONPlaceholder's test API is used, all modification operations will not be truly persisted to the server

## 开发建议 | Development Suggestions

1. **代码结构**：项目采用模块化设计，代码结构清晰，易于维护 | **Code Structure**: The project adopts a modular design with clear code structure for easy maintenance
2. **错误处理**：完善的错误处理机制，确保应用在各种情况下都能正常运行 | **Error Handling**: Complete error handling mechanism to ensure the app runs normally in various situations
3. **用户体验**：添加了加载动画、提示信息等，提升用户体验 | **User Experience**: Added loading animations, prompt messages, etc. to improve user experience
4. **扩展性**：代码结构具有良好的扩展性，可以轻松添加新功能 | **Extensibility**: The code structure has good extensibility, allowing easy addition of new features

## 许可证 | License

MIT License

## 贡献 | Contribution

欢迎提交 Issue 和 Pull Request！
Welcome to submit Issues and Pull Requests!

---

**作者**：微信小程序开发者 | **Author**: WeChat Mini Program Developer
**版本**：1.0.0 | **Version**: 1.0.0
**更新日期**：2026-04-27 | **Update Date**: 2026-04-27