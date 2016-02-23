(function () {
    'use strict';

    angular
        .module('site')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($http, $scope) {
        var page = this;

        page.showSearchPanel = false;
        page.showPanel = showPanel;
        page.collapsePanel = collapsePanel;
        page.nightCount = 1;
        page.incrementNightCount = incrementNightCount;
        page.decrementNightCount = decrementNightCount;
        page.searchCity = '';
        page.search = search;
        page.url = 'http://terminal2.expedia.com/x/hotels?regionids=6434&apikey=hAKwux396cjXIV1Ev0pofwoW3tTlAGbC';
        page.data = {};
        page.status = '';
        page.hotelList = [];
        page.twoColumnLayout = false;
        page.selectedHotelIndex = 0;
        page.selectedHotel = {};
        page.twoColumnExpand = twoColumnExpand;
        page.twoColumnCollapse = twoColumnCollapse;
        page.roomType = 1;
        page.searchData = {};
        page.searchStatus = '';
        page.searchUrl = '';
        page.cityNameList = {};
        page.selectedCity = '';
        page.getCity = getCity;

        function getCity(city){
            page.searchUrl = "http://terminal2.expedia.com/x/suggestions/regions?query=" + city + "&apikey=hAKwux396cjXIV1Ev0pofwoW3tTlAGbC"
            $http({method: 'GET', url: page.searchUrl}).
            then(function(response){
                console.log(response.data);
                return response.data.sr.map(function(city){
                    console.log(city.f);
                    return city.f;
                });
            });
        }

        //$scope.$watch(function(scope) { return page.searchCity },
        //    function(newValue, oldValue) {
        //        console.log("Changed");
        //        page.searchUrl = "http://terminal2.expedia.com/x/suggestions/regions?query=" + newValue + "&apikey=hAKwux396cjXIV1Ev0pofwoW3tTlAGbC"
        //        $http({method: 'GET', url: page.searchUrl}).
        //        then(function(response) {
        //            page.searchStatus = response.status;
        //            page.SearchData = response.data;
        //            console.log(page.SearchData.sr[0].d);
        //            page.cityNameList = page.searchData.sr;
        //        }, function(response) {
        //            page.searchStatus = response.status || "Request failed!!!";
        //            page.SearchData = response.data;
        //            console.log(page.searchStatus);
        //        });
        //    }
        //);

        //$scope.$watch("page.searchCity", function(){
        //    console.log("Changed");
        //    var url = "http://terminal2.expedia.com/x/suggestions/regions?query=" + page.searchCity + "&apikey=hAKwux396cjXIV1Ev0pofwoW3tTlAGbC"
        //    $http({method: 'GET', url: page.url}).
        //    then(function(response) {
        //        var status = response.status;
        //        var data = response.data;
        //        console.log(status);
        //    }, function(response) {
        //        status = response.status || "Request failed!!!";
        //        data = response.data;
        //        console.log(status);
        //    });
        //});

        function showPanel() {
            page.showSearchPanel  = true;
        }

        function collapsePanel(){
            page.showSearchPanel = false;
        }

        function incrementNightCount() {
            page.nightCount++;
        }

        function decrementNightCount() {
            page.nightCount--;
            if(page.nightCount < 1)
                page.nightCount = 1;
        }

        function search() {
            console.log(page.searchCity);

            $http({method: 'GET', url: page.url}).
                then(function(response) {
                page.status = response.status;
                page.data = response.data;
                page.hotelList = page.data.HotelInfoList;
                console.log(page.hotelList);
            }, function(response) {
                page.status = response.status || "Request failed!!!";
                page.data = response.data;
                console.log(page.status);
            });
        }

        function twoColumnExpand($index) {
            page.selectedHotelIndex = $index;
            page.twoColumnLayout = true;
            page.selectedHotel = page.hotelList.HotelInfo[page.selectedHotelIndex];
            console.log(page.selectedHotel);
        }

        function twoColumnCollapse() {
            page.twoColumnLayout = false;
        }
    }
})();
