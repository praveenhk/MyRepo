/**
*  Module
*
* Description
*/

angular.module('flapperNews', ['ui.router'])

.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

			$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainCtrl',
				resolve: {
					postPromise: ['posts', function(posts) {
						return posts.getAll();
					}]
				}
			})
			
			.state('posts', {
				url: '/posts/{id}',
				templateUrl: '/posts.html',
				controller: 'PostsCtrl',
				resolve: {
					post: ['$stateParams', 'posts', function($stateParams,posts) {
						return posts.get($stateParams.id);
					}]
				}
			});

		$urlRouterProvider.otherwise('home');
}])

.controller('MainCtrl', function($scope,posts){
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
})
.controller('PostsCtrl',function($scope, $stateParams,posts){
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
})


.factory('posts',['$http', function($http){
	var o = {
		posts: []
	};
		o.getAll = function() {
    	return $http.get('/posts').success(function(data){
      		angular.copy(data, o.posts);
	    });
	  };
		return o;
	}])

