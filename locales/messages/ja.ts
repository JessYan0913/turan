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
    pricing: '料金プラン',
    works: '作品一覧',
    language: '言語',
    theme: 'テーマ',
    profile: 'プロフィール',
    signOut: 'ログアウト',
    signIn: 'ログイン',
    imageTools: '画像ツール',
    tools: {
      'text-to-image': {
        title: 'テキストからイメージを生成',
        description: 'テキストで画像を生成',
      },
      'image-edit': {
        title: '画像を編集',
        description: '画像をアップロードして編集',
      },
      'style-preset': {
        title: 'プリセットスタイル',
        description: 'プリセットスタイルを選択して編集',
      },
      'photo-restore': {
        title: '古い写真を復元',
        description: '古い写真を修復してカラー化',
      },
      'style-transfer': {
        title: 'スタイルを移転',
        description: '2つの画像をスタイルを融合',
      },
      'style-extract': {
        title: 'スタイルを抽出',
        description: '画像のスタイル特徴を抽出',
      },
      'create-avatar': {
        title: 'アバター生成',
        description: '生成アバター',
      },
    },
  },
  'aspect-ratio-selector': {
    'aspect-ratio': 'アスペクト比',
    proportion: '比率',
    placeholder: 'アスペクト比を選択',
  },
  'image-uploader': {
    placeholder: 'クリックしてアップロードまたはドラッグしてファイルをドロップ',
    limit: 'SVG、PNG、JPG、またはGIF（最大5MB）',
    uploading: 'アップロード中...',
    change: '変更',
  },
  'text-to-image': {
    header: {
      title: 'Turan AI 画像生成ツール',
      subtitle: 'テキストを入力するだけで、AIが美しい画像を生成します',
    },
    tool: {
      form: {
        prompt: {
          label: 'プロンプト',
          discription: '生成したい画像を詳しく説明してください',
          message: 'プロンプトを入力してください',
        },
        aspectRatio: {
          label: 'アスペクト比',
          discription: '生成する画像のアスペクト比を選択してください',
          message: 'アスペクト比を選択してください',
        },
        submit: {
          loading: '処理中...',
          default: '画像を生成',
        },
      },
      regenerate: '再生成',
      download: 'ダウンロード',
      idle: {
        title: '生成の準備ができました',
        subtitle: 'プロンプトを入力して「画像を生成」をクリックしてください',
      },
      error: {
        title: 'エラーが発生しました',
        subtitle: '画像の生成に失敗しました。別のプロンプトでお試しください。',
        try: '再試行',
      },
    },
    examples: {
      title01: 'AI画像生成のための',
      title02: 'プロンプト例',
      subtitle: 'テキストを入力するだけで、AIが美しい画像を生成します',
      more: 'もっと例を見る',
    },
    faq: {
      title: 'よくある質問',
      subtitle: 'AI画像生成ツールに関するよくある質問と回答',
      questions: {
        total: '8',
        list: [
          {
            question: 'テキストから画像への変換ツールはどのように機能しますか？',
            answer:
              '当ツールは高度なAIモデルを使用して、テキストの説明を画像に変換します。見たいものを説明文で入力するだけで、最先端のAI技術を使って画像を生成します。',
          },
          {
            question: 'このツールはどのAIモデルを使用していますか？',
            answer:
              'FLUX.1 [schnell] モデルを採用しており、わずか1〜4ステップで高品質な画像を生成できる120億パラメータの強力なAIです。',
          },
          {
            question: '1日に生成できる画像の数に制限はありますか？',
            answer:
              '無料ユーザーは1日最大10枚まで画像を生成できます。無制限の生成や追加機能をご利用の場合は、Proプランへのアップグレードをご検討ください。',
          },
          {
            question: '生成した画像を商用利用できますか？',
            answer:
              'はい、当ツールで生成された画像は、利用規約に従って個人・商用プロジェクトで自由にお使いいただけます。ロイヤリティフリーです。',
          },
          {
            question: 'より良い結果を得るにはどうすればいいですか？',
            answer:
              '最適な結果を得るには、具体的なプロンプトを入力してください。スタイル、色、構図、雰囲気などの詳細を加えると、より期待通りの画像が生成されます。',
          },
          {
            question: 'どのようなファイル形式でダウンロードできますか？',
            answer:
              'JPEG、PNG、WebPなどの形式で画像をダウンロードできます。ダウンロードオプションからお好みの形式をお選びください。',
          },
          {
            question: '生成した画像は保存されますか？',
            answer:
              'ダウンロードを可能にするため、生成された画像は一時的に保存されます。プライバシーに関する詳細は、プライバシーポリシーをご確認ください。',
          },
          {
            question: 'コンテンツの制限事項はありますか？',
            answer:
              '当ツールは、有害なコンテンツや違法なコンテンツ、同意のないコンテンツの生成には使用できません。詳細なガイドラインについては、利用規約をご確認ください。',
          },
        ],
      },
    },
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
      basic: {
        name: 'ベーシックプラン',
        description: '個人ユーザー向け',
        buttonText: '今すぐアップグレード',
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
    prediction: {
      title: '生成履歴',
      viewAll: 'すべて表示',
    },
  },
  billing: {
    profile: 'プロフィール',
    title: '請求履歴',
    description: 'あなたの積み立て状況を確認',
    table: {
      id: 'ID',
      type: 'タイプ',
      amount: 'ポイント',
      balanceBefore: '前のポイント',
      balanceAfter: '後のポイント',
      status: 'ステータス',
      createdAt: '作成日時',
    },
    noRecords: '現在の請求履歴はありません',
  },
  prediction: {
    profile: 'マイページ',
    title: '生成履歴',
    description: 'あなたの生成履歴を確認',
    table: {
      id: 'ID',
      model: 'モデル',
      prompt: 'ヒント',
      status: 'ステータス',
      createdAt: '作成日時',
      startedAt: '開始日時',
      completedAt: '完了日時',
    },
    status: {
      succeeded: '成功',
      failed: '失敗',
      processing: '処理中',
      cancelled: 'キャンセル',
    },
    noRecords: '現在の生成履歴はありません',
  },
  profileEdit: {
    title: 'プロフィール',
    description: '更新プロフィールと連絡先',
    profile: 'プロフィール',
    form: {
      title: 'プロフィール',
    },
  },
  upgrade: {
    title: 'プランアップグレード',
    description: 'アクティベーションコードを入力して、プランをアップグレードしてください',
    redeemCode: 'アクティベーションコード',
    redeemDescription: 'アクティベーションコードを入力して、プランをアップグレードしてください',
    codePlaceholder: 'アクティベーションコードを入力してください',
    verify: 'コードを確認する',
    verifying: 'コードを確認しています...',
    redeem: 'コードを適用する',
    redeeming: 'コードを適用しています...',
    cancel: 'キャンセル',
    credits: 'クレジット',
    code: 'コード',
    expiresAt: '有効期限',
    profile: 'プロフィール',
    success: {
      title: 'プランアップグレード',
      description: 'プランアップグレードが完了しました',
    },
  },
} as const;
