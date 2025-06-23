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
  'aspect-ratio-selector': {
    'aspect-ratio': '宽高比',
    proportion: '比例',
    placeholder: '选择宽高比',
  },
  'text-to-image': {
    header: {
      title: 'Turan AI 图片生成器',
      subtitle: '输入文字描述，AI 将为您生成精美图片',
    },
    tool: {
      form: {
        prompt: {
          label: '提示词',
          discription: '详细描述您想要生成的图片',
          message: '请输入提示词',
        },
        aspectRatio: {
          label: '宽高比',
          discription: '选择生成图片的宽高比',
          message: '请选择宽高比',
        },
        submit: {
          loading: '处理中...',
          default: '生成图片',
        },
      },
      regenerate: '重新生成',
      download: '下载',
      idle: {
        title: '准备生成',
        subtitle: '输入提示词并点击生成按钮创建您的图片',
      },
      error: {
        title: '出错了',
        subtitle: '无法生成您的图片，请尝试使用不同的提示词重试。',
        try: '重试',
      },
    },
    examples: {
      title01: '探索',
      title02: 'AI 图片生成器提示词',
      subtitle: '输入文字描述，AI 将为您生成精美图片',
      more: '加载更多示例',
    },
    faq: {
      title: '常见问题',
      subtitle: '了解关于我们的 AI 图片生成器的常见问题解答',
      questions: {
        total: '8',
        list: [
          {
            question: '文字转图片工具是如何工作的？',
            answer:
              '我们的工具使用先进的 AI 模型将您的文字描述转换为图片。只需输入您想要看到的内容描述，我们的系统就会使用尖端 AI 技术为您生成图片。',
          },
          {
            question: '这个工具使用什么 AI 模型？',
            answer: '我们使用 FLUX.1 [schnell] 模型，这是一个拥有 120 亿参数的强大 AI，只需 1-4 步就能生成高质量图片。',
          },
          {
            question: '我可以生成多少张图片？',
            answer: '免费用户每天最多可以生成 10 张图片。如需无限制生成和更多功能，请考虑升级到专业版计划。',
          },
          {
            question: '我可以将生成的图片用于商业用途吗？',
            answer: '可以，根据我们的服务条款，通过我们的工具生成的所有图片都是免版税的，可以用于个人和商业项目。',
          },
          {
            question: '如何获得最佳效果？',
            answer:
              '为了获得最佳效果，请提供详细的提示词。包括风格、颜色、构图和情绪等细节。我们的系统在处理清晰、结构良好的描述时效果最佳。',
          },
          {
            question: '支持下载哪些文件格式？',
            answer: '您可以下载多种格式的生成图片，包括 JPEG、PNG 和 WebP。请在下载选项中选择您喜欢的格式。',
          },
          {
            question: '你们会存储我生成的图片吗？',
            answer: '我们会临时存储生成的图片，以便您下载。有关隐私详情，请参阅我们的隐私政策。',
          },
          {
            question: '有哪些内容限制？',
            answer: '我们的工具不得用于生成有害、非法或未经同意的内容。请查看我们的可接受使用政策以获取完整指南。',
          },
        ],
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
