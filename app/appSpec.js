describe('calendar', function() {
    var scope,
        html,
        compiled,
        element;

    beforeEach(module('calendarDemoApp'));
    beforeEach(module('templates'));
    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        html = '<div calendar></div>';
        compiled = $compile(html);
        element = compiled(scope);
        scope.$digest();
    }));
    it('should render correctly', function() {
        expect(element.find('.wrapper')).toBeTruthy();
        expect(element.find('.nav')).toBeTruthy();
        expect(element.find('select').length).toEqual(2);
        expect(element.find('.cal-container')).toBeTruthy();
        expect(element.find('.cal-box')).toBeTruthy();
    });
    it('should have 12 months and 41 years', function() {
        expect(element.find('#select-month option').length).toEqual(12);
        expect(element.find('#select-year option').length).toEqual(41);
    });
    // TODO: Add more tests?
});
