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
    },
  },
  imageEdit: {
    upload: {
      changeImage: 'Change image',
      uploadImage: 'Upload image',
      supportedFormats: 'Supports JPG, PNG, WebP formats',
      altText: 'Uploaded image',
    },
    prompt: {
      placeholder:
        'Describe the edits you want, e.g. "Change the background to blue sky and white clouds", "Change the hairstyle to short hair"...',
    },
    button: {
      processing: 'Processing...',
      startEditing: 'Start Editing',
      download: 'Download Image',
    },
    result: {
      altText: 'Processed result',
      completed: 'Processing completed',
      processing: 'AI is processing your image...',
      defaultMessage: 'Edit results will be shown here',
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
    title: 'Select Style',
    loading: 'Processing...',
  },
} as const;
