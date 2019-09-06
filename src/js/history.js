!(function ($) {
    class history {
        constructor() {
            this.$left = $('.left');
            this.$right = $('.right');
            this.$list = $('.history_list');
            this.historyArr = [];
            this.num = 0;
            this.count = 0;
            this.str = '';
        }
        init() {
            let _this = this;
            if (getcookie('history')) {
                this.historyArr = getcookie('history').split(',');
                this.num = this.historyArr.length;
                this.str = '';
                $.ajax({
                    url: 'http://10.31.157.44/1907/project/php/some.php',
                    data: {
                        arr: _this.historyArr.toString()
                    },
                    dataType: 'json',
                    success: function (d) {
                        $.each(_this.historyArr, function (a_index, a_value) {
                            $.each(d, function (d_index, d_value) {
                                if (a_value == d_value.sid) {
                                    _this.str += `
                                    <a href="detail.html?sid=${d_value.sid}&&type=1" title="${d_value.title}">
                                    <img src="${d_value.url}"
                                    alt=""></a>`;
                                }
                            })
                        })
                        _this.$list.html(_this.str);
                    }
                })
            } else {
                this.$list.html('');
            }
            this.$right.on('click', function () {
                if (_this.num > 5) {
                    if (_this.count < (_this.num / 5 - 1)) {
                        _this.$list.stop(true).animate({
                            left: -700 * (_this.count + 1)
                        })
                        _this.count++;
                    } else {
                        _this.count = 0;
                        _this.$list.stop(true).animate({
                            left: -140 * _this.num
                        }, function () {
                            _this.$list.css({
                                left: 700
                            }).stop(true).animate({
                                left: 0
                            })
                        })
                    }
                }
            })
            this.$left.on('click', function () {
                if (_this.num > 5) {
                    if (_this.count <= 0) {
                        _this.$list.animate({
                            left: 700
                        }, function () {
                            _this.$list.css({
                                left: -140 * _this.num
                            }).animate({
                                left: -parseInt(_this.num / 5) * 700
                            })
                        })
                        _this.count = parseInt(_this.num / 5);
                    } else {
                        _this.count--;
                        _this.$list.animate({
                            left: -700 * _this.count
                        })
                    }
                }

            })
        }
    }
    new history().init();
})(jQuery);