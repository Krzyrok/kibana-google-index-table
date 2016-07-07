export default initializeApiRoutes;

function initializeApiRoutes(server) {
    const call = server.plugins.elasticsearch.callWithRequest;

    server.route({
        path: "/api/sitesIndexes",
        method: "GET",
        handler(request, reply) {
            call(request, "search", {
                index: "logstash-*",
                type: "SpeedCurveTest",
                size: 10000
            }).then(function(response) {
                reply(response.hits.hits);
            });
        }
    });
}
