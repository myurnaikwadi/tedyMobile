﻿
//MKN - Added
app.directive('vcsDir', function ($state, serverCommunication) {
    return {
        scope: {
            //role: "@",
            //skillRequired: "=",
        },
        templateUrl: '/Home/ksVcs',
        //scope: true,   // optionally create a child scope
        link: function ($scope, element, attrs) {  
            window.vcs = $scope;//mkn
            $scope.leftSideMenus = [{ name: 'DASHBOARD' }
					, { name: 'COACHING STATUS' }
					, { name: 'KNOWLEDGE GARDEN' }
					, { name: 'BRAIN GAMES' }
					, { name: 'GRAPHS' }
					, { name: 'RESOURCES' }
					, { name: 'Add Skills' }
            ]
            var _resetStyles = function () {//AKP
                var txtBoxes = document.getElementsByTagName("INPUT");
                for (var i = 0; i < txtBoxes.length; i++) {
                    if (txtBoxes[i].id == "userId") {
                        document.getElementById('userId').style.borderColor = "#dcdcdc";
                    } else if (txtBoxes[i].id == "userIdTask") {
                        document.getElementById('userIdTask').style.borderColor = "#dcdcdc";
                    }
                }
            };
            //focus on specific field
            var _setElementFocus = function (elementId, iApplyClass) {//AKP
                if (elementId && document.getElementById(elementId)) {
                    setTimeout(function () {
                        if (elementId && document.getElementById(elementId)) {
                            document.getElementById(elementId).focus();
                        }
                    }, 40);
                }
            };
            $scope.closeAlertMessage = function () {
                _resetStyles();
                if ($scope.toFocusUserId == "true") {
                    _setElementFocus('userId'); //To set focus on UserId in login page when error occurred at UerId.  
                    $scope.toFocusUserId = "false";
                }
                else if ($scope.toFocusPwd == "true") {
                    _setElementFocus('userIdTask'); //to set focus on Password field in login page when error occurred at password.
                    $scope.toFocusPwd = "false";
                }
            };

            //autocomplete user name
            $scope.resetAutoComplete = function () {
                if ($scope.removedIdName != true) {
                    //$scope.recentlyLoggedUsersAutoSuggestArr = [];
                    $scope.selectedIndex = -1;
                }
                else {
                    _setElementFocus('userId'); //to set focus on Password field in login page when error occurred at password.	
                    $scope.removedIdName = false;
                }
            };

            $scope.autoCompleteEmailId = function ($event) {
                if ($event.keyCode === 9 || $event.keyCode === 27) {//tab/Esc key press
                    //if tab is  pressed, set selectedIndex value to userId & focus to password field
                    if ($event.keyCode === 9) {
                        if ($scope.selectedIndex != -1) {
                            //  $scope.credentials.username= $scope.recentlyLoggedUsersAutoSuggestArr[$scope.selectedIndex];
                            // $scope.recentlyLoggedUsersAutoSuggestArr = [];
                            $scope.selectedIndex = -1;
                        }
                    }
                    $scope.resetAutoComplete();
                }

            };
            $scope.measureOfImpact = [{ name: 'LOW' }, { name: 'MEDIUM' }, { name: 'HIGH' }];
            $scope.typeOfImpact = [{ name: 'DIRECT' }, { name: 'INDIRECT' }];

            $scope.addTaskObject = { eventTitle: '', impactZone: -1, measureImapact: -1, typeImapact: -1, description: '' };

            $scope.impactZoneSelection = function (iIndex, iOption) {
                $scope.addTaskObject.impactZone = iIndex;
            };

            $scope.typeOfImapactSelection = function (iIndex, iOption) {
                $scope.addTaskObject.typeImapact = iIndex;
            };
            $scope.measureOfImapactSelection = function (iIndex, iOption) {
                $scope.addTaskObject.measureImapact = iIndex;
            };
            $scope.dummyTaskArray = [];

            $scope.saveTask = function () {
                if ($scope.activity.eventTitle == '') {
                    alert('Please Enter Activity Name');
                    $scope.setFocusToActivityPart();
                    return;
                }
                console.error($scope.addTaskObject)
                if ($scope.addTaskObject.eventTitle == '' || $scope.addTaskObject.description == '' || $scope.addTaskObject.typeImapact == -1 || $scope.addTaskObject.measureImapact == -1) {
                    alert('Please fill Blank field');
                    return
                }
                $scope.dummyTaskArray.push($scope.addTaskObject);
                $scope.addTaskObject = { eventTitle: '', impactZone: -1, measureImapact: -1, typeImapact: -1, description: '' };
            }

            $scope.activity = { eventTitle: '' };
            $scope.activityMainArray = [];
            $scope.saveActvity = function () {
                //console.error($scope.addTaskObject)
                if ($scope.activity.eventTitle == '') {
                    alert('Please Enter Activity Name and score');
                    $scope.setFocusToActivityPart();
                    return;
                }
                if ($scope.dummyTaskArray.length == 0) {
                    alert('Please add atlist one score');
                    return;
                }
                $scope.activity.taskArr = [].concat($scope.dummyTaskArray);
                $scope.activityMainArray.push($scope.activity);
                $scope.activity = { eventTitle: '' };
                $scope.dummyTaskArray = [];
            };


            $scope.setFocusToActivityPart = function () {
                setTimeout(function () {
                    _setElementFocus('userId');
                }, 400);
            };
        }
    }
});