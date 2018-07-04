# 來自程設組長的大禮包？！

## 指令包

### git
#### 當天結束前於master下
```shell
$ git pull                      //將目前更新與遠端repo整合
$ git checkout -b 名子           //建立分支
$ git push後出現的那行upstream設定 //設定完後
$ git push
```
#### 早上開工前
```shell
$ git checkout master //切換回master
$ git branch -D 名子   //刪除之前所建立之branch
$ git pull            //更新本地repo
```

### windows上port3000被占用打這行
```shell
cmd "/C TASKKILL /IM node.exe /F"
```
### 部署
```shell
$ npm i
$ DEBUG=ncufresh18:* npm start
```

## 進度列表
### 郭  迪： 小遊戲 
1. 謹慎定義資料表
2. 前端prototype
3. 完善前端美術設計與內容
盡量在前三周完成

### 周益全： 中大生活
第一周: 精美天氣
第二周: 食衣住行育樂前端草稿+後端新增內容(粗體字那個有特殊要求)
第三周: Bar還有順暢的轉場(手機跟電腦)
第四周: 完善轉場與美術設計 請企劃組用後端加內容
衝刺: 找出bug 功能是否都符合預期 做完就幫別人

### 徐曼妮： 影音專區 
第一周: 謹慎定義資料表＋熟悉youtube API
第二周: 前端prototype+完善後台(實現所有功能)
第三周: 完善前端美術設計與內容
第四周: 手機版
衝刺: 再度確定功能完善然後繼續做特效 很辛苦等別人來幫QQ

### 楊佩璇： 系所社團
第一周: 想好大架構 基本上除了示意圖之外都不必寫死 善用資料庫 比較類似校園導覽的點下去跳出內容不過這邊點的是文字 多參考評ㄍ的code
第二周: 做出電腦版prototype(要有可讓企劃組新增內容ex:社團 的後台)
第三周: 做出手機板prototype
第四周: 完善轉場與美術設計
衝刺: 同上並盡力debug  很辛苦等別人來幫QQ

### 華崧淇： 校園導覽(Map) (全部手機板都要一起做)
第一周:看懂評ㄍ的code
第二周:做出彈出視窗來(點出地圖上所有點)
第三周:做出工具列(那些很酷炫ㄉ互動)	請企劃組把內容跟照片填進去
第四周:確認上週內容完成後開始完善轉場與美術設計 手機版操作需特別 加強（放大、滑動、按vs點）
衝刺:Debug 做完就幫別人
### 余函倩： 新生必讀  
第一周: 分清楚哪些東西要寫死(ex:按鈕) 並仔細構思整體架構
第二周: 寫出有基本功能的prototype(含手機板)
第三周: 完善轉場與美術設計(電腦版)	請企劃組填進內容
第四周: 完善轉場與美術設計(手機板) 
衝刺: Debug＋很辛苦等別人來幫QQ
### 潘卉盈： 關於我們& Q&A 
第一周: 台大加油！
第二周: 做出有基本功能的Q&A prototype
第三周: 完成Q&A(電腦+手機板)
第四周: 做完關於我們(電腦+手機板) 包含完善轉場與美術設計
衝刺: Debug Q&A 做完就幫別人
### 陳鉅仁： 登入(前端)&&個人專區&倒數頁面
第一周: 倒數頁面(電腦手機)
第二周: 登入畫面(電腦手機)
第三周: 有基本功能的個人專區prototype (電腦手機)
第四周: 完善轉場與美術設計-個人專區與登入(使用者體驗)
衝刺: debug登入以及個人專區 做完就幫別人



## ejs
* 開標籤
    * ``<%=`` 普通輸出用
    * ``<%-`` 只有在輸出html用
    * ``<%`` 不是輸出用
* 閉標籤
    * ``%>``
* 註解方式
    * ``<% /* 我是註解。 */ %>``
        * 這樣註解才不會顯示在網頁原始碼裡面
        * 這種會顯示在網頁原始碼裡面：``<!-- 我是註解。 -->``

