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
    title: '图片编辑',
    description: '上传图片并描述您想要实现的效果',
    upload: {
      label: '上传图片',
    },
    prompt: {
      label: '编辑要求',
      description: '请描述您希望如何修改图片',
      placeholder: '例如：将背景改为蓝天白云、将发型改为短发、调整图片亮度等...',
    },
    button: {
      processing: '处理中...',
      generate: '开始编辑',
    },
    result: {
      title: '效果预览',
      description: '编辑后的图片效果',
      success: '编辑完成',
      error: '编辑失败',
      timeout: '处理超时',
      checkFailed: '状态检查失败',
    },
  },
  styleTransform: {
    title: '风格转换',
    description: '上传图片并选择您想要转换的艺术风格',
    upload: {
      label: '上传图片',
    },
    prompt: {
      label: '风格要求',
      description: '请选择您希望转换的艺术风格',
      placeholder: '选择艺术风格',
    },
    button: {
      processing: '生成中...',
      generate: '生成图片',
    },
    result: {
      title: '风格转换效果',
      description: '风格转换后的图片预览',
      success: '风格转换成功',
      error: '图片生成失败',
      timeout: '图片生成超时',
      checkFailed: '检查状态失败',
    },
  },
  avatarGeneration: {
    title: '头像生成',
    description: '上传照片并选择风格来创建您的专属头像',
    upload: {
      label: '上传照片',
    },
    prompt: {
      label: '选择风格',
      description: '为您的头像选择背景风格',
      placeholder: '选择背景',
    },
    button: {
      processing: '生成中...',
      generate: '生成头像',
    },
    result: {
      title: '头像',
      description: '生成的头像预览',
      success: '头像生成成功',
      error: '头像生成失败',
      timeout: '头像生成超时',
      checkFailed: '检查状态失败',
    },
  },
  imageGeneration: {
    title: '生成图片',
    description: '描述您想要生成的图片',
    prompt: {
      label: '您的提示词',
      description: '详细描述您想要生成的图片',
      placeholder: '描述您想要生成的图片，例如"一只在草地上奔跑的金毛犬"、"夕阳下的海滩风景"...',
    },
    button: {
      processing: '生成中...',
      generate: '生成图片',
    },
    result: {
      title: '生成图片',
      description: '图片生成结果',
      success: '图片生成成功',
      error: '图片生成失败',
      timeout: '图片生成超时',
      checkFailed: '检查状态失败',
    },
  },
  resultDisplay: {
    altText: '处理结果图片',
    completed: '处理完成',
    processing: '正在处理您的图片...',
    defaultMessage: '在这里查看生成结果',
    download: '下载图片',
  },
  imageUploader: {
    changeImage: '更换图片',
    uploadImage: '上传图片',
    supportedFormats: '支持 JPG、PNG、WebP 格式',
    altText: '已上传的图片',
  },
} as const;
