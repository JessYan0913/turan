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
          description: '详细描述您想要生成的图片',
          message: '请输入提示词',
        },
        aspectRatio: {
          label: '宽高比',
          description: '选择生成图片的宽高比',
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
      description: '输入文字描述，AI 将为您生成精美图片',
      more: '加载更多示例',
    },
    faq: {
      title: '常见问题',
      subtitle: '了解关于我们的 AI 图片生成器的常见问题解答',
      list: {
        total: '8',
        items: [
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
          description: '拖放图片到此处，或点击选择',
          message: '请上传图片',
        },
        prompt: {
          label: '编辑指令',
          description: '输入您想要对图片进行的更改描述',
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
      description: '输入文字描述，AI将为您编辑图片',
      more: '加载更多示例',
    },
    'how-to-use': {
      title: '使用指南',
      description: '按照以下简单步骤创建惊艳的AI编辑图片',
      list: {
        total: '4',
        items: [
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
      description: '关于我们的AI图片编辑器的常见问题解答',
      list: {
        total: '8',
        items: [
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
          description: '描述您想要应用的风格转换效果',
          message: '请上传一张图片',
        },
        style: {
          label: '风格',
          description: '选择要应用于图片的风格',
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
      description: '浏览我们专业设计的预设系列。点击任意预设查看它如何改变您的图片。',
      apply: '应用预设',
      more: '加载更多示例',
    },
    'how-to-use': {
      title: '使用指南',
      description: '简单几步，让您的图片焕然一新',
      list: {
        total: '4',
        items: [
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
      description: '关于AI图像生成器的常见问题解答',
      list: {
        total: '6',
        items: [
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
      title: '老照片修复',
      subtitle: '用AI技术为您珍爱的老照片注入新生',
    },
    tool: {
      form: {
        image: {
          label: '旧照片',
          description: '上传需要修复的照片',
          message: '请上传图片',
        },
        colorize: {
          label: '上色',
          description: '是否将修复后的图片上色',
          'sub-label': '为修复后的图片上色',
        },
        submit: {
          loading: '处理中...',
          default: '修复照片',
        },
      },
      regenerate: '重新生成',
      download: '下载',
      idle: {
        title: '准备好修复',
        subtitle: '上传您的旧照片，使用AI进行修复。修复后的图片将在这里显示。',
      },
      error: {
        title: '出现错误',
        subtitle: '处理您的请求时遇到错误。请再次尝试。',
        try: '重试',
      },
    },
    features: {
      title01: '由',
      title02: 'FLUX Kontext 提供支持',
      description: '我们先进的AI修复技术能够以惊人的细节和精准度让您的老照片重获新生。',
      list: {
        total: '3',
        items: [
          {
            title: '修复划痕和损伤',
            description: '自动修复因时间流逝造成的撕裂、折痕、污渍等物理损伤。',
          },
          {
            title: '黑白照片上色',
            description: '将单色记忆转化为生动的彩色图像，提供历史准确且细致的上色效果。',
          },
          {
            title: '提升分辨率',
            description: '放大低分辨率扫描件，揭示隐藏细节，打造值得打印的家族传世之作。',
          },
        ],
      },
    },
    technology: {
      title01: '先进修复',
      title02: '技术',
      description: '我们的AI驱动修复流程采用尖端技术，让珍贵记忆重获新生',
      list: {
        total: '3',
        items: [
          {
            title: '智能损伤检测',
            description:
              '我们的AI自动识别照片中的各种损伤类型，从划痕、撕裂到褪色和变色，为每个区域应用最合适的修复技术。',
          },
          {
            title: '历史色彩还原',
            description: '在黑白照片上色时，我们的AI经过数千张历史图像训练，确保服装、物品和环境的色彩符合时代特征。',
          },
          {
            title: '人脸增强',
            description:
              '特别关注照片中的人脸，通过先进的面部识别技术，在增强清晰度和细节的同时，保留您所爱之人的身份特征和表情。',
          },
        ],
      },
    },
    examples: {
      title01: '修复前后',
      title02: '效果展示',
      description: '见证我们的AI修复技术实现的惊人转变',
      try: '立即上传照片',
    },
    'how-to-use': {
      title: '如何修复您的老照片',
      description: '仅需简单几步，让珍贵记忆重获新生',
      list: {
        total: '4',
        items: [
          {
            step: 1,
            title: '上传老照片',
            description: '首先上传您想要修复的老照片。您可以扫描实体照片、拖放图片文件或点击浏览文件。',
          },
          {
            step: 2,
            title: '选择修复类型',
            description: '根据照片状况选择最适合的修复类型。我们的AI将分析损伤情况并推荐最合适的修复技术。',
          },
          {
            step: 3,
            title: '查看与调整',
            description: '预览修复后的照片并进行调整。微调修复强度、色彩平衡、锐度等参数，以获得完美效果。',
          },
          {
            step: 4,
            title: '保存与分享',
            description: '下载高清修复后的照片。与家人朋友分享重获新生的记忆，或打印出来展示。',
          },
        ],
      },
    },
    faq: {
      title: '常见问题',
      description: '关于AI照片修复技术的常见问题解答',
      list: {
        total: '8',
        items: [
          {
            question: '这个工具可以修复哪些类型的照片损伤？',
            answer:
              '我们的AI修复工具能有效修复各种照片损伤，包括划痕、灰尘、撕裂、折痕、水渍和一般磨损。同时也能处理老照片常见的褪色、发黄和变色问题。',
          },
          {
            question: 'AI如何处理黑白照片的上色？',
            answer:
              'FLUX Kontext Pro模型使用先进的AI技术为黑白照片添加逼真的色彩。它会分析图像内容和上下文，应用历史准确的色彩，同时保持原始照片的自然观感。',
          },
          {
            question: '修复过程会改变原始照片吗？',
            answer: '不会，原始照片将保持完全不变。修复过程会创建一个新的增强版本，同时保留您上传的原始文件。',
          },
          {
            question: '为了获得最佳效果，推荐使用什么质量的图片？',
            answer:
              '为了获得最佳修复效果，我们建议使用高质量扫描件或数码照片。理想参数为：最低300 DPI分辨率，光线良好，并尽可能保存为TIFF或PNG等无损格式。',
          },
          {
            question: '这个工具能修复严重损坏或不完整的照片吗？',
            answer:
              '虽然该工具可以重建缺失或严重损坏的区域，但效果会因损坏程度而异。对于大面积缺失的照片，可能需要进行一些手动编辑才能获得最佳效果。',
          },
          {
            question: '修复过程需要多长时间？',
            answer:
              '处理时间取决于图像大小和所需的修复复杂程度。大多数标准照片的处理时间为30-90秒。高分辨率图像或需要大量修复的照片可能需要更长时间。',
          },
          {
            question: '支持上传哪些文件格式？',
            answer:
              '该工具支持常见图片格式，包括JPEG、PNG和WebP。为了获得最佳效果，特别是在专业扫描时，我们建议使用TIFF格式，因为它能保持最佳的图像质量。',
          },
          {
            question: '我可以调整修复的强度吗？',
            answer:
              '是的，该工具提供调整选项，让您可以控制修复效果的强度，在保留照片原始特征和应用修复增强之间取得平衡。',
          },
        ],
      },
    },
  },
  'create-avatar': {
    header: {
      title: 'Turan AI 头像生成器',
      subtitle: '用AI创建个性化头像',
    },
    tool: {
      form: {
        image: {
          label: '上传照片',
          message: '请上传一张图片',
        },
        background: {
          label: '背景风格',
          description: '选择您想要的背景风格',
          message: '请选择背景风格',
        },
        aspectRatio: {
          label: '图片宽高比',
          description: '选择生成头像的宽高比',
          message: '请选择宽高比',
        },
        submit: {
          loading: '处理中...',
          default: '生成头像',
        },
      },
      regenerate: '重新生成',
      download: '下载',
      idle: {
        title: '准备就绪',
        subtitle: '上传照片并选择背景风格，创建您的AI头像。',
      },
      error: {
        title: '出错了',
        subtitle: '生成头像失败，请尝试使用其他图片。',
        try: '重试',
      },
    },
    features: {
      title: 'AI 头像生成',
      description: '轻松创建个性化头像：只需上传照片，AI将保留您的特征，同时无缝更改背景或添加装饰元素。',
      list: {
        total: '4',
        items: [
          {
            title: '专业证件照',
            description: '创建符合官方要求的完美护照、签证和员工证件照片。',
          },
          {
            title: '社交媒体资料',
            description: '在领英、Instagram、Twitter等平台上使用吸睛头像脱颖而出。',
          },
          {
            title: '企业团队照片',
            description: '为整个团队或公司目录创建统一专业的头像。',
          },
          {
            title: '游戏与虚拟世界',
            description: '为游戏平台、元宇宙空间和虚拟社区设计独特头像。',
          },
        ],
      },
      try: '立即体验',
    },
    'how-to-use': {
      title: '如何创建您的头像',
      subtitle: '按照以下简单步骤生成完美的AI头像',
      list: {
        total: '4',
        items: [
          {
            title: '选择头像风格',
            description: '浏览我们的示例头像风格或从空白画布开始。选择最能代表您个性或品牌的风格。',
          },
          {
            title: '自定义头像',
            description: '调整面部特征、发型、配饰和背景等，创建代表您独特风格的头像。',
          },
          {
            title: '选择艺术风格',
            description: '从写实、动漫、商务或奇幻等多种艺术风格中选择，为头像打造完美外观。',
          },
          {
            title: '生成与下载',
            description: '点击生成按钮并稍等片刻。头像准备就绪后，您可以下载多种格式，在各平台使用。',
          },
        ],
      },
    },
    faq: {
      title: '常见问题',
      subtitle: '关于AI头像生成器的常见问题解答',
      list: {
        total: '6',
        items: [
          {
            question: 'AI头像生成器是如何工作的？',
            answer:
              '我们的AI使用先进的机器学习模型，根据您的偏好生成个性化头像。只需选择您想要的风格和特征，AI将为您创建独特的头像。',
          },
          {
            question: '我可以生成多少个头像？',
            answer: '免费用户每天最多可以生成10个头像。如需无限次数生成和更多自定义选项，请考虑升级到专业版。',
          },
          {
            question: '生成的头像可以商用吗？',
            answer:
              '是的，所有生成的头像都可以免版税使用，适用于个人和商业项目，如社交媒体资料、游戏账号或商务演示等。',
          },
          {
            question: '如何获得更好的头像生成效果？',
            answer: '为了获得最佳效果，请具体说明您的定制选择。尝试不同的风格、特征和配饰组合，创建完美的头像。',
          },
          {
            question: '支持哪些图片格式？',
            answer:
              '我们的AI支持生成多种格式的头像，包括JPEG、PNG和WebP。您可以在下载选项中选择首选格式，推荐使用PNG格式以保持透明度。',
          },
          {
            question: '可以自定义头像的特定特征吗？',
            answer: '是的，您可以自定义面部特征、发型、配饰、表情和背景元素，创建真正代表您个性的个性化头像。',
          },
        ],
      },
    },
  },
  'style-transfer': {
    header: {
      title: '风格迁移',
      subtitle: '将任意图像转换为您喜欢的艺术风格',
    },
    tool: {
      form: {
        image: {
          label: '图像',
          description: '上传一张图像进行转换',
          message: '请上传图像',
        },
        styleImage: {
          label: '风格图像',
          description: '上传一张风格图像用于转换原图',
          message: '请上传风格图像',
        },
        submit: {
          loading: '处理中...',
          default: '生成头像',
        },
      },
      regenerate: '重新生成',
      download: '下载',
      idle: {
        title: '准备好修复',
        subtitle: '上传您的旧照片，使用AI进行修复。修复后的图片将在这里显示。',
      },
      error: {
        title: '出现错误',
        subtitle: '处理您的请求时遇到错误。请再次尝试。',
        try: '重试',
      },
    },
    'style-transfer-info': {
      title: 'Flux图像风格迁移AI的四大优势',
      description: '先进的AI模型，提供灵活选项，满足多样需求。',
      try: '立即体验',
      list: {
        total: '4',
        items: [
          {
            title: '多种专业模型',
            description: '可选择多种为不同任务优化的模型，如支持图像风格迁移的 Flux Redux AI 和 Flux.1 Dev 等。',
          },
          {
            title: '智能模型选择',
            description: '系统会根据输入图像和文本描述，自动推荐最合适的模型，在质量与计算成本之间取得平衡。',
          },
          {
            title: '出色的文本理解能力',
            description: '先进的自然语言处理能力，能精准理解文本提示，准确按描述生成图像效果。',
          },
          {
            title: '高性价比的处理',
            description: '灵活的模型选项，简单任务可选轻量模型，复杂任务可选高级模型，兼顾效果与成本。',
          },
        ],
      },
    },
    faq: {
      title: '常见问题',
      description: '关于风格迁移的常见问题解答',
      list: {
        total: '6',
        items: [
          {
            question: '什么是风格迁移？',
            answer: '风格迁移是一种人工智能技术，可以在保留原始图像内容的同时，应用另一幅图像的艺术风格。',
          },
          {
            question: '如何使用风格迁移功能？',
            answer: '只需上传原始图像和希望应用的风格图像，AI 将自动将风格应用于您的图像。',
          },
          {
            question: '风格迁移支持哪些图像格式？',
            answer: '支持常见图像格式，包括 JPEG、PNG 和 WebP。为获得最佳效果，建议使用高质量图像。',
          },
          {
            question: '处理一张图像需要多久？',
            answer: '处理时间取决于图像大小和服务器负载，通常在几秒到几分钟之间。高分辨率图像可能需要更长时间。',
          },
          {
            question: '风格迁移会改变我的原图吗？',
            answer: '不会，所有处理都是非破坏性的，您随时可以下载处理后的图像，原图保持不变。',
          },
          {
            question: '如何获得最佳效果？',
            answer: '为获得最佳效果，建议使用高对比度的风格图像，并尝试不同风格图像来寻找最合适的一种。',
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
