var utils = {
    ajaxRequest: function(options) {

        var defaults = {
            type: "GET", data: {}, url: "",
            before: function() {
            },
            cache: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            async: true
        };
        var settings = $.extend({}, defaults, options);

        $.ajax({
            url: settings.url,
            data: settings.data,
            type: settings.type,
            dataType: settings.dataType,
            cache: settings.cache,
            contentType: settings.contentType,
            async: settings.async,
            beforeSend: function () {
                $("#loader").show();
                settings.before();
            },
            complete: function() {
                //Hide animation               
                $("#loader").hide();
            },
            success: function(data) {
                //Show Message                
                settings.callback(null, data);
            },
            error: function(e, b) {
                //Show Message                 
                settings.callback(e);
            }
        });
    },
    fillKendoDropDownList: function(method, control, value, text, select_changed) {
        utils.ajaxRequest({
            url: config.api_url + method,
            callback: function(e, data) {
                if (!e) {

                    $("#" + control).kendoDropDownList({
                        optionLabel: "Seleccione",
                        dataTextField: text,
                        dataValueField: value,
                        dataSource: data,
                        select: select_changed
                    });
                }
            }
        });
    },
    dateToWcf: function(input) {
        var dArray = input.split('/');
        var d = new Date(dArray[2], dArray[1] - 1, dArray[0]);
        if (isNaN(d)) return null;
        return '\/Date(' + d.getTime() + '-0000)\/';
    },
    cleanControls: function() {
        $('form').find("input[type=text],input[type=password], textarea").val("");
    }
};

String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
}
