import uiModules from "ui/modules";

uiModules
    .get("od-google-index-table")
    .controller("SitesIndexesTableController", function($scope, $http) {
        $http
            .get("../api/sitesIndexes")
            .then(response => {
                const allTests = response.data;
                if (!allTests) {
                    return;
                }

                $scope.urls = _(allTests)
                    .map("_source.Url.Type")
                    .uniq()
                    .value();

                $scope.tests = getLastTests(allTests);
            });
    });

function getLastTests(allTests) {
    let lastTests = {};

    allTests.forEach(esTest => {
        let test = esTest._source;
        if (test.Browser !== "Chrome") {
            return;
        }

        if (!lastTests[test.Site]) {
            lastTests[test.Site] = {};
        }

        if (!lastTests[test.Site][test.Url.Type]
            || lastTests[test.Site][test.Url.Type].timestamp < test.timestamp) {
            lastTests[test.Site][test.Url.Type] = {
                googleIndex: test.GooglePageSpeedIndex,
                timestamp: test.Timestamp
            };
        }
    });

    for (let siteKey of Object.keys(lastTests)) {
        let urlsIndexesSum = 0,
            site = lastTests[siteKey],
            urlsNumber = 0;
        for (let urlKey of Object.keys(site)) {
            urlsIndexesSum += site[urlKey].googleIndex;
            urlsNumber++;
        }
        site.avgGoogleIndex = urlsIndexesSum / urlsNumber;
    }

    return lastTests;
}
