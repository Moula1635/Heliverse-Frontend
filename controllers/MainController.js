// MainController.js
app.controller('MainController', function ($scope, UserService) {
    $scope.users = [];
    $scope.filteredUsers = [];
    $scope.selectedDomain = '';
    $scope.selectedGender = '';
    $scope.selectedAvailability = '';
    $scope.searchText = '';

    $scope.team = [];
    $scope.showTeamDetailsButton = false;

    UserService.getUsers().then(function (response) {
        console.log('Fetched data:', response.data);
        $scope.users = response.data;
        $scope.filteredUsers = $scope.users;
    });

    $scope.filterUsers = function () {
        $scope.filteredUsers = $scope.users.filter(function (user) {
            return (
                (!$scope.selectedDomain || user.domain === $scope.selectedDomain) &&
                (!$scope.selectedGender || user.gender === $scope.selectedGender) &&
                (!$scope.selectedAvailability || user.available.toString() === $scope.selectedAvailability) &&
                (!$scope.searchText ||
                    user.first_name.toLowerCase().includes($scope.searchText.toLowerCase()) ||
                    user.last_name.toLowerCase().includes($scope.searchText.toLowerCase())
                )
            );
        });

        console.log('Filtered Users:', $scope.filteredUsers);
        console.log('Selected Domain:', $scope.selectedDomain);
        console.log('Selected Gender:', $scope.selectedGender);
        console.log('Selected Availability:', $scope.selectedAvailability);
        console.log('Search Text:', $scope.searchText);
    };

    $scope.addToTeam = function (user) {
        var domainAlreadyInTeam = $scope.team.some(function (teamMember) {
            return teamMember.domain === user.domain;
        });

        if (!domainAlreadyInTeam && user.available) {
            $scope.team.push({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                domain: user.domain,
                gender: user.gender,
                available: user.available,
            });
        }
    };

    $scope.onEnter = function (event) {
        if (event.key === 'Enter') {
            $scope.filterUsers();
        }
    };

    $scope.showTeamDetails = function () {
        console.log('Team Details:', $scope.team);
    };

    $scope.$watch('team', function () {
        $scope.showTeamDetailsButton = $scope.team.length > 0;
    }, true);
});
