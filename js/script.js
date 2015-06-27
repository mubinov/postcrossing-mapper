var colors = {
    sent: '#00BCD4',
    received: '#FFEB3B',
    bingo: '#009688'
};

$(function () {
    var fixCenterHeight = function () {
        var client_h = $(window).height();
        var center = $('#world-map');
        var height_delta = $('#header').outerHeight(true) + center.outerHeight(true);
        var fix_center_h = (client_h - height_delta);

        if (fix_center_h > center.height() || center.height() == null) {
            center.height(fix_center_h);
        }
    };
    $(window).resize(function () {
        fixCenterHeight();
    });
    fixCenterHeight();
    loadPostcrossingMap();

    $('#legend-sent').css('background-color', colors.sent);
    $('#legend-received').css('background-color', colors.received);
    $('#legend-bingo').css('background-color', colors.bingo);
});
function initMap(gdpData) {
    $('#world-map')
        .html('')
        .vectorMap({
            map: 'world_mill_en',
            backgroundColor: '#f7f7f7',
            regionStyle: {
                initial: {
                    fill: '#9E9E9E'
                }
            },
            series: {
                regions: [{
                    values: gdpData,
                    scale: [colors.sent, colors.received, colors.bingo]
                }]
            }
        });
}
function getPostcrossingData(username) {
    $.ajax({
        url: 'postcrossing_proxy/feed.php?username=' + username,
        dataType: "json",
        cache: true,
        error: function (textStatus) {
            console.error(textStatus);
            $('#waiter').hide();
        },
        success: function (data, textStatus) {
            var country_block = {
                "s": [],
                "r": []
            };
            my_country = '';
            $.each(data, function (i, val) {
                country_block[val[2]].push(val[3]);
            });
            var gdpData = {};
            var i = 0;
            for (i in country_block['s']) {
                if (!country_block['s'].hasOwnProperty(i))continue;
                country = country_block['s'][i];
                if (gdpData[country] == undefined) {
                    gdpData[country] = 0;
                }
            }

            for (i in country_block['r']) {
                if (!country_block['r'].hasOwnProperty(i))continue;
                country = country_block['r'][i];
                if (gdpData[country] == undefined || gdpData[country] == 50) {
                    gdpData[country] = 50;
                } else {
                    gdpData[country] = 100;
                }
            }

            if (my_country != '')gdpData[my_country] = 100;

            initMap(gdpData);
            $('#waiter').hide();
        }
    });
}
function loadPostcrossingMap() {
    username = $('#username').val();
    if (username.length > 0) {
        $('#waiter').show();
        getPostcrossingData(username);
    } else {
        console.error('Empty user name!');
    }
}