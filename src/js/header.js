!(function ($) {
    class check {
        constructor() {
            this.url = window.location.href.split('src/')[1] || window.location.href.split('dist/')[1];
            this.$div = $('.header_bottom_left_detail');
            this.$span = $('.header_nav .shopping_num')
            this.sidArr = [];
            this.$num = -1;
            this.localUser = localStorage.getItem("userinfo");
            this.$login = $('.login');
            this.$login_detail = $('.login_detail');
            this.timer = null;
        }
        init() {
            let _this = this;
            if (this.url == '' || this.url == '#' || this.url == 'index.html' || this.url == 'index.html#' || this.url == '?' || this.url == 'index.html?') {
                this.$div.show();
            } else {
                this.$div.hide();
            }
            this.getNum();
            this.$span.html(this.$num);
            if (this.localUser) {
                $('.header_bottom_nav  .my').html(this.localUser);
                $('.header_bottom_right  .my').html(this.localUser);
                $('.login_detail_login').hide();
                $('.login_detail_register').hide();
                $('.login_detail_quit').show();
            } else {
                $('.header_bottom_nav  .my').html('我');
                $('.header_bottom_right  .my').html('登录');
                $('.login_detail_login').show();
                $('.login_detail_register').show();
                $('.login_detail_quit').hide();
            }
            $('.login_detail_quit').on('click', function () {
                localStorage.removeItem('userinfo');
                localStorage.removeItem('passinfo');
                window.location.reload();
            })
            this.$login.hover(function () {
                _this.$login_detail.show();
            }, function () {
                _this.timer = setTimeout(function () {
                    _this.$login_detail.hide()
                }, 300)
            });
            this.$login_detail.hover(function () {
                clearTimeout(_this.timer);
                $(this).show();
            }, function () {
                $(this).hide();
            });
            $('#input').on('blur', function () {
                setTimeout(function () {
                    $('.input_detail').hide();
                }, 200)
                $.each($('script'), function (index, value) {
                    if (/^http/.test($(value).attr('src'))) {
                        $('body').find(value).remove();
                    }
                })
            });
            $('.input_detail').delegate('li', 'click', function () {
                $('#input').val($(this).find('a').html());
            });
            $('#submit').on('click', function () {
                window.location.href = 'goods.html';
            })
        }
        getNum() {
            if (getcookie('sidArr')) {
                this.sidArr = getcookie('sidArr').split(',');
                this.$num = this.sidArr.length;
            } else {
                this.$num = 0;
            }
        }
    }
    new check().init();

    // class many {
    //     constructor() {
    //         this.$little = $('.header_bottom_left_detail');
    //         this.$big = $('.header_bottom_left_detail_');
    //         this.timer = null;
    //     }
    //     init() {
    //         let _this = this;
    //         this.$little.hover(function () {
    //             clearTimeout(_this.timer);
    //             _this.$big.show().stop(true).animate({
    //                 width: 546
    //             });

    //         }, function () {
    //             _this.timer = setTimeout(function () {
    //                 _this.$big.stop(true).animate({
    //                     width: 0
    //                 }, function () {
    //                     _this.$big.hide();
    //                 });
    //             }, 50);
    //         });
    //         this.$big.hover(function () {
    //             clearTimeout(_this.timer);
    //             $(this).css({
    //                 width: 546
    //             })
    //         }, function () {
    //             $(this).stop(true).animate({
    //                 width: 0
    //             })
    //         })
    //         this.$little.find('div').hover(function () {
    //             $(this).addClass('weight').siblings().removeClass('weight');
    //         }, function () {
    //             let __this = this;
    //             _this.$big.on('mouseout', function () {
    //                 $(__this).removeClass('weight');
    //             });
    //             _this.$little.on('mouseout', function () {
    //                 $(__this).removeClass('weight');
    //             })
    //         })
    //     }
    // }
    // new many().init();

    class search {
        constructor() {
            this.$input = $('#input');
            this.$detail = $('.input_detail');
            this.strhtml = '';
        }
        init() {
            let _this = this;
            this.$input.on('input', function () {
                _this.$detail.show();
                _this.strhtml = '';
                $.getJSON('https://suggest.taobao.com/sug?code=utf-8&q=' + _this.$input.val() + '&_ksTS=1567561434473_421&k=1&area=c2c&bucketid=14&callback=?', function (d) {
                    $.each(d.result, function (index, value) {
                        _this.strhtml += `<li><a href="javascript:;">${value[0]}</a></li>`;
                    });
                    _this.$detail.html(_this.strhtml);
                })
            })
        }
    }
    new search().init();
})(jQuery);