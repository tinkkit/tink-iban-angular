'use strict';
(function(module) {
  try {
    module = angular.module('tink.iban');
  } catch (e) {
    module = angular.module('tink.iban', ['tink.safeApply','tink.formathelper']);
  }
  module.directive('tinkIban', ['$window','safeApply', function ($window,safeApply) {
    return {
      restrict: 'AE',
      controller:'tinkFormatController',
      require:['tinkIban','ngModel','?^form'],
      template: function() {
        var isNative = /(ip(a|o)d|iphone|android)/ig.test($window.navigator.userAgent);
        var isTouch = ('createTouch' in $window.document) && isNative;
        if (isTouch) {
          return '<div><input class="hide-styling" type="text"><div>';
        } else {
          return '<div tabindex="-1"><div id="input" class="faux-input" contenteditable="true">{{placeholder}}</div></div>';
        }
      },
      link:function(scope,elm,attr,ctrl){
        elm.attr('tabindex','-1');
        var isNative = /(ip(a|o)d|iphone|android)/ig.test($window.navigator.userAgent);
        var isTouch = ('createTouch' in $window.document) && isNative;
        var controller = ctrl[0];
        var form = ctrl[2];
        var ngControl = ctrl[1];
        var element = elm.find('div>:first');
        //variable
        var config = {
          format: '[A-Z]{2}[0-9]{2} [0-9]{4} [0-9]{4} [0-9]{4}',
          placeholder: 'BE00 0000 0000 0000'
        };

        /*ngControl.$parsers.unshift(function(value) {
          checkvalidty(value);
          return value;
        });

        ngControl.$formatters.push(function(modelValue) {
          if(modelValue !== undefined){
            if(modelValue && modelValue.length === 11){
              modelValue = modelValue.substr(0,2) + '.' + modelValue.substr(2,2)+ '.' + modelValue.substr(4,2)+'-'+ modelValue.substr(6,3)+'-'+modelValue.substr(9,2);
            }

            if(validFormat(modelValue)){
              if(isTouch){
                element.val(modelValue);
              }else{
                controller.setValue(modelValue,null);
              }
            }else{
              modelValue = null;
              ngControl.$setViewValue(modelValue);
            }
            checkvalidty(modelValue);

          }
          return modelValue;
        });*/

        element.unbind('input').unbind('keydown').unbind('change');

        //on blur update the model.
        element.on('blur', function() {
          safeApply(scope,function(){
            var value;
            if (isTouch) {
              value = element.val();
            }else{
              value = controller.getValue();
            }
            checkvalidty(value);
              if(isIBANValid(value)){
                ngControl.$setViewValue(value);
                ngControl.$render();
              }else{
                 ngControl.$setViewValue(null);
              }
              if(form){
                ngControl.$ngBlur = true;
              }
          });
        });

        element.bind('valueChanged', function (e, val) {
          //We put this in a safeaply because we are out of the angular scope !
          safeApply(scope, function () {
            checkvalidty(val);
          });
        });

        var isRequired = (function(){
          if(attr.required === 'true' || attr.required === '' || attr.required === 'required'){
            return true;
          }else{
            return false;
          }
        })();

        function isIBANValid(n) {
          return IBAN.isValid(n);
        }

        function checkvalidty(value){

          if(value === config.placeholder || value === '' || value === null || value === undefined){
            ngControl.$setValidity('format',true);
          }else{
            ngControl.$setValidity('format',isIBANValid(value));
          }

          if(isRequired){
            if(controller.getValue() === config.placeholder || value === '' || value === null || value === undefined){
              ngControl.$setValidity('required',false);
              ngControl.$setValidity('format',true);
            }else{
              ngControl.$setValidity('required',true);
            }
          }
        }

        if (!isTouch) {
          controller.init(element,config,form,ngControl);
        }
      }
    };
  }]);
})();
;