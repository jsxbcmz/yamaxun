!(function ($) {
    //底部广告和侧边栏
    class index {
        constructor() {
            this.$ad = $('.ad');
            this.$closeBtn = $('.closeBtn');
            this.$aside = $('.aside');
            this.$aside_items = $('.aside-items');
            this.$positionArr = [];
            this.$scrollTop = 0;
            this.$aside_index = 0;
            this.$nowtime = 0;
            this.$time = 0;
        }
        init() {
            let _this = this;
            this.$positionArr = [$('.specialBox').position().top + 117, $('.topBox').position().top + 117, $('.typesBox').position().top + 117];
            //关闭广告并在10秒内刷新不显示底部广告
            this.$time = getcookie('adtime');
            this.$nowtime = Date.now();
            if (this.$time) {
                if ((this.$nowtime - this.$time) > 10000) {
                    this.$ad.show();
                } else {
                    this.$ad.hide();
                }
            } else {
                this.$ad.show();
            }
            this.$closeBtn.on('click', function () {
                _this.$ad.hide();
                _this.$nowtime = Date.now();
                addcookie('adtime', _this.$nowtime, 30);
            });

            //侧边栏定位,移动和楼梯效果
            this.$aside.css({
                'display': 'block',
                'top': 500
            });
            $(document).on('scroll', function () {
                _this.$scrollTop = $(window).scrollTop();
                if (_this.$scrollTop > 450) {
                    $('.aside').css({
                        'position': 'fixed',
                        'top': 50
                    })
                } else {
                    $('.aside').css({
                        'position': 'absolute',
                        'top': 500
                    })
                }
                $.each(_this.$positionArr, function (index, value) {
                    if (_this.$scrollTop > value - 300) {
                        _this.$aside_index = index;
                    }
                    _this.$aside_index = _this.$aside_index < index ? _this.$aside_index : index;
                    if (_this.$scrollTop > 2000) {
                        _this.$aside_index = 3;
                    }
                })
                _this.$aside_items.eq(_this.$aside_index).addClass('aside-active').siblings().removeClass('aside-active');
            });
            this.$aside_items.on('click', function () {
                _this.$aside_index = parseInt($(this).index());
                if (_this.$aside_index == 3) {
                    $('html,body').animate({
                        scrollTop: 0
                    })
                } else {
                    $('html,body').animate({
                        scrollTop: _this.$positionArr[_this.$aside_index]
                    })
                }
            });
        }
    }
    new index().init();

    //轮播图
    class swiper {
        constructor() {
            this.li_index = 0;
            this.$swiper = $('.swiper');
            this.$ol = $('.swiper ol');
            this.$ul = $('.swiper ul');
            this.$ol_li = $('.swiper ol').find('li');
            this.$ul_li = $('.swiper ul').find('li');
            this.$leftBtn = $('.leftBtn');
            this.$rightBtn = $('.rightBtn');
            this.timer = null;
            this.ulStr = '';
            this.olStr = '';
        }
        init() {
            let _this = this;
            $.ajax({
                url: 'http://10.31.157.44/1907/project/php/swiper.php',
                dataType: 'json'
            }).done(function (d) {
                $.each(d, function (index, value) {
                    _this.ulStr += `
                    <li>
                        <a href="goods.html"><img src="${value.url}" alt="" title="${value.title.replace(/<br>/,' ')}"></a>
                    </li>`;
                    _this.olStr += ` 
                    <li>
                        <a href="goods.html">${value.title}</a>
                    </li>`;
                });
                _this.$ul.html(_this.ulStr);
                _this.$ol.html(_this.olStr);
                _this.$ol_li = $('.swiper ol').find('li');
                _this.$ul_li = $('.swiper ul').find('li');
                _this.$ul_li.first().addClass('active_ul');
                _this.$ol_li.first().addClass('active_ol');
                _this.$ol_li.hover(function () {
                    $(this).addClass('active_ol').siblings().removeClass('active_ol');
                    _this.li_index = $(this).index();
                    _this.changeTab(_this.li_index);
                })
            })
            this.$swiper.hover(function () {
                clearInterval(_this.timer);
                _this.$ol.stop(true).animate({
                    bottom: 0
                })
            }, function () {
                _this.timer = setInterval(function () {
                    _this.rightClick()
                }, 2000)
                _this.$ol.stop(true).animate({
                    bottom: -45
                })
            });
            this.$leftBtn.on('click', function () {
                _this.li_index--;
                if (_this.li_index < 0) {
                    _this.li_index = 7;
                }
                _this.changeTab(_this.li_index);
            });
            this.$rightBtn.on('click', function () {
                _this.li_index++;
                if (_this.li_index > 7) {
                    _this.li_index = 0;
                }
                _this.changeTab(_this.li_index);
            });
            this.timer = setInterval(function () {
                _this.rightClick()
            }, 2000)
        }
        changeTab(i) {
            this.$ol_li = $('.swiper ol').find('li');
            this.$ul_li = $('.swiper ul').find('li');
            this.$ul_li.eq(i).fadeIn('slow').siblings().fadeOut('slow');
            this.$ol_li.eq(i).addClass('active_ol').siblings().removeClass('active_ol');
        }
        rightClick() {
            this.li_index++;
            if (this.li_index > 7) {
                this.li_index = 0;
            }
            this.changeTab(this.li_index);
        }

    }
    new swiper().init();

    //倒计时
    class countdown {
        constructor() {
            this.count1 = $('.selected li .time span');
            this.count2 = $('.specialBox .special li .time span');
            this.deadTime1 = new Date('2019/9/9 12:00:00');
            this.deadTime2 = new Date('2019/9/30 18:00:00');
            this.nowTime = 0;
            this.hour = 0;
            this.minute = 0;
            this.second = 0;
        }
        init() {
            let _this = this;
            this.nowTime = Date.now();

            setInterval(function () {
                _this.nowTime = Date.now();
                _this.count1.html(_this.cal(_this.deadTime1 - _this.nowTime));
                _this.count2.html(_this.cal(_this.deadTime2 - _this.nowTime));
            }, 1000)

        }
        cal(time) {
            time /= 1000;
            this.hour = parseInt(time / 3600);
            this.minute = parseInt((time % 3600) / 60);
            this.second = parseInt(time % 60);
            return `${this.double(this.hour)}:${this.double(this.minute)}:${this.double(this.second)}`
        }
        double(i) {
            return i < 10 ? "0" + i : i;
        }
    }
    new countdown().init();
    //顶部广告
    class FIBA {
        constructor() {
            this.$FIBA = $('.FIBA');
            this.$img1 = $('.FIBA .img1');
            this.$img2 = $('.FIBA .img2');
            this.timer = null;
        }
        init() {
            let _this = this;
            this.$FIBA.hover(function () {
                _this.timer = setTimeout(function () {
                    _this.$img1.hide();
                    _this.$img2.stop(true).fadeIn()
                }, 50);
            }, function () {
                clearTimeout(_this.timer);
                _this.$img1.show();
                _this.$img2.stop(true).fadeOut();
            })
        }
    }
    new FIBA().init();
})(jQuery);