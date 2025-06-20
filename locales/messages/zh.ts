// locales/zh.ts
export default {
  auth: {
    email: '电子邮箱',
    emailPlaceholder: 'user@example.com',
    password: '密码',
  },
  login: {
    title: '欢迎回来',
    subtitle: '登录 Turan 继续使用',
    noAccount: '还没有账号？',
    signUpLink: '注册',
    signUpSuffix: '立即免费体验',
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
      loading: '处理中...',
      default: '继续',
    },
  },
  navigation: {
    pricing: '价格套餐',
    works: '我的作品',
    language: '语言',
    theme: '主题',
    profile: '个人资料',
    signOut: '退出登录',
    signIn: '登录',
    imageTools: '图片工具',
    tools: {
      'text-to-image': {
        title: '文字生图',
        description: '用文字描述生成图片',
      },
      'image-edit': {
        title: '图片转换',
        description: '上传图片+提示词转换',
      },
      'style-preset': {
        title: '风格预设',
        description: '选择预设风格快速转换',
      },
      'photo-restore': {
        title: '照片修复',
        description: '老照片修复和上色',
      },
      'style-transfer': {
        title: '风格迁移',
        description: '两张图片风格融合',
      },
      'style-extract': {
        title: '风格提取',
        description: '分析图片风格特征',
      },
      'create-avatar': {
        title: '头像生成',
        description: '生成头像',
      },
    },
  },
  home: {
    title: 'Turan',
    subtitle: '每一次生成，都是用心呈现',
    tabs: {
      edit: '图像编辑',
      style: '风格转换',
      avatar: '头像生成',
      generate: '图像生成',
    },
    examples: {
      title: '灵感案例',
      subtitle: '探索 AI 的无限可能',
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
    description: '上传图片并描述您想要的修改',
    upload: {
      label: '上传图片',
    },
    prompt: {
      label: '编辑要求',
      description: '您希望如何修改这张图片？',
      placeholder: '例如："将背景改为海滩日落" 或 "把头发变长"',
    },
    button: {
      processing: '正在处理您的图片...',
      generate: '应用修改',
    },
    result: {
      title: '编辑效果预览',
      description: '查看修改后的效果',
      success: '编辑完成！',
      error: '无法处理您的图片',
      timeout: '请求超时',
      checkFailed: '无法验证状态',
    },
  },
  styleTransform: {
    title: '艺术风格转换',
    description: '为您的照片应用艺术风格',
    upload: {
      label: '上传照片',
    },
    prompt: {
      label: '风格要求',
      description: '请选择您希望转换的艺术风格',
      placeholder: '选择艺术风格',
    },
    button: {
      processing: '正在应用风格...',
      generate: '应用风格',
    },
    result: {
      title: '风格转换效果',
      description: '风格转换后的图片预览',
      success: '风格转换成功',
      error: '无法应用风格',
      timeout: '请求超时',
      checkFailed: '无法验证状态',
    },
  },
  avatarGeneration: {
    title: 'AI 头像创作',
    description: '将照片转换为独特头像',
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
    title: 'AI 图片生成',
    description: '用 AI 将您的想象变为现实',
    prompt: {
      label: '描述您想要的图片',
      description: '请尽可能详细描述',
      placeholder: '例如："雪夜森林中的温馨小屋，窗内透出温暖灯光，数字艺术风格"',
    },
    button: {
      processing: '生成中...',
      generate: '生成图片',
    },
    result: {
      title: 'AI 生成图片',
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
  works: {
    title: '我的作品',
    filter: {
      inputPlaceholder: '按标题或风格搜索...',
      selectPlaceholder: '按类型筛选',
      type: {
        all: '全部作品',
        'style-transfer': '风格转换',
        avatar: '头像生成',
        edit: '图片编辑',
        generate: '图片生成',
      },
    },
    empty: {
      title: '还没有作品',
      subtitle: '创建您的第一个作品',
      button: '开始创作',
    },
    alert: {
      title: '确认删除',
      description: '此操作不可撤销，作品将被永久删除。',
      cancel: '取消',
      confirm: '删除',
      deleting: '删除中...',
    },
  },
  pricing: {
    title: '价格套餐',
    subtitle: '选择适合您创意需求的完美套餐',
    popularBadge: '热门推荐',
    features: '功能特点',
    limitations: '使用限制',
    plans: {
      free: {
        name: '免费版',
        description: '适合个人用户体验',
        buttonText: '免费开始',
      },
      basic: {
        name: '基础版',
        description: '适合个人用户体验',
        buttonText: '立即订阅',
      },
      pro: {
        name: '专业版',
        description: '适合企业用户使用',
        buttonText: '立即订阅',
      },
      enterprise: {
        name: '企业版',
        description: '适合团队和企业',
        buttonText: '联系销售',
      },
    },
    faq: {
      title: '常见问题',
      cancelSubscription: {
        question: '可以随时取消订阅吗？',
        answer: '是的，您可以随时取消订阅。您的订阅将在当前计费周期结束前保持有效。',
      },
      paymentMethods: {
        question: '支持哪些支付方式？',
        answer: '我们支持所有主流信用卡、PayPal 和银行转账。',
      },
      imageStorage: {
        question: '处理后的图片会保存多久？',
        answer: '为保护您的隐私，处理后的图片将在30天后自动删除。',
      },
      enterpriseFeatures: {
        question: '企业版包含哪些功能？',
        answer: '企业版包含专属支持、定制模型训练、优先处理队列和团队协作功能。',
      },
    },
  },
  profile: {
    title: '个人中心',
    edit: '编辑资料',
    bill: '账单',
    save: '保存',
    cancel: '取消',
    plan: {
      current: '当前套餐',
      type: '套餐类型',
      expiry: '到期时间',
      usage: '本月使用量',
      upgrade: '升级套餐',
    },
    stats: {
      totalWorks: '总作品数',
      thisMonthWorks: '本月作品',
      totalProcessingTime: '处理时长',
      workTypes: '作品类型',
      joinDate: '加入于',
      distribution: '作品类型统计',
      recentActivity: '最近活动',
    },
    prediction: {
      title: '生成记录',
      viewAll: '查看全部',
    },
  },
  billing: {
    profile: '个人中心',
    title: '积分使用记录',
    description: '查看您的积分使用情况',
    table: {
      id: 'ID',
      type: '类型',
      amount: '积分',
      balanceBefore: '之前积分',
      balanceAfter: '之后积分',
      status: '状态',
      createdAt: '创建时间',
    },
    noRecords: '暂无积分使用记录',
  },
  prediction: {
    profile: '个人中心',
    title: '生成记录',
    description: '查看您的生成记录',
    table: {
      id: 'ID',
      model: '模型',
      prompt: '提示词',
      status: '状态',
      createdAt: '创建时间',
      startedAt: '开始时间',
      completedAt: '完成时间',
    },
    status: {
      succeeded: '成功',
      failed: '失败',
      processing: '处理中',
      cancelled: '取消',
    },
    noRecords: '暂无生成记录',
  },
  profileEdit: {
    title: '编辑资料',
    description: '更新您的个人资料和联系方式',
    profile: '个人中心',
    form: {
      title: '个人资料',
    },
  },
  upgrade: {
    title: '升级套餐',
    description: '使用激活码升级您的套餐',
    redeemCode: '激活码',
    redeemDescription: '输入激活码升级您的套餐',
    codePlaceholder: '输入激活码',
    verify: '验证',
    verifying: '验证中...',
    redeem: '升级',
    redeeming: '升级中...',
    cancel: '取消',
    credits: '积分',
    code: 'Code',
    expiresAt: '到期时间',
    profile: '个人中心',
    success: {
      title: '套餐升级成功',
      description: '您的套餐已成功升级！',
    },
  },
} as const;
