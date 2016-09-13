var app = angular.module('mango',[]);

app.controller('RegisterCtrl', [
        '$scope',
        function($scope) {
            $scope.loginUser = function() {
				firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).catch(function(error) {
				  // Handle Errors here.
				  if(error.code) {
					console.log(error.code);
					console.log(error.message);
					}
				});

            };

            $scope.addUser = function() {
                firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password).catch(function(error) {
                    if(error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorMessage);
                        console.log(errorCode);
                    }
                    else {
						var user = firebase.auth().currentUser;
						if (user) {
						}
						else {
						}
					}
                });

            };
        }]);
