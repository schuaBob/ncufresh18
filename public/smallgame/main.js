var quiz = [
    { q: '中央大學位在哪個縣市?', o: ['桃園市','竹北市','嘉義市','台中市'] , correctIndex:0},
    { q: '中央大學的簡稱為?', o: ['央大','中央','中大','以上皆非'] , correctIndex:2},
    { q: '如果想要搭公車到市區應搭幾號?', o: ['1920','132','9025','321'] , correctIndex:1},
    { q: '如果想要搭公車直達台北應搭幾號?', o: ['132','1920','9025','133'] , correctIndex:2},
    { q: '現任校長的名子?', o: ['蔣偉寧','周景揚','蔣中正','李四光'] , correctIndex:1},
    { q: '冷氣卡應到哪的全家買?', o: ['男9的和女14的','松苑的和男9的','松苑的和女14的','以上皆是'] , correctIndex:0},
    { q: '到管院的路上有一條路叫甚麼川?', o: ['百花川','長谷川','青木川','都不川'] , correctIndex:0},
    { q: '藝文中心在哪?', o: ['遊藝館','依仁堂','電算中心','舊圖'] , correctIndex:3},
    { q: '松果餐廳在男幾下面?', o: ['男9','男11','男13','男7'] , correctIndex:3},
    { q: '照顧流浪犬的社團為?', o: ['中大愛狗社','中大汪汪社','中大狗狗社','以上皆非'] , correctIndex:1},
    { q: '何者為大一必修課程?', o: ['日文','法文','國文','西班牙文'] , correctIndex:2},
    { q: '132公車單程票價為何?', o: ['15','17','18','19'] , correctIndex:2},
    { q: '公用腳踏車叫甚麼?', o: ['小白','小黑','小黃','小綠'] , correctIndex:3},
    { q: '大一必修體育佔幾學分?', o: ['0','2','3','1'] , correctIndex:0},
    { q: '請問中央大學沒有開設哪一堂語文課？', o: ['西班牙文','俄文','法文','德文'] , correctIndex:1},
    { q: '請問中央大學有開設哪一堂語文課？', o: ['德文','俄文','義大利文','馬來文 '] , correctIndex:0},
    { q: '中央大學哪一項運動沒有設置室內場館？', o: ['排球','籃球','桌球','網球'] , correctIndex:3},
    { q: '中央大學的專業實驗劇場-黑盒子，位於哪裡？', o: ['志希館','人文社會科學大樓','工一館','管理二館'] , correctIndex:1},
    { q: '中央可以固定一段時間會有電影放映的地方在哪裡?', o: ['107電影院','108電影院','106電影院','105電影院'] , correctIndex:0},
    { q: '若持中大證件到校內的小木屋鬆餅點餐，可打幾折？', o: ['10折','7折','5折','9折'] , correctIndex:3},
    { q: '操場跑道的顏色為何?', o: ['藍色','紅色','黃色','白色'] , correctIndex:0},
    { q: '女生宿舍最貴的為哪棟?', o: ['女4','女14','女1','女2'] , correctIndex:1},
    { q: '中央大學的地址?', o: ['中央路300號','學央路300號','中大路300號','以上皆非'] , correctIndex:2},
    { q: '幾號公車可以直達桃園高鐵站?', o: ['133','154','178','172'] , correctIndex:3},
    { q: '小木屋後面是甚麼學院?', o: ['管學院','文學院','理學院','工學院'] , correctIndex:0},
    { q: '學校有雕塑大師朱銘的作品嗎?', o: ['沒有','有','以上皆是','以上皆非'] , correctIndex:1},
    { q: '男九前面的噴水池是叫?', o: ['鯉魚池','蓮花池','烏龜池','洗澡池'] , correctIndex:2},
    { q: 'K書中心在哪?', o: ['國鼎大樓','行政大樓','管理二館','舊圖'] , correctIndex:3},
    { q: '非游泳課時間去游泳要付?', o: ['30','40','50','60'] , correctIndex:0},
    { q: '非羽球課時間去打羽球要付?', o: ['30','40','50','60'] , correctIndex:0},
    { q: '學校主要的校風為?', o: ['積極','誠樸','活潑','朝氣'] , correctIndex:1},
    { q: '學校有醫學院嗎?', o: ['有','以前有','沒有','以上皆是'] , correctIndex:2},
    { q: '本校隸屬哪個系統?', o: ['台大聯盟','中聯大','央聯大','台聯大'] , correctIndex:3},
    { q: '搭台聯大的專車去清大要錢嗎?', o: ['要','不要','以上皆是','以上皆非'] , correctIndex:1},
    { q: '搭台聯大的專車去交大要錢嗎? ', o: ['不要','要','以上皆是','以上皆非'] , correctIndex:0},
    { q: '搭台聯大的專車去陽明要錢嗎? ', o: ['要','不要','以上皆是','以上皆非'] , correctIndex:1},
    { q: '中大在復校前所在位置為? ', o: ['山東','陝西','南京','遼北'] , correctIndex:2},
    { q: '凌晨3點有開的早餐店為?', o: ['萊姆思','達啵廚房','歐姆萊斯','惟客'] , correctIndex:3},
    { q: '校內有7-11嗎?', o: ['有','沒有','以上皆是','以上皆非'] , correctIndex:1},
    { q: '中央大學郵局在?', o: ['男9旁','男7旁','女4旁','女14旁'] , correctIndex:3},
    { q: '想買二手教科書可到?', o: ['敦煌書局','全家超商','7-11','OK便利超商'] , correctIndex:0},
    { q: '學校哪買的到床墊? ', o: ['全家超商','581生活館','7-11','OK便利超商'] , correctIndex:1},
    { q: '選課要上哪個網站?', o: ['portal','lms','中央資管','中央資工'] , correctIndex:0},
    { q: '學校約有幾個姊妹校?', o: ['70','80','100','170'] , correctIndex:3},
    { q: '一張冷氣卡裡面有多少錢?', o: ['250','500','150','200'] , correctIndex:1},
    { q: '學校哪裏有ubike?', o: ['觀景台旁','中大門口','總圖書館前','小木屋旁'] , correctIndex:2},
    { q: 'Ubike前幾分鐘不用錢?', o: ['30','60','90','120'] , correctIndex:0},
    { q: '我們可持中大圖書證到清大借書嗎?', o: ['可','不可','以上皆是','以上皆非'] , correctIndex:0},
    { q: '我們可持中大圖書證到交大借書嗎?', o: ['不可','可','以上皆是','以上皆非'] , correctIndex:1},
    { q: '我們可持中大圖書證到陽明借書嗎?', o: ['可','不可','以上皆是','以上皆非'] , correctIndex:0},
    { q: '圖書館平日幾點開館?', o: ['8am','9am','10am','11am'] , correctIndex:0},
    { q: '圖書館假日幾點開館?', o: ['9am','8am','10am','11am'] , correctIndex:2},
    { q: '圖書館學期中平日幾點閉館?', o: ['9:30pm','10pm','11pm','12pm'] , correctIndex:0},
    { q: '圖書館假日幾點閉館?', o: ['6pm','7pm','9pm','10pm'] , correctIndex:1},
    { q: '圖書館書最多可以借幾本?', o: ['5','6','10','20'] , correctIndex:3},
    { q: '校內工讀哪個網站可以找到?', o: ['lms','中央資管網頁','portal','中央資工網頁'] , correctIndex:2},
    { q: '通識課程在畢業前應修滿幾學分?', o: ['18','20','15','14'] , correctIndex:3},
    { q: '全校有幾個學系?', o: ['22','33','44','55'] , correctIndex:0},
    { q: '學生專用信箱web mail是由哪個單位負責管理的？', o: ['圖書館','電子計算中心','教務處','學務處'] , correctIndex:1},
    { q: '中央大學語言中心位在哪一棟大樓？', o: ['志希館','地科院','綜教館','管理二館'] , correctIndex:2},
    { q: '中央大學宿舍網路單日(24小時)校外的上傳流量『加總』之後上限為?', o: ['沒限制','3GB','4GB','5GB'] , correctIndex:1},
    { q: '中央大學宿舍網路單日(24小時)校外的下載流量『加總』之後上限為?', o: ['沒限制','3GB','4GB','5GB'] , correctIndex:0},
    { q: '如果腳踏車壞了要去哪修?', o: ['找警衛伯伯','全家','家樂福','後門腳踏車店'] , correctIndex:3},
    { q: '中央大學的英文縮寫為?', o: ['NCU','HGSH','CYGSH','CYSH'] , correctIndex:0},
    { q: '郵局平日營業時間為?', o: ['9:30~18:00','8:00~17:00','10:00~17:00','9:00~18:00'] , correctIndex:1},
    { q: '若有人寄信給你,你該到行政大樓的哪領?', o: ['出納組','課務組','文書組','生活輔導組'] , correctIndex:2},
    { q: '若想網購,後門的7-11叫甚麼門市?', o: ['學店門市','中央門市','中大門市','學央門市'] , correctIndex:3},
    { q: '國鼎圖書館是為了紀念哪位校友?', o: ['李國鼎','吳健雄','陳鼎圖','王圖書'] , correctIndex:0},
    { q: '中央大學的校樹為?', o: ['竹','松','梅','荷'] , correctIndex:1},
    { q: '下列哪個偶像劇有在中央取景?', o: ['1989一念間','極品絕配','我的自由年代','我的愛情不平凡'] , correctIndex:2},
    { q: '校內沒有何種運動場地?', o: ['重訓室','壘球場','籃球場','保齡球館'] , correctIndex:3},
    { q: '校內沒有何種運動場地?', o: ['高爾夫球場','排球場','壘球場','籃球場'] , correctIndex:0},
    { q: '校內有何種運動場地?', o: ['高爾夫球場','重訓室','滑雪場','保齡球館'] , correctIndex:1},
    { q: '下列何者為中央大學的體育館名字?', o: ['據德樓','游藝館','依仁堂','志道樓'] , correctIndex:2},
    { q: '校內有個著名的劇場叫?', o: ['名劇場','107電影院','中央劇場','黑盒子劇場'] , correctIndex:3},
    { q: '若遇到人生低潮該去哪尋求協助?', o: ['諮商中心','校長室','教務處','學務處'] , correctIndex:0},
    { q: '中央大學校內哪裡有排球場?', o: ['中大湖旁','依仁堂旁','舊圖旁','總圖書館旁'] , correctIndex:1},
    { q: '你現在念哪所大學?', o: ['中山','中興','中央','中正'] , correctIndex:2},
    { q: '中央的垃圾場在?', o: ['中大湖後面','文院旁邊','籃球場旁','男9後面'] , correctIndex:3},
    { q: '中央大學除了哪兩天以外都有垃圾車時間?', o: ['六日','一二','日一','五六'] , correctIndex:0},
    { q: '凌晨想吃宵夜可到哪吃?', o: ['後門','宵夜街','女宿','男宿'] , correctIndex:1},
    { q: '中央最新成立的學院為?', o: ['理學院','管理學院','生醫理工學院','資電學院'] , correctIndex:2},
    { q: '中央大學專屬的電台為?', o: ['大中大電視台','中中大電視台','好中大電視台','小中大電視台'] , correctIndex:3},
    { q: '中央學生自己專屬的學校信箱結尾為何?', o: ['@cc.ncu.edu.tw','@cc.ntu.edu.tw','@cc.cygsh.edu.tw','@cc.cysh.edu.tw'] , correctIndex:0},
    { q: '期中期末考時k書中心會開多久?', o: ['22點關','23點關','21點關','24小時開放'] , correctIndex:3},
    { q: '平時k書中心會開多久?', o: ['24小時開放','23點關','22點關','21點關'] , correctIndex:1},
    { q: '請問106學年度，中央大學的FB社團名稱為何?', o: ['2016 嶄．望 中央大學','我愛上中央大學:)','2017邂逅中央','中大自由年代'] , correctIndex:2},
    { q: '中央甚麼樹最多?', o: ['榕樹','松樹','芒果樹','西瓜樹'] , correctIndex:1},
    { q: '中央目前有幾個學院?', o: ['8','10','12','14'] , correctIndex:0},
    { q: '請問中央大學的校色為什麼顏色?', o: ['紅綠','藍紫','紫金','靛紅'] , correctIndex:2},
    { q: '中央大學內有幾家全家?', o: ['3','5','7','9'] , correctIndex:0},
    { q: '中央大學內最高建築為哪棟?', o: ['客家學院','管理二館','舊圖','女14'] , correctIndex:3},
    { q: '中央大學內的新圖書館(總圖書館)總共有幾層樓?', o: ['8','9','10','11'] , correctIndex:0},
    { q: '你即將進入的國立中央大學於今年滿幾週年呢?', o: ['101','102','99','98'] , correctIndex:1},
    { q: '中央大學哪裡有校內的腳踏車打氣站?', o: ['小木屋旁','舊圖旁','正門警衛室','總圖書館旁'] , correctIndex:2},
    { q: '學生機車騎入校園之入校時間限制時間為?', o: ['12~18時','11~23時','10~23時','8~21時'] , correctIndex:3},
    { q: '宿舍網路啟動碼價錢要花多少錢?', o: ['800','1500','1000','1200'] , correctIndex:0},
    { q: '請問中央大學道路的最高限速是多少公里?', o: ['5','10','15','25'] , correctIndex:3},
    { q: '宿舍網路卡需要到行政大樓中的哪個處室買?', o: ['文書組','出納組','註冊組','課務組'] , correctIndex:1},
    { q: '哪個宿舍有桌球室?', o: ['女2','女4','男9','女1'] , correctIndex:2},
    { q: '若要申請寒假宿舍要到哪申請?', o: ['系辦','行政大樓','女宿傳達室','宿舍服務中心'] , correctIndex:3},
    { q: '宿舍門禁為?', o: ['12pm','沒門禁','11pm','10pm'] , correctIndex:1},
    { q: '哪間宿舍地下室有餐廳、581商店、全家、影印店等等?', o: ['女1','女14','男9','男7'] , correctIndex:1},
    { q: '知名作家吳明益畢業於中央哪個科系?', o: ['地科系','資管系','中文系','客家系'] , correctIndex:2},
    { q: '知名女演員張鈞甯畢業於中央哪個研究所?', o: ['客研所碩士','資管所碩士','EMBA 碩士','產經所碩士'] , correctIndex:3},
    { q: '知名男演員王宥勝畢業於中央哪個科系?', o: ['財經系','中文系','大氣系','資工系'] , correctIndex:0},
    { q: '知名藝人浩角翔起的浩子畢業於中央哪個科系?', o: ['電機系','資管系','化材系','資工系'] , correctIndex:1},
    { q: '校歌中 ”宏我黌舍兮”的”黌”字讀做?', o: ['ㄩˋ','ㄏㄨㄤˊ','ㄏㄨㄥˊ','ㄏㄠˋ'] , correctIndex:2},
    { q: '中央大學沒有甚麼友會?', o: ['雲嘉會','中友會','僑友會','北友會'] , correctIndex:3},
    { q: '如果不會用宿網可以去哪個網站查詢?', o: ['中央電子計算中心','lms','服務學習網','生活職涯網'] , correctIndex:0},
    { q: '中央哪個網站有提供Microsoft Office的下載服務?', o: ['portal','中央電子計算中心','服務學習網','lms'] , correctIndex:1},
    { q: '中央哪個網站有提供防毒軟體的下載服務?', o: ['portal','服務學習網','中央電子計算中心','生活職涯網'] , correctIndex:2},
    { q: '科學四館又名甚麼?', o: ['國鼎大樓','依仁堂','游藝館','健雄館'] , correctIndex:3},
    { q: '健雄館是為了紀念誰?', o: ['吳健雄','宋健雄','王健雄','黃健雄'] , correctIndex:0},
    { q: '位於阿里山海拔2862m的鹿林天文台由本校哪個所所管理?', o: ['地質所','天文所','生醫所','資管所'] , correctIndex:1},
    { q: '學校哪裡有天文台?', o: ['理學院','管院','科學四館','工學院'] , correctIndex:2},
    { q: '小木屋鬆餅的鬆餅有賣冰淇淋口味的鬆餅嗎?', o: ['有','沒有','以上皆是','以上皆非'] , correctIndex:0},
    { q: '小木屋鬆餅有賣飲料嗎?', o: ['沒有','有','以上皆是','以上皆非'] , correctIndex:1},
    { q: '女14樓下的全家有自動提款機嗎?', o: ['有','沒有','以上皆是','以上皆非'] , correctIndex:1},
    { q: 'Fb有個社團可以提供中央的學生買賣不要的東西,該社團叫?', o: ['中央省錢站','中央買賣站','中央復活福利社','中央有錢站'] , correctIndex:2},
    { q: '中央交流選課資訊的fb社團叫?', o: ['中大選課讚讚讚','中央選課必看啦','中大選課快來看','中大選課~Ctrl+F很EAZY!!!',] , correctIndex:3},
    { q: '中央有設英文畢業門檻嗎?', o: ['有','沒有','以上皆是','以上皆非'] , correctIndex:0},
    { q: '中央有設中文畢業門檻嗎?', o: ['有','沒有','以上皆是','以上皆非'] , correctIndex:1},
    { q: '中央有設數學畢業門檻嗎?', o: ['有','沒有','以上皆是','以上皆非'] , correctIndex:1},
    { q: '每個學院的畢業英文畢業門檻相同嗎?', o: ['不同','相同','以上皆是','以上皆非'] , correctIndex:0},
    { q: '你現在正在使用的網站是由本校哪個團隊所架的?', o: ['新生資訊網','新生滋訊網','新生知訊網','新生姿訊網'] , correctIndex:2},
    { q: '學校後門那間很優的咖啡甜點店叫?', o: ['Sidewalk','NO.17 White House','迷路','Backdoor Café'] , correctIndex:3},
    { q: '學校後門那間素食餐廳叫?', o: ['Sidewalk','Backdoor Café','NO.17 White House','迷路'] , correctIndex:0},
    { q: '如果想吃手工冰淇淋可以到哪家店?', o: ['好兇蛋餅','Sidewalk','Backdoor Café','NO.17 White House'] , correctIndex:1},
    { q: '夏天時走百花川時有什麼會從樹上掉下來?', o: ['錢','黃金','毛毛蟲','魚'] , correctIndex:2},
    { q: '大一週會要去哪聽?', o: ['鴻經管','游藝館','管理二館','大講堂'] , correctIndex:3},
    { q: '大一學生必須聽幾次大一週會?', o: ['4次','3次','2次','1次'] , correctIndex:0},
    { q: '大一學生必須聽幾次各院院週會?', o: ['1次','2次','3次','4次'] , correctIndex:1},
    { q: '大一週會要去哪個網站報名?', o: ['生活職涯網','portal','服務學習網','lms'] , correctIndex:2},
    { q: '學校最多的超商是哪家?', o: ['7-11','OK','萊爾富','全家'] , correctIndex:3},
    { q: '學校的運動會為期幾天?', o: ['1天','2天','3天','4天'] , correctIndex:1},
    { q: '若受傷了該去哪處理?', o: ['生活服務組','生活輔導組','衛生保健組','出納組'] , correctIndex:2},
    { q: '職涯發展中心位在舊圖幾樓?', o: ['2樓','3樓','4樓','5樓'] , correctIndex:0},
    { q: 'K書中心位在舊圖幾樓?', o: ['2樓','3樓','4樓','5樓'] , correctIndex:0},
    { q: '找不到人聊心事的你可以前往?', o: ['校長室','行政大樓','警衛室','諮商輔導中心'] , correctIndex:3},
    { q: '大一新生心理適應座談會辦在幾月?', o: ['9月','10月','11月','12月'] , correctIndex:0},
    { q: '研究生新生座談辦在幾月?', o: ['9月','10月','11月','12月'] , correctIndex:0},
    { q: '宿舍中使用一次洗衣機須投多少錢?', o: ['30元','40元','10元','20元'] , correctIndex:2},
    { q: '宿舍中使用烘衣機30分鐘須投多少錢?', o: ['40元','10元','20元','30元'] , correctIndex:1},
    { q: '宿舍中使用烘衣機一次最多可以投入幾元?', o: ['20元','30元','40元','50元'] , correctIndex:1},
    { q: '宿舍中使用脫水機需投多少錢?', o: ['10元','20元','30元','免錢'] , correctIndex:3},
    { q: '如果想要出國交換可以到哪詢問?', o: ['職涯發展中心','衛生保健組','國際事務處','生活服務組'] , correctIndex:2},
    { q: '全校路跑男生需跑幾公里?', o: ['4km','5km','9km','10km'] , correctIndex:1},
    { q: '全校路跑女生需跑幾公里?', o: ['4km','6km','8km','9km'] , correctIndex:0},
    { q: '中央2006發現的小行星於2016通過審查命名為?', o: ['中央','屏中','中屏','屏東',] , correctIndex:3},
    { q: '遊藝館的由來出自於下列哪句話?', o: ['不遠遊，遊必有藝','依於仁，遊於藝','以上皆是','以上皆非'] , correctIndex:1},
    { q: '志道樓的由來出自於下列哪裡?', o: ['孟子','中庸','論語','大學'] , correctIndex:2},
    { q: '據德樓的由來出自於下列哪裡?', o: ['孟子','中庸','大學','論語'] , correctIndex:3},
    { q: '依仁堂的由來出自於下列哪裡?', o: ['論語','孟子','中庸','大學'] , correctIndex:0},
    { q: '目前中央大學校長是誰?', o: ['周璟揚','周景揚','周景陽','周景翔'] , correctIndex:1},
    { q: '曾經有人掉進百花川嗎?', o: ['有','沒有','目前沒有','真的沒有'] , correctIndex:0},
    { q: '中央被二一幾次就會被退學?', o: ['1次','2次','3次','4次'] , correctIndex:1},
    { q: '平常在校內可以騎機車嗎?', o: ['可以','可以吧','應該可以','不行'] , correctIndex:3},
    { q: '校內公用腳踏車可以騎出校外嗎?', o: ['可以','不行','以上皆是','以上皆非'] , correctIndex:1},
    { q: '好兇蛋餅晚上幾點開?', o: ['7pm','6pm','5pm','10pm'] , correctIndex:3},
    { q: '好兇蛋餅上午幾點關門?', o: ['7am','8am','1pm','5am'] , correctIndex:2},
    { q: '好兇蛋餅從幾點開到幾點?', o: ['10pm~隔天1pm','7pm~隔天7am','6pm~隔天8am','5pm~隔天5am'] , correctIndex:0},
    { q: '你喜歡這個網站嗎?', o: ['不喜歡','很喜歡','以上皆是','以上皆非'] , correctIndex:1},
    { q: '你喜歡這款遊戲嗎?', o: ['很喜歡','不喜歡','太喜歡了','可愛'] , correctIndex:2},
    { q: '要輸入網路卡號碼需要至哪個網頁?', o: ['服務學習網','生活職涯網','中央大學學生宿舍網路系統','lms'] , correctIndex:2},
    { q: '學生宿網系統的使用者專區內之「繳費」地點最常用的方式為?', o: ['直接至行政大樓出納組購買','ATM 繳款','超商繳款','第一銀行臨櫃繳款'] , correctIndex:0},
    { q: '英語自學中心在哪裡?', o: ['總圖','管理學院','理學院','舊圖'] , correctIndex:3},
    { q: '英語自學中心觀看英文影片幾分鐘一個戳章?', o: ['40分鐘','50分鐘','30分鐘','20分鐘'] , correctIndex:1},
    { q: '校內公用腳踏車，俗稱「小綠」，可以私自上鎖嗎?', o: ['不行','可以','以上皆是','以上皆非'] , correctIndex:0},
    { q: '宿舍網路啟動碼生效時間是「宿網系統註冊完畢後」多久生效?', o: ['註冊馬上生效','須等一段時間(24小時內)','以上皆是','以上皆非'] , correctIndex:1},
    { q: '宿舍網路每筆的註冊資料, 允許更換 MAC Address(網路啟動碼)幾次?', o: ['1次','2次','3次','5次'] , correctIndex:2},
    { q: '宿舍網路如果搬到其他宿舍或寢室, 可以修改幾次?', o: ['2次','4次','3次','5次'] , correctIndex:0},
    { q: '106學年度服務學習總共需要幾個小時才能畢業?', o: ['90小時','100小時','80小時','70小時'] , correctIndex:1},
    { q: '106學年度服務學習其中藝文時數占多少小時?', o: ['20小時','30小時','40小時','50小時'] , correctIndex:0},
    { q: '與中央大學服務學習相關資訊需去哪個網站查看?', o: ['lms','portal','國際事務處','中央大學服務學習網'] , correctIndex:3},
  ];

  String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};

