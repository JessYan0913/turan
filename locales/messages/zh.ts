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
      generate: '图像生成',
    },
    examples: {
      title: '精彩示例展示',
      subtitle: '看看我们的AI能为您创造什么样的惊喜',
      imageEdit: '图像编辑',
      styleTransfer: '风格转换',
      avatarGeneration: '头像生成',
      original: '原图',
      sliderHint: '拖动滑块查看转换效果',
    },
    steps: {
      title: '简单三步，轻松编辑',
      upload: {
        title: '上传图片',
        description: '选择您想要编辑的图片',
      },
      select: {
        title: '选择功能',
        description: '描述您想要的编辑效果',
      },
      download: {
        title: '下载结果',
        description: '保存您的创作成果',
      },
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
  imageGeneration: {
    promptLabel: '提示词',
    promptPlaceholder: '描述您想要生成的图片，例如"一只在草地上奔跑的金毛犬"、"夕阳下的海滩风景"...',
    resultLabel: '生成结果',
    button: {
      processing: '生成中...',
      generate: '生成图片',
      download: '下载图片',
    },
    result: {
      altText: '生成的图片',
      completed: '生成完成',
      processing: 'AI正在生成您的图片...',
      defaultMessage: '生成结果将显示在这里',
    },
    success: '图片生成成功',
    errors: {
      generateFailed: '生成图片失败',
      statusCheckFailed: '检查状态失败',
      timeout: '图片生成时间过长，请稍后刷新页面查看结果',
      emptyPrompt: {
        title: '提示词不能为空',
        description: '请输入提示词以生成图片',
      },
      downloadFailed: {
        title: '下载失败',
        description: '图片下载失败，请重试',
      },
    },
  },
} as const;
