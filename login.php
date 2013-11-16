<?php

include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/general.php');
$pageTitle = 'Home - Iron Kingdoms Character Generator';

?><!DOCTYPE html>
<html ng-app lang="en">
    <head>
        <title><?php echo $pageTitle; ?></title>
        <script src="js/angular-1.0.1.min.js"></script>
        <script src="js/jquery-1.8.1.min.js"></script>
        <link href="css/bootstrap.min.css" rel="stylesheet" media="all">
        <link href="css/main.css" rel="stylesheet" media="all">
        <script src="js/login.js"></script>
        <link href="css/login.css" rel="stylesheet" media="all">
    </head>
    <body>
        <div class="container" id="mainContain" ng-controller="LoginCtrl">
            <div class="hero-unit">
                <h1 class="center">Iron Kingdoms<br>Character Builder</h1>
                <form class="form-horizontal">
                    <div class="control-group{{EmailStatus}}">
                        <label class="control-label" for="loginEmail">Email:</label>
                        <div class="controls">
                            <input type="text" id="loginEmail" placeholder="Email" ng-model="Email">
                        </div>
                    </div>
                    <div class="control-group{{PassStatus}}">
                        <label class="control-label" for="loginPass">Password:</label>
                        <div class="controls">
                            <input type="password" id="loginPass" placeholder="Password" ng-model="Password">
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <button type="submit" class="btn" ng-click="LoginCheck()">Sign in</button>
                        </div>
                    </div>
                </form>
                <p id="resultWrap" ng-show="ResultShow()" class="center" style="float: left; width: 820px">
                    <span class="label label-{{ResultClass}}">{{Result}}</span>
                </p>
            </div>
        </div>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/footer.php'); ?>