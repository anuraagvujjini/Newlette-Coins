function FormMessagesDirective() {
    "use strict";
    return {
        template: '<ul class="errors list-unstyled">' +
        '<li class="alert alert-success text-capitalize" ng-repeat="m in messages" ng-if="messages && messages.length">' +
        '{{m}}' +
        '</li>' +
        '</ul>'
    }
}
export default FormMessagesDirective;