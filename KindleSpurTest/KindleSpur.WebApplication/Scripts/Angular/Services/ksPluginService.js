﻿/**
     * @auther : MKN
     * @date : 07/05/2016
     * @Purpose : login and Signup controller - Manage all data related to  login and signup page
     */
app.controller('monthlyParent', ['$scope', 'authentification', '$location', '$rootScope', '$state', '$stateParams', function ($scope, authentification, $location, $rootScope, $state, $stateParams) {
    $rootScope.currentModule = 'Calendar';
    console.error('monthlyParent');
}]);
app.directive('monthly', function (dateServiceForMonthlyCalendar, $rootScope, serverCommunication) {
    return {
        scope: {
            moduleName : '@?'
        },
        templateUrl: 'Home/ksMonthlyView',        
        link: function ($scope) {
            console.error('monthlyController');
            if ($scope.moduleName)
                $rootScope.currentModule = $scope.moduleName;
            $scope.monthDate = new Date();
            $scope.dateNavigation = function (iValue) {
                if (iValue == '1') {
                    $scope.monthDate.setMonth($scope.monthDate.getMonth() + 1);
                } else {
                    $scope.monthDate.setMonth($scope.monthDate.getMonth() - 1);
                }
                $scope.init();
            };
            $scope.closeExpandDateView = function (iEvent) {
                if(iEvent) iEvent.stopPropagation();
                console.error('closeExpandDateView()')
                $scope.expandIndex = -1;
                $scope.expandDay = null;
                var _tempHeight = document.getElementById('monthlycontroller').getBoundingClientRect().height;
                var _obj = {
                    iHeight: _tempHeight / 6,
                    iCol: 7,
                    iArray: $scope.monthlyArray
                };
                msIsotopeFunc.prototype.genericHeightChange(_obj);
            };

            $scope.expandIndex = -1;
            $scope.expandDay = null;
            $scope.cellClickFunc = function (iCell, iIndex, iEvent) {
                if (iEvent) iEvent.stopPropagation();
                $scope.expandIndex = iIndex;
                var _tempHeight = document.getElementById('monthlycontroller').getBoundingClientRect().height;
                $scope.expandDay = iCell;
                //_dayWeekMonthView.expandIndex = iIndex;
                var _object = {
                    iHeight: _tempHeight / 6,
                    index: iIndex,
                    iWidth: 100 / 7,
                    TotalColumns: 7,
                    column: 7,
                    row: 6,
                    array: $scope.monthlyArray
                };
                msIsotopeFunc.prototype.expandForFloat(_object);
                console.error($scope.monthlyArray[iIndex].styleObj)
                $scope.monthlyArray[iIndex].styleObj['margin-top'] = '0';
            };

            var _renderMeeting = function (iObj) {
                console.error(iObj)
                for (var k = 0 ; k < iObj.data.length ; k++) {
                    iObj.data[k].StartDate = new Date(Number(iObj.data[k].StartDate.split('(')[1].split(')')[0]));
                    iObj.data[k].EndDate = new Date(Number(iObj.data[k].EndDate.split('(')[1].split(')')[0]));                  
                    var _indexForCheck = dateServiceForMonthlyCalendar.getDayDifference({ startTime: new Date($scope.monthlyArray[0].cellDate), endTime: new Date(iObj.data[k].StartDate) })
                    var _arrayIndex = _indexForCheck;
                    console.error(_arrayIndex)
                    if (_arrayIndex > -1) {
                        if (iObj.data[k].ConversationType == "Coaching" || iObj.data[k].ConversationType == "Mentoring") {
                            iObj.data[k].Role = iObj.data[k].ConversationType == "Coaching" ? 'Coach' : 'Mentor';
                        }
                        if (!$scope.monthlyArray[_arrayIndex].meetingArray) $scope.monthlyArray[_arrayIndex].meetingArray = [];
                        $scope.monthlyArray[_arrayIndex].meetingArray.push(iObj.data[k]);
                    }
                }
               // console.error($scope.monthlyArray)
            };
            var _getMeetingFromServer = function () {
                serverCommunication.GetAllMeetingPerMonth({
                    //  ConversationType: "Mentoring",
                    FromDate: $scope.monthlyArray[0].cellDate.toJSON(),
                    ToDate: $scope.monthlyArray[$scope.monthlyArray.length - 1].cellDate.toJSON(),
                    successCallBack: function (iObj) {
                        console.debug('In GetAllMeetingPerMonth', iObj);
                        _renderMeeting(iObj);
                        // $scope.loadingMiddleObject = { showLoading: false, loadingMessage: 'Loading' };
                    },
                    failureCallBack: function (iObj) {
                        console.debug('In failureCallBack', iObj);
                    }
                });
            };

            $scope.init = function () {
                $rootScope.$broadcast("refreshView", { type : 'refreshUI' });
                $scope.monthlyArray = [].concat(dateServiceForMonthlyCalendar.initializeMonthlyCell($scope.monthDate));
                $scope.dayName = [{ name: "Sun" }, { name: "Mon" }, { name: "Tue" }, { name: "Wed" }, { name: "Thu" }, { name: "Fri" }, { name: "Sat" }];//day name array reqiured for weekly view
                $scope.closeExpandDateView();              
                _getMeetingFromServer();
            };
            $scope.init();
           
            window.mon = $scope;
        }
    }
});

