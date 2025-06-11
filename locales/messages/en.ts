// locales/en.ts
export default {
  auth: {
    email: 'Email',
    emailPlaceholder: 'user@example.com',
    password: 'Password',
  },
  login: {
    title: 'Login to your account',
    subtitle: 'Use your email and password to login',
    noAccount: "Don't have an account?",
    signUpLink: 'Sign up',
    signUpSuffix: 'Free trial',
    errors: {
      invalidCredentials: 'Invalid email or password',
      validationFailed: 'Please check your input and try again',
    },
  },
  register: {
    title: 'Create an account',
    submit: 'Sign up',
    subtitle: 'Use your email and password to create an account',
    alreadyHaveAccount: 'Already have an account?',
    signInLink: 'Login',
    signInSuffix: 'Already have an account',
    errors: {
      userExists: 'The email address is already in use.',
      createFailed: 'Failed to create account',
      validationFailed: 'Please check your input and try again',
      success: 'Account created successfully!',
    },
  },
  form: {
    submit: {
      loading: 'Loading',
      default: 'Submit',
    },
  },
  navigation: {
    home: 'Home',
    pricing: 'Pricing',
    works: 'My Works',
    language: 'Language',
    theme: 'Theme',
    profile: 'Profile',
    signOut: 'Sign Out',
    signIn: 'Sign In',
  },
  home: {
    title: 'Turan',
    subtitle: 'Every creation is made with heart',
    tabs: {
      edit: 'Image Edit',
      style: 'Style Transfer',
      avatar: 'Avatar Generator',
      generate: 'Image Generator',
    },
    examples: {
      title: 'Showcase of Wonderful Examples',
      subtitle: 'See what kind of surprises our AI can create for you',
      imageEdit: 'Image Editing',
      styleTransfer: 'Style Transfer',
      avatarGeneration: 'Avatar Generation',
      original: 'Original',
      sliderHint: 'Drag the slider to see the transformation',
    },
    steps: {
      title: 'Three Simple Steps to Easy Editing',
      upload: {
        title: 'Upload Image',
        description: 'Select the image you want to edit',
      },
      select: {
        title: 'Select Feature',
        description: 'Describe the editing effect you want',
      },
      download: {
        title: 'Download Result',
        description: 'Save your creation',
      },
    },
  },
  imageEdit: {
    prompt: {
      placeholder:
        'Describe the edits you want, e.g. "Change the background to blue sky and white clouds", "Change the hairstyle to short hair"...',
    },
    button: {
      processing: 'Processing...',
      generate: 'Start Editing',
    },
    result: {
      success: 'Editing completed',
      error: 'Editing failed',
      timeout: 'Editing timeout',
      checkFailed: 'Failed to check status',
    },
  },
  styleTransform: {
    prompt: {
      placeholder: 'Select art style',
    },
    button: {
      processing: 'Generating...',
      generate: 'Generate Image',
    },
    result: {
      success: 'Image generated successfully',
      error: 'Image generation failed',
      timeout: 'Image generation timeout',
      checkFailed: 'Failed to check status',
    },
  },
  imageGeneration: {
    prompt: {
      placeholder:
        'Describe the image you want to generate, e.g. "A golden retriever running on grass", "Beach sunset scenery"...',
    },
    button: {
      processing: 'Generating...',
      generate: 'Generate Image',
    },
    result: {
      success: 'Image generated successfully',
      error: 'Image generation failed',
      timeout: 'Image generation timeout',
      checkFailed: 'Failed to check status',
    },
  },
  resultDisplay: {
    altText: 'Generated image',
    completed: 'Generation Complete',
    processing: 'AI is generating your image...',
    defaultMessage: 'Generated result will appear here',
    download: 'Download Image',
  },
  imageUploader: {
    changeImage: 'Change Image',
    uploadImage: 'Upload Image',
    supportedFormats: 'Supports JPG, PNG, WebP formats',
    altText: 'Uploaded Image',
  },
} as const;
