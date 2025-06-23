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
  'style-selector': {
    placeholder: '选择风格',
  },
  'image-uploader': {
    placeholder: '点击上传或拖放文件到此处',
    limit: '支持 SVG、PNG、JPG 或 GIF 格式（最大 5MB）',
    uploading: '上传中...',
    change: '更换',
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
  'image-edit': {
    header: {
      title: 'Turan AI 图片编辑器',
      subtitle: '使用AI编辑您的图片',
    },
    tool: {
      form: {
        image: {
          label: '上传图片',
          discription: '拖放图片到此处，或点击选择',
          message: '请上传图片',
        },
        prompt: {
          label: '编辑指令',
          discription: '输入您想要对图片进行的更改描述',
          message: '请输入编辑指令',
        },
        submit: {
          loading: '处理中...',
          default: '生成图片',
        },
      },
      regenerate: '重新生成',
      download: '下载',
      idle: {
        title: '准备编辑',
        subtitle: '编辑后的图片将显示在这里',
      },
      error: {
        title: '出错了',
        subtitle: '处理请求时出错，请重试。',
        try: '重试',
      },
    },
    examples: {
      title01: '探索AI图片编辑器的',
      title02: '预设提示词',
      subtitle: '输入文字描述，AI将为您编辑图片',
      more: '加载更多示例',
    },
    'how-to-use': {
      title: '使用指南',
      subtitle: '按照以下简单步骤创建惊艳的AI编辑图片',
      steps: {
        total: '4',
        list: [
          {
            title: '选择示例或从头开始',
            description: '浏览我们的示例提示词，或者从您自己的创意开始。点击任意示例即可将其作为起点。',
          },
          {
            title: '自定义您的提示词',
            description: '添加关于您想要生成图片的具体细节。描述越详细，效果越好。',
          },
          {
            title: '选择图片风格',
            description: '从多种艺术风格中选择，如写实、奇幻或水彩，为您的图片打造完美外观。',
          },
          {
            title: '生成与下载',
            description: '点击生成按钮并稍等片刻。图片准备就绪后，您可以下载或进行进一步调整。',
          },
        ],
      },
    },
    faq: {
      title: '常见问题',
      subtitle: '关于我们的AI图片编辑器的常见问题解答',
      questions: {
        total: '8',
        list: [
          {
            question: '这个图片编辑工具是如何工作的？',
            answer:
              '我们的工具使用先进的AI技术，通过文字提示帮助您编辑图片。只需上传一张图片并描述您想要进行的更改，我们的系统就会在保持图片质量的同时应用您的编辑。',
          },
          {
            question: '我可以进行哪些类型的编辑？',
            answer:
              '您可以进行多种编辑，包括风格转换、对象修改、文字更改和背景替换。该工具特别擅长在保持图像特定元素一致性的同时进行精确编辑。',
          },
          {
            question: '如何获得最佳编辑效果？',
            answer:
              '为了获得最佳效果，请在提示词中具体说明。与其说"让它更好"，不如准确描述您想要更改的内容。例如："将背景变为日落时分的海滩，同时保持主体对焦"或"将其转换为带有可见笔触的水彩画"。',
          },
          {
            question: '我可以编辑图片中的文字吗？',
            answer: '是的，您可以编辑图片中的文字。使用引号指定要更改的确切文字。例如：将标志中的"欢迎"改为"你好"。',
          },
          {
            question: '编辑次数有限制吗？',
            answer: '免费用户每天最多可以进行10次编辑。如需无限次编辑和访问高级功能，请考虑升级到专业版计划。',
          },
          {
            question: '我可以将编辑后的图片用于商业用途吗？',
            answer:
              '可以，使用我们的工具编辑的所有图片都是免版税的，可以用于个人和商业项目。您拥有您创建的编辑图片的所有权利。',
          },
          {
            question: '支持哪些文件格式？',
            answer:
              '您可以上传和下载多种格式的图片，包括JPEG、PNG和WebP。该工具在应用请求的编辑的同时会保留上传图片的原始质量。',
          },
          {
            question: '如何在编辑时保留某些元素？',
            answer:
              '要在编辑时保留特定元素，请在提示词中明确说明。例如："将背景变为城市景观，同时保持人物完全不变"或"修改头发颜色但保持面部特征不变"。',
          },
        ],
      },
    },
  },
  'style-preset': {
    header: {
      title: '风格预设',
      subtitle: '一键变换您的图片风格',
    },
    tool: {
      form: {
        image: {
          label: '上传图片',
          discription: '描述您想要应用的风格转换效果',
          message: '请上传一张图片',
        },
        style: {
          label: '风格',
          discription: '选择要应用于图片的风格',
          message: '请选择一种风格',
        },
        submit: {
          loading: '处理中...',
          default: '应用风格预设',
        },
      },
      regenerate: '重新生成',
      download: '下载',
      idle: {
        title: '风格预设已就绪',
        subtitle: '您的图片将使用选定的风格预设进行转换',
      },
      error: {
        title: '出错了',
        subtitle: '处理您的请求时遇到错误，请重试。',
        try: '重试',
      },
    },
    examples: {
      title01: '探索风格预设',
      title02: 'AI图像生成器',
      subtitle: '浏览我们专业设计的预设系列。点击任意预设查看它如何改变您的图片。',
      apply: '应用预设',
      more: '加载更多示例',
    },
    'how-to-use': {
      title: '使用指南',
      subtitle: '简单几步，让您的图片焕然一新',
      steps: {
        total: '4',
        list: [
          {
            step: 1,
            title: '上传您的图片',
            description: '开始上传您想要增强的图片。您可以拖放图片或点击浏览文件。',
          },
          {
            step: 2,
            title: '浏览风格预设',
            description: '探索我们的预设系列。将鼠标悬停在每个预设上，预览它如何改变您的图片。',
          },
          {
            step: 3,
            title: '应用与自定义',
            description: '点击任意预设应用到您的图片上。调整强度并进行额外微调，打造完美效果。',
          },
          {
            step: 4,
            title: '保存与分享',
            description: '下载您处理好的图片，或将您最爱的组合保存为自定义预设，方便日后使用。',
          },
        ],
      },
    },
    faq: {
      title: '常见问题',
      subtitle: '关于AI图像生成器的常见问题解答',
      questions: {
        total: '6',
        list: [
          {
            question: '什么是风格预设？',
            answer:
              '风格预设是由专业团队精心打造的AI驱动风格模板，能够为您的图片应用行业标准的视觉效果。每个预设都经过精心设计，只需点击一下即可获得专业品质的成果，节省您的时间。',
          },
          {
            question: '我可以应用哪些类型的风格？',
            answer:
              '我们的系列包括从电影感外观、专业摄影风格到艺术诠释和商业级视觉效果的广泛选择。每种风格都经过优化，适用于各种图像类型，同时保留重要细节和品质。',
          },
          {
            question: '我可以调整风格的强度吗？',
            answer: '是的，每个风格预设都包含强度滑块，让您在保持预设专业品质的同时，微调效果以完美匹配您的期望。',
          },
          {
            question: '这些预设适用于任何图片吗？',
            answer:
              '我们的预设设计适用于大多数图片，但为了获得最佳效果，我们建议使用光线良好、高分辨率的照片。AI会自动调整风格以最适合您特定的图片内容。',
          },
          {
            question: '我可以将这些用于商业项目吗？',
            answer:
              '当然可以！使用我们的预设应用的所有风格都是免版税的，可以用于个人和商业项目。增强后的图片完全由您自由使用。',
          },
          {
            question: '如何获得最佳效果？',
            answer:
              '为了获得最佳效果，请从高质量的源图片开始。尝试不同的预设，找到最适合您内容的风格，并使用强度滑块根据您的喜好微调效果。',
          },
        ],
      },
    },
  },
  'photo-restore': {
    header: {
      title: '旧照片修复',
      subtitle: '让珍贵记忆焕发新生',
    },
    features: {
      title01: '',
      title02: '',
      subtitle: '',
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
