!(function ($) {
    //渲染数据
    class detail {
        constructor() {
            this.whatId = location.search.split('=')[1];
            this.listArr = [];
            this.listStr = '';
            this.sidArr = [];
            this.numArr = [];
            this.i = 0;
            this.j = 0;
            this.$num = $('.order input');
            this.$addCart = $('.addCart');
            this.$total = $('.order em');
            this.$data = {};
        }
        init() {
            let _this = this;
            $.ajax({
                url: 'http://10.31.157.44/1907/project/php/detail.php',
                data: {
                    sid: this.whatId
                },
                dataType: 'json',
                success: function (d) {
                    _this.$data = d;
                    _this.listArr = d.urls.split(',');
                    _this.listStr = '';
                    $.each(_this.listArr, function (index, value) {
                        _this.listStr += `
                            <div class="picList_div">
                            <img src="${value}" alt="">
                            </div>
                            `;
                    })
                    $('.picList').html(_this.listStr);
                    $('.picList div').first().addClass('picList_active');
                    $('.smallPic img').attr('src', d.url);
                    $('.bigPic').attr('src', d.url);
                    $('.details h3').html(d.title);
                    $('.details em').html(d.price);
                    _this.i = parseInt(_this.$num.val());
                    $('.order em').html('￥' + d.price * _this.i);
                    _this.$addCart.on('click', function () {
                        _this.getArr();
                        if ($.inArray(_this.whatId, _this.sidArr) != -1) {
                            _this.j = parseInt(_this.numArr[$.inArray(_this.whatId, _this.sidArr)]) + _this.i;
                            _this.numArr[$.inArray(_this.whatId, _this.sidArr)] = _this.j;
                            addcookie('numArr', _this.numArr.toString(), 30);
                        } else {
                            _this.sidArr.push(_this.whatId);
                            _this.numArr.push(_this.i);
                            addcookie('sidArr', _this.sidArr.toString(), 30);
                            addcookie('numArr', _this.numArr.toString(), 30);
                        }
                    });
                }
            });
            this.$num.on('input', function () {
                _this.i = parseInt(_this.$num.val());
                if (_this.i) {
                    _this.$total.html('￥' + (_this.$data.price * _this.i).toFixed(2));
                } else {
                    _this.$total.html('￥' + 0);
                }
            });
            this.$num.on('blur', function () {
                if (!_this.i) {
                    _this.$num.val('1');
                    _this.i = 1;
                    _this.$total.html('￥' + (_this.$data.price * _this.i).toFixed(2));
                }
            })
        }

        getArr() {
            if (getcookie('sidArr') && getcookie('numArr')) {
                this.sidArr = getcookie('sidArr').split(',');
                this.numArr = getcookie('numArr').split(',');
            }
        }


    }
    new detail().init();

    //放大镜
    class magnifier {
        constructor() {
            this.$picList = $('.picList');
            this.$smallPic = $('.smallPic');
            this.$bigPic = $('.bigPic');
            this.$bigM = $('.bigM');
            this.$smallM = $('.smallM');
            this.picUrl = '';
            this.picIndex = 0;
            this.x = 0;
            this.y = 0;
            this.bili = 0;
            this.$bigM_height = 0;
            this.$littleTips = $('.picShow p');
            this.$scrollTop = 0;
        }
        init() {
            let _this = this;
            this.bili = this.$bigPic.width() / this.$bigM.width();
            //切换展示图片
            this.$picList.on('mouseover', 'div', function () {
                $(this).addClass('picList_active').siblings().removeClass('picList_active');
                _this.picUrl = $(this).find('img').attr('src');
                _this.$smallPic.find('img').attr('src', _this.picUrl);
                _this.$bigPic.attr('src', _this.picUrl);
                _this.$bigM_height = $(this).find('img').height() / $(this).find('img').width() * _this.$bigM.width();
                _this.$bigM.css('height', _this.$bigM_height);
                _this.$smallM.css({
                    width: _this.$smallPic.width() / _this.bili,
                    height: _this.$smallPic.height() / _this.bili
                })
            });
            this.$smallPic.on('mouseover', function () {
                _this.$bigM.show();
                _this.$smallM.show();
                _this.$littleTips.html('点击打开扩展视图');
                _this.$smallM.css({
                    width: _this.$smallPic.width() / _this.bili,
                    height: _this.$smallPic.height() / _this.bili
                })
                if (_this.$bigM_height == 0) {
                    _this.$bigM_height = _this.$picList.children().first().find('img').height() / _this.$picList.children().first().find('img').width() * _this.$bigM.width()
                }
                _this.$bigM.css('height', _this.$bigM_height);
                _this.$smallPic.on('mousemove', function (e) {
                    _this.x = e.pageX - _this.$smallPic.offset().left - _this.$smallM.width() / 2;
                    _this.y = e.pageY - _this.$smallPic.offset().top - _this.$smallM.height() / 2;
                    if (_this.x <= 0) {
                        _this.x = 0
                    }
                    if (_this.y <= 0) {
                        _this.y = 0
                    }
                    if (_this.x >= (_this.$smallPic.width()) - _this.$smallM.width()) {
                        _this.x = (_this.$smallPic.width() - _this.$smallM.width());
                    }
                    if (_this.y >= (_this.$smallPic.height()) - _this.$smallM.height()) {
                        _this.y = (_this.$smallPic.height() - _this.$smallM.height());
                    }
                    _this.$smallM.css({
                        left: _this.x,
                        top: _this.y
                    })
                    _this.$bigPic.css({
                        left: -_this.x * _this.bili,
                        top: -_this.y * _this.bili
                    })
                });
            });
            this.$smallPic.on('mouseout', function () {
                _this.$bigM.hide();
                _this.$smallM.hide();
                _this.$littleTips.html('鼠标移至图上可放大图片');
            });
            $(window).scroll(function () {
                _this.$scrollTop = $(window).scrollTop();
                if (_this.$scrollTop > 150 && _this.$scrollTop < 300) {
                    _this.$picList.css({
                        "position": 'fixed',
                        top: 0
                    })
                    $('.picShow').css({
                        "position": 'fixed',
                        top: 0,
                    })
                } else if (_this.$scrollTop > 300) {
                    _this.$picList.css({
                        "position": 'fixed',
                        top: -(_this.$scrollTop - 300)
                    })
                    $('.picShow').css({
                        "position": 'fixed',
                        top: -(_this.$scrollTop - 300),
                        width: 500
                    })
                } else {
                    _this.$picList.css({
                        "position": 'absolute',
                        top: 0
                    })
                    $('.picShow').css({
                        "position": 'absolute',
                        top: 0,
                        width: 500
                    })
                }
            })
        }
    }
    new magnifier().init();
    //历史记录
    class userHistory {
        constructor() {
            this.historyArr = [];
            this.whatId = location.search.split('=')[1];
        }
        init() {
            if (getcookie('history')) {
                this.historyArr = getcookie('history').split(',');
            } else {
                this.historyArr = [];
            }
            if ($.inArray(this.whatId, this.historyArr) == -1) {
                this.historyArr.push(this.whatId);
            }
            addcookie('history', this.historyArr.toString(), 30);
        }
    }
    new userHistory().init();

})(jQuery);