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
      startEditing: 'Start Editing',
      download: 'Download Image',
    },
  },
  upload: {
    title: 'Upload Image',
    description: 'Click or drag image here',
    button: 'Select Image',
  },
  prompt: {
    placeholder: 'Describe the effect you want...',
    generate: 'Generate',
    download: 'Download Result',
  },
  styles: {
    title: 'Choose Style',
    loading: 'Processing...',
  },
  imageGeneration: {
    promptLabel: 'Prompt',
    promptPlaceholder:
      'Describe the image you want to generate, e.g. "A golden retriever running on grass", "Beach sunset scenery"...',
    resultLabel: 'Generated Result',
    button: {
      processing: 'Generating...',
      generate: 'Generate Image',
      download: 'Download Image',
    },
    result: {
      altText: 'Generated image',
      completed: 'Generation Complete',
      processing: 'AI is generating your image...',
      defaultMessage: 'Generated result will appear here',
    },
    success: 'Image generated successfully',
    errors: {
      generateFailed: 'Failed to generate image',
      statusCheckFailed: 'Failed to check status',
      timeout: 'Image generation is taking too long, please refresh the page later to check the result',
      emptyPrompt: {
        title: 'Prompt cannot be empty',
        description: 'Please enter a prompt to generate an image',
      },
      downloadFailed: {
        title: 'Download Failed',
        description: 'Failed to download image, please try again',
      },
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
