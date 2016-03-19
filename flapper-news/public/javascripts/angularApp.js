/**
*  Module
*
* Description
*/

var flapperNewsApp = angular.module('flapperNews', ['ui.router']);

flapperNewsApp.controller('MainCtrl', function($scope,posts){
	$scope.test = 'Hello World';
	$scope.posts = posts.posts;
	$scope.addPost = function(){
		if($scope.title && $scope.title !== '')
		{
			$scope.posts.push(
				{title:$scope.title,
				 link:$scope.link,
				 upvotes:0,
				comments: [
			    {author: 'Joe', body: 'Cool post!', upvotes: 0},
			    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}]});
			$scope.title = '';
			$scope.link = '';
		}
	};
	$scope.upVote = function(post){
		post.upvotes += 1;
	};
});


flapperNewsApp.controller('PostsCtrl',function($scope, $stateParams,posts){
	$scope.post = posts.posts[Number($stateParams.id)];
	$scope.addComment = function (){
		if($scope.body === '') { return; }
		  $scope.post.comments.push({
		    body: $scope.body,
		    author: 'user',
		    upvotes: 0
		  });
		  $scope.body = '';
	};
});


flapperNewsApp.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });
    $stateProvider
    .state('posts', {
	  url: '/posts/{id}',
	  templateUrl: '/posts.html',
	  controller: 'PostsCtrl'
	});

  $urlRouterProvider.otherwise('home');
}]);

flapperNewsApp.factory('posts', [function(){
		o = {posts:[]};
		return o;
	}]);