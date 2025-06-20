// locales/en.ts
export default {
  auth: {
    email: 'Email Address',
    emailPlaceholder: 'your.email@example.com',
    password: 'Password',
  },
  login: {
    title: 'Welcome Back',
    subtitle: 'Sign in to continue to Turan',
    noAccount: 'New to Turan?',
    signUpLink: 'Create an account',
    signUpSuffix: 'Start your free trial',
    errors: {
      invalidCredentials: 'Incorrect email or password. Please try again.',
      validationFailed: 'Please check your entries and try again.',
    },
  },
  register: {
    title: 'Create Your Account',
    submit: 'Sign Up',
    subtitle: 'Join Turan to start creating',
    alreadyHaveAccount: 'Already have an account?',
    signInLink: 'Sign in',
    signInSuffix: 'Back to Sign In',
    errors: {
      userExists: 'This email is already registered.',
      createFailed: 'Account creation failed. Please try again later.',
      validationFailed: 'Please correct the errors below.',
      success: 'Account created successfully!',
    },
  },
  form: {
    submit: {
      loading: 'Processing...',
      default: 'Continue',
    },
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    minLength: 'Must be at least {min} characters',
    maxLength: 'Cannot exceed {max} characters',
  },
  navigation: {
    pricing: 'Pricing',
    works: 'My Works',
    language: 'Language',
    theme: 'Theme',
    profile: 'My Profile',
    signOut: 'Sign Out',
    signIn: 'Sign In',
    imageTools: 'Image Tools',
    tools: {
      'text-to-image': {
        title: 'Text to Image',
        description: 'Generate images from text',
      },
      'image-edit': {
        title: 'Image Edit',
        description: 'Upload an image and edit it',
      },
      'style-preset': {
        title: 'Style Preset',
        description: 'Select a preset style to edit',
      },
      'photo-restore': {
        title: 'Photo Restore',
        description: 'Restore and colorize old photos',
      },
      'style-transfer': {
        title: 'Style Transfer',
        description: 'Transfer style between two images',
      },
      'style-extract': {
        title: 'Style Extract',
        description: 'Extract style from an image',
      },
      'create-avatar': {
        title: 'Avatar Generation',
        description: 'Generate an avatar',
      },
    },
  },
  home: {
    title: 'Turan',
    subtitle: 'Transform Your Images with AI',
    tabs: {
      edit: 'Edit',
      style: 'Style Transfer',
      avatar: 'Avatar',
      generate: 'Generate',
    },
    examples: {
      title: 'Inspiring Examples',
      subtitle: 'See what our AI can create',
      imageEdit: 'Image Editing',
      styleTransfer: 'Style Transfer',
      avatarGeneration: 'Avatar Creation',
      original: 'Original',
      sliderHint: 'Slide to compare before & after',
    },
    steps: {
      title: 'Create in 3 Simple Steps',
      upload: {
        title: 'Upload',
        description: 'Choose your image to edit',
      },
      select: {
        title: 'Customize',
        description: 'Select your desired effect',
      },
      download: {
        title: 'Download',
        description: 'Save and share your creation',
      },
    },
  },
  imageEdit: {
    title: 'Edit Image',
    description: 'Upload an image and describe your desired changes',
    upload: {
      label: 'Upload Image',
    },
    prompt: {
      label: 'Edit Instructions',
      description: 'What changes would you like to make?',
      placeholder: 'E.g., "Change the background to a beach sunset" or "Make my hair longer"',
    },
    button: {
      processing: 'Processing your image...',
      generate: 'Apply Changes',
    },
    result: {
      title: 'Your Edited Image',
      description: 'Preview your changes',
      success: 'Edit complete!',
      error: 'Could not process your image',
      timeout: 'Request timed out',
      checkFailed: 'Unable to verify status',
    },
  },
  styleTransform: {
    title: 'Style Transfer',
    description: 'Transform your photos with artistic styles',
    upload: {
      label: 'Upload Photo',
    },
    prompt: {
      label: 'Choose a Style',
      description: 'Select an artistic style to apply',
      placeholder: 'Browse styles...',
    },
    button: {
      processing: 'Applying style...',
      generate: 'Transform Image',
    },
    result: {
      title: 'Stylized Image',
      description: 'Your transformed image',
      success: 'Style applied successfully!',
      error: 'Failed to apply style',
      timeout: 'Processing took too long',
      checkFailed: 'Unable to check status',
    },
  },
  avatarGeneration: {
    title: 'AI Avatar Creator',
    description: 'Turn your photo into a unique avatar',
    upload: {
      label: 'Upload Your Photo',
    },
    prompt: {
      label: 'Avatar Style',
      description: 'Choose your preferred look',
      placeholder: 'Select a style',
    },
    button: {
      processing: 'Creating your avatar...',
      generate: 'Generate Avatar',
    },
    result: {
      title: 'Your New Avatar',
      description: 'Your personalized creation',
      success: 'Avatar ready!',
      error: 'Could not create avatar',
      timeout: 'Taking longer than expected',
      checkFailed: 'Unable to check status',
    },
  },
  imageGeneration: {
    title: 'AI Image Generator',
    description: 'Bring your ideas to life with AI',
    prompt: {
      label: 'Describe Your Image',
      description: 'Be as detailed as possible',
      placeholder: 'E.g., "A cozy cabin in a snowy forest at night, warm lights in the windows, digital art style"',
    },
    button: {
      processing: 'Creating your image...',
      generate: 'Generate',
    },
    result: {
      title: 'Your AI Creation',
      description: 'Generated just for you',
      success: 'Image generated successfully!',
      error: 'Failed to generate image',
      timeout: 'Generation taking longer than usual',
      checkFailed: 'Unable to check generation status',
    },
  },
  resultDisplay: {
    altText: 'Generated image',
    completed: 'Ready!',
    processing: 'Generating your image...',
    defaultMessage: 'Your creation will appear here',
    download: 'Download',
    downloadSuccess: 'Download complete!',
    downloadError: 'Download failed',
  },
  imageUploader: {
    changeImage: 'Change photo',
    uploadImage: 'Choose an image',
    supportedFormats: 'JPG, PNG, or WebP',
    altText: 'Uploaded image preview',
  },
  works: {
    title: 'My Creations',
    filter: {
      inputPlaceholder: 'Search by title or style...',
      selectPlaceholder: 'Filter by type',
      type: {
        all: 'All Works',
        'style-transfer': 'Style Transfer',
        avatar: 'Avatar',
        edit: 'Photo Edit',
        generate: 'Generate',
      },
    },
    empty: {
      title: 'No Creations Yet',
      subtitle: 'Create your first masterpiece',
      button: 'Get Started',
    },
    alert: {
      title: 'Delete This Creation?',
      description: 'This action cannot be undone. The item will be permanently deleted.',
      cancel: 'Cancel',
      confirm: 'Delete',
      deleting: 'Deleting...',
    },
  },
  pricing: {
    title: 'Pricing Plans',
    subtitle: 'Choose the perfect plan for your creative needs',
    popularBadge: 'Most Popular',
    features: 'Features',
    limitations: 'Limitations',
    plans: {
      free: {
        name: 'Free',
        description: 'Perfect for individual users',
        buttonText: 'Get Started Free',
      },
      basic: {
        name: 'Basic',
        description: 'Perfect for individual users',
        buttonText: 'Upgrade Now',
      },
      pro: {
        name: 'Pro',
        description: 'Ideal for business users',
        buttonText: 'Upgrade Now',
      },
      enterprise: {
        name: 'Enterprise',
        description: 'For teams and businesses',
        buttonText: 'Contact Sales',
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      cancelSubscription: {
        question: 'Can I cancel my subscription anytime?',
        answer:
          'Yes, you can cancel your subscription at any time. Your subscription will remain active until the end of the current billing period.',
      },
      paymentMethods: {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, and bank transfers.',
      },
      imageStorage: {
        question: 'How long are my processed images stored?',
        answer: 'Your privacy is important to us. Processed images are automatically deleted after 30 days.',
      },
      enterpriseFeatures: {
        question: 'What features are included in the Enterprise plan?',
        answer:
          'The Enterprise plan includes dedicated support, custom model training, priority processing, and team collaboration features.',
      },
    },
  },
  profile: {
    title: 'Profile Center',
    edit: 'Edit Profile',
    bill: 'Billing',
    save: 'Save',
    cancel: 'Cancel',
    plan: {
      current: 'Current Plan',
      type: 'Plan Type',
      expiry: 'Expiry Date',
      usage: 'Usage This Month',
      upgrade: 'Upgrade Plan',
    },
    stats: {
      totalWorks: 'Total Works',
      thisMonthWorks: 'Works This Month',
      totalProcessingTime: 'Processing Time',
      workTypes: 'Work Types',
      joinDate: 'Joined on',
      distribution: 'Work Type Distribution',
      recentActivity: 'Recent Activity',
    },
    prediction: {
      title: 'Generation History',
      viewAll: 'View All',
    },
  },
  billing: {
    profile: 'Profile Center',
    title: 'Billing History',
    description: 'View your billing records',
    table: {
      id: 'ID',
      type: 'Type',
      amount: 'Points',
      balanceBefore: 'Previous Balance',
      balanceAfter: 'New Balance',
      status: 'Status',
      createdAt: 'Created At',
    },
    noRecords: 'No billing records found',
  },
  prediction: {
    profile: 'Profile Center',
    title: 'Generation History',
    description: 'View your generation records',
    table: {
      id: 'ID',
      model: 'Model',
      prompt: 'Prompt',
      status: 'Status',
      createdAt: 'Created At',
      startedAt: 'Started At',
      completedAt: 'Completed At',
    },
    status: {
      succeeded: 'Succeeded',
      failed: 'Failed',
      processing: 'Processing',
      cancelled: 'Cancelled',
      startedAt: 'Started At',
      completedAt: 'Completed At',
    },
    noRecords: 'No generation records found',
  },
  profileEdit: {
    title: 'Profile Center',
    description: 'Update your personal information and contact details',
    profile: 'Profile Center',
    form: {
      title: 'Profile Information',
    },
  },
  upgrade: {
    title: 'Upgrade Plan',
    description: 'Redeem a code to upgrade your account',
    redeemCode: 'Redeem Code',
    redeemDescription: 'Enter your activation code to upgrade your account',
    codePlaceholder: 'Enter your code',
    verify: 'Verify Code',
    verifying: 'Verifying...',
    redeem: 'Redeem Now',
    redeeming: 'Activating...',
    cancel: 'Cancel',
    credits: 'Credits',
    code: 'Code',
    expiresAt: 'Expires at',
    profile: 'Profile Center',
    success: {
      title: 'Plan Upgraded',
      description: 'Your plan has been successfully upgraded!',
    },
  },
} as const;
