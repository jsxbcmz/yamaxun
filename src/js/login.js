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
})(jQuery);