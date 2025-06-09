// locales/zh.ts
export default {
  auth: {
    email: '电子邮箱',
    emailPlaceholder: 'user@example.com',
    password: '密码',
  },
  login: {
    title: '登录您的账户',
    subtitle: '使用您的电子邮箱和密码登录',
    noAccount: '还没有账号？',
    signUpLink: '注册',
    signUpSuffix: '免费使用',
    errors: {
      invalidCredentials: '邮箱或密码错误',
      validationFailed: '请检查您的输入后重试',
    },
  },
  register: {
    title: '创建账户',
    submit: '注册',
    subtitle: '使用您的电子邮箱和密码创建账户',
    alreadyHaveAccount: '已有账号？',
    signInLink: '登录',
    signInSuffix: '已有账号',
    errors: {
      userExists: '该邮箱已被注册',
      createFailed: '创建账户失败',
      validationFailed: '请检查您的输入后重试',
      success: '账户创建成功！',
    },
  },
  form: {
    submit: {
      loading: '加载中',
      default: '提交表单',
    },
  },
  navigation: {
    home: '首页',
    pricing: '价格套餐',
    works: '我的作品',
    language: '语言',
    theme: '主题',
    profile: '个人资料',
    signOut: '退出登录',
    signIn: '登录',
  },
  home: {
    title: '图然 Turan',
    subtitle: '每一次生成，都是用心呈现',
    tabs: {
      edit: '图像编辑',
      style: '风格转换',
      avatar: '头像生成',
    },
  },
  imageEdit: {
    upload: {
      changeImage: '更换图片',
      uploadImage: '上传图片',
      supportedFormats: '支持 JPG、PNG、WebP 格式',
      altText: '已上传的图片',
    },
    prompt: {
      placeholder: '描述您想要的编辑效果，例如"将背景改为蓝天白云"、"将发型改为短发"...',
    },
    button: {
      processing: '处理中...',
      startEditing: '开始处理',
      download: '下载图片',
    },
    result: {
      altText: '处理结果',
      completed: '处理完成',
      processing: 'AI正在处理您的图片...',
      defaultMessage: '编辑结果将显示在这里',
    },
  },
  upload: {
    title: '上传图片',
    description: '点击或拖拽图片到此处',
    button: '选择图片',
  },
  prompt: {
    placeholder: '描述您想要的图片效果...',
    generate: '生成',
    download: '下载结果',
  },
  styles: {
    title: '选择风格',
    loading: '处理中...',
  },
} as const;
