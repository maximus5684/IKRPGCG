function HomeCtrl($scope, $http) {
    $scope.Url = 'ajax/characters.php';
    $scope.ResultClass = '';
    $scope.Result = '';
    $scope.Characters = [];
    $scope.CharToDelete = null;
    
    $scope.DeleteCharAsk = function(charIndex) {
        $scope.CharToDelete = $scope.Characters[charIndex];
    };
    
    $scope.DeleteChar = function() {
        $http.post($scope.Url, { ReqType: 'DelChar', CharacterID: $scope.CharToDelete.CharacterID }).success(function(data, status) {
           $scope.Status = status;
           $scope.Data = data;
           
           if ($scope.Data != 'OK') {
               $scope.Result = $scope.Data;
               $scope.ResultClass = 'warning';
           }
           
           $scope.GetCharacters();
        }).error(function(data, status) {
            $scope.Data = data || 'Request failed';
            $scope.Status = status;
            $scope.Result = $scope.Data;
            $scope.ResultClass = 'warning';
        });
    };
    
    $scope.GetCharacters = function() {
        $http.post($scope.Url, { ReqType: 'GetUserChars' }).success(function(data, status) {
            $scope.Status = status;
            $scope.Characters = data;
        }).error(function(data, status) {
            $scope.Data = data || 'Request failed';
            $scope.Status = status;
            $scope.Result = $scope.Data;
            $scope.ResultClass = 'warning';
        });
    };
    
    $scope.ResultShow = function() {
        if ($scope.Result !== '') {
            return true;
        } else {
            return false;
        }
    };
    
    $scope.CharactersShow = function() {
        if ($scope.Characters.length > 0) {
            return true;
        } else {
            return false;
        }
    };
}