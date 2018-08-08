/*
职业选择
Date：2016-09-27
Author:Mr.Luo

settings 参数说明
-----
data:填充下拉框的数据；
nameId:所选择值附加到的文本框或其它容器Id
maxCount:允许最大选择数量
------------------------------ */
(function ($) {
    $.fn.positionSelect = function (settings) {
        if (this.length < 1) { return; };

        // 默认值
        settings = $.extend({
            containerId: null,
            className: null,
            nameId: null,
            required: true,
            maxCount: 1,
            onConfirm: null
        }, settings);

        var box_obj = $(this);
        var container = $("#" + settings.containerId);
        var num = settings.containerId;
        var title = "<div class=\"title\"><b>选择职业</b><span class=\"tip\">(最多选择" + settings.maxCount + "项)</span> &nbsp&nbsp;<span class='tip' style='font-weight:bold;' id='tip_" + num + "'></span><a href=\"javascript:void(0)\" ></a></div>";
        var selectedResult = "<div class=\"sele-tag\"><dl><dt>已选择：</dt><dd id='ddResult_" + num + "'><a id='btnSure_" + num + "' href='javascript:void(0)' class='btn'>确定</a></dd></dl></div>";

        function setValue(value) {
            var type = $("#" + settings.nameId);
            if (type.attr("type") == "text") {
                type.val(value);
            }
            else
                type.html(value);
        }

        function init() {
            if ($("body #" + num + "_bg").length <= 0) {
                $("body").append("<div id='" + num + "_bg' class='mask-Bg'></div>");
            }
            if (settings.className != null) {
                container.addClass(settings.className);
            }
            var data = eval("(" + positiondata + ")");
            if ($.trim(container.html()) == "") {
                container.append(title);
                container.append(selectedResult);
                container.append("<div class=\"position-menu\" id='" + num + "_datalist'></div>");
                var datalist = $("#" + num + "_datalist");
                datalist.append("<div class='menu' id='firstMenu'></div>");
                var firstMenu = datalist.find("#firstMenu");
                firstMenu.append("<ul></ul>");
                $.each(data.positionlist, function (i, obj) {   // 循环第一级
                    $(firstMenu).find("ul").append("<li id='dl_" + i + "' name='" + i + "'>" + obj.p + "</li>");
                });

                if (datalist.find("div[class='sub-menu']").length <= 0) {
                    datalist.append("<div class='sub-menu' id='secondMenu'></div>");
                }
                var secondMenu = datalist.find("#secondMenu");

                // 第一级菜单鼠标悬浮事件，弹出二级菜单和三级菜单项
                $("#" + num + "_datalist #firstMenu ul li").bind("mouseover", function () {
                    secondMenu.html("");
                    $("#" + num + "_datalist #firstMenu ul li").removeClass("sele");
                    $(this).addClass("sele");

                    var index = $(this).attr("name");
                    $.each(data.positionlist[index].c, function (j, item) {
                        secondMenu.append("<dl id='dl_" + j + "'></dl>");
                        var dtItem = "<dt id='dt_" + j + "'>" + item.n + "</dt>";
                        secondMenu.find("dl[id='dl_" + j + "']").append(dtItem);
                        secondMenu.find("dl[id='dl_" + j + "']").append("<dd id='dd_" + j + "'></dd>");
                        $.each(data.positionlist[index].c[j].a, function (m, dist) {
                            var threeMenu = "<a href='javascript:void(0)' id='item_" + index + "_" + j + "_" + m + "'>" + dist.s + "</a>";
                            secondMenu.find("dl[id='dl_" + j + "'] dd[id='dd_" + j + "']").append(threeMenu);

                        });
                    });
                    
                    //根据已选择的项，将相同的列表展示项添加样式
                    var resultItems = container.find("#ddResult_" + num + " a");
                    $.each(resultItems, function (n, ritem) {
                        var rid = $(ritem).attr("id").substr(2, $(ritem).attr("id").length);
                        secondMenu.find("a[id='" + rid + "']").addClass("sele");
                    });

                    // 列表项点击事件，选中则在结果容器中显示添加选中样式
                    secondMenu.find("a").bind("click", function () {
                        var selectedCount = container.find("#ddResult_" + num + " a").length - 1;

                        if ($(this).hasClass("sele")) {
                            $(this).removeClass("sele");
                            container.find("#ddResult_" + num).find("a[id='c_" + $(this).attr("id") + "']").remove();
                        }
                        else {
                            if (selectedCount >= settings.maxCount) {
                                container.find("#tip_" + num).html("最多只能选择" + settings.maxCount + "项").css("color", "red");
                                setTimeout(function () {
                                    container.find("#tip_" + num).empty();
                                }, 3000);
                            }
                            else {
                                $(this).addClass("sele");
                                container.find("#ddResult_" + num + " #btnSure_" + num).before("<a href='#' id='c_" + $(this).attr("id") + "'>" + $.trim($(this).html()) + "</a>");
                            }
                        }

                        // 结构容器中选中项点击事件，移除并将列表中的选中样式取消
                        container.find("#ddResult_" + num + " a").bind("click", function () {
                            var rid = $(this).attr("id");
                            if (rid != "btnSure_" + num) {
                                var sid = rid.substr(2, rid.length);
                                $(this).remove();
                                secondMenu.find("a[id='" + sid + "']").removeClass("sele");
                            }
                        });
                    });

                });

                // 默认显示第一级
                $(firstMenu).find("ul li:first").addClass("sele").trigger("mouseover");


                // 关闭选择框
                container.find(".title a").bind("click", function () {
                    container.hide();
                    $("#" + num + "_bg").hide();
                });

                // 确定
                container.find("#ddResult_" + num + " a[id='btnSure_" + num + "']").bind("click", function () {
                    var selectedItems = container.find("#ddResult_" + num + " a[id!='btnSure_" + num + "']");
                    var results = "";
                    $.each(selectedItems, function (i, item) {
                        results += $.trim($(item).html()) + ",";
                    });
                    if (results.length > 0) {
                        results = results.substr(0, results.length - 1);
                    }
                    setValue(results);
                    container.hide();
                    $("#" + num + "_bg").hide();
                });

            }
            container.show();
            $("#" + num + "_bg").show();
        }

        init();
    };
})(jQuery);