app.factory("dateServiceForMonthlyCalendar", function () {
    return {
        initializeMonthlyCell: function (dateObjAr, iObjFlag) {
            var isCurrentMonth = false;
            var _dateCount = 1;
            var _monthNumber =  "";
            var _year = "";
            var dateObjArgu = new Date(dateObjAr);
            var _nextMonthDateCount = 1;
            _dateCounter = 1;
            dateObjArgu.setDate(1);
            var _startDay = dateObjArgu.getDay();
            var _monthArray = new Array();
            var _monthObj = {};
            var _arrayForYearly = new Array();

            for (var i = 0 ; i < 6 ; i++) {
                for (var j = 0 ; j < 7 ; j++) {
                    var rowNumber = i;
                    var colNumber = j;
                    var _refDate = new Date();
                    _dateCounter = _dateCount;

                    if (colNumber < _startDay && rowNumber == 0) {
                        _dateCounter = this.getMaxDateOfMonth(dateObjArgu.getMonth() - 1, dateObjArgu.getFullYear()) - (_startDay - colNumber - 1);
                        if ((dateObjArgu.getMonth() - 1) == -1)
                            _dateCounter = this.getMaxDateOfMonth(11, dateObjArgu.getFullYear() - 1) - (_startDay - colNumber - 1);
                        _monthNumber = dateObjArgu.getMonth();
                        _year = dateObjArgu.getFullYear();
                        if (_monthNumber == 0) {
                            _monthNumber = 12;
                            _year--;
                        }
                        var obj = {
                            dateNumber: _dateCounter,
                            selectFlag: false,
                            value: "",
                            flag: 0,
                            clickedFlag: false,
                            cellDate: new Date(_year, _monthNumber - 1, _dateCounter),
                            weekDay: new Date(_year, _monthNumber - 1, _dateCounter).getDay()
                        };
                        _monthObj[new Date(_year, _monthNumber, _dateCounter)] = [];
                        _monthArray.push(obj);
                        _arrayForYearly.push(obj);
                    }
                    else if (_dateCounter <= this.getMaxDateOfMonth(dateObjArgu.getMonth(), dateObjArgu.getFullYear())) { //current month
                        if ((_dateCounter < _refDate.getDate() && dateObjArgu.getMonth() == _refDate.getMonth() && dateObjArgu.getFullYear() == _refDate.getFullYear()) || ((dateObjArgu.getMonth() < _refDate.getMonth() && dateObjArgu.getFullYear() == _refDate.getFullYear()) || dateObjArgu.getFullYear() < _refDate.getFullYear())) {
                            _year = dateObjArgu.getFullYear();
                            _monthNumber = dateObjArgu.getMonth();
                            var obj = {
                                dateNumber: _dateCounter,
                                selectFlag: false,
                                flag: 1,
                                value: "",
                                currentMonth: true,
                                clickedFlag: false,
                                cellDate: new Date(_year, _monthNumber, _dateCounter),
                                weekDay: new Date(_year, _monthNumber, _dateCounter).getDay()
                            };
                            _monthObj[new Date(_year, _monthNumber, _dateCounter)] = [];
                            _monthArray.push(obj);
                            _arrayForYearly.push(obj);
                        } else {
                            _monthNumber = dateObjArgu.getMonth() + 1;
                            _year = dateObjArgu.getFullYear();
                            var obj = {
                                dateNumber: _dateCounter,
                                selectFlag: false,
                                value: "",
                                currentMonth: true,
                                clickedFlag: false,
                                cellDate: new Date(_year, _monthNumber - 1, _dateCounter),
                                weekDay: new Date(_year, _monthNumber - 1, _dateCounter).getDay(),
                                flag: 1
                            };
                            _monthObj[new Date(_year, _monthNumber - 1, _dateCounter)] = [];
                            _monthArray.push(obj);
                            _arrayForYearly.push(obj);
                        }
                        isCurrentMonth = true;
                    }
                    else {

                        isCurrentMonth = false;
                        _dateCounter = _nextMonthDateCount;
                        _monthNumber = (dateObjArgu.getMonth()) + 1;
                        _year = dateObjArgu.getFullYear();

                        if (_monthNumber == 13) {
                            _monthNumber = 1;
                            _year++;
                        }
                        var obj = {
                            dateNumber: _dateCounter,
                            value: "",
                            selectFlag: false,
                            flag: 0,
                            clickedFlag: false,
                            cellDate: new Date(_year, _monthNumber, _dateCounter),
                            weekDay: new Date(_year, _monthNumber, _dateCounter).getDay()
                        };
                        _monthObj[new Date(_year, _monthNumber, _dateCounter)] = [];
                        _monthArray.push(obj);
                        _arrayForYearly.push(obj);
                        _nextMonthDateCount = _nextMonthDateCount + 1;
                    }


                    if (isCurrentMonth && _refDate.getDate() == _dateCounter && (_refDate.getMonth() + 1) == _monthNumber && _refDate.getFullYear() == _year) {
                        _monthArray[_monthArray.length - 1].flag = 1;
                        _monthArray[_monthArray.length - 1].flagAgenda = true;
                        _monthArray[_monthArray.length - 1].flagMonthly = true;
                        _monthArray[_monthArray.length - 1].value = 'TODAY';

                    }
                    if (isCurrentMonth)
                        _dateCount = _dateCount + 1;

                    _dateCounter = _dateCounter + 1;

                }
            }
            if (iObjFlag)
                return {
                    monthObj: _monthObj,
                    monthArray: _monthArray
                }
            else
                return _monthArray;
        }, getMaxDateOfMonth: function (iMonth, iYear) {
            if (iMonth == 0 || iMonth == 2 || iMonth == 4 || iMonth == 6 || iMonth == 7 || iMonth == 9 || iMonth == 11)
                return 31;
            else if (iMonth == 3 || iMonth == 5 || iMonth == 8 || iMonth == 10)
                return 30;
            else if (iMonth == 1 && ((iYear % 4 == 0) && (iYear % 100 != 0)) || (iYear % 400 == 0))
                return 29;
            else
                return 28;
        }, getDayDifference: function (iObj, onlyTimeFlag) {
            var oneDayInMilliseconds = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date(iObj.startTime);
            var secondDate = new Date(iObj.endTime);
            if (onlyTimeFlag)
                return Math.abs(firstDate.getTime() - secondDate.getTime());

            if (firstDate.getTime() > secondDate.getTime())
                return -1;
            else
                return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDayInMilliseconds)));
        },

        initializeWeeklyCell: function (dateObjAr, $scope, iFlag) {

            var _date = new Date(dateObjAr);
            var _offset = _date.getDay();
            var _startWeek = new Date(dateObjAr);
            var _weekArr = new Array();
            var _currdate = new Date();
            for (var i = 0; i < 7; i++) {
                var _lDate = new Date(_startWeek);               
                var _obj = {
                    cellDate: _lDate,
                    currentDate: false,
                    clickedDate: "0",
                    dateNumber: _lDate.getDate()
                }
                if (_currdate.getDate() == _lDate.getDate() && _currdate.getMonth() == _lDate.getMonth() && _currdate.getFullYear() == _lDate.getFullYear()) {
                    _obj.currentDate = true;
                }
                _weekArr.push(_obj);
                _startWeek.setDate(_startWeek.getDate() + 1);
            }
            return _weekArr;
        }
    };
});

