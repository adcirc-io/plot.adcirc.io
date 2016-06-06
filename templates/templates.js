this["adcirc"] = this["adcirc"] || {};
this["adcirc"]["templates"] = this["adcirc"]["templates"] || {};

this["adcirc"]["templates"]["fort63display"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"sidebar-group\">\n\n    <!-- Title and info bar -->\n    <div class=\"title\">\n        <label id=\""
    + alias4(((helper = (helper = helpers.id_title || (depth0 != null ? depth0.id_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id_title","hash":{},"data":data}) : helper)))
    + "\">\n            "
    + alias4(((helper = (helper = helpers.file_name || (depth0 != null ? depth0.file_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"file_name","hash":{},"data":data}) : helper)))
    + "\n        </label>\n        <i class=\"fa fa-angle-down pull-right clickable clickable-secondary\"></i>\n        <div class=\"subtitle\">\n            Nodes: "
    + alias4(((helper = (helper = helpers.num_nodes || (depth0 != null ? depth0.num_nodes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"num_nodes","hash":{},"data":data}) : helper)))
    + " Timesteps: "
    + alias4(((helper = (helper = helpers.num_timesteps || (depth0 != null ? depth0.num_timesteps : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"num_timesteps","hash":{},"data":data}) : helper)))
    + "\n        </div>\n    </div>\n\n    <div id=\""
    + alias4(((helper = (helper = helpers.id_content_wrapper || (depth0 != null ? depth0.id_content_wrapper : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id_content_wrapper","hash":{},"data":data}) : helper)))
    + "\" class=\"content\">\n\n        <!-- Plotted data -->\n        <div id=\""
    + alias4(((helper = (helper = helpers.id_data_list || (depth0 != null ? depth0.id_data_list : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id_data_list","hash":{},"data":data}) : helper)))
    + "\">\n\n            <div id=\""
    + alias4(((helper = (helper = helpers.id_data_list_placeholder || (depth0 != null ? depth0.id_data_list_placeholder : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id_data_list_placeholder","hash":{},"data":data}) : helper)))
    + "\" class=\"placeholder filler\">\n                Add data to plot using options below.\n            </div>\n\n        </div>\n\n        <!-- Plotting options -->\n        <div class=\"footer\">\n            <div class=\"btn-group btn-group-sm\" role=\"group\">\n\n                <button id=\""
    + alias4(((helper = (helper = helpers.id_add_node || (depth0 != null ? depth0.id_add_node : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id_add_node","hash":{},"data":data}) : helper)))
    + "\" type=\"button\" class=\"btn btn-default\">Node</button>\n                <button id=\""
    + alias4(((helper = (helper = helpers.id_add_nodes || (depth0 != null ? depth0.id_add_nodes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id_add_nodes","hash":{},"data":data}) : helper)))
    + "\" type=\"button\" class=\"btn btn-default\">Nodes</button>\n\n                <div class=\"btn-group btn-group-sm\" role=\"group\">\n                    <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">\n                        Other\n                        <span class=\"caret\"></span>\n                    </button>\n                    <ul class=\"dropdown-menu\">\n                        <li><a id=\""
    + alias4(((helper = (helper = helpers.id_add_min_max || (depth0 != null ? depth0.id_add_min_max : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id_add_min_max","hash":{},"data":data}) : helper)))
    + "\">Min/Max Elevation</a></li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n\n    </div>\n\n</div>";
},"useData":true});

this["adcirc"]["templates"]["node_picker"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"node-picker row vertical-align\">\n    <div class=\"title col-sm-3\">\n        Node:\n    </div>\n    <div class=\"controller col-sm-6\">\n        <input id=\""
    + alias4(((helper = (helper = helpers.picker_id || (depth0 != null ? depth0.picker_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"picker_id","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control input-sm\" type=\"number\" min=\"1\" max=\""
    + alias4(((helper = (helper = helpers.max_nodes || (depth0 != null ? depth0.max_nodes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"max_nodes","hash":{},"data":data}) : helper)))
    + "\" value=\"1\">\n    </div>\n    <div class=\"extras col-sm-3\">\n        <i class=\"fa fa-cog clickable clickable-primary\"></i>\n        <i id=\""
    + alias4(((helper = (helper = helpers.remove_id || (depth0 != null ? depth0.remove_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"remove_id","hash":{},"data":data}) : helper)))
    + "\" class=\"fa fa-times clickable clickable-primary\"></i>\n    </div>\n</div>";
},"useData":true});

this["adcirc"]["templates"]["line_plot"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!-- Dataset options -->\n<div class=\"plot-form form-horizontal\">\n\n    <label class=\"col-sm-12 form-title\">\n        Datasets\n        <i class=\"fa fa-chevron-down pull-right clickable-icon\"></i>\n        <i class=\"fa fa-list pull-right clickable-icon\"></i>\n    </label>\n\n    <!-- fort.63 -->\n    <div class=\"form-group form-group-sm form-item form-item-last\">\n        <label class=\"col-sm-5 control-label\">\n            Node:\n        </label>\n        <div class=\"col-sm-7 control-content\">\n            <input id=\""
    + alias4(((helper = (helper = helpers.input_node || (depth0 != null ? depth0.input_node : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"input_node","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\" type=\"number\" min=\"1\" max=\"1000\" value=\"1\">\n        </div>\n    </div>\n\n</div>\n\n<!-- Line plot options -->\n<div class=\"plot-form form-horizontal\">\n\n    <label class=\"col-sm-12 form-title\">\n        Options\n        <i id=\""
    + alias4(((helper = (helper = helpers.icon_collapse || (depth0 != null ? depth0.icon_collapse : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon_collapse","hash":{},"data":data}) : helper)))
    + "\" class=\"fa fa-chevron-down pull-right clickable-icon rotate\" data-toggle=\"collapse\" data-target=\"#testcollapse\"></i>\n        <i id=\""
    + alias4(((helper = (helper = helpers.icon_more || (depth0 != null ? depth0.icon_more : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon_more","hash":{},"data":data}) : helper)))
    + "\" class=\"fa fa-list pull-right clickable-icon\"></i>\n    </label>\n\n    <div class=\"collapse in\" id=\""
    + alias4(((helper = (helper = helpers.div_collapse || (depth0 != null ? depth0.div_collapse : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"div_collapse","hash":{},"data":data}) : helper)))
    + "\">\n\n        <!-- Width -->\n        <div class=\"form-group form-group-sm form-item\">\n            <label class=\"col-sm-5 control-label\">\n                Width:\n            </label>\n            <div class=\"col-sm-7 control-content\">\n                <div class=\"input-group input-group-sm\">\n                    <input id=\""
    + alias4(((helper = (helper = helpers.input_width || (depth0 != null ? depth0.input_width : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"input_width","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\" type=\"number\" min=\"0\" max=\"100\" value=\"100\">\n                    <div class=\"input-group-addon\">%</div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Height -->\n        <div class=\"form-group form-group-sm form-item form-item-last\">\n            <label class=\"col-sm-5 control-label\">\n                Height:\n            </label>\n            <div class=\"col-sm-7 control-content\">\n                <div class=\"input-group input-group-sm\">\n                    <input id=\""
    + alias4(((helper = (helper = helpers.input_height || (depth0 != null ? depth0.input_height : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"input_height","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\" type=\"number\" min=\"0\" value=\"400\">\n                    <div class=\"input-group-addon\">px</div>\n                </div>\n            </div>\n        </div>\n\n    </div>\n\n</div>";
},"useData":true});

this["adcirc"]["templates"]["plot"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div id=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"col-md-12 plot\">\n</div>";
},"useData":true});