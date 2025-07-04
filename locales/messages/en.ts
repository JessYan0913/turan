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
    prediction: 'Prediction',
    language: 'Language',
    theme: 'Theme',
    profile: 'My Profile',
    signOut: 'Sign Out',
    signIn: 'Sign In',
    'free-tools': {
      title: 'Free Tools',
      tools: {
        'remove-bg': {
          title: 'Remove Background',
          description: 'Remove the background from an image',
        },
        'resolution-improvement': {
          title: 'Resolution Improvement',
          description: 'Improve the resolution of an image',
        },
      },
    },
    'pro-tools': {
      title: 'Professional Tools',
      tools: {
        'text-to-image': {
          title: 'Text-to-Image',
          description: 'Generate an image from a text description',
        },
        'image-edit': {
          title: 'Image Editor',
          description: 'Edit an image with text prompts',
        },
        'style-preset': {
          title: 'Style Presets',
          description: 'Apply a pre-set style to transform an image',
        },
        'photo-restore': {
          title: 'Photo Restoration',
          description: 'Restore and colorize old photos',
        },
        'style-transfer': {
          title: 'Style Transfer',
          description: 'Merge the style of two images',
        },
        'create-avatar': {
          title: 'Avatar Creator',
          description: 'Generate an avatar',
        },
        'style-extract': {
          title: 'Style Extractor',
          description: 'Analyze the style of an image',
        },
      },
    },
  },
  'loading-page': {
    hero: {
      title: 'TURAN',
      subtitle: 'AI-Powered Image Editing',
      description:
        'Transform your images with cutting-edge AI technology. From background removal to style transfer, unlock unlimited creative possibilities in seconds.',
      'free-start-creating': 'Free Start Creating',
      'pro-start-creating': 'Pro Start Creating',
      'active-user': 'Active Users',
      'images-processed': 'Images Processed',
      'satisfaction-rate': 'Satisfaction Rate',
    },
    'free-tools': {
      title: 'Free Tools',
      subtitle: 'Get started with our powerful free tools. No signup required.',
      'remove-bg': {
        title: 'Remove Background',
        description: 'AI-powered background removal in seconds',
      },
      'resolution-improvement': {
        title: 'Resolution Improvement',
        description: 'Upscale images with crystal clarity',
      },
    },
    'pro-tools': {
      title: 'Professional Tools',
      subtitle: 'Unlock advanced AI capabilities with our professional suite.',
      'text-to-image': {
        title: 'Text to Image',
        description: 'Generate stunning images from text prompts',
      },
      'image-edit': {
        title: 'Image Editor',
        description: 'Professional AI-powered image editing',
      },
      'style-preset': {
        title: 'Style Presets',
        description: 'Apply artistic styles instantly',
      },
      'photo-restore': {
        title: 'Photo Restore',
        description: 'Restore old and damaged photos',
      },
      'style-transfer': {
        title: 'Style Transfer',
        description: 'Transform images with artistic styles',
      },
      'create-avatar': {
        title: 'Avatar Creator',
        description: 'Create personalized AI avatars',
      },
    },
    testimonials: {
      title: 'What Our Users Say',
      subtitle: 'Discover how our tools are helping creators around the world',
      experience: {
        title: 'Experience',
        subtitle: "We'd love to hear how our tools have helped your creative process.",
        feedback: 'Submit Feedback',
      },
    },
    features: {
      title: 'Why Choose',
      subtitle: 'Discover how our tools are helping creators around the world',
      list: {
        total: '4',
        items: [
          {
            title: 'Lightning Fast',
            description: 'Process images in seconds with our optimized AI models',
          },
          {
            title: 'Privacy First',
            description: 'Your images are processed securely and never stored',
          },
          {
            title: 'No Downloads',
            description: 'Works directly in your browser, no software installation',
          },
          {
            title: 'Professional Quality',
            description: 'Studio-grade results powered by cutting-edge AI',
          },
        ],
      },
    },
    cta: {
      title: 'Ready to Transform Your Images?',
      description: 'Join millions of creators who trust Turan for their image editing needs.',
      'start-creating': 'Get Started Free',
    },
  },
  'aspect-ratio-selector': {
    'aspect-ratio': 'Aspect Ratio',
    proportion: 'proportion',
    placeholder: 'Select aspect ratio',
  },
  'style-selector': {
    placeholder: 'Select style',
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
          description: 'Describe the image you want to generate in detail',
          message: 'Please enter a prompt',
        },
        aspectRatio: {
          label: 'Aspect Ratio',
          description: 'Select the aspect ratio for your generated image',
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
      description: 'Input text description, AI will generate beautiful images for you',
      more: 'Load More Examples',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about our AI image generator',
      list: {
        total: '8',
        items: [
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
  'image-edit': {
    header: {
      title: 'Turan AI Image Editor',
      subtitle: 'Edit your images with AI',
    },
    tool: {
      form: {
        image: {
          label: 'Upload Image',
          description: 'Drag and drop an image here, or click to select',
          message: 'Please upload an imag',
        },
        prompt: {
          label: 'Edit Instructions',
          description: 'Enter a description of the changes you want to make to the image.',
          message: 'Please enter a prompt',
        },
        submit: {
          loading: 'Processing...',
          default: 'Generate Image',
        },
      },
      regenerate: 'Regenerate',
      download: 'Download',
      idle: {
        title: 'Ready to Edit',
        subtitle: 'Your edited image will appear here',
      },
      error: {
        title: 'Something went wrong',
        subtitle: 'We encountered an error while processing your request. Please try again.',
        try: 'Try Again',
      },
    },
    examples: {
      title01: 'Explore Pre-made Prompts for the',
      title02: 'AI Image Editor',
      description: 'Input text description, AI will edit your images for you',
      more: 'Load More Examples',
    },
    'how-to-use': {
      title: 'How to Use',
      description: 'Follow these simple steps to create amazing AI-generated images',
      list: {
        total: '4',
        items: [
          {
            title: 'Choose an Example or Start Fresh',
            description:
              'Browse through our example prompts or start with your own creative idea. Click on any example to use it as a starting point.',
          },
          {
            title: 'Customize Your Prompt',
            description:
              'Refine your prompt with specific details about the image you want to generate. The more descriptive you are, the better the results will be.',
          },
          {
            title: 'Select Image Style',
            description:
              'Choose from various artistic styles like Realistic, Fantasy, or Watercolor to give your image the perfect look and feel.',
          },
          {
            title: 'Generate & Download',
            description:
              'Click the generate button and wait a few moments. Once your image is ready, you can download it or make further adjustments.',
          },
        ],
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions about our AI image generator',
      list: {
        total: '8',
        items: [
          {
            question: 'How does the image editing tool work?',
            answer:
              'Our tool uses advanced AI to help you edit images using text prompts. Simply upload an image and describe the changes you want to make, and our system will apply your edits while maintaining image quality.',
          },
          {
            question: 'What kind of edits can I make with this tool?',
            answer:
              'You can perform various edits including style transfers, object modifications, text changes, and background replacements. The tool is particularly good at maintaining consistency while making precise edits to specific elements in your images.',
          },
          {
            question: 'How can I get the best editing results?',
            answer:
              'For optimal results, be specific in your prompts. Instead of "make it better," describe exactly what you want to change. For example, "Change the background to a beach at sunset while keeping the subject in focus" or "Convert this to a watercolor painting with visible brushstrokes."',
          },
          {
            question: 'Can I edit text within images?',
            answer:
              "Yes, you can edit text in images. Use quotation marks to specify the exact text you want to change. For example: \"change 'Welcome' to 'Hello' in the sign\".",
          },
          {
            question: 'Is there a limit to the number of edits I can make?',
            answer:
              'Free users can make up to 10 edits per day. For unlimited edits and access to premium features, consider upgrading to our Pro plan.',
          },
          {
            question: 'Can I use the edited images commercially?',
            answer:
              'Yes, all images edited using our tool are royalty-free and can be used for both personal and commercial projects. You own the rights to the edited images you create.',
          },
          {
            question: 'What file formats are supported?',
            answer:
              'You can upload and download images in various formats including JPEG, PNG, and WebP. The tool preserves the original quality of your uploads while applying the requested edits.',
          },
          {
            question: 'How do I maintain certain elements while editing?',
            answer:
              'To preserve specific elements, mention what you want to keep in your prompt. For example, "Change the background to a cityscape while keeping the person exactly as they are" or "Modify the hair color but keep the facial features unchanged."',
          },
        ],
      },
    },
  },
  'style-preset': {
    header: {
      title: 'Style Presets',
      subtitle: 'Transform your images with one-click style presets',
    },
    tool: {
      form: {
        image: {
          label: 'Upload Image',
          description: 'Describe the style transformation you want to apply',
          message: 'Please upload an image',
        },
        style: {
          label: 'Style',
          description: 'Choose a style to apply to your image',
          message: 'Please select a style',
        },
        submit: {
          loading: 'Processing...',
          default: 'Apply Style Preset',
        },
      },
      regenerate: 'Regenerate',
      download: 'Download',
      idle: {
        title: 'Style Preset Ready',
        subtitle: 'Your image will be transformed with the selected style preset',
      },
      error: {
        title: 'Something went wrong',
        subtitle: 'We encountered an error while processing your request. Please try again.',
        try: 'Try Again',
      },
    },
    examples: {
      title01: 'Explore Style Presets',
      title02: 'AI Image Generator',
      description:
        'Browse our collection of professionally designed presets. Click any preset to see a preview of how it transforms your image.',
      apply: 'Apply Preset',
      more: 'Load More Examples',
    },
    'how-to-use': {
      title: 'How to Use Style Presets',
      description: 'Transform your images in just a few clicks with our easy-to-use style presets',
      list: {
        total: '4',
        items: [
          {
            step: 1,
            title: 'Upload Your Image',
            description:
              'Start by uploading an image you want to enhance. You can drag and drop an image or click to browse your files.',
          },
          {
            step: 2,
            title: 'Browse Style Presets',
            description:
              'Explore our collection of style presets. Hover over each preset to see a preview of how it will transform your image.',
          },
          {
            step: 3,
            title: 'Apply & Customize',
            description:
              'Click on any preset to apply it to your image. Adjust the intensity and make additional tweaks to perfect the look.',
          },
          {
            step: 4,
            title: 'Save & Share',
            description:
              'Download your styled image or save your favorite combinations as custom presets for future use.',
          },
        ],
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions about our AI image generator',
      list: {
        total: '6',
        items: [
          {
            question: 'What are Style Presets?',
            answer:
              'Style Presets are professionally crafted AI-powered style templates that apply industry-standard visual treatments to your images. Each preset is carefully designed by our team to deliver production-quality results with a single click, saving you time while ensuring professional-grade output.',
          },
          {
            question: 'What kind of styles can I apply?',
            answer:
              'Our collection includes a wide range of styles from cinematic looks and professional photography styles to artistic interpretations and commercial-grade visual treatments. Each style is optimized to work across various image types while preserving important details and quality.',
          },
          {
            question: 'Can I adjust the intensity of the styles?',
            answer:
              'Yes, every Style Preset includes an intensity slider, allowing you to fine-tune the effect to perfectly match your vision while maintaining the professional quality of the preset.',
          },
          {
            question: 'Will these presets work on any image?',
            answer:
              'Our presets are designed to work well with most images, but for optimal results, we recommend using well-lit, high-resolution photos. The AI will automatically adapt the style to best suit your specific image content.',
          },
          {
            question: 'Can I use these for commercial projects?',
            answer:
              'Absolutely! All styles applied using our presets are royalty-free and can be used in both personal and commercial projects. The enhanced images are yours to use as you see fit.',
          },
          {
            question: 'How do I get the best results?',
            answer:
              'For best results, start with high-quality source images. Experiment with different presets to find the perfect style for your content, and use the intensity slider to fine-tune the effect to your liking.',
          },
        ],
      },
    },
  },
  'photo-restore': {
    header: {
      title: 'Old Photo Restoration',
      subtitle: 'Breathe new life into your cherished memories with our AI-powered photo restoration',
    },
    tool: {
      form: {
        image: {
          label: 'Old Photo',
          description: 'Upload an image to restore',
          message: 'Please upload an image',
        },
        colorize: {
          label: 'Colorize',
          description: 'Whether to colorize the restored image',
          'sub-label': 'Colorize restored image',
        },
        submit: {
          loading: 'Processing...',
          default: 'Restore Photo',
        },
      },
      regenerate: 'Regenerate',
      download: 'Download',
      idle: {
        title: 'Ready to Restore',
        subtitle: 'Upload your old photo to restore it with AI. Your restored image will appear here.',
      },
      error: {
        title: 'Something went wrong',
        subtitle: 'We encountered an error while processing your request. Please try again.',
        try: 'Try Again',
      },
    },
    features: {
      title01: 'Powered by',
      title02: 'FLUX Kontext',
      description:
        'Our advanced AI restoration technology brings your old photographs back to life with incredible detail and accuracy.',
      list: {
        total: '3',
        items: [
          {
            title: 'Fix Scratches & Damage',
            description:
              'Automatically repair tears, creases, stains, and other physical damage that has accumulated over time.',
          },
          {
            title: 'Colorize Black & White Photos',
            description:
              'Transform monochrome memories into vibrant color images with historically accurate and detailed colorization.',
          },
          {
            title: 'Enhance Resolution',
            description:
              'Upscale low-resolution scans to reveal hidden details and create print-worthy restorations of your family heirlooms.',
          },
        ],
      },
    },
    technology: {
      title01: 'Advanced Restoration',
      title02: 'Technology',
      description:
        'Our AI-powered restoration process uses cutting-edge techniques to bring your memories back to life',
      list: {
        total: '3',
        items: [
          {
            title: 'Smart Damage Detection',
            description:
              'Our AI automatically identifies different types of damage in your photos, from scratches and tears to fading and discoloration, applying the appropriate restoration techniques to each area.',
          },
          {
            title: 'Historical Color Accuracy',
            description:
              'When colorizing black and white photos, our AI has been trained on thousands of historical images to ensure period-accurate colors for clothing, objects, and environments.',
          },
          {
            title: 'Face Enhancement',
            description:
              'Special attention is given to faces in your photos, with advanced facial recognition that preserves the identity and expressions of your loved ones while enhancing clarity and detail.',
          },
        ],
      },
    },
    examples: {
      title01: 'Before & After',
      title02: 'Showcase',
      description: 'See the remarkable transformations our AI restoration technology can achieve',
      try: 'Upload Your Photo Now',
    },
    'how-to-use': {
      title: 'How to Restore Your Old Photos',
      description: 'Bring your cherished memories back to life in just a few simple steps',
      list: {
        total: '4',
        items: [
          {
            step: 1,
            title: 'Upload Your Old Photo',
            description:
              'Start by uploading the old photograph you want to restore. You can scan your physical photo, drag and drop an image file, or click to browse your files.',
          },
          {
            step: 2,
            title: 'Select Restoration Type',
            description:
              "Choose the type of restoration that best suits your photo's condition. Our AI will analyze the damage and suggest the most appropriate restoration techniques.",
          },
          {
            step: 3,
            title: 'Review & Refine',
            description:
              'Preview the restored photo and make any adjustments. Fine-tune the restoration intensity, color balance, sharpness, and other parameters to achieve the perfect result.',
          },
          {
            step: 4,
            title: 'Save & Share',
            description:
              'Download your beautifully restored photograph in high resolution. Share your revitalized memories with family and friends or print them for display.',
          },
        ],
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions about our AI photo restoration technology',
      list: {
        total: '8',
        items: [
          {
            question: 'What types of photo damage can this tool repair?',
            answer:
              'Our AI-powered restoration tool can effectively repair various types of photo damage including scratches, dust spots, tears, creases, water stains, and general wear and tear. It also handles fading, yellowing, and discoloration that commonly occur in old photographs.',
          },
          {
            question: 'How does the AI handle colorization of black and white photos?',
            answer:
              'The FLUX Kontext Pro model uses advanced AI to add realistic colors to black and white photos. It analyzes the content and context of your image to apply historically accurate colors while maintaining the natural look and feel of the original photograph.',
          },
          {
            question: 'Will the restoration process change the original photo?',
            answer:
              'No, the original photo remains completely untouched. The restoration process creates a new, enhanced version of your photo while preserving the original file exactly as it was uploaded.',
          },
          {
            question: 'What is the recommended image quality for best results?',
            answer:
              'For optimal restoration, we recommend using high-quality scans or digital copies of your photos. Ideal specifications are: minimum 300 DPI resolution, well-lit conditions, and saved in lossless formats like TIFF or PNG when possible.',
          },
          {
            question: 'Can the tool restore severely damaged or partial photos?',
            answer:
              'While the tool can reconstruct missing or heavily damaged areas, results may vary depending on the extent of damage. For photos with significant portions missing, some manual editing might be needed for optimal results.',
          },
          {
            question: 'How long does the restoration process take?',
            answer:
              'Processing time depends on the image size and complexity of restoration needed. Most standard photos are processed within 30-90 seconds. Higher resolution images or those requiring extensive repairs may take longer.',
          },
          {
            question: 'What file formats are supported for upload?',
            answer:
              'The tool supports common image formats including JPEG, PNG, and WebP. For best results, especially with professional scanning, we recommend using TIFF format as it preserves maximum image quality.',
          },
          {
            question: 'Can I adjust the intensity of the restoration?',
            answer:
              'Yes, the tool provides adjustment options to control the strength of restoration effects, allowing you to balance between preserving the original character of the photo and applying restoration enhancements.',
          },
        ],
      },
    },
  },
  'create-avatar': {
    header: {
      title: 'Turan AI Avatar Generator',
      subtitle: 'Create personalized avatars with AI',
    },
    tool: {
      form: {
        image: {
          label: 'Upload Photo',
          message: 'Please upload an image',
        },
        background: {
          label: 'Background Style',
          description: 'Choose a style for your avatar background',
          message: 'Please select a background style',
        },
        aspectRatio: {
          label: 'Image Aspect Ratio',
          description: 'Select the aspect ratio for your generated avatar',
          message: 'Please select an aspect ratio',
        },
        submit: {
          loading: 'Processing...',
          default: 'Generate Avatar',
        },
      },
      regenerate: 'Regenerate',
      download: 'Download',
      idle: {
        title: 'Ready to Generate',
        subtitle: 'Upload your photo and select a background style to create your AI avatar.',
      },
      error: {
        title: 'Something Went Wrong',
        subtitle: "We couldn't generate your avatar. Please try again with a different image.",
        try: 'Try Again',
      },
    },
    features: {
      title: 'AI Avatar Generation',
      description:
        'Easily create personalized avatars: simply upload your photo, and the AI will preserve your defining features while seamlessly altering the background or adding decorative elements.',
      list: {
        total: '4',
        items: [
          {
            title: 'Professional ID Photos',
            description: 'Create perfect passport, visa, and employee ID photos that meet official requirements.',
          },
          {
            title: 'Social Media Profiles',
            description: 'Stand out on LinkedIn, Instagram, Twitter, and other platforms with eye-catching avatars.',
          },
          {
            title: 'Corporate Team Photos',
            description: 'Create consistent, professional avatars for your entire team or company directory.',
          },
          {
            title: 'Gaming and Virtual Worlds',
            description: 'Design unique avatars for gaming platforms, metaverse spaces, and virtual communities.',
          },
        ],
      },
      try: 'Try It Now',
    },
    'how-to-use': {
      title: 'How to Create Your Avatar',
      subtitle: 'Follow these simple steps to generate your perfect AI avatar',
      list: {
        total: '4',
        items: [
          {
            title: 'Choose an Avatar Style',
            description:
              'Browse through our example avatar styles or start with a blank canvas. Select a style that best represents your personality or brand.',
          },
          {
            title: 'Customize Your Avatar',
            description:
              'Adjust features like facial characteristics, hairstyle, accessories, and background to create a unique avatar that represents you.',
          },
          {
            title: 'Select Artistic Style',
            description:
              'Choose from various artistic styles like Realistic, Anime, Corporate, or Fantasy to give your avatar the perfect look and feel.',
          },
          {
            title: 'Generate & Download',
            description:
              'Click the generate button and wait a few moments. Once your avatar is ready, you can download it in various formats for use across platforms.',
          },
        ],
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about our AI avatar generator',
      list: {
        total: '6',
        items: [
          {
            question: 'How does the AI avatar generator work?',
            answer:
              'Our AI uses advanced machine learning models to generate personalized avatars based on your preferences. Simply select your desired style and features, and the AI will create a unique avatar for you.',
          },
          {
            question: 'Is there a limit to how many avatars I can generate?',
            answer:
              'Free users can generate up to 10 avatars per day. For unlimited generations and additional customization options, consider upgrading to our Pro plan.',
          },
          {
            question: 'Can I use the generated avatars commercially?',
            answer:
              'Yes, all avatars generated are royalty-free and can be used for both personal and commercial projects such as social media profiles, gaming accounts, or business presentations.',
          },
          {
            question: 'How can I get better results from the avatar generator?',
            answer:
              'For best results, be specific with your customization choices. Try different combinations of styles, features, and accessories to create your perfect avatar representation.',
          },
          {
            question: 'What image formats are supported for my avatar?',
            answer:
              'Our AI generates avatars in various formats including JPEG, PNG, and WebP. You can choose your preferred format in the download options, with PNG recommended for maintaining transparency.',
          },
          {
            question: 'Can I customize specific features of my avatar?',
            answer:
              'Yes, you can customize facial features, hairstyles, accessories, expressions, and background elements to create a truly personalized avatar that represents you.',
          },
        ],
      },
    },
  },
  'style-transfer': {
    header: {
      title: 'Style Transfer',
      subtitle: 'Transform any image into your favorite artistic style',
    },
    tool: {
      form: {
        image: {
          label: 'Image',
          description: 'Upload an image to transform it',
          message: 'Please upload an image',
        },
        styleImage: {
          label: 'Style Image',
          description: 'Upload a style image to transform the image',
          message: 'Please upload a style image',
        },
        submit: {
          loading: 'Processing...',
          default: 'Transform',
        },
      },
      regenerate: 'Regenerate',
      download: 'Download',
      idle: {
        title: 'Ready to Transform',
        subtitle: 'Upload your photo and transform it with AI. The result will appear here.',
      },
      error: {
        title: 'Error Occurred',
        subtitle: 'An error occurred while processing your request. Please try again.',
        try: 'Retry',
      },
    },
    'style-transfer-info': {
      title: 'Four Major Advantages of Flux Image to Image AI',
      description: 'Advanced AI models with flexible options to meet your needs.',
      try: 'Try it now',
      list: {
        total: '4',
        items: [
          {
            title: 'Image-driven Style Creation',
            description:
              'No need to write complex prompts. Just upload your content image and a style reference image, and AI will automatically capture the style essence and seamlessly merge it.',
          },
          {
            title: 'Accurate Style Capture',
            description:
              "AI doesn't just learn the color and brushstrokes of the style image, it also understands its composition and atmosphere, while accurately preserving the content and details of your original photo.",
          },
          {
            title: 'Endless Creative Possibilities',
            description:
              "From Van Gogh's oil paintings to cyberpunk neon lights, any image can be your style source, easily creating unique artistic works.",
          },
          {
            title: 'Instant Creation with Zero Prompts',
            description:
              'Say goodbye to the hassle of repeatedly fine-tuning prompts. With intuitive image selection, you can instantly preview and generate results, making the entire creation process smoother and more efficient.',
          },
        ],
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      description: 'Answers to common questions about style transfer',
      list: {
        total: '6',
        items: [
          {
            question: 'What is style transfer?',
            answer:
              'Style transfer is an artificial intelligence technology that can apply the artistic style of one image to another image while retaining the content of the original image.',
          },
          {
            question: 'How to use the style transfer feature?',
            answer:
              'Simply upload your original image and the artistic style image you want to apply, our AI will automatically apply the style to your image.',
          },
          {
            question: 'What image formats does style transfer support?',
            answer:
              'We support common image formats, including JPEG, PNG, and WebP. For the best results, we recommend using high-quality images.',
          },
          {
            question: 'How long does it take to process an image?',
            answer:
              'Processing time depends on image size and server load, usually ranging from a few seconds to several minutes. High-resolution images may require longer processing time.',
          },
          {
            question: 'Will style transfer change my original image?',
            answer:
              'No, all processing is non-destructive. You can download the processed image at any time, and the original image will remain unchanged.',
          },
          {
            question: 'How to get the best effect?',
            answer:
              'For the best effect, we recommend using high contrast style images and trying different style images to find the most suitable one.',
          },
        ],
      },
    },
  },
  'remove-bg': {
    header: {
      title: 'Turan AI Remove Background',
      subtitle: 'Remove backgrounds with AI',
    },
    tool: {
      form: {
        image: {
          label: 'Upload Image',
          description: 'Drag and drop an image here, or click to select',
          message: 'Please upload an imag',
        },
        submit: {
          loading: 'Processing...',
          default: 'Remove Background',
        },
      },
      regenerate: 'Process again',
      download: 'Download',
      idle: {
        title: 'Ready to Remove',
        subtitle: 'Your image with removed background will appear here',
      },
      error: {
        title: 'Something went wrong',
        subtitle: 'We encountered an error while processing your request. Please try again.',
        try: 'Try Again',
      },
    },
    examples: {
      title02: 'Remove Background',
      description: 'Upload an image, and AI will remove backgrounds for you',
      more: 'Load More Examples',
    },
    'how-to-use': {
      title: 'How to Use',
      description: 'Remove image background in simple steps',
      list: {
        total: '4',
        items: [
          {
            title: 'Upload Image',
            description:
              'Click the "Upload Image" button or drag and drop your image into the designated area. Supports common image formats like JPG and PNG.',
          },
          {
            title: 'Wait for AI Processing',
            description:
              'After uploading, our AI will automatically detect and process the image background. Processing time varies by image size and complexity, but typically completes in seconds.',
          },
          {
            title: 'Preview Results',
            description:
              'Once processed, preview the background-removed image. If satisfied, you can download it directly. If adjustments are needed, click "Regenerate".',
          },
          {
            title: 'Download or Share',
            description:
              'Download the processed transparent background image or share it directly on social media. Output is in PNG format with transparency preserved.',
          },
        ],
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      description: 'Common questions about AI background removal',
      list: {
        total: '4',
        items: [
          {
            question: 'Is the background removal feature free?',
            answer:
              'Yes, our AI background removal feature is completely free to use with no hidden charges. You can upload and remove backgrounds from images anytime without any subscription or payment required.',
          },
          {
            question: 'What image formats are supported?',
            answer:
              'We support common image formats like JPG and PNG. We recommend using PNG format for better transparency results when removing backgrounds.',
          },
          {
            question: 'Will the image quality be reduced after processing?',
            answer:
              'No. Our AI maintains the original image quality while precisely removing the background. The processed image will retain the same quality as the original.',
          },
          {
            question: 'Can I use the processed images commercially?',
            answer:
              'Yes. All images processed with our tool are completely yours to use. You have full rights to use them for both personal and commercial purposes without any additional authorization required.',
          },
        ],
      },
    },
  },
  'resolution-improvement': {
    header: {
      title: 'Turan AI Smart Resolution Enhancement',
      subtitle: 'Enhance Image Clarity with One Click',
    },
    tool: {
      form: {
        image: {
          label: 'Upload Image',
          description: 'Drag & drop your image here, or click to select',
          message: 'Please upload an image',
        },
        submit: {
          loading: 'Processing...',
          default: 'Enhance Resolution',
        },
      },
      regenerate: 'Retry',
      download: 'Download',
      idle: {
        title: 'Ready',
        subtitle: 'Your enhanced image will appear here',
      },
      error: {
        title: 'Something went wrong',
        subtitle: 'An error occurred while processing your request. Please try again.',
        try: 'Retry',
      },
    },
    'how-to-use': {
      title: 'How to Use',
      description: 'Enhance your image resolution in just a few simple steps',
      list: {
        total: '4',
        items: [
          {
            title: 'Upload Image',
            description:
              'Click the "Upload Image" button or drag and drop your image. Supports common formats like JPG and PNG.',
          },
          {
            title: 'Select Upscale Factor',
            description: 'Choose your desired upscaling factor, with options like 2x and 4x available.',
          },
          {
            title: 'Wait for AI Processing',
            description:
              'Our AI will analyze and enhance your image resolution. Processing time depends on image size and upscaling factor.',
          },
          {
            title: 'Download HD Image',
            description: 'Once processed, download your high-definition image for a clearer visual experience.',
          },
        ],
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      description: 'Common questions about image resolution enhancement',
      list: {
        total: '4',
        items: [
          {
            question: 'Is the resolution enhancement feature free?',
            answer: 'Yes, our AI resolution enhancement is completely free to use with no hidden charges.',
          },
          {
            question: 'What image formats are supported?',
            answer:
              'We support common image formats including JPG, PNG, and WEBP. For best results, use higher quality source images.',
          },
          {
            question: 'What is the maximum image size for upscaling?',
            answer:
              'We support upscaling images up to 4K resolution, ensuring the enhanced images remain sharp and clear.',
          },
          {
            question: 'Will the processed image lose quality?',
            answer:
              'Our AI algorithm intelligently repairs and enhances image details, minimizing distortion to deliver naturally clearer upscaled images.',
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
      tool: 'Tool',
      prompt: 'Prompt',
      status: 'Status',
      createdAt: 'Created At',
      startedAt: 'Started At',
      completedAt: 'Completed At',
      actions: 'Actions',
      viewDetails: 'View Details',
    },
    prediction: {
      details: 'Prediction Details',
      id: 'Prediction ID',
      basicInfo: 'Basic Information',
      tool: 'Tool',
      version: 'Version',
      createdAt: 'Created At',
      completedAt: 'Completed At',
      input: 'Input Parameters',
      output: 'Output',
      error: 'Error',
      metrics: 'Metrics',
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
