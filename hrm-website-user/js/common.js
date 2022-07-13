$().ready(function () {
    try {
        $("[data-toggle='tooltip']").tooltip()
    } catch (e) {
    }
    try {
        $(".chosen-select").chosen()
    } catch (e) {
    }
    try {
        $('.bootstrap-switch [type="checkbox"]').bootstrapSwitch({
            radioAllOff: true, onSwitchChange: function (e, t) {
                $(e.target).prop("checked", t);
                $(e.target).change()
            }
        });
        $("[data-switch-toggle]").on("click", function () {
            var e = $(this).data("switch-toggle");
            return $("#switch-" + e).bootstrapSwitch("toggle" + e.charAt(0).toUpperCase() + e.slice(1))
        })
    } catch (e) {
    }
    try {
    } catch (e) {
    }
    try {
        $(".explanation").find(".explain-checkZoom").click(function () {
            if ($(".explanation").hasClass("up")) {
                $(".explanation").removeClass("up").addClass("down");
                $(".explanation").find(".explain-panel").slideToggle(200)
            } else {
                $(".explanation").addClass("up").removeClass("down");
                $(".explanation").find(".explain-panel").slideToggle(200)
            }
        })
    } catch (e) {
    }
    try {
        searchMore()
    } catch (e) {
    }
    try {
        $("input.icheck").iCheck({
            checkboxClass: "icheckbox_minimal-blue",
            radioClass: "iradio_minimal-blue",
            increaseArea: "20%"
        });
        $(".edit-table ul").mCustomScrollbar();
        popover();
        refurbish()
    } catch (e) {
    }
    try {
        $('a,.btn,.checkBox,button,.selectpicker,input[type="radio"],input[type="checkbox"]').focus(function () {
            this.blur()
        })
    } catch (e) {
    }
    try {
        $(".col-sm-8").find(".click-fade").click(function () {
            $(this).siblings(".edit").show()
        });
        $(".col-sm-8").find(".fa-times-circle").click(function () {
            $(this).parents(".edit").hide()
        })
    } catch (e) {
    }
    try {
        $("body").on("click", ".pwd-toggle", function () {
            var e = $(this).data("id");
            if ($(".pwd-toggle").hasClass("fa-eye")) {
                $(".pwd-toggle").removeClass("fa-eye");
                $(".pwd-toggle").addClass("fa-eye-slash");
                $("#" + e).attr("type", "password")
            } else {
                $(".pwd-toggle").addClass("fa-eye");
                $(".pwd-toggle").removeClass("fa-eye-slash");
                $("#" + e).attr("type", "text")
            }
        })
    } catch (e) {
    }
    try {
        $("body").on("mouseover", ".popover-box", function () {
            $(this).find(".popover-info").show()
        });
        $("body").on("mouseout", ".popover-box", function () {
            $(this).find(".popover-info").hide()
        })
    } catch (e) {
    }
    try {
        if ($.isFunction($.loading.start)) {
            $("body").on("click", ".click-loading", function () {
                $.loading.start()
            })
        }
    } catch (e) {
    }
    try {
        var t = document, a = t.getElementsByTagName("input"), o = "placeholder" in t.createElement("input"),
            n = function (e) {
                var t = e.getAttribute("placeholder"), a = e.defaultValue;
                if (a == "") {
                    e.value = t
                }
                e.onfocus = function () {
                    if (e.value === t) {
                        this.value = ""
                    }
                };
                e.onblur = function () {
                    if (e.value === "") {
                        this.value = t
                    }
                }
            };
        if (!o) {
            for (var i = 0, c = a.length; i < c; i++) {
                var s = a[i], r = s.getAttribute("placeholder");
                if (s.type === "text" && r) {
                    n(s)
                }
            }
        }
    } catch (e) {
    }
    $("form").find(":input").not(":hidden").first().focus()
});
$(window).scroll(function () {
    var e = $(window).scrollTop();
    if (e >= 200) {
        $(".scroll-to-top").addClass("active")
    } else {
        $(".scroll-to-top").removeClass("active")
    }
});

function searchMore() {
    $("#searchMore").click(function () {
        if ($(".search-term .toggle").hasClass("hide")) {
            $("#searchMore").text("收起筛选条件");
            $(".search-term .toggle").removeClass("hide")
        } else {
            $(".search-term .toggle").addClass("hide");
            $("#searchMore").text("更多筛选条件")
        }
    })
}

function refurbish() {
    $(".operate .reload").click(function () {
        $(".reload").find(".fa-refresh").addClass("fa-spin s02");
        setTimeout(function () {
            $(".reload i").removeClass("fa-spin s02")
        }, 800)
    })
}

function switchBtn(e, t) {
    var a = new Array;
    a[0] = new Array("是", "否");
    a[1] = new Array("开启", "关闭");
    a[2] = new Array("允许", "拒绝");
    var o = a[t];
    var n = "#" + e;
    var i = i;
    if ($(n).hasClass("open")) {
        $(n).removeClass("open");
        $(n).html('<i class="fa fa-toggle-off"></i>' + o[1])
    } else {
        $(n).addClass("open");
        $(n).html('<i class="fa fa-toggle-on"></i>' + o[0])
    }
}

function popover() {
    $(".popover-box").hover(function () {
        $(this).find(".popover-info").fadeIn("fast")
    }, function () {
        $(this).find(".popover-info").fadeOut("fast")
    })
}

ajax = {};
ajax.post = function (e) {
    var t = {
        type: "POST", async: true, dataType: "json", error: function (e) {
            alert("失败" + e.status)
        }
    };
    t = $.extend(t, e);
    $.ajax(t)
};
ajax.get = function (e) {
    var t = {
        type: "GET", async: true, dataType: "json", error: function (e) {
            alert("失败" + e.status)
        }
    };
    t = $.extend(t, e);
    $.ajax(t)
};

function AjaxRegion(e, t, a) {
    var o = $("#" + t);
    $.ajax({
        type: "get", url: e, data: {parent_code: a}, dataType: "json", success: function (e) {
            if (e.code == "0") {
                var t = e.data;
                leve_text = regionLevel(t.level + 1);
                o.html("<option value=''>" + leve_text + "</option>");
                $(t.list).each(function (e, t) {
                    o.append("<option value='" + t.region_code + "'>" + t.region_name + "</option>")
                })
            } else {
                $.msg("请求失败！", {icon: 2})
            }
        }, error: function () {
            $.msg("数据异常！", {icon: 2})
        }
    })
}

function regionLevel(e) {
    var t = new Array("国家", "省", "市", "区/县", "乡镇/街道");
    return t[e]
}