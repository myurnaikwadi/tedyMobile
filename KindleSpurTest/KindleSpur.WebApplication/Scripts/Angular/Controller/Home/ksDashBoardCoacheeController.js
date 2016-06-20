﻿app.controller('ksDashBoardCoacheeController', function ($scope,serverCommunication ) {
    $scope.notifications = [

                { notificationType: '1', name: 'YOU HAVE COACHING INVITE  FROM', assignPerson: 'HARSHADA D.' },
                { notificationType: '2', role: 'mentor', name: 'YOUR MEETING HAS BEEN SCHEDULED WITH SAGAR N  ON', meetingDate: '20/05/2016', meetingTime: '11:00PM', meetingTimeDiff: '1 HOUR' },
                { notificationType: '2', role: 'coachee', name: 'YOUR MEETING HAS BEEN SCHEDULED WITH SAGAR N  ON', meetingDate: '25/05/2016', meetingTime: '08:00AM', meetingTimeDiff: '2 HOUR' },
            
    ]
    $scope.leftSideMenus = [{ name: 'DASHBOARD' }
                , { name: 'COACHING STATUS' }
                , { name: 'KNOWLEDGE GARDEN' }
                , { name: 'BRAIN GAMES' }
                , { name: 'GRAPHS' }
                , { name: 'RESOURCES' }
    ]
    $scope.applicationRole = [{ name: 'COACHEE' }, { name: 'MENTEE' }, { name: 'COACH' }, { name: 'MENTOR' }]
    $scope.rightSideDashBoardArray = [
                { name: 'COACHING STATUS' },
                { name: 'KNOWLEDGE GARDEN' },
                { name: 'FEED YOU SHOULD READ' },
                { name: 'GRAPHS' },
                { name: 'BRAIN GAMES' },
                { name: 'RESOURCES' }
    ]
    $scope.init = function () {

            serverCommunication.getCoacheeData({
		        successCallBack: function () {
		            console.error('In successCallBack');

		        },
		        failureCallBack: function () {
		            console.error('In failureCallBack');

		        }
		    });
	};
	$scope.init();
});