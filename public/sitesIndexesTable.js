import visualisationTypes from "ui/registry/vis_types";
import "./sitesIndexesTableController.js";
import "./table.less";

import TemplateVisTypeProvider from "ui/template_vis_type/TemplateVisType";
import sitesIndexesTemplate from "./sitesIndexesTable.html";

function SitesIndexesTableProvider(Private) {
    const VisualisationType = Private(TemplateVisTypeProvider);

    return new VisualisationType({
        name: "odSitesIndexesTable",
        title: "Speed indexes",
        description: "Visualisation (table) of sites speed indexes (google speed indexes).",
        requiresSearch: false,
        icon: "fa-car",
        template: sitesIndexesTemplate
    });
}

visualisationTypes.register(SitesIndexesTableProvider);
