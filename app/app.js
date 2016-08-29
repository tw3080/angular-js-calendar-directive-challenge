var app = angular.module('calendarDemoApp', []);

app.controller('CalendarCtrl', function($scope) {
    $scope.months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

    $scope.getDate = function() {
        var date = new Date();
        console.log(date);
    };
});

app.directive('calendar', function() {
    // Gets a new set of dates for the month/year selected by the user
    function getDates(scope) {
        scope.days = CalendarRange.getMonthlyRange(scope.date); // getMonthlyRange returns the first/last days in range for a month (for padding the calendar), the start/end days for a month, as well as total days in range
        scope.daysList = [];

        for (var i = scope.days.first; i <= scope.days.last; i.setDate(i.getDate() + 1)) {
            scope.daysList.push(new Date(i));
        }
    }
    return {
        restrict: 'A',
        templateUrl: 'home.html',
        transclude: true,
        scope: true,
        link: function(scope, element, attrs) {
            // Array of months used for displaying month selection options
            scope.months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

            scope.date = new Date(); // scope.date is initialized to the current day
            scope.years = CalendarRange.getYearRange(scope.date); // getYearRange returns a range of +/- 20 years from the current year

            scope.yearsList = []; // Array of years used for displaying year selection options
            for (i = scope.years.start; i <= scope.years.end; i++) {
                scope.yearsList.push(i);
            }

            // Month/year data from the selection widgets
            scope.data = {
                month: scope.months[scope.date.getMonth()],
                year: scope.date.getFullYear()
            };

            getDates(scope);

            // changeDates updates the dates which the calendar will display and is called whenever a new month and/or year is selected by the user
            scope.changeDates = function() {
                scope.date = new Date(scope.data.year, scope.data.month, 1);
                getDates(scope);
            };

            // Checks whether or not a date is actually within the current month, or just part of the range of dates displayed on the calendar
            scope.checkDates = function(date) {
                if (scope.date.getMonth() == date.getMonth()) {
                    // If the date is part of the current month, return true
                    return true;
                } else {
                    // Otherwise, return false
                    return false;
                }
            };
        }
    };
});
