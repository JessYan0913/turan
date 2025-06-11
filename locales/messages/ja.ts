// locales/ja.ts
export default {
  auth: {
    email: 'メールアドレス',
    emailPlaceholder: 'user@example.com',
    password: 'パスワード',
  },
  login: {
    title: 'ログイン',
    subtitle: 'メールアドレスとパスワードを使用してログイン',
    noAccount: 'まだアカウントがありませんか？',
    signUpLink: 'サインアップ',
    signUpSuffix: '無料体験',
    errors: {
      invalidCredentials: 'メールアドレスまたはパスワードが正しくありません。',
      validationFailed: '入力内容を確認してから再度お試しください。',
    },
  },
  register: {
    title: 'アカウント作成',
    submit: 'サインアップ',
    subtitle: 'メールアドレスとパスワードを使用してアカウントを作成',
    alreadyHaveAccount: '既にアカウントがありますか？',
    signInLink: 'ログイン',
    signInSuffix: '既にアカウントがあります',
    errors: {
      userExists: 'メールアドレスは既に使用されています。',
      createFailed: 'アカウント作成に失敗しました。',
      validationFailed: '入力内容を確認してから再度お試しください。',
      success: 'アカウント作成に成功しました！',
    },
  },
  form: {
    submit: {
      loading: '送信中',
      default: '送信',
    },
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
    subtitle: '心を込めて、一つ一つ作成',
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
    upload: {
      changeImage: '画像を変更',
      uploadImage: '画像をアップロード',
      supportedFormats: 'JPG、PNG、WebP形式に対応',
      altText: 'アップロードされた画像',
    },
    prompt: {
      placeholder: '希望の編集内容を説明してください。例：「背景を青空と白い雲に変更」「髪型をショートヘアに変更」...',
    },
    button: {
      processing: '処理中...',
      startEditing: '編集を開始',
      download: '画像をダウンロード',
    },
    result: {
      altText: '処理結果',
      completed: '処理が完了しました',
      processing: 'AIが画像を処理中です...',
      defaultMessage: '編集結果がここに表示されます',
    },
  },
  upload: {
    title: '画像をアップロード',
    description: 'クリックまたはドラッグして画像をアップロード',
    button: '画像を選択',
  },
  prompt: {
    placeholder: '希望の効果を説明してください...',
    generate: '生成',
    download: 'ダウンロード',
  },
  styles: {
    title: 'スタイルを選択',
    loading: '処理中...',
  },
  imageGeneration: {
    promptLabel: 'プロンプト',
    promptPlaceholder:
      '生成したい画像を説明してください。例：「草原を走るゴールデンレトリバー」、「夕焼けのビーチ風景」...',
    resultLabel: '生成結果',
    button: {
      processing: '生成中...',
      generate: '画像を生成',
      download: '画像をダウンロード',
    },
    result: {
      altText: '生成された画像',
      completed: '生成完了',
      processing: 'AIが画像を生成中です...',
      defaultMessage: '生成結果がここに表示されます',
    },
    success: '画像が正常に生成されました',
    errors: {
      generateFailed: '画像の生成に失敗しました',
      statusCheckFailed: 'ステータスの確認に失敗しました',
      timeout: '画像生成に時間がかかっています。後でページを更新して結果を確認してください',
      emptyPrompt: {
        title: 'プロンプトを入力してください',
        description: '画像を生成するにはプロンプトを入力してください',
      },
      downloadFailed: {
        title: 'ダウンロード失敗',
        description: '画像のダウンロードに失敗しました。もう一度お試しください',
      },
    },
  },
} as const;
