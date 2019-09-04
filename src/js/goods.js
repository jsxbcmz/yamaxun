!(function ($) {
    $.ajax({
        url: 'http://10.31.157.44/1907/project/php/goodlist.php',
        dataType: 'json'
    }).done(function (d) {
        let htmlstr = '';
        $.each(d, function (index, value) {
            htmlstr += `
                <li>
                    <a href="detail.html?sid=${value.sid}" target="_blank">
                        <div>
                            <img src="${value.url}"  alt="">
                        </div>
                        <p>${value.title}</p>
                        <span>￥${value.price}</span>
                    </a>
                </li>
            `;
        })
        $('.goodlist').html(htmlstr);

        $.each($('.goodlist li'), function (index, value) {
            if (($(value).find('div').height() - $(value).find('img').height()) > 0) {
                $(value).find('img').css('margin-top', ($(value).find('div').height() - $(value).find('img').height()) / 2)
            }
        })
    });

})(jQuery);