想知道更多請看：[http://ejs.co/#docs](http://ejs.co/#docs)

## Ajax
### get方法
#### 前端
```javascript
$.ajax({
    url:    "/documents/require_data/?id="+id,
    method:'GET',
    error: function(err){
        //失敗要做的事
    },
    success: function(data){
        //成功要做的事
    }
});
```
#### 後端
* 用``req.query.id``拿get的資料
### post方法
#### 前端
```javascript
$.ajax({
    url:    "/documents/require_data",
    method:'POST',
    data: {id : id},
    error: function(err){
        //失敗要做的事
    },
    success: function(data){
        //成功要做的事
    }
});
```
#### 後端
* 用``req.body.id``拿post的資料

想知道更多請看：[w3school](https://www.w3schools.com/jquery/ajax_ajax.asp)或[jQuery官方文件](http://api.jquery.com/jquery.ajax/)

## ckeditor
* 替換方式

    1. 在html裡面寫
    ```htmlembedded
    <textarea id="QQQ"></textarea>
    <textarea id="hahaha"></textarea>
    ```
    2. 在前端JavaScript裡面寫
    ```javascript
    CKEDITOR.replace('hahaha',{
        filebrowserUploadUrl: '/uploader',
    });
    CKEDITOR.replace('QQQ',{
        filebrowserUploadUrl: '/uploader',
    });
    CKEDITOR.editorConfig = function (config){
      config.enterMode = CKEDITOR.ENTER_BR;
      config.autoParagraph = false;
    };
    ```
    3. 兩格textarea就會都被你換成ckeditor了～
    
* 設定ckeditor內容的方法
在前端JavaScript裡面寫
    ```javascript
    CKEDITOR.instances['textarea的id名稱'].setData("我是要填入的字串");
    ```
> 把textarea換成ekeditor後，後端還是一樣會把表單裡面ckeditor那一欄傳去的東西看成是一個textarea傳過去的字串，所以textarea還是要設name屬性ㄛ

想知道更多請看：[ckeditor4](https://ckeditor.com/ckeditor-4/)

## 檔案上傳
### html表單
```html
<form method="post" enctype="multipart/form-data" action="/insert_img">
    <input type="file" name="uploadingImg">
    <button type="submit">上傳</button>
</form>
```
### 後端JavaScript部分
```javascript
var formidable = require('formidable');    //記得require formidable
.
.
.
router.post('/insert_img', (req, res, next) => {
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {    //如果你的表單有不是file的欄位，他們會在fields裡面
    if (err) return next(err);
    var tempId = mongoose.Types.ObjectId();    //用mongoose幫我們生一組亂數
    var fileName = "";
    if (files.uploadingImg.name != "") {    //要是file那一欄有填
      var uploadedFile = files.uploadingImg;
      var tmpPath = uploadedFile.path;    //現在檔案被暫存在哪
      fileName = tempId + uploadedFile.name.substr(uploadedFile.name.lastIndexOf('.'));    //檔名=剛剛mongoose產生的亂數＋原始副檔名
      var targetPath = './public/' + fileName;    //我們希望檔案存在public下
      // console.log(tmpPath);
      // console.log(targetPath);

      // 用來偵測跨硬碟分區error的code
      // fs.rename(tmpPath, targetPath, (err) => {
      //   if (err){
      //     console.log(err);
      //   }
      //   else{ 
      //     fs.unlink(tmpPath, () => {
      //       console.log('File Uploaded to ' + targetPath + ' - ' + uploadedFile.size + ' bytes');
      //     });
      //   }
      // });

      var readStream = fs.createReadStream(tmpPath)
      var writeStream = fs.createWriteStream(targetPath);
      readStream.on("end", (err) => {
        if (err) return next(err);
        //搬完之後要做的事寫在這
        fs.unlink(tmpPath, () => {    //把暫存的檔案刪除
            console.log('File Uploaded to ' + targetPath + ' - ' + uploadedFile.size + ' bytes');
        });
      }).pipe(writeStream);
    }
    res.redirect('/');
  });
})
```

想知道更多請看：[formidable](https://www.npmjs.com/package/formidable)

## velocity.js
### 基本用法
```javascript
Velocity(document.getElementBy.... , {    //將動畫物件選起來
    /* 這裡面寫你希望物件麼動 */
    opacity: 1    //ex: 透明度變1
}, {
    duration: 4000,    //值續時間
    easing: [ 0.17, 0.67, 0.83, 0.67 ]    //動畫的快慢(線性、二次方、不規則....)
});
```
更多請看：[velocity.js](http://www.mrfront.com/docs/velocity.js/)

## 零碎提醒事項
### 合作建議
1. 重點是溝通
2. 不要一開始就打槍企劃組
    * ＸＸＸ為什麼做不到
    * ＸＸＸ比較好
    * 不然ＸＸＸ怎麼樣
3. 圖片如果不好排的話可以跟美工組溝通一下
    * ＸＸ圖可以幫我做成X比Y的嗎？
    * ＸＸ圖可以幫我去背嗎？
4. 要消失記得告訴組長和你的隊友，不要讓隊友以為你神隱了
### 語法建議
1. absolute route👎 v.s. relative route👍
2. css inline-style👎 v.s. embedded style👌 v.s. external styles👍
### 效能建議
1. 做動畫的效能：css > velocity.js > jquery animation
2. 如果只是想用jquery的選擇器的話：``document.querySelector()``
3. 資料庫query可以用Promise寫(想學可以問組長ＸＤ)
4. 資料表的各種操作: [populate](http://mongoosejs.com/docs/populate.html) [aggrgrate](https://docs.mongodb.com/manual/aggregation/)
### 其他工具
1. url跳到網頁特定區段 -> ``http://網址...../#class名稱``
2. 在前端解析get url
    ```javascript
    var url = new URL(window.location.href);
    console.log(url.searchParams.get('想get的值'));
    ```
3. 下載檔案 -> [``res.download();``](http://expressjs.com/zh-tw/4x/api.html#res.download)

![](https://i.imgur.com/FnjOJaU.png)
