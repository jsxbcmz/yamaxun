!(function ($) {
    class login {
        constructor() {
            this.$username = 0;
            this.$password = 0;
            this.$login = $('.login');
            this.$check = '';
            this.$wrongInfo = $('.wrongInfo');
            this.localUser = localStorage.getItem("userinfo");
            this.localPass = localStorage.getItem("passinfo");
            this.cookieUser = getcookie("userinfo")
            this.cookiePass = getcookie("passinfo")
        }
        init() {
            let _this = this;
            $('#username').val(this.cookieUser);
            $('#password').val(this.cookiePass);
            this.$login.on('click', function () {
                if (_this.localUser) {
                    alert('您已经登录了');
                } else {
                    _this.$username = $('#username').val();
                    _this.$password = $('#password').val();
                    _this.$login = $('.login');
                    _this.$check = $('#state').prop('checked');
                    $.ajax({
                        url: 'http://10.31.157.44/1907/project/php/login.php',
                        data: {
                            user: _this.$username,
                            pass: _this.$password
                        },
                        success: function (d) {
                            if (d) {
                                location.href = 'index.html';
                                localStorage.setItem('userinfo', username.value);
                                localStorage.setItem('passinfo', password.value);
                                if (_this.$check) {
                                    addcookie('userinfo', username.value, 30);
                                    addcookie('passinfo', password.value, 30);
                                } else {
                                    delcookie('userinfo');
                                    delcookie('passinfo');
                                }
                            } else {
                                _this.$wrongInfo.show();
                            }
                        }
                    })
                }
            })
        }
    }
    new login().init();

    class reset {
        constructor() {
            this.$forget = $('#forget');
            this.$cover = $('.cover');
            this.$reset = $('.reset');
            this.$close = $('#reset_close');
            this.$reset_user = $('#reset_user');
            this.$reset_pass = $('#reset_pass');
            this.$reset_repass = $('#reset_repass');
            this.$reset_submit = $('#reset_submit');
            this.$move = $('.reset_header h3');
        }
        init() {
            let _this = this;
            this.$forget.on('click', function () {
                _this.$cover.show();
                _this.$reset.show().css({
                    left: ($(window).width() - _this.$reset.width()) / 2 - 20,
                    top: (document.documentElement.clientHeight - _this.$reset.height()) / 2 - 100,
                });

            });
            this.$close.on('click', function () {
                _this.$cover.hide();
                _this.$reset.hide();
            });
            this.$reset_submit.on('click', function () {
                if (_this.$reset_user.val()) {
                    if ((_this.$reset_pass.val() == _this.$reset_repass.val()) && _this.$reset_pass.val()) {
                        $.ajax({
                            url: 'http://10.31.157.44/1907/project/php/check.php',
                            data: {
                                checkname: _this.$reset_user.val(),
                            },
                            success: function (d) {
                                if (!d) {
                                    $.ajax({
                                        url: 'http://10.31.157.44/1907/project/php/reset.php',
                                        data: {
                                            username: _this.$reset_user.val(),
                                            password: _this.$reset_pass.val(),
                                        },
                                        success: function () {
                                            alert('密码已重置!');
                                            location.href = 'login.html';
                                        }
                                    })
                                } else {
                                    alert('该账号不存在,请先注册');
                                }
                            }
                        });
                    } else {
                        alert('两次密码不同或未填写,请修改');
                        _this.$reset_pass.focus();
                    }
                } else {
                    alert('账号不能为空!');
                    _this.$reset_user.focus();
                }

            });
            this.$move.on('mousedown', function (e) {
                let minX = e.offsetX;
                let minY = e.offsetY;
                $(document).on('mousemove', function (e) {
                    let x = e.clientX - minX;
                    let y = e.clientY - minY + $(window).scrollTop();
                    if (x <= 107) {
                        x = 107;
                    }
                    if (y <= (20 + $(window).scrollTop())) {
                        y = (20 + $(window).scrollTop());
                    }
                    if (x >= ($(document).width() - _this.$reset.width() + 67)) {
                        x = ($(document).width() - _this.$reset.width()) + 67
                    }
                    if (y >= (document.documentElement.clientHeight - _this.$reset.height()) + $(window).scrollTop() - 21) {
                        y = (document.documentElement.clientHeight - _this.$reset.height()) + $(window).scrollTop() - 21;
                    }
                    _this.$reset.css({
                        'position': 'absolute',
                        'left': x - 107,
                        'top': y - 20,
                    });
                });
                $(document).on('mouseup', function () {
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                });
                return false;
            })
        }
    }
    new reset().init();
})(jQuery);