for(i = 0; i < quiz.length; i++) {
    if (quiz[i].q.length > 14) {
        // console.log("hhhhhhhhhhhhhhhhhhhhhhh")
        quiz[i].q.insert(14, "<br/>")
    }
}
// array 打亂順序
Array.prototype.shuffle = function() {
    var array = this;
    var m = array.length,
        t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

// button + text = labelButton
var LabelButton = function(rightOrWrong, game, x, y, key, label, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
    Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)    
    //Style how you wish...    
    this.style = {
        'font': '30px Arial',
        'fill': 'black'
    }    
    this.rightOrWrong = false
    this.anchor.setTo(0.5, 0.5)    
    this.label = new Phaser.Text(game, 0, 0, label, this.style)    
    //puts the label in the center of the button    
    this.label.anchor.setTo(0.5, 0.5)    
    this.addChild(this.label)
    this.setLabel(label)
    //adds button to game    
    game.add.existing(this)
}
LabelButton.prototype = Object.create(Phaser.Button.prototype)
LabelButton.prototype.constructor = LabelButton
LabelButton.prototype.setLabel = function(label) {
    this.label.setText(label)
}
LabelButton.prototype.setRightOrWrong = function (rightOrWrong) {
    this.rightOrWrong = rightOrWrong
}

// 添加返回按鈕
function addBtnBack() {
    var btnBack = game.add.button(game.world.width - 60, 0, 'btnBack', btnBackClick)

    function btnBackClick(item) {
        game.state.start('main')
    }
}

