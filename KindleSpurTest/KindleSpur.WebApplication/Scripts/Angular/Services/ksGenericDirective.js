﻿app.directive('pwdCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    var v = elem.val()===$(firstPassword).val();
                    ctrl.$setValidity('pwmatch', v);
                });
            });
        }
    }
}]);
app.directive('focusMe', function($timeout, $parse) {
  return {
    scope: {
		      blur: '&',
		      setFocus : '='
    },
    //scope: true,   // optionally create a child scope
    link: function(scope, element, attrs) {
		console.error(scope.setFocus);
		if(element[0] && scope.setFocus) element[0].focus();
      		element.bind('blur', function() {
			 scope.$apply(function() {
				if ('undefined' !== typeof scope.blur) {            
				      scope.blur();
				}
			 });
      		});
    }
  };
});

app.directive('topMainStrip', function ($state) {
    return {
        scope: {
           
        },
        templateUrl : '/Home/ksTopMainStrip',
        //scope: true,   // optionally create a child scope
        link: function (scope, element, attrs) {
            scope.selectedRole = 0;
            scope.navigateAsPerRole = function (iRole) {
                console.error(iRole);
                scope.selectedRole = iRole;
                switch(iRole){
                   case 0 : $state.go('dashBoardCoachee');  break;
                    case 1: $state.go('dashBoardCoach'); break;
                   case 2 : $state.go('dashBoardMentee'); break;
                   case 3 : $state.go('dashBoardMentor'); break;
                 }
            };
        }
    };
});
app.directive('bottomMainStrip', function ($timeout) {
    return {
        scope: {
           
        },
        template : '<div style="float: left;width: 100%;height: 100%;display: flex;"><ul class="bottomStripOption"><li class="fontClass" ng-repeat = "option in bottomOptionArray">{{ option.name}}</li></ul></div>',
        //scope: true,   // optionally create a child scope
        link: function (scope, element, attrs) {
            console.error(scope);
            scope.bottomOptionArray = [
               { name : 'UNKNOWN 2016' },
                { name : 'USER AGREEMENT' },
                 { name : 'PRIVACY POLICY' },
                { name : 'COMMUNITY GUIDELINES' },
                { name : 'COOKIE POLICY' },
                { name : 'COPIRIGHT POLICY' },
                { name : 'QUEST CONTROLS' },
                { name : 'LANGUAGE' },
            
            ];
        }
    };
});

app.directive('ctcRole', function ($state, serverCommunication) {
    return {
        scope: {

        },
        templateUrl: '/Home/ksCtcRole',
        //scope: true,   // optionally create a child scope
        link: function (scope, element, attrs) {
            window.cts = scope;
            scope.catogoryArray = [];
            scope.topicArray = [
                 { name: 'Advertising' },
                 { name: 'Education' },
                 { name: 'Engineering' },
                 { name: 'Marketing' },
                 { name: 'BRAIN GAMES' },
                 { name: 'RESOURCES' }
            ];
            scope.skillsArray = [];
            scope.selectedCategory = -1;
            scope.selectedTopic = -1;
            scope.selectedSkills = -1;
            scope.selectedCategoryValue = null;
            scope.categoryDisplay = true;
            scope.categoryClick = function (iIndex, iCategory) {
                scope.selectedCategory = iIndex;
                scope.categoryDisplay = false;
                scope.selectedCategoryValue = iCategory;
                scope.topicArray = [].concat(iCategory.Topics)
                for (var k = 0; k < scope.topicArray.length ; k++) {
                    scope.topicArray[k].selected = false;
                }
            //    scope.getTopicSkill(iCategory);
            };
            scope.topicSelection = function (iIndex, iTopic) {
                for (var k = 0; k < iTopic.Skills.length ; k++) {
                    iTopic.Skills[k].selected = false;
                }
                if (iTopic.selected) {
                    iTopic.selected = false;
                    if (iTopic.Skills.length > 0) {
                        var _length = scope.skillsArray.length
                        for (var l = 0 ; l < _length;) {
                            for (var k = 0; k < iTopic.Skills.length ; k++) {
                                if (scope.skillsArray[l] && scope.skillsArray[l].Name == iTopic.Skills[k].Name) {
                                    scope.skillsArray.splice(l, 1);
                                } else {
                                    l++;
                                }
                            }
                        }
                    }
                }
                else {
                    iTopic.selected = true;
                    scope.skillsArray = scope.skillsArray.concat(iTopic.Skills)
                }
            };
            scope.skillSelection = function (iIndex, iSkills) {
               
                if (iSkills.selected)
                    iSkills.selected = false;
                else
                    iSkills.selected = true
            };
            scope.getTopicSkill = function (iCategory) {
                //serverCommunication.getTopicSkill({
                //    cateGoryObject: iCategory,
                //    successCallBack: function (iObj) {
                //        console.error('In successCallBack', iObj);


                //    },
                //    failureCallBack: function () {
                //        console.error('In failureCallBack', iObj);

                //    }
                //});
            };
            scope.init = function () {
                serverCommunication.getCategorys({
                    successCallBack: function (iObj) {
                        console.error('In successCallBack', iObj);
                        var _data = JSON.parse(iObj.data);
                        console.error(_data)
                        scope.catogoryArray = [].concat(_data);
                    },
                    failureCallBack: function (iObj) {
                        console.error('In failureCallBack', iObj);

                    }
                });
            };
            scope.init();
        }
    };
});


