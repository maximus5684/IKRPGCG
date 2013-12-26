<?php

$pageTitle = 'Home - Iron Kingdoms Character Generator';
include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header1.php'); ?>

        <link href="css/profile.css" rel="stylesheet">
        <script src="js/profile.js"></script>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header2.php'); ?>

        <div class="container" id="mainContain" ng-controller="ProfileCtrl" ng-init="getProfile()">
            <h2 class="center">Edit Profile</h2>
            <form class="form-horizontal">
                <div class="control-group{{emailClass()}}">
                    <label class="control-label" for="Email">Email Address:<span style="color: #F89406"><sup><strong>1</strong></sup></span></label>
                    <div class="controls">
                        <input type="text" id="Email" ng-model="Email" required>
                        <span class="help-inline" ng-show="invalidEmail()">Invalid email address.</span>
                    </div>
                </div>
                <div class="control-group{{firstClass()}}">
                    <label class="control-label" for="FirstName">First Name:</label>
                    <div class="controls">
                        <input type="text" id="FirstName" ng-model="First" required>
                    </div>
                </div>
                <div class="control-group{{lastClass()}}">
                    <label class="control-label" for="LastName">Last Name:</label>
                    <div class="controls">
                        <input type="text" id="LastName" ng-model="Last" required>
                    </div>
                </div>
                <div class="control-group{{newPassClass()}}">
                    <label class="control-label" for="NewPass">New Password:<span style="color: #F89406"><sup><strong>2</strong></sup></span></label>
                    <div class="controls">
                        <input type="password" id="NewPass" ng-model="NewPass">
                    </div>
                </div>
                <div class="control-group{{newPassCopyClass()}}">
                    <label class="control-label" for="NewPassCopy">Retype Password:</label>
                    <div class="controls">
                        <input type="password" id="NewPassCopy" ng-model="NewPassCopy">
                        <ul class="unstyled" style="margin-top: 20px">
                            <li>
                                <span class="badge badge-warning"><sup>1</sup> Changing your email address will also change your login.</span>
                            </li>
                            <li>
                                <span class="badge badge-warning"><sup>2</sup> Must be at least 6 characters.</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <button type="submit" class="btn btn-primary" ng-click="editProfile()">Save</button>
                        <button type="submit" class="btn" ng-click="cancelClick()">Cancel</button>
                        <span id="resultWrap" class="label label-{{ResultClass}}">{{Result}}</span>
                    </div>
                </div>
            </form>
        </div>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/footer.php'); ?>
