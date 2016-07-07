import initializeApiRoutes from "./server/initializeApiRoutes.js";

export default function(kibana) {
    return new kibana.Plugin({
        require: [ "elasticsearch" ],
        uiExports: {
            visTypes: [ "plugins/google-index-table/sitesIndexesTable.js" ]
        },
        init(server) {
            initializeApiRoutes(server);
        }
    });
}
