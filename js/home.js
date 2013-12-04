function HomeCtrl($scope, $http) {
    $scope.Url = 'ajax/characters.php';
    $scope.ResultClass = '';
    $scope.Result = '';
    $scope.Characters = [];
    $scope.CharToDelete = null;
   
    $scope.editUrl = function(charIndex) {
        if ($scope.Characters[charIndex].Status == 'Incomplete') {
            return "/character_builder2.php?CharacterID=" + $scope.Characters[charIndex].CharacterID;
        } else {
            return "/character_sheet.php?CharacterID=" + $scope.Characters[charIndex].CharacterID;
        }
    }

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

            for (i = 0; i < $scope.Characters.length; i++) {
                if ($scope.Characters[i].CharacterJSON !== '') {
                    $scope.Characters[i].CharacterJSON = JSON.parse($scope.Characters[i].CharacterJSON);
                }
            }
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
