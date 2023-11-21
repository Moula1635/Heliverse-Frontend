// UserService.js
app.service('UserService', function ($http) {
    this.getUsers = function () {
        return $http.get('C:\\Users\\sagin\\OneDrive\\Desktop\\Heliverse\\heliverse_mock_data.json')
            .then(
                function (response) {
                    console.log('Fetched data:', response.data); // Add this line
                    return response.data;
                },
                function (error) {
                    console.error('Error fetching data:', error);
                    return [];
                }
            );
    };
});
