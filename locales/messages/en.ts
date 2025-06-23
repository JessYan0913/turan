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
  'aspect-ratio-selector': {
    'aspect-ratio': 'Aspect Ratio',
    proportion: 'proportion',
    placeholder: 'Select aspect ratio',
  },
  'image-uploader': {
    placeholder: 'Click to upload or drag and drop',
    limit: 'SVG, PNG, JPG or GIF (max. 5MB)',
    uploading: 'Uploading...',
    change: 'Change',
  },
  'text-to-image': {
    header: {
      title: 'Turan AI Image Generator',
      subtitle: 'Input text description, AI will generate beautiful images for you',
    },
    tool: {
      form: {
        prompt: {
          label: 'Prompt',
          discription: 'Describe the image you want to generate in detail',
          message: 'Please enter a prompt',
        },
        aspectRatio: {
          label: 'Aspect Ratio',
          discription: 'Select the aspect ratio for your generated image',
          message: 'Please select an aspect ratio',
        },
        submit: {
          loading: 'Processing...',
          default: 'Generate Image',
        },
      },
      regenerate: 'Regenerate',
      download: 'Download',
      idle: {
        title: 'Ready to Generate',
        subtitle: 'Enter a prompt and click generate to create your image',
      },
      error: {
        title: 'Something Went Wrong',
        subtitle: 'We couldn&apos;t generate your image. Please try again with a different prompt.',
        try: 'Try Again',
      },
    },
    examples: {
      title01: 'Explore Prompts for the',
      title02: 'AI Image Generator',
      subtitle: 'Input text description, AI will generate beautiful images for you',
      more: 'Load More Examples',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about our AI image generator',
      questions: {
        total: '8',
        list: [
          {
            question: 'How does the text-to-image tool work?',
            answer:
              'Our tool uses advanced AI models to transform your text descriptions into images. Simply enter a description of what you want to see, and our system will generate the image for you using cutting-edge AI technology.',
          },
          {
            question: 'What AI model does this tool use?',
            answer:
              'We utilize the FLUX.1 [schnell] model, a powerful 12 billion parameter AI that can generate high-quality images in just 1-4 steps.',
          },
          {
            question: 'Is there a limit to how many images I can generate?',
            answer:
              'Free users can generate up to 10 images per day. For unlimited generations and additional features, consider upgrading to our Pro plan.',
          },
          {
            question: 'Can I use the generated images commercially?',
            answer:
              'Yes, all images generated through our tool are royalty-free and can be used for both personal and commercial projects, in accordance with our terms of service.',
          },
          {
            question: 'How can I get the best results?',
            answer:
              'For optimal results, be specific with your prompts. Include details about style, colors, composition, and mood. Our system works best with clear, well-structured descriptions.',
          },
          {
            question: 'What file formats are supported for downloads?',
            answer:
              'You can download your generated images in various formats including JPEG, PNG, and WebP. Choose your preferred format in the download options.',
          },
          {
            question: 'Do you store the images I generate?',
            answer:
              'We temporarily store generated images to provide you with download access. For privacy details, please refer to our privacy policy.',
          },
          {
            question: 'What content restrictions apply?',
            answer:
              'Our tool must not be used to generate harmful, illegal, or non-consensual content. Please review our acceptable use policy for complete guidelines.',
          },
        ],
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
