<?php

include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/general.php');
$pageTitle = 'Home - Iron Kingdoms Character Generator';

?><!DOCTYPE html>
<html ng-app lang="en">
    <head>
        <title><?php echo $pageTitle; ?></title>
        <script src="js/angular.min.js"></script>
        <script src="js/jquery-2.0.3.min.js"></script>
        <link href="css/bootstrap.min.css" rel="stylesheet" media="all">
        <link href="css/main.css" rel="stylesheet" media="all">
        <script src="js/login.js"></script>
        <link href="css/login.css" rel="stylesheet" media="all">
    </head>
    <body>
        <div class="container" id="mainContain" ng-controller="LoginCtrl" ng-init="SetRedir('<?php echo str_replace("Reason=Inactive", "", urldecode($_SERVER['QUERY_STRING'])); ?>')">
            <div class="hero-unit">
                <h1 class="center" id="loginTitle">IRON KINGDOMS<br>Character Builder</h1>
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
                <p id="resultWrap" class="center" style="display: none; float: left; width: 820px">
                    <span class="label label-{{ResultClass}}">{{Result}}</span>
                </p>
            </div>
        </div>
        <script type="text/javascript">
            $(document).ready(function() {
                $("#loginEmail").focus();
            });
        </script>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/footer.php'); ?>
