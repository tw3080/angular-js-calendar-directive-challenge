var app = angular.module('calendarDemoApp', []);

app.controller('CalendarCtrl', function($scope) {
    $scope.months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

    $scope.getDate = function() {
        var date = new Date();
        console.log(date);
    };
});

app.directive('calendar', function() {
    function refreshDates(scope) {
        scope.days = CalendarRange.getMonthlyRange(scope.date);
        scope.daysList = [];
        for (var i = scope.days.first; i <= scope.days.last; i.setDate(i.getDate() + 1)) {
            scope.daysList.push(new Date(i));
            // console.log(i);
        }
        // console.log(scope.daysList);
    }
    return {
        restrict: 'A',
        templateUrl: 'home.html',
        transclude: true,
        scope: true,
        link: function(scope, element, attrs) {
            scope.months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

            scope.date = new Date();
            scope.years = CalendarRange.getYearRange(scope.date);

            scope.yearsList = [];
            for (i = scope.years.start; i <= scope.years.end; i++) {
                scope.yearsList.push(i);
            }

            scope.data = {
                month: scope.date.getMonth(),
                year: scope.date.getFullYear()
            };
            refreshDates(scope);
            scope.changeDates = function() {
                refreshDates(scope);
                scope.date = new Date(1, scope.data.month, scope.data.year);
            };
        }
    };
});

// app.directive('calendar')
