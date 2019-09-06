!(function ($) {
    class cart {
        constructor() {
            this.sidArr = [];
            this.numArr = [];
            this.totalNum = 0;
            this.totalPrice = 0;
            this.$empty = $('.empty');
            this.$cart = $('.cart');
            this.$clone = null;
            this.$leftBtn = $('.left');
            this.$rightBtn = $('.right');
            this.$number = $('.number input');
            this.$num = 0;
            this.$i = 0;
            this.$j = 0;
            this.$remove = $('.remove');
            this.$check = $('.check');
            this.$all_check = $('.all_check');
            this.$all_check_value = false;
            this.$buy = $('.buy');
            this.localUser = localStorage.getItem("userinfo");
            this.count = 0;

            this.temp = 0;
            this.timerNum = 0;
            this.timerId = null;

        }
        init() {
            let _this = this;
            this.getArr();
            $.ajax({
                url: 'http://10.31.157.44/1907/project/php/some.php',
                dataType: 'json',
                data: {
                    arr: _this.sidArr.toString()
                },
                success: function (d) {
                    $.each(_this.sidArr, function (i, v) {
                        $.each(d, function (index, value) {
                            if (v == value.sid) {
                                _this.$clone = $('.items:hidden').clone(true, true);
                                _this.$clone.attr('sid', value.sid);
                                _this.$clone.find('.pic img').attr('src', value.url);
                                _this.$clone.find('.content-title').html(value.title);
                                _this.$clone.find('.price').html('￥' + value.price);
                                _this.$clone.find('.number input').val(_this.numArr[i]);
                                _this.$clone.find('.content-title').attr('href', 'detail.html?sid=' + value.sid + '&&type=1');
                                _this.$clone.find('.back').attr('href', 'detail.html?sid=' + value.sid + '&&type=1');
                                _this.$clone.css('display', 'flex');
                                _this.$clone.insertBefore($('.sum'));
                                _this.totalNum += parseInt(_this.numArr[i]);
                                _this.totalPrice += value.price * _this.numArr[i];
                                $('.sum .totalNum').html(_this.totalNum);
                                $('.sum .price').html('￥' + _this.totalPrice.toFixed(2));
                            }
                        })
                    })
                }
            })
            //减商品数量
            this.$leftBtn.on('click', function () {
                _this.$i = $(this).parents('.items').attr('sid');
                _this.num = $(this).parents('.number').find('input').val();
                _this.num--;
                if (_this.num < 0) {
                    _this.num = 0;
                }
                $(this).parents('.number').find('input').val(_this.num);
                _this.getTotalPrice(_this.$i, _this.num);
                if (_this.num == 0) {
                    _this.quickClick($(this));
                }
            });
            //加商品数量
            this.$rightBtn.on('click', function () {
                _this.$i = $(this).parents('.items').attr('sid');
                _this.num = $(this).parents('.number').find('input').val();
                _this.num++;
                $(this).parents('.number').find('input').val(_this.num);
                _this.getTotalPrice(_this.$i, _this.num);
            });
            //删除商品
            this.$remove.on('click', function () {
                if (confirm('是否要删除')) {
                    _this.$i = $(this).parents('.items:visible').attr('sid');
                    $.each(_this.sidArr, function (index, value) {
                        if (_this.$i == value) {
                            _this.j = index;
                        }
                    })
                    _this.sidArr.splice(_this.j, 1);
                    _this.numArr.splice(_this.j, 1);
                    addcookie('sidArr', _this.sidArr.toString(), 30);
                    addcookie('numArr', _this.numArr.toString(), 30);
                    // window.location.reload();
                    let obj = $(this).parents('.items:visible');
                    obj.animate({
                        'margin-left': -960
                    }, function () {
                        obj.hide();
                        _this.calPrice();
                        $('.shopping_num ').html(_this.sidArr.length || 0);
                        if (_this.sidArr.length < 1) {
                            $('.empty').show();
                            $('body>.cart').hide();
                        }
                    })
                }

            })
            //单选商品
            this.$check.on('click', function () {
                if ($('.check:visible').length == $('.check:visible:checked').length) {
                    _this.$all_check.prop('checked', true);
                } else {
                    _this.$all_check.prop('checked', false);
                }
                _this.calPrice();
            })
            //全选商品
            this.$all_check.on('click', function () {
                _this.$check = $('.check:visible');
                _this.$all_check_value = _this.$all_check.prop('checked')
                _this.$check.prop('checked', _this.$all_check_value);
                _this.calPrice();
            });
            //结算
            this.$buy.on('click', function () {
                if (_this.localUser) {
                    alert('支付宝还是微信');
                } else {
                    alert('请先登录');
                    location.href = 'login.html';
                }
            });
            this.$number.on('input', function () {
                _this.$j = parseInt($(this).val()) || 0;
                $(this).val(_this.$j);
            });
            this.$number.on('blur', function () {
                $(this).val(_this.$j);
                _this.$i = $(this).parents('.items').attr('sid');
                _this.num = $(this).parents('.number').find('input').val();
                $(this).parents('.number').find('input').val(_this.num);
                _this.getTotalPrice(_this.$i, _this.num);
            });
        }
        getArr() {
            if (getcookie('sidArr') && getcookie('numArr')) {
                this.sidArr = getcookie('sidArr').split(',');
                this.numArr = getcookie('numArr').split(',');
                this.$empty.hide();
                this.$cart.show();
            } else {
                this.$empty.show();
                this.$cart.hide();
            }
        }
        //按加减的时候计算总价
        getTotalPrice(id, num) {
            let _this = this;
            this.calPrice();
            $.each(this.sidArr, function (index, value) {
                if (value == id) {
                    _this.numArr[index] = num;
                }
            });
            addcookie('numArr', _this.numArr.toString(), 30);
        }
        //按checkbox时计算总价
        calPrice() {
            let _this = this;
            this.totalNum = 0;
            this.totalPrice = 0;
            $.each($('.items:visible'), function (index, value) {
                if ($(value).find('.check').prop('checked')) {
                    _this.totalNum += parseInt($(value).find('.number input').val());
                    _this.totalPrice += ($(value).find('.number input').val() * $(value).find('.price').html().split('￥')[1]);
                    _this.totalPrice = +(Number.parseFloat(_this.totalPrice).toFixed(2));
                }
            });
            $('.sum .totalNum').html(this.totalNum);
            $('.sum .price').html('￥' + this.totalPrice.toFixed(2));
        }
        //当数量为0时，快速按'-'按钮，会有是否删除提示
        quickClick(obj) {
            let _this = this;
            this.temp++;
            if (!this.timerId) {
                this.timerId = setInterval(function () {
                    this.timerNum++;
                }, 500);
                setTimeout(function () {
                    if (this.temp < 5) {
                        this.reset();
                    }
                }, 2500);
            } else if (this.temp > 5 && this.timerNum <= 3) {
                this.reset();
                if (confirm('是否要删除')) {
                    this.$i = obj.parents('.items:visible').attr('sid');
                    $.each(this.sidArr, function (index, value) {
                        if (this.$i == value) {
                            this.j = index;
                        }
                    })
                    this.sidArr.splice(this.j, 1);
                    this.numArr.splice(this.j, 1);
                    addcookie('sidArr', this.sidArr.toString(), 30);
                    addcookie('numArr', this.numArr.toString(), 30);
                    let obj1 = obj.parents('.items:visible');
                    obj1.animate({
                        'margin-left': -960
                    }, function () {
                        obj1.hide();
                        $('.shopping_num ').html(_this.sidArr.length || 0);
                        _this.calPrice();
                        if (_this.sidArr.length < 1) {
                            $('.empty').show();
                            $('body>.cart').hide();
                        }
                    })
                }
            } else if (this.temp < 5 && this.timerNum == 3) {
                this.reset();
            }
        }
        reset() {
            clearInterval(this.timerId);
            this.timerId = null;
            this.temp = 0;
            this.timerNum = 0;
        }
    }

    new cart().init();



})(jQuery);