function FormErrorsDirective() {
    "use strict";
    return {
        template: '<ul class="errors list-unstyled">' +
        '<li class="alert alert-danger text-capitalize" ng-repeat="e in errors" ng-if="errors && errors.length">' +
        '{{e}}' +
        '</li>' +
        '</ul>'
    }
}
export default FormErrorsDirective;
