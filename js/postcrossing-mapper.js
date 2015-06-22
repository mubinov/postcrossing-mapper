$(function () {
    var fixCenterHeight = function () {
        var clientH = $(window).height();
        var center = $('#world-map');
        var heightDelta = $('#header').outerHeight(true) + center.outerHeight(true);
        var fixCenterH = (clientH - heightDelta);

        if (fixCenterH > center.height() || center.height() == null) {
            center.height(fixCenterH);
        }
    };
    $(window).resize(function () {
        fixCenterHeight();
    });
    fixCenterHeight();
    postcrossing_mapper();
});
function start_waiter() {
    $('.waiter').show();
}
function stop_waiter() {
    $('.waiter').hide();
}
function initMap(gdpData) {
    $('#world-map')
    .html('')
    .vectorMap({
        map: 'world_mill_en',
        backgroundColor: '#f7f7f7',
        regionStyle: {
            initial: {
                fill: '#8d8d8d'
            }
        },
        series: {
            regions: [{
                values: gdpData,
                scale: ['#628171', '#00ffff', '#A51618']
            }]
        }
    });
}
function getPCList(username) {
    $.ajax({
        url: 'postcrossing_proxy/feed.php?username=' + username,
        dataType: "json",
        cache: true,
        error: function (textStatus) {
            console.error(textStatus);
            stop_waiter();
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
                if(country_block['s'].hasOwnProperty(i))continue;
                country = country_block['s'][i];
                if (gdpData[country] == undefined) {
                    gdpData[country] = 0;
                }
            }

            for (i in country_block['r']) {
                if(country_block['r'].hasOwnProperty(i))continue;
                country = country_block['r'][i];
                if (gdpData[country] == undefined || gdpData[country] == 50) {
                    gdpData[country] = 50;
                } else {
                    gdpData[country] = 100;
                }
            }

            if (my_country != '')gdpData[my_country] = 100;

            initMap(gdpData);
            stop_waiter();
        }
    });
}
function postcrossing_mapper() {
    start_waiter();
    username = $('#username').val();
    if (username.length > 0) {
        getPCList(username);
    } else {
        console.error('Empty user name!');
    }
}