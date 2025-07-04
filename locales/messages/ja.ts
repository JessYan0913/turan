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
    prediction: '生成履歴',
    works: '作品一覧',
    language: '言語',
    theme: 'テーマ',
    profile: 'プロフィール',
    signOut: 'ログアウト',
    signIn: 'ログイン',
    'free-tools': {
      title: '無料ツール',
      tools: {
        'remove-bg': {
          title: '背景除去',
          description: '画像の背景を除去',
        },
        'resolution-improvement': {
          title: '画像の解像度向上',
          description: '画像の解像度を向上させる',
        },
      },
    },
    'pro-tools': {
      title: '有料ツール',
      tools: {
        'text-to-image': {
          title: 'テキストから画像',
          description: 'テキストを基に画像を生成',
        },
        'image-edit': {
          title: '画像編集',
          description: '画像をアップロードし、テキストを基に編集',
        },
        'style-preset': {
          title: 'スタイルプリセット',
          description: 'プリセットされたスタイルを選択して画像を変換',
        },
        'photo-restore': {
          title: '古い写真の修復',
          description: '古い写真を修復し、カラー化',
        },
        'style-transfer': {
          title: 'スタイル移植',
          description: '2つの画像のスタイルを融合',
        },
        'create-avatar': {
          title: 'アバター生成',
          description: 'アバターを生成',
        },
        'style-extract': {
          title: 'スタイル抽出',
          description: '画像のスタイル特徴を抽出',
        },
      },
    },
  },
  'loading-page': {
    hero: {
      title: 'TURAN',
      subtitle: 'AI搭載の画像編集',
      description: '最先端のAI技術で画像を変革。背景削除からスタイル転送まで、数秒で無限の創造の可能性を解き放ちます。',
      'free-start-creating': '無料で始める',
      'pro-start-creating': 'プロ版で始める',
      'active-user': 'アクティブユーザー',
      'images-processed': '処理画像数',
      'satisfaction-rate': '満足度',
    },
    'free-tools': {
      title: '無料ツール',
      subtitle: '強力な無料ツールを今すぐお試しください。登録不要です。',
      'remove-bg': {
        title: '背景削除',
        description: 'AIが数秒で背景を削除',
      },
      'resolution-improvement': {
        title: '解像度向上',
        description: 'クリアな高解像度にアップスケール',
      },
    },
    'pro-tools': {
      title: 'プロ仕様ツール',
      subtitle: '高度なAI機能を備えたプロフェッショナル向けツールセット',
      'text-to-image': {
        title: 'テキストから画像生成',
        description: 'テキストプロンプトから美しい画像を生成',
      },
      'image-edit': {
        title: '画像エディター',
        description: 'プロ仕様のAI画像編集',
      },
      'style-preset': {
        title: 'スタイルプリセット',
        description: 'アーティスティックなスタイルを即座に適用',
      },
      'photo-restore': {
        title: '写真修復',
        description: '古い写真や傷んだ写真を修復',
      },
      'style-transfer': {
        title: 'スタイル転送',
        description: 'アーティスティックなスタイルで画像を変身',
      },
      'create-avatar': {
        title: 'アバター作成',
        description: 'パーソナライズされたAIアバターを作成',
      },
    },
    testimonials: {
      title: 'ユーザーの声',
      subtitle: '世界中のクリエイターがどのように活用しているかご覧ください',
      experience: {
        title: '体験談',
        subtitle: 'ツールのご感想をお聞かせください',
        feedback: 'フィードバックを送信',
      },
    },
    features: {
      title: '選ばれる',
      subtitle: 'Turanが選ばれる理由をご紹介します',
      list: {
        total: '4',
        items: [
          {
            title: '超高速処理',
            description: '最適化されたAIモデルで画像を即座に処理',
          },
          {
            title: 'プライバシー保護',
            description: '画像は安全に処理され、一切保存されません',
          },
          {
            title: 'ダウンロード不要',
            description: 'ブラウザで直接利用可能、ソフトウェアのインストール不要',
          },
          {
            title: 'プロ品質',
            description: '最先端AIによるスタジオ品質の仕上がり',
          },
        ],
      },
    },
    cta: {
      title: '画像編集を始めましょう',
      description: 'Turanを信頼する何百万人ものクリエイターに加わってください',
      'start-creating': '無料で始める',
    },
  },
  'aspect-ratio-selector': {
    'aspect-ratio': 'アスペクト比',
    proportion: '比率',
    placeholder: 'アスペクト比を選択',
  },
  'style-selector': {
    placeholder: 'スタイルを選択',
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
          description: '生成したい画像を詳しく説明してください',
          message: 'プロンプトを入力してください',
        },
        aspectRatio: {
          label: 'アスペクト比',
          description: '生成する画像のアスペクト比を選択してください',
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
      description: 'テキストを入力するだけで、AIが美しい画像を生成します',
      more: 'もっと例を見る',
    },
    faq: {
      title: 'よくある質問',
      subtitle: 'AI画像生成ツールに関するよくある質問と回答',
      list: {
        total: '8',
        items: [
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
  'image-edit': {
    header: {
      title: 'Turan AI 画像エディター',
      subtitle: 'AIで画像を編集',
    },
    tool: {
      form: {
        image: {
          label: '画像をアップロード',
          description: '画像をドラッグ＆ドロップするか、クリックして選択',
          message: '画像をアップロードしてください',
        },
        prompt: {
          label: '編集指示',
          description: '画像に加えたい変更内容を入力してください',
          message: '編集内容を入力してください',
        },
        submit: {
          loading: '処理中...',
          default: '画像を生成',
        },
      },
      regenerate: '再生成',
      download: 'ダウンロード',
      idle: {
        title: '編集の準備ができました',
        subtitle: '編集された画像がここに表示されます',
      },
      error: {
        title: 'エラーが発生しました',
        subtitle: 'リクエストの処理中にエラーが発生しました。もう一度お試しください。',
        try: '再試行',
      },
    },
    examples: {
      title01: 'AI画像エディターの',
      title02: 'テンプレートプロンプトを探す',
      description: 'テキストで説明するだけで、AIが画像を編集します',
      more: '他の例を見る',
    },
    'how-to-use': {
      title: '使い方',
      description: 'AIで素晴らしい画像を生成する簡単な手順',
      list: {
        total: '4',
        items: [
          {
            title: '例を選ぶか、新規作成',
            description:
              'テンプレートプロンプトを閲覧するか、自分でアイデアを入力してください。例をクリックすると、それを出発点として使用できます。',
          },
          {
            title: 'プロンプトをカスタマイズ',
            description:
              '生成したい画像について具体的な詳細を記述してください。詳細な説明ほど、より良い結果が得られます。',
          },
          {
            title: '画像スタイルを選択',
            description:
              'リアル、ファンタジー、水彩画など、さまざまなアーティスティックスタイルから選択して、画像に最適な雰囲気を演出できます。',
          },
          {
            title: '生成とダウンロード',
            description:
              '生成ボタンをクリックしてしばらくお待ちください。画像が準備できたら、ダウンロードしたり、さらに調整したりできます。',
          },
        ],
      },
    },
    faq: {
      title: 'よくある質問',
      description: 'AI画像エディターに関するよくある質問と回答',
      list: {
        total: '8',
        items: [
          {
            question: 'この画像編集ツールはどのように機能しますか？',
            answer:
              '当ツールは高度なAIを使用して、テキストプロンプトに基づいて画像を編集します。画像をアップロードして変更したい内容を説明するだけで、画質を維持しながら編集が適用されます。',
          },
          {
            question: 'どのような編集が可能ですか？',
            answer:
              'スタイル転送、オブジェクトの変更、テキストの編集、背景の差し替えなど、さまざまな編集が可能です。特定の要素を正確に編集しながら一貫性を保つのに優れています。',
          },
          {
            question: '最適な編集結果を得るには？',
            answer:
              '「良くする」という曖昧な表現ではなく、具体的に何を変更したいのかを正確に記述してください。例：「夕焼けのビーチに背景を変えつつ、被写体にピントを合わせる」や「筆跡が見える水彩画に変換する」など。',
          },
          {
            question: '画像内のテキストを編集できますか？',
            answer:
              'はい、画像内のテキストを編集できます。変更したいテキストを正確に指定するには引用符を使用してください。例：看板の「Welcome」を「こんにちは」に変更する。',
          },
          {
            question: '編集回数に制限はありますか？',
            answer:
              '無料ユーザーは1日最大10回まで編集可能です。無制限の編集とプレミアム機能を利用するには、Proプランへのアップグレードをご検討ください。',
          },
          {
            question: '編集した画像は商用利用できますか？',
            answer:
              'はい、当ツールで編集した画像はロイヤリティフリーで、個人・商用プロジェクトの両方にご利用いただけます。編集した画像の権利はすべてお客様に帰属します。',
          },
          {
            question: '対応しているファイル形式は？',
            answer:
              'JPEG、PNG、WebPなど、さまざまな形式で画像をアップロード・ダウンロードできます。リクエストされた編集を適用しながら、元の画質を維持します。',
          },
          {
            question: '特定の要素を維持したまま編集するには？',
            answer:
              'プロンプトで保持したい要素を具体的に指定してください。例：「人物はそのままで背景を都市の風景に変更する」や「髪の色を変えつつ、顔の特徴はそのままにする」など。',
          },
        ],
      },
    },
  },
  'style-preset': {
    header: {
      title: 'スタイルプリセット',
      subtitle: 'ワンクリックで画像をプロ仕様に変身',
    },
    tool: {
      form: {
        image: {
          label: '画像をアップロード',
          description: '適用したいスタイル変換を説明してください',
          message: '画像をアップロードしてください',
        },
        style: {
          label: 'スタイル',
          description: '画像に適用するスタイルを選択',
          message: 'スタイルを選択してください',
        },
        submit: {
          loading: '処理中...',
          default: 'スタイルを適用',
        },
      },
      regenerate: '再生成',
      download: 'ダウンロード',
      idle: {
        title: 'スタイルの準備ができました',
        subtitle: '選択したスタイルプリセットで画像が変換されます',
      },
      error: {
        title: 'エラーが発生しました',
        subtitle: 'リクエストの処理中にエラーが発生しました。もう一度お試しください。',
        try: '再試行',
      },
    },
    examples: {
      title01: 'スタイルプリセットの',
      title02: 'AI画像ジェネレーター',
      description:
        'プロがデザインしたプリセットコレクションからお選びください。各プリセットをクリックすると、画像がどのように変わるかをプレビューできます。',
      apply: 'プリセットを適用',
      more: 'もっと見る',
    },
    'how-to-use': {
      title: '使い方ガイド',
      description: '簡単な操作でプロ並みの画像編集を実現',
      list: {
        total: '4',
        items: [
          {
            step: 1,
            title: '画像をアップロード',
            description:
              '編集したい画像をアップロードします。ドラッグ＆ドロップするか、クリックしてファイルを選択してください。',
          },
          {
            step: 2,
            title: 'スタイルプリセットを閲覧',
            description:
              '豊富なプリセットコレクションからお好みのスタイルをお探しください。各プリセットにマウスを乗せると、適用時のプレビューが表示されます。',
          },
          {
            step: 3,
            title: '適用とカスタマイズ',
            description:
              'お好きなプリセットをクリックして適用します。スライダーで強度を調整し、理想の見た目に仕上げましょう。',
          },
          {
            step: 4,
            title: '保存と共有',
            description:
              '完成した画像をダウンロードするか、お気に入りの組み合わせをカスタムプリセットとして保存して、後で再利用できます。',
          },
        ],
      },
    },
    faq: {
      title: 'よくあるご質問',
      description: 'AI画像ジェネレーターに関するよくある質問と回答',
      list: {
        total: '6',
        items: [
          {
            question: 'スタイルプリセットとは何ですか？',
            answer:
              'スタイルプリセットは、AIを活用したプロ仕様のスタイルテンプレートです。業界標準のビジュアル処理をワンクリックで画像に適用でき、プロ品質の結果を短時間で実現します。',
          },
          {
            question: 'どのようなスタイルを適用できますか？',
            answer:
              'シネマティックな雰囲気やプロの写真スタイルからアーティスティックな表現まで、幅広いスタイルをご用意しています。各スタイルは、重要なディテールと品質を保ちながら、さまざまな画像タイプで最適に機能するよう最適化されています。',
          },
          {
            question: 'スタイルの強さを調整できますか？',
            answer:
              'はい、各スタイルプリセットには強度スライダーが付いており、プロ品質を維持しながらお好みの効果に微調整できます。',
          },
          {
            question: 'どんな画像にも使えますか？',
            answer:
              'ほとんどの画像で良好な結果が得られますが、最適な結果を得るには、適切な照明の高解像度写真の使用をお勧めします。AIが画像の内容に最適なように自動的にスタイルを調整します。',
          },
          {
            question: '商用利用は可能ですか？',
            answer:
              'はい、プリセットを使用して適用したスタイルはすべてロイヤリティフリーで、個人・商用を問わずご利用いただけます。編集した画像は自由にお使いいただけます。',
          },
          {
            question: '最良の結果を得るには？',
            answer:
              '高品質な元画像から始めてください。異なるプリセットを試してコンテンツに最適なスタイルを見つけ、強度スライダーを使ってお好みの効果に調整してください。',
          },
        ],
      },
    },
  },
  'photo-restore': {
    header: {
      title: '古い写真の修復',
      subtitle: 'AIの力で大切な思い出に新たな命を吹き込みましょう',
    },
    tool: {
      form: {
        image: {
          label: '古い写真',
          description: '修復する画像をアップロードしてください',
          message: '画像をアップロードしてください',
        },
        colorize: {
          label: 'カラー化',
          description: '修復した画像をカラー化するかどうか',
          'sub-label': '修復画像をカラー化する',
        },
        submit: {
          loading: '処理中...',
          default: '写真を修復',
        },
      },
      regenerate: '再生成',
      download: 'ダウンロード',
      idle: {
        title: '修復の準備完了',
        subtitle: 'AIで修復するために古い写真をアップロードしてください。修復された画像がここに表示されます。',
      },
      error: {
        title: 'エラーが発生しました',
        subtitle: 'リクエストの処理中にエラーが発生しました。もう一度お試しください。',
        try: '再試行',
      },
    },
    features: {
      title01: '提供元',
      title02: 'FLUX Kontext',
      description: '高度なAI修復技術により、古い写真が驚くほどのディテールと正確さでよみがえります。',
      list: {
        total: '3',
        items: [
          {
            title: 'キズやダメージの修復',
            description: '時間の経過とともに生じた破れ、折り目、シミなどの物理的なダメージを自動的に修復します。',
          },
          {
            title: '白黒写真のカラー化',
            description: 'モノクロの思い出を、歴史的に正確で詳細な色付けにより、鮮やかなカラー画像に変えます。',
          },
          {
            title: '解像度の向上',
            description:
              '低解像度のスキャン画像を高解像度化し、隠れたディテールを再現。大切な家族の記念写真を印刷に適した状態に修復します。',
          },
        ],
      },
    },
    technology: {
      title01: '高度な修復',
      title02: 'テクノロジー',
      description: '最先端のAI技術で、大切な思い出をよみがえらせる修復プロセス',
      list: {
        total: '3',
        items: [
          {
            title: 'スマートダメージ検出',
            description:
              'AIが写真のキズ、破れ、退色、変色など、さまざまな種類のダメージを自動的に検出し、各エリアに最適な修復技術を適用します。',
          },
          {
            title: '歴史的カラー精度',
            description:
              '白黒写真のカラー化において、AIは何千もの歴史的画像で学習しており、衣装や小物、背景の色を時代考証に基づいて正確に再現します。',
          },
          {
            title: '顔の強調',
            description:
              '写真の中の顔に特別な注意を払い、高度な顔認識技術で大切な方々の表情や特徴を保ちながら、クリアさとディテールを向上させます。',
          },
        ],
      },
    },
    examples: {
      title01: 'ビフォー＆アフター',
      title02: '作例',
      description: 'AI修復技術が実現する驚きの変身をご覧ください',
      try: '今すぐ写真をアップロード',
    },
    'how-to-use': {
      title: '古い写真の修復方法',
      description: 'わずか数ステップで大切な思い出をよみがえらせましょう',
      list: {
        total: '4',
        items: [
          {
            step: 1,
            title: '古い写真をアップロード',
            description:
              '修復したい古い写真をアップロードします。物理的な写真をスキャンするか、画像ファイルをドラッグ＆ドロップ、またはクリックしてファイルを選択できます。',
          },
          {
            step: 2,
            title: '修復タイプを選択',
            description:
              '写真の状態に最適な修復タイプを選択します。AIがダメージを分析し、最も適した修復技術を提案します。',
          },
          {
            step: 3,
            title: '確認と調整',
            description:
              '修復された写真をプレビューして調整します。修復の強さ、カラーバランス、シャープネスなどのパラメータを微調整して、完璧な仕上がりに仕上げます。',
          },
          {
            step: 4,
            title: '保存と共有',
            description:
              '高解像度で美しく修復された写真をダウンロードできます。家族や友人と共有したり、印刷して飾ったりしましょう。',
          },
        ],
      },
    },
    faq: {
      title: 'よくある質問',
      description: 'AI写真修復技術に関するよくある質問と回答',
      list: {
        total: '8',
        items: [
          {
            question: 'どのような種類の写真のダメージを修復できますか？',
            answer:
              '当社のAI修復ツールは、キズ、ほこり、破れ、折り目、水染み、一般的な摩耗など、さまざまな種類の写真のダメージを効果的に修復できます。また、古い写真によく見られる退色、黄ばみ、変色にも対応しています。',
          },
          {
            question: '白黒写真のカラー化はどのように行われますか？',
            answer:
              'FLUX Kontext Proモデルは、高度なAIを使用して白黒写真にリアルな色を追加します。画像の内容と文脈を分析し、元の写真の自然な見た目を保ちながら、歴史的に正確な色を適用します。',
          },
          {
            question: '修復プロセスで元の写真は変更されますか？',
            answer:
              'いいえ、元の写真は完全にそのまま残ります。修復プロセスでは、アップロードされた元のファイルをそのまま保存し、新しい修復バージョンを作成します。',
          },
          {
            question: '最良の結果を得るには、どのような画像品質が推奨されますか？',
            answer:
              '最適な修復結果を得るには、高品質なスキャンまたはデジタルコピーを使用することをお勧めします。推奨仕様：解像度は最低300 DPI、適切な照明条件で、可能な限りTIFFやPNGなどのロスレス形式で保存された画像。',
          },
          {
            question: 'ひどく傷んだ写真や一部が欠けた写真も修復できますか？',
            answer:
              '欠けたりひどく傷んだ部分を再構築することは可能ですが、結果はダメージの程度によって異なります。大幅に欠けている部分がある写真の場合は、最適な結果を得るために手動での編集が必要になる場合があります。',
          },
          {
            question: '修復プロセスにはどれくらい時間がかかりますか？',
            answer:
              '処理時間は、画像のサイズと必要な修復の複雑さによって異なります。標準的な写真の場合は30〜90秒で処理されます。高解像度の画像や大規模な修復が必要な画像は、さらに時間がかかる場合があります。',
          },
          {
            question: 'アップロードできるファイル形式は何ですか？',
            answer:
              'JPEG、PNG、WebPなどの一般的な画像形式をサポートしています。特にプロフェッショナルなスキャンの場合は、画像品質を最大限に保つためにTIFF形式の使用をお勧めします。',
          },
          {
            question: '修復の強さを調整できますか？',
            answer:
              'はい、このツールでは修復効果の強さを調整するオプションが用意されており、写真のオリジナルの特徴を残しつつ、修復の効果をバランスよく適用できます。',
          },
        ],
      },
    },
  },
  'create-avatar': {
    header: {
      title: 'Turan AI アバタージェネレーター',
      subtitle: 'AIでパーソナライズされたアバターを作成',
    },
    tool: {
      form: {
        image: {
          label: '写真をアップロード',
          message: '画像をアップロードしてください',
        },
        background: {
          label: '背景スタイル',
          description: 'アバターの背景スタイルを選択',
          message: '背景スタイルを選択してください',
        },
        aspectRatio: {
          label: '画像アスペクト比',
          description: '生成するアバターのアスペクト比を選択',
          message: 'アスペクト比を選択してください',
        },
        submit: {
          loading: '処理中...',
          default: 'アバターを生成',
        },
      },
      regenerate: '再生成',
      download: 'ダウンロード',
      idle: {
        title: '準備完了',
        subtitle: '写真をアップロードして、AIアバターを作成するための背景スタイルを選択してください。',
      },
      error: {
        title: 'エラーが発生しました',
        subtitle: 'アバターの生成に失敗しました。別の画像でお試しください。',
        try: '再試行',
      },
    },
    features: {
      title: 'AIアバター生成',
      description:
        '写真をアップロードするだけで、AIがあなたの特徴を保ちながら、背景をシームレスに変更したり装飾を加えたりして、パーソナライズされたアバターを簡単に作成できます。',
      list: {
        total: '4',
        items: [
          {
            title: '証明写真',
            description: 'パスポート、ビザ、社員証など、公式要件を満たす完璧な証明写真を作成。',
          },
          {
            title: 'SNSプロフィール',
            description: 'LinkedIn、Instagram、Twitterなどのプラットフォームで目を引くアバターで存在感をアピール。',
          },
          {
            title: '企業向けチーム写真',
            description: 'チームや会社のディレクトリ向けに統一感のあるプロフェッショナルなアバターを作成。',
          },
          {
            title: 'ゲーム・バーチャル空間',
            description:
              'ゲームプラットフォームやメタバース空間、バーチャルコミュニティ向けのユニークなアバターデザイン。',
          },
        ],
      },
      try: '今すぐ試す',
    },
    'how-to-use': {
      title: 'アバターの作り方',
      subtitle: '完璧なAIアバターを作成するための簡単な手順',
      list: {
        total: '4',
        items: [
          {
            title: 'アバタースタイルを選択',
            description:
              'サンプルのアバタースタイルを閲覧するか、白紙から始めます。あなたの個性やブランドを最もよく表すスタイルを選んでください。',
          },
          {
            title: 'アバターをカスタマイズ',
            description:
              '顔の特徴、髪型、アクセサリー、背景などを調整して、あなたを表現するユニークなアバターを作成します。',
          },
          {
            title: 'アーティスティックスタイルを選択',
            description:
              'リアル、アニメ、ビジネス、ファンタジーなど、さまざまなアーティスティックスタイルから選んで、アバターの見た目を完璧に仕上げます。',
          },
          {
            title: '生成してダウンロード',
            description:
              '生成ボタンをクリックしてしばらくお待ちください。アバターの準備ができたら、さまざまな形式でダウンロードして、様々なプラットフォームでお使いいただけます。',
          },
        ],
      },
    },
    faq: {
      title: 'よくある質問',
      subtitle: 'AIアバタージェネレーターに関するよくある質問と回答',
      list: {
        total: '6',
        items: [
          {
            question: 'AIアバタージェネレーターはどのように機能しますか？',
            answer:
              '当社のAIは高度な機械学習モデルを使用して、お好みに基づいてパーソナライズされたアバターを生成します。希望のスタイルと特徴を選択するだけで、AIがあなただけのユニークなアバターを作成します。',
          },
          {
            question: '生成できるアバターの数に制限はありますか？',
            answer:
              '無料ユーザーは1日最大10個のアバターを生成できます。無制限の生成と追加のカスタマイズオプションをご希望の場合は、Proプランへのアップグレードをご検討ください。',
          },
          {
            question: '生成したアバターを商用利用できますか？',
            answer:
              'はい、生成されたアバターはすべてロイヤリティフリーで、SNSプロフィール、ゲームアカウント、ビジネスプレゼンテーションなどの個人・商用プロジェクトでお使いいただけます。',
          },
          {
            question: 'アバタージェネレーターでより良い結果を得るには？',
            answer:
              '最良の結果を得るには、カスタマイズの選択を具体的に行ってください。スタイル、特徴、アクセサリーの異なる組み合わせを試して、理想のアバター表現を作成してください。',
          },
          {
            question: 'アバターでサポートされている画像形式は？',
            answer:
              '当社のAIはJPEG、PNG、WebPなど、さまざまな形式でアバターを生成します。ダウンロードオプションでお好みの形式を選択でき、透明性を保つにはPNG形式がおすすめです。',
          },
          {
            question: 'アバターの特定の特徴をカスタマイズできますか？',
            answer:
              'はい、顔の特徴、髪型、アクセサリー、表情、背景要素などをカスタマイズして、あなたを表現する本当にパーソナライズされたアバターを作成できます。',
          },
        ],
      },
    },
  },
  'style-transfer': {
    header: {
      title: 'スタイル転送',
      subtitle: '画像をお気に入りのアートスタイルに変換しましょう',
    },
    tool: {
      form: {
        image: {
          label: '画像',
          description: '変換する画像をアップロードしてください',
          message: '画像をアップロードしてください',
        },
        styleImage: {
          label: 'スタイル画像',
          description: 'スタイル適用のための画像をアップロードしてください',
          message: 'スタイル画像をアップロードしてください',
        },
        submit: {
          loading: '処理中...',
          default: '変換',
        },
      },
      regenerate: '再変換',
      download: 'ダウンロード',
      idle: {
        title: '準備完了',
        subtitle: '変換後の画像がここに表示されます。',
      },
      error: {
        title: 'エラーが発生しました',
        subtitle: 'リクエストの処理中にエラーが発生しました。もう一度お試しください。',
        try: '再試行',
      },
    },
    'style-transfer-info': {
      title: 'Flux画像変換AIの4つの利点',
      description: '柔軟な選択肢を備えた高度なAIモデルでニーズに対応します。',
      try: '今すぐ試す',
      list: {
        total: '4',
        items: [
          {
            title: '画像ドリブンのスタイル創造',
            description:
              '複雑なプロンプトを書く必要はありません。コンテンツ画像とスタイルイメージをアップロードするだけで、AIが自動的にスタイルの要点を捉え、完璧に融合します。',
          },
          {
            title: '精度の高いスタイルキャプチャ',
            description:
              'AIはスタイルイメージの色彩やタッチだけでなく、構成やアトモスフィアを理解し、オリジナル写真のコンテンツやディテールを正確に保持します。',
          },
          {
            title: '無限の創造可能性',
            description:
              'ヴァン・ゴッホの油絵からサイバーパンクのネオンまで、どの画像もあなたのスタイルソースになることができます。独創的な芸術作品を簡単に作成することができます。',
          },
          {
            title: 'プロンプトレスの即時創造',
            description:
              'プロンプトを試行錯誤する煩わしい作業を捨て去ります。画像を選択することで即座にプレビューと生成結果を確認することができ、創造のプロセスがよりスムーズかつ効率的になります。',
          },
        ],
      },
    },
    faq: {
      title: 'よくある質問',
      description: 'スタイル転送に関するよくある質問への回答',
      list: {
        total: '6',
        items: [
          {
            question: 'スタイル転送とは？',
            answer: 'スタイル転送とは、元画像の内容を保ちながら、別の画像のアートスタイルを適用するAI技術です。',
          },
          {
            question: 'スタイル転送の使い方は？',
            answer: '変換したい元画像とスタイル画像をアップロードするだけで、AIが自動で変換を行います。',
          },
          {
            question: '対応する画像フォーマットは？',
            answer: 'JPEG、PNG、WebPなどの一般的な画像形式をサポートしています。高品質な画像の使用をおすすめします。',
          },
          {
            question: '処理時間はどれくらい？',
            answer: '画像サイズやサーバー負荷により、数秒から数分かかります。高解像度画像はさらに時間が必要です。',
          },
          {
            question: '元画像は変更されますか？',
            answer: 'いいえ、処理はすべて非破壊です。元画像はそのままで、処理済み画像をいつでもダウンロードできます。',
          },
          {
            question: '最適な効果を得るには？',
            answer:
              '高コントラストのスタイル画像を使うと効果的です。複数のスタイルを試して最も合うものを見つけましょう。',
          },
        ],
      },
    },
  },
  'remove-bg': {
    header: {
      title: 'Turan AI 背景削除',
      subtitle: 'AIで背景を削除',
    },
    tool: {
      form: {
        image: {
          label: '画像をアップロード',
          description: '画像をドラッグ＆ドロップするか、クリックして選択',
          message: '画像をアップロードしてください',
        },
        submit: {
          loading: '処理中...',
          default: '背景を削除',
        },
      },
      regenerate: '再処理',
      download: 'ダウンロード',
      idle: {
        title: '準備完了',
        subtitle: '背景が削除された画像がここに表示されます',
      },
      error: {
        title: 'エラーが発生しました',
        subtitle: 'リクエストの処理中にエラーが発生しました。もう一度お試しください。',
        try: '再試行',
      },
    },
    examples: {
      title02: '背景削除で活用',
      description: '画像をアップロードすると、AIが背景を削除します',
      more: '他の例を表示',
    },
    'how-to-use': {
      title: '使い方',
      description: '簡単な手順で画像の背景を削除',
      list: {
        total: '4',
        items: [
          {
            title: '画像をアップロード',
            description:
              '「画像をアップロード」ボタンをクリックするか、画像を指定の領域にドラッグ＆ドロップしてください。JPG、PNGなどの一般的な画像形式に対応しています。',
          },
          {
            title: 'AI処理を待つ',
            description:
              'アップロード後、AIが自動的に画像の背景を認識・処理します。画像のサイズや複雑さによりますが、通常は数秒で処理が完了します。',
          },
          {
            title: '結果を確認',
            description:
              '処理が完了したら、背景が削除された画像をプレビューできます。問題がなければそのままダウンロードを、調整が必要な場合は「再生成」をクリックしてください。',
          },
          {
            title: 'ダウンロードまたは共有',
            description:
              '処理済みの透明背景画像をダウンロードするか、SNSで直接共有できます。透明部分を保持したPNG形式で出力されます。',
          },
        ],
      },
    },
    faq: {
      title: 'よくある質問',
      description: 'AI背景削除に関するよくあるご質問',
      list: {
        total: '4',
        items: [
          {
            question: '背景削除機能は無料ですか？',
            answer:
              'はい、AI背景削除機能は完全に無料でご利用いただけます。追加料金やサブスクリプションは不要で、いつでも画像をアップロードして背景を削除いただけます。',
          },
          {
            question: '対応している画像形式は？',
            answer:
              'JPG、PNGなどの一般的な画像形式に対応しています。透明な背景を活かすため、PNG形式の使用をおすすめします。',
          },
          {
            question: '処理後の画質は劣化しますか？',
            answer:
              'いいえ、当社のAIは元の画像のクオリティを保ちつつ、正確に背景を削除します。処理後の画質は元の画像と変わりません。',
          },
          {
            question: '処理した画像を商用利用できますか？',
            answer:
              'はい、当ツールで処理した画像はすべてお客様のものとなり、個人・商用問わず自由にお使いいただけます。追加の許諾は必要ありません。',
          },
        ],
      },
    },
  },
  'resolution-improvement': {
    header: {
      title: 'Turan AI 解像度アップスケーリング',
      subtitle: 'AIで画像を高解像度に変換',
    },
    tool: {
      form: {
        image: {
          label: '画像をアップロード',
          description: '画像をドラッグ＆ドロップするか、クリックして選択',
          message: '画像をアップロードしてください',
        },
        submit: {
          loading: '処理中...',
          default: '解像度を向上',
        },
      },
      regenerate: '再処理',
      download: 'ダウンロード',
      idle: {
        title: '準備完了',
        subtitle: '解像度を向上させた画像がここに表示されます',
      },
      error: {
        title: 'エラーが発生しました',
        subtitle: '処理中にエラーが発生しました。しばらくしてからもう一度お試しください。',
        try: '再試行',
      },
    },
    'how-to-use': {
      title: '使い方',
      description: '簡単な手順で画像の解像度を向上',
      list: {
        total: '4',
        items: [
          {
            title: '画像をアップロード',
            description:
              '「画像をアップロード」ボタンをクリックするか、画像をドラッグ＆ドロップしてください。JPG、PNG形式に対応しています。',
          },
          {
            title: '拡大率を選択',
            description: '2倍、4倍など、希望の拡大率を選択してください。',
          },
          {
            title: 'AI処理を待つ',
            description:
              'AIが自動的に画像を分析し、解像度を向上させます。処理時間は画像サイズと拡大率によって異なります。',
          },
          {
            title: '高解像度画像をダウンロード',
            description: '処理が完了したら、よりクリアな高解像度画像をダウンロードできます。',
          },
        ],
      },
    },
    faq: {
      title: 'よくある質問',
      description: '画像解像度向上に関するよくある質問',
      list: {
        total: '4',
        items: [
          {
            question: '解像度向上機能は無料ですか？',
            answer: 'はい、AI解像度向上機能は完全に無料でご利用いただけます。',
          },
          {
            question: 'どのような画像形式に対応していますか？',
            answer:
              'JPG、PNG、WEBPなどの一般的な画像形式に対応しています。最適な結果を得るには、元の画質が高い画像をご使用ください。',
          },
          {
            question: '最大どのくらいの大きさの画像まで拡大できますか？',
            answer: '最大4K解像度までの画像拡大に対応しており、拡大後もクリアでシャープな画質を維持します。',
          },
          {
            question: '処理後の画像は劣化しますか？',
            answer:
              'AIアルゴリズムが画像のディテールをインテリジェントに補完・強化するため、画質の劣化を最小限に抑え、自然でクリアな拡大画像を実現します。',
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
      tool: 'ツール',
      prompt: 'ヒント',
      status: 'ステータス',
      createdAt: '作成日時',
      startedAt: '開始日時',
      completedAt: '完了日時',
      actions: '操作',
      viewDetails: '詳細を見る',
    },
    prediction: {
      details: '予測の詳細',
      id: '予測ID',
      basicInfo: '基本情報',
      tool: 'ツール',
      version: 'バージョン',
      createdAt: '作成日時',
      completedAt: '完了日時',
      input: '入力パラメータ',
      output: '出力結果',
      error: 'エラー',
      metrics: 'メトリクス',
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
