export type SlideType = 'title' | 'content' | 'video' | 'quote';

export interface SlideData {
    id: number;
    type: SlideType;
    title: string;
    content?: string[];
    videoUrl?: string;
    videoTitle?: string;
    highlight?: string;
    matchTime?: string;
}

export const slides: SlideData[] = [
    {
        id: 1,
        type: 'title',
        title: 'Welcome to JG',
        highlight: 'アイアン底辺からの脱出',
        content: [
            'ゲーマーとして自信のある自分としてのプライドを取り戻す',
            '石井と一緒は嫌だ',
            'まずはアイアンを抜け出す方法を一緒に考えて行きましょう'
        ]
    },
    {
        id: 2,
        type: 'content',
        title: 'Claim. 主張',
        content: [
            '「今のLoLコミュニティが活発な内にいっちょかみして人気配信者と一絡みして視聴者を取り込みたい」',
            '「あわよくばRiotから仕事を貰いたい」',
            '「アホなふりをして、アホな視聴者を楽して取り込みたい」',
            '「でもアイアン位は...」',
            'その為には、ゲーム内で無駄な行動を減らす必要があります。'
        ]
    },
    {
        id: 3,
        type: 'video',
        title: 'What? どこをマズったか - 動画１',
        matchTime: '試合時間：7分まで',
        videoTitle: '周回速度の優位を確認 ',
        videoUrl: 'https://www.twitch.tv/naru0419045/clip/StylishRoundSwallowPeoplesChamp-mjvGuIOtPalA1R1G',
        content: [
            '周回終えリコールを先に行い、なんならドラゴンまで取れてパーフェクトです。',
            'ここまでは有利です'
        ]
    },
    {
        id: 4,
        type: 'video',
        title: 'What? どこをマズったか - 動画２',
        matchTime: '試合時間：11分',
        videoTitle: 'ダイブ失敗 ',
        videoUrl: 'https://www.twitch.tv/naru0419045/clip/AbnegateEasyHamburgerTooSpicy-iBdnMu4Fxf7OijtL',
        content: [
            'ガンクアクションから追加でダイブしようとしてます。',
            '意図したダイブのセットアップではないでしょうが、ここで１分無駄にしています。',
            '一回のアクションに失敗したら確固たる意志を持ってリコールしましょう。',
            'マップに映らない限りボリベアのCS情報は更新されません,古い情報で判断してはいけません。'
        ]
    },
    {
        id: 5,
        type: 'video',
        title: 'What? どこをマズったか - 動画３',
        matchTime: '試合時間：15分',
        videoTitle: 'まごまごして無駄な時間を過ごす ',
        videoUrl: 'https://www.twitch.tv/naru0419045/clip/ArtsyRealDogOSkomodo-7FiJ4cLjuAHYhwe8',
        content: [
            'ここが一番問題です。この直後にミッドに寄って更に１分、合計２分無駄にしています。',
            '周回を終えてないのにアクションを起こしています。',
            '先と合わせ合計３分近く集金タイミングを逃し、ボリベアに有利を取り返されています。',
            '実際はこの後相手の森に入って時間を無駄にしたりなどしていましたが、これはチャレンジです。気にしないでください。'
        ]
    },
    {
        id: 6,
        type: 'video',
        title: 'What? どこをマズったか - 動画４',
        matchTime: '試合時間：25分',
        videoTitle: '痩せた🐻Lv13 vs カリッカリの猿 Lv12',
        videoUrl: 'https://www.twitch.tv/naru0419045/clip/AntediluvianSquareGrasshopperOSfrog-FcPGiRw_j3VLbhu3',
        content: [
            '大きな集団戦も無いのに、無駄な時間を過ごした為に逆転。',
            'これだけでもこの試合に負ける原因の一つは見つかった気がしませんか？',
            'この時間のロスは簡単に減らせます。'
        ]
    },

    {
        id: 7,
        type: 'content',
        title: 'Why? なぜこのような行動をとったか',
        content: [
            '「何らかのアクションを取らなければ行けない」という強い思い込み',
            '落ち着きがない',
            'ジャングルの周回（集金タイム）をすっ飛ばしてアクションを起こしている'
        ]
    },
    {
        id: 8,
        type: 'quote',
        title: 'How? どうやって修正する',
        highlight: 'とにかく周回速度を維持する',
        content: [
            '金額差を五分か有利なまま広げる',
            '１回のアクションが上手く行かなくても金額差はそうそう広がりません',
            '有利な状態の作り方が分からないなら、とにかくジャングルの周回速度を維持してください'
        ]
    },
    {
        id: 9,
        type: 'content',
        title: 'Mindset(心構え)',
        content: [
            'スコアボードなんて見ても当分分からないでしょう',
            '自分のジャングルを相手より早く周回です',
            '周回する時のファーム数なんて気にしないでください。体重の数字と一緒です',
            '相手"チーム"との金額差を広げることをやっていきましょう'
        ]
    },
    {
        id: 10,
        type: 'content',
        title: '余談：対面と比較しない',
        content: [
            '相手ジャングルのボリベアではなく相手”チーム”と自分を比較する',
            'あなたが１秒でも多く相手より力を発揮出来る状態で無ければ、ジャングラーとして役立たずです',
            '誰を育てるとかいう小賢しい考えは後回しです'
        ]
    },
    {
        id: 11,
        type: 'title',
        title: 'Implementation 実行するのみ',
        highlight: 'とにかくジャングルを１周回りましょう',
        content: [
            '座学とトレモする気のないおじにはコレしかないです。',
            'おわり。'
        ]
    }
];
