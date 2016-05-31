this["adcirc"] = this["adcirc"] || {};
this["adcirc"]["templates"] = this["adcirc"]["templates"] || {};

this["adcirc"]["templates"]["line_plot"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"plot row\">\n    <div class=\"col-md-2 options\">\n        <div class=\"form-horizontal\">\n\n            <div class=\"form-group\">\n                <label class=\"col-md-2 control-label\">Node</label>\n                <div class=\"col-md-10\">\n                    <input id=\""
    + alias4(((helper = (helper = helpers.node_picker || (depth0 != null ? depth0.node_picker : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"node_picker","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\" type=\"number\" min=\"1\" max=\"1000\" value=\"1\">\n                </div>\n            </div>\n\n        </div>\n    </div>\n    <div class=\"col-md-10 chart\">\n\n    </div>\n</div>";
},"useData":true});