// locales/ja.ts
export default {
  auth: {
    email: 'メールアドレス',
    emailPlaceholder: 'user@example.com',
    password: 'パスワード',
  },
  login: {
    title: 'ログイン',
    subtitle: 'メールアドレスとパスワードを入力してください',
    noAccount: 'アカウントをお持ちでない方はこちら',
    signUpLink: '新規登録',
    signUpSuffix: '今すぐ無料で始める',
    errors: {
      invalidCredentials: 'メールアドレスまたはパスワードに誤りがあります。',
      validationFailed: '入力内容に不備があります。もう一度ご確認ください。',
    },
  },
  register: {
    title: 'アカウント登録',
    submit: '登録する',
    subtitle: 'メールアドレスとパスワードを設定してください',
    alreadyHaveAccount: '既にアカウントをお持ちの方はこちら',
    signInLink: 'ログイン',
    signInSuffix: 'ログインページへ',
    errors: {
      userExists: 'このメールアドレスは既に登録されています。',
      createFailed: 'アカウントの作成に失敗しました。しばらくしてから再度お試しください。',
      validationFailed: '入力内容に不備があります。もう一度ご確認ください。',
      success: 'アカウントの登録が完了しました！',
    },
  },
  form: {
    submit: {
      loading: '処理中...',
      default: '送信する',
    },
    required: '必須項目です',
    invalidEmail: '有効なメールアドレスを入力してください',
    minLength: '{min}文字以上で入力してください',
    maxLength: '{max}文字以内で入力してください',
  },
  navigation: {
    home: 'ホーム',
    pricing: '料金プラン',
    works: '作品一覧',
    language: '言語',
    theme: 'テーマ',
    profile: 'プロフィール',
    signOut: 'ログアウト',
    signIn: 'ログイン',
  },
  home: {
    title: 'トゥラン',
    subtitle: 'AIで叶える、あなたのイメージ',
    tabs: {
      edit: '画像編集',
      style: 'スタイル変換',
      avatar: 'アバター作成',
      generate: '画像作成',
    },
    examples: {
      title: '素晴らしい作例のご紹介',
      subtitle: 'AIが作り出す驚きの効果をご覧ください',
      imageEdit: '画像編集',
      styleTransfer: 'スタイル変換',
      avatarGeneration: 'アバター生成',
      original: '元画像',
      sliderHint: 'スライダーを動かして変化を確認',
    },
    steps: {
      title: 'かんたん3ステップで編集',
      upload: {
        title: '画像をアップロード',
        description: '編集したい画像を選択してください',
      },
      select: {
        title: '機能を選択',
        description: '希望の編集効果を説明してください',
      },
      download: {
        title: '結果をダウンロード',
        description: '作品を保存しましょう',
      },
    },
  },
  imageEdit: {
    title: '画像編集',
    description: '画像をアップロードして、希望の編集効果を説明してください',
    upload: {
      label: '画像をアップロード',
    },
    prompt: {
      label: '編集の説明',
      description: '希望の編集効果を説明してください',
      placeholder: '希望の編集内容を説明してください。例：「背景を青空と白い雲に変更」「髪型をショートヘアに変更」...',
    },
    button: {
      processing: '処理中...',
      generate: '編集を開始',
    },
    result: {
      title: '編集済み画像',
      description: '編集された画像のプレビュー',
      success: '編集が完了しました',
      error: '編集に失敗しました',
      timeout: '編集がタイムアウトしました',
      checkFailed: '状態の確認に失敗しました',
    },
  },
  styleTransform: {
    title: 'スタイル変換',
    description: '画像をアップロードして、適用したいアートスタイルを選択してください',
    upload: {
      label: '画像をアップロード',
    },
    prompt: {
      label: 'スタイル選択',
      description: '適用したいアートスタイルを選択してください',
      placeholder: 'アートスタイルを選択',
    },
    button: {
      processing: '変換中...',
      generate: 'スタイルを適用',
    },
    result: {
      title: 'スタイル変換の結果',
      description: 'スタイル変換後の画像のプレビュー',
      success: 'スタイル変換が完了しました',
      error: 'スタイル変換に失敗しました',
      timeout: '処理がタイムアウトしました',
      checkFailed: '状態の確認に失敗しました',
    },
  },
  avatarGeneration: {
    title: 'アバター生成',
    description: '写真をアップロードして、アバターを作成するスタイルを選択してください',
    upload: {
      label: '写真をアップロード',
    },
    prompt: {
      label: 'スタイル選択',
      description: 'アバターの背景スタイルを選択してください',
      placeholder: '背景を選択',
    },
    button: {
      processing: '生成中...',
      generate: 'アバターを生成',
    },
    result: {
      title: 'アバター',
      description: '生成されたアバターのプレビュー',
      success: 'アバターの生成が完了しました',
      error: 'アバターの生成に失敗しました',
      timeout: 'アバター生成がタイムアウトしました',
      checkFailed: '状態の確認に失敗しました',
    },
  },
  imageGeneration: {
    title: '画像生成',
    description: 'AIで作成したい画像を記述してください',
    prompt: {
      label: 'プロンプト入力',
      description: '生成したい内容を詳しく記述してください',
      placeholder:
        '生成したい画像を説明してください。例：「草原を走るゴールデンレトリバー」、「夕焼けのビーチ風景」...',
    },
    button: {
      processing: '生成中...',
      generate: '画像を生成',
    },
    result: {
      title: '生成画像',
      description: 'AIが生成した画像のプレビュー',
      success: '画像生成が成功しました',
      error: '画像生成に失敗しました',
      timeout: '画像生成がタイムアウトしました',
      checkFailed: '画像生成の確認に失敗しました',
    },
  },
  resultDisplay: {
    altText: '生成された画像',
    completed: '生成が完了しました',
    processing: '画像を生成中です...',
    defaultMessage: '生成された画像がここに表示されます',
    download: '画像をダウンロード',
    downloadSuccess: 'ダウンロードが完了しました',
    downloadError: 'ダウンロードに失敗しました',
  },
  imageUploader: {
    changeImage: '画像を変更',
    uploadImage: '画像をアップロード',
    supportedFormats: 'JPG、PNG、WebP 形式に対応',
    altText: 'アップロードされた画像',
  },
  works: {
    title: 'マイ作品',
    filter: {
      inputPlaceholder: 'タイトルやスタイルで検索...',
      selectPlaceholder: 'タイプでフィルター',
      type: {
        all: 'すべての作品',
        'style-transfer': 'スタイル転送',
        avatar: 'アバター',
        edit: '写真編集',
        generate: '生成',
      },
    },
    empty: {
      title: '作品がまだございません',
      subtitle: '最初の作品を作成して、素晴らしい作品集を始めましょう',
      button: '新規作成',
    },
    alert: {
      title: '作品の削除',
      description: 'こちらの作品を削除いたします。\nこの操作は取り消せませんが、よろしいでしょうか？',
      cancel: 'キャンセル',
      confirm: '削除する',
      deleting: '削除中...',
    },
  },
  pricing: {
    title: '料金プラン',
    subtitle: 'あなたのクリエイティブなニーズに合ったプランをお選びください',
    popularBadge: '人気',
    features: '主な機能',
    limitations: '制限事項',
    plans: {
      free: {
        name: 'フリープラン',
        description: '個人ユーザー向け',
        buttonText: '無料ではじめる',
      },
      pro: {
        name: 'プロプラン',
        description: 'ビジネスユーザー向け',
        buttonText: '今すぐアップグレード',
      },
      enterprise: {
        name: 'エンタープライズ',
        description: 'チーム・企業向け',
        buttonText: '営業に問い合わせ',
      },
    },
    faq: {
      title: 'よくある質問',
      cancelSubscription: {
        question: 'サブスクリプションはいつでも解約できますか？',
        answer: 'はい、いつでも解約可能です。解約後も現在の支払い期間が終了するまではご利用いただけます。',
      },
      paymentMethods: {
        question: 'どのようなお支払い方法が利用できますか？',
        answer: '主要なクレジットカード、PayPal、銀行振込がご利用いただけます。',
      },
      imageStorage: {
        question: '処理された画像はどのくらいの期間保存されますか？',
        answer: 'プライバシー保護のため、処理された画像は30日後に自動的に削除されます。',
      },
      enterpriseFeatures: {
        question: 'エンタープライズプランにはどのような機能が含まれますか？',
        answer: '専任サポート、カスタムモデルトレーニング、優先処理、チームコラボレーション機能などが含まれます。',
      },
    },
  },
  profile: {
    title: 'マイページ',
    edit: 'プロフィール編集',
    bill: '請求',
    save: '保存',
    cancel: 'キャンセル',
    plan: {
      current: '現在のプラン',
      type: 'プランタイプ',
      expiry: '有効期限',
      usage: '今月の利用量',
      upgrade: 'プランをアップグレード',
    },
    stats: {
      totalWorks: '総作品数',
      thisMonthWorks: '今月の作品',
      totalProcessingTime: '処理時間',
      workTypes: '作品タイプ',
      joinDate: '参加日',
      distribution: '作品タイプ分布',
      recentActivity: '最近の活動',
    },
  },
} as const;
