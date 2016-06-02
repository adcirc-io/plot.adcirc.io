this["adcirc"] = this["adcirc"] || {};
this["adcirc"]["templates"] = this["adcirc"]["templates"] || {};

this["adcirc"]["templates"]["line_plot"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!-- Line plot options -->\n<div class=\"plot-form form-horizontal\">\n\n    <label class=\"col-sm-12 form-title\">\n        Options\n        <i id=\""
    + alias4(((helper = (helper = helpers.icon_collapse || (depth0 != null ? depth0.icon_collapse : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon_collapse","hash":{},"data":data}) : helper)))
    + "\" class=\"fa fa-chevron-down pull-right clickable-icon\" data-toggle=\"collapse\" data-target=\"#testcollapse\"></i>\n        <i id=\""
    + alias4(((helper = (helper = helpers.icon_more || (depth0 != null ? depth0.icon_more : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon_more","hash":{},"data":data}) : helper)))
    + "\" class=\"fa fa-plus pull-right clickable-icon\"></i>\n    </label>\n\n    <div class=\"collapse.in\" id=\""
    + alias4(((helper = (helper = helpers.div_collapse || (depth0 != null ? depth0.div_collapse : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"div_collapse","hash":{},"data":data}) : helper)))
    + "\">\n\n        <!-- Width -->\n        <div class=\"form-group form-group-sm form-item\">\n            <label class=\"col-sm-5 control-label\">\n                Width:\n            </label>\n            <div class=\"col-sm-7 control-content\">\n                <div class=\"input-group input-group-sm\">\n                    <input id=\""
    + alias4(((helper = (helper = helpers.input_width || (depth0 != null ? depth0.input_width : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"input_width","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\" type=\"number\" min=\"0\" max=\"100\" value=\"100\">\n                    <div class=\"input-group-addon\">%</div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Height -->\n        <div class=\"form-group form-group-sm form-item form-item-last\">\n            <label class=\"col-sm-5 control-label\">\n                Height:\n            </label>\n            <div class=\"col-sm-7 control-content\">\n                <div class=\"input-group input-group-sm\">\n                    <input id=\""
    + alias4(((helper = (helper = helpers.input_height || (depth0 != null ? depth0.input_height : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"input_height","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\" type=\"number\" min=\"0\" value=\"400\">\n                    <div class=\"input-group-addon\">px</div>\n                </div>\n            </div>\n        </div>\n\n    </div>\n\n</div>\n\n\n<!-- Dataset options -->\n<div class=\"plot-form form-horizontal\">\n\n    <label class=\"col-sm-12 form-title\">\n        Datasets\n        <i class=\"fa fa-chevron-down pull-right clickable-icon\"></i>\n        <i class=\"fa fa-plus pull-right clickable-icon\"></i>\n    </label>\n\n    <!-- fort.63 -->\n    <div class=\"form-group form-group-sm form-item form-item-last\">\n        <label class=\"col-sm-5 control-label\">\n            Node:\n        </label>\n        <div class=\"col-sm-7 control-content\">\n            <input id=\""
    + alias4(((helper = (helper = helpers.input_node || (depth0 != null ? depth0.input_node : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"input_node","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\" type=\"number\" min=\"1\" max=\"1000\" value=\"1\">\n        </div>\n    </div>\n\n</div>";
},"useData":true});

this["adcirc"]["templates"]["plot"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"plot row\">\n\n    <div id=\""
    + alias4(((helper = (helper = helpers.options_id || (depth0 != null ? depth0.options_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"options_id","hash":{},"data":data}) : helper)))
    + "\" class=\"col-sm-4 col-md-3 col-lg-2 options\">\n\n        <div class=\"title\">\n            New Plot<i class=\"fa fa-bars pull-right clickable-icon\"></i>\n        </div>\n\n    </div>\n\n    <div id=\""
    + alias4(((helper = (helper = helpers.chart_id || (depth0 != null ? depth0.chart_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"chart_id","hash":{},"data":data}) : helper)))
    + "\" class=\"col-sm-8 col-md-9 col-lg-10 chart\">\n\n    </div>\n\n</div>";
},"useData":true});