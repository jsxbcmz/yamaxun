# javascript

## html

### 1.index.html
网站首页。
导入了通用的头部和底部、历史浏览记录页面。
添加了顶端广告效果、底部广告效果、侧边栏楼梯效果、轮播图效果。
数据渲染：轮播图、右边电子书热销排行、历史浏览记录。‘镇店之宝’、‘畅销榜’、‘热门分类’为写死的数据。
### 2.header.html
除了登录注册页面，通用的头部页面。
添加了搜索框搜索功能、用户登录后能显示用户名称、购物车栏显示购物车中有几种商品。
### 3.footer.html
除了登录注册页面，通用的底部页面。
### 4.history.html
根据存储在本地cookie中的'history'，显示历史浏览记录。
当商品列表多于5种时，点击左右方向键，可以实现当前整栏的切换。
### 5.goods.html
通过$.ajax(),取得数据库中goodslist表中的商品信息。
将商品的sid和地址拼接，能跳转到对应的商品详情页。
### 6.detail.html
通过地址栏中传过来的sid和type的值，根据type的值，通过不同的php文件到数据库中取得对应的数据，进行渲染。
左侧的piclist显示当前商品所有的图片信息，可以通过hover事件，切换小图和大图中显示的图片。
放大镜效果：根据当前图片的宽高比，调整大图和小放大镜的大小。
在添加数量的input在失去焦点后具有数据输入检测。当数据为空或输入除数字以外开头的内容时，会默认变成1；当输入数字开头后加其他字符时，以前面数字的内容为准。
### 7.cart.html
根据存在本地cookie的'numArr'和'sidArr',到数据库中取得相对应的数据，进行渲染。当sidArr中有数据是，显示购物车中的商品，否则显示'购物车中还没有商品'的提示框。
点击某个商品的图片或者标题，能跳转或该商品的详情页。
通过全选框和每个商品前的checkbox可以选择需要计算总数和总价的商品。
通过每个商品的'-'和'+'可以增加或减少该商品的数量。
删除效果：点击'删除'按钮，该商品整栏会向左移出页面，然后隐藏，并更新本地的cookie、页面显示的商品总价、总数。
快速点击'-'键触发删除效果：当该商品的当前数量为0且在2秒内点击'-'键达到6次后，会提示是否要删除该商品信息。
### 8.register.html
在点击'继续'按钮后，才会验证输入框内内容是否符合要求和检测'同意网站的使用条件'是否打勾，让不符合的内容框变红并显示错误提示并自动聚焦到第一个错误的内容框；如果没打勾，会显示'未同意网站的使用条件'的提示框。
在输入框内容格式正确且打勾以后，点击'继续'按钮，会检测帐号是否存在。当帐号不存在时，会注册成功，跳转到登录页面；当帐号存在，提示'帐号存在'，帐号的输入框自动获得焦点。
### 9.login.html
当输入的帐号或密码错误时，会显示'帐号密码错误'框。
记住登录状态：当打勾时，帐号密码信息会存到cookie和localStorage中。localStorage的信息用于页面显示该用户的用户名，cookie的信息用于用户在退出登录后，再次登录时，不需要再次输入帐号密码。当不打勾时，帐号密码信息只会存到localStorage中。
当localStorage中已经有'userinfo'帐号信息后，再次登录时，会显示'已登录'，无法登录新账号。
忘记密码：用户可以根据已经创建的帐号，来改变对应的密码信息，并保存到数据库中。如果该帐号不存在时，提示'可以创建该帐号'。

# php

### conn.php
连接数据库。
### goodlist.php
获得全部的商品信息。
### book.php
获得全部的电子书信息或则特定sid的电子书的信息。
### detail.php
获得特定sid的商品的信息。
### some.php
获得特定sid的数组的商品的信息。
### swiper.php
获得轮播图的信息。
### check.php
验证用户名是否存在。
### register.php
注册用户信息。
### login.php
用户登录。
### reset.php
用户重置密码。
