!(function ($) {
    class register {
        constructor() {
            this.$wrongInfo = $('.wrongInfo');
            this.$username = $('#username');
            this.usernameFlag = false;
            this.$phone = $('#phone');
            this.phoneFlag = false;
            this.$email = $('#email');
            this.emailFlag = true;
            this.$password = $('#password');
            this.passwordFlag = false;
            this.$checkState = null;
            this.$register = $('.register');
        }
        init() {
            let _this = this;

            this.$username.on('focus', function () {
                _this.$username.on('input', function () {
                    $(this).removeClass().addClass('focus');
                })
            });
            this.$username.on('blur', function () {
                if ($('#username').hasClass('error')) {
                    if ($('#username').val()) {
                        $('.username .wrong').hide();
                    } else {
                        $(this).removeClass().addClass('error');
                        $('.username .wrong').show();
                    }
                } else {
                    $(this).removeClass().addClass('normal');
                }

            });
            this.$email.on('focus', function () {
                _this.$email.on('input', function () {
                    $(this).removeClass().addClass('focus');
                })
            });
            this.$email.on('blur', function () {
                if ($('#email').hasClass('error')) {
                    if ($('#email').val()) {
                        $('.email .wrong').hide();
                    } else {
                        $(this).removeClass().addClass('error');
                        $('.email .wrong').show();
                    }
                } else {
                    $(this).removeClass().addClass('normal');
                }
            });
            this.$phone.on('focus', function () {
                _this.$phone.on('input', function () {
                    $(this).removeClass().addClass('focus');
                })
            });
            this.$phone.on('blur', function () {
                if ($('#phone').hasClass('error')) {
                    if ($('#phone').val()) {
                        $('.phone .wrong').hide();
                    } else {
                        $(this).removeClass().addClass('error');
                        $('.phone .wrong').show();
                    }
                } else {
                    $(this).removeClass().addClass('normal');
                }
            });
            this.$password.on('focus', function () {
                _this.$password.on('input', function () {
                    $(this).removeClass().addClass('focus');
                })
            });
            this.$password.on('blur', function () {
                if ($('#password').hasClass('error')) {
                    if ($('#password').val()) {
                        $('.password .wrong').hide();
                    } else {
                        $(this).removeClass().addClass('error');
                        $('.password .wrong').show();
                    }
                } else {
                    $(this).removeClass().addClass('normal');
                }
            });
            this.$register.on('click', function () {
                _this.$checkState = $('#checkState').prop('checked');
                if (/^[A-Za-z_]\w{3,15}/.test($('#username').val())) {
                    _this.usernameFlag = true;
                } else {
                    _this.usernameFlag = false;
                }
                if (/^1[35678]\d{9}$/.test($('#phone').val())) {
                    _this.phoneFlag = true;
                } else {
                    _this.phoneFlag = false;
                }
                if (/^\w{6,16}$/.test($('#password').val())) {
                    _this.passwordFlag = true;
                } else {
                    _this.passwordFlag = false;
                }
                if ($('#email').val() && !(/^\w+@[A-Za-z0-9]{2,3}.[A-Za-z0-9]{2,3}$/.test($('#email').val()))) {
                    _this.emailFlag = false;
                } else {
                    _this.emailFlag = true;
                }
                if (!_this.passwordFlag) {
                    $('#password').removeClass('normal').addClass('error').focus();
                    $('.password .wrong').show();
                    $('.password .tips').hide();
                }
                if (!_this.emailFlag) {
                    $('.email .wrong').show();
                }
                if (!_this.phoneFlag) {
                    $('#phone').removeClass('normal').addClass('error').focus();
                    $('.phone .wrong').show();
                }
                if (!_this.usernameFlag) {
                    $('.username .wrong').show();
                    $('#username').removeClass('normal').addClass('error').focus();
                }
                if (_this.usernameFlag && _this.phoneFlag && _this.passwordFlag && _this.emailFlag && !_this.$checkState) {
                    $('.wrongInfo').show();
                } else {
                    $('.wrongInfo').hide();
                }
                if (_this.usernameFlag && _this.phoneFlag && _this.passwordFlag && _this.emailFlag && _this.$checkState) {
                    $.ajax({
                        url: 'http://10.31.157.44/1907/project/php/check.php',
                        data: {
                            checkname: $('#username').val(),
                        },
                        success: function (data) {
                            if (data) {
                                $.ajax({
                                    url: 'http://10.31.157.44/1907/project/php/register.php',
                                    data: {
                                        username: $('#username').val(),
                                        password: $('#password').val(),
                                        email: $('#email').val(),
                                        phone: $('#phone').val()
                                    }
                                }).done(function () {
                                    location.href = 'login.html'
                                })
                            } else {
                                alert('帐号已存在');
                                $('#username').focus();
                            }
                        }
                    })
                } else {
                    return false;
                }
            });
        }
    }
    new register().init();
})(jQuery);