// 遊戲主體長寬
var width = 800
var height = 600

var game = new Phaser.Game(width, height, Phaser.AUTO, 'game')

var states = {
	// 加载场景, 載入資源
    preload: function() {

    	this.preload = function() {
            game.state.backgroundColor = '#000000'

            // 載入資源
            game.load.image('bg', 'images/bg.png')
            game.load.image('squirrel','images/pc.png' )
            game.load.image('btnStart', 'images/button_start.png')
            game.load.image('btnRank', 'images/button_rank.png')
            game.load.image('btnIntro', 'images/button_intro.png')
            game.load.image('btnChoice', 'images/button_choice.png')
            game.load.spritesheet('question', 'images/question.png', 400, 200)
            game.load.spritesheet('btnBack', 'images/back.png', 60, 60)

            // 添加進度提示
            var progressText = game.add.text(game.world.centerX, game.world.centerY, '0%', {
                fontSize: '60px',
                fill: '#ffffff'
            })
            progressText.anchor.setTo(0.5, 0.5)
            game.load.onFileComplete.add(function(progress) {
                progressText.text = progress + '%'
            })
            game.load.onLoadComplete.add(onLoad)
            var deadLine = false
            setTimeout(function() {
                deadLine = true
            }, 3000)

            function onLoad() {
                if (deadLine) {
                    game.state.start('main')
                } else {
                    setTimeout(onLoad, 1000)
                }
            }
        }
    },
    // 开始界面
    main: function() {
        this.create = function() {
            // 背景
            var bg = game.add.image(0, 0, 'bg')
            bg.width = game.world.width
            bg.height = game.world.height

            // 松鼠圖片
            var squirrel = game.add.sprite(game.world.centerX - 70, game.world.centerY - 180, 'squirrel')
            var text1 = game.add.text(0, 0, '松鼠塔')
            text1.alignTo(squirrel, Phaser.BOTTOM_CENTER)

            // 按鈕
            var buttonStart
            var buttonRank
            var buttonIntro

            buttonStart = game.add.button(game.world.centerX + 50, game.world.centerY + 55, 'btnStart', buttonForStart, this)
            buttonRank = game.add.button(game.world.centerX + 50, game.world.centerY + 110, 'btnRank', buttonForRank, this)
            buttonIntro = game.add.button(game.world.centerX + 50, game.world.centerY + 165, 'btnIntro', buttonForIntro, this)

            buttonStart.anchor.setTo(1, 1)
            buttonRank.anchor.setTo(1, 1)
            buttonIntro.anchor.setTo(1, 1)
            
            // 按鈕綁定時間
            function buttonForStart() {
               game.state.start('start')

            }
            
            function buttonForRank() {
                game.state.start('rank')
            
            }
            
            function buttonForIntro() {
                game.state.start('intro')
            
            }

        }
    },
    // 遊戲 play 界面
    start: function() {
        this.create = function() {
            // 背景
            var bg = game.add.image(0, 0, 'bg')
            bg.width = game.world.width     
            bg.height = game.world.height
            // 返回按鈕
            addBtnBack()
            
            // 問題
            var questionSprite = game.add.sprite(game.world.centerX + 100, game.world.centerY - 120, 'question')
            questionSprite.anchor.setTo(0.5, 0.5)
            var style = { 
                font: "32px Courier",
                fill: "#00ff44",
            }
            var questionText = game.add.text(0, 0, style)
            questionText.alignIn(questionSprite, Phaser.LEFT_CENTER)

            // 選擇按鈕
            var btnChoiceA = new LabelButton(false, this.game, game.world.centerX + 100, game.world.centerY + 30, "btnChoice", "Choice A", inputDown) 
            var btnChoiceB = new LabelButton(false, this.game, game.world.centerX + 100, game.world.centerY + 85, "btnChoice", "Choice B", inputDown) 
            var btnChoiceC = new LabelButton(false, this.game, game.world.centerX + 100, game.world.centerY + 140, "btnChoice", "Choice C", inputDown) 
            var btnChoiceD = new LabelButton(false, this.game, game.world.centerX + 100, game.world.centerY + 195, "btnChoice", "Choice D", inputDown) 

            // data = {q, o, correctIndex}
            var data = quiz.shuffle()
            // console.log(data)
            var count = 0
            
            // 刷新題目
            function resetQuestionAndChoice(data) {
                
                questionText.setText(data.q)
                console.log(data.q.length)
                choices = [btnChoiceA, btnChoiceB, btnChoiceC, btnChoiceD]
                console.log("correctIndex:" + data.correctIndex)
                for (i = 0; i < choices.length; i++) {
                    choices[i].setLabel(data.o[i])
                    if (i == data.correctIndex) {
                        choices[i].setRightOrWrong(true)
                        // console.log(choices[i].rightOrWrong)
                    } else {
                        choices[i].setRightOrWrong(false)
                    }
                }
            }
            
            // 第一次刷新題目
            resetQuestionAndChoice(data[count])

            // 按下按鈕 event
            function inputDown(item) {
                console.log("count:" + count)
                count++
                if (item.rightOrWrong) {
                    console.log("firstaaa")
                    item.setLabel("Congratulations!")
                    setTimeout(resetQuestionAndChoice, 500, data[count])
                } else {
                    console.log("firstbbb")
                    item.setLabel("you are wrong!")
                    setTimeout(resetQuestionAndChoice, 1500, data[count])
                }
            }
        }
    },

    // 排行榜
    rank: function() {
        this.create = function() {
            var bg = game.add.image(0, 0, 'bg')
            bg.width = game.world.width
            bg.height = game.world.height
            alert("rank 界面")
            game.state.start('main')

        }
    },

    // 介紹界面
    intro: function () {
        this.create = function() {
            var bg = game.add.image(0, 0, 'bg')
            bg.width = game.world.width
            bg.height = game.world.height
            alert("intro 界面")
            game.state.start('main')

        }
    },

    // 结束分數场景
    over: function() {
    	this.create = function() {
        	// TO-DO
            game.stage.backgroundColor = '#000'
            alert('游戏结束!')
        }
    }
}

// 添加場景到遊戲中
Object.keys(states).map(function(key) {
	game.state.add(key, states[key])
})

// 啟動遊戲
game.state.start('preload')