<?php

$pageTitle = 'Home - Iron Kingdoms Character Generator';
include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header1.php'); ?>

        <link href="css/home.css" rel="stylesheet">
        <script src="js/home.js"></script>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header2.php'); ?>

        <div class="container" id="mainContain" ng-controller="HomeCtrl" ng-init="GetCharacters()">
            <h1 class="center">List of Characters</h1>
            <table class="table table-striped" id="characterTable" ng-show="CharactersShow()">
                <thead>
                    <tr>
                        <th>Character Name</th>
                        <th>Race</th>
                        <th>Career 1</th>
                        <th>Career 2</th>
                        <th class="center" style="width: 25px">XP</th>
                        <th class="center">Status</th>
                        <th class="center" style="width: 40px">Edit/<br>View</th>
                        <th class="center" style="width: 60px">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="Character in Characters">
                        <td>{{Character.Name}}</td>
                        <td>{{Character.Race}}</td>
                        <td>{{Character.Career1}}</td>
                        <td>{{Character.Career2}}</td>
                        <td class="center">{{Character.XP}}</td>
                        <td class="center">{{Character.Status}}</td>
                        <td class="center"><a ng-href="{{editUrl($index)}}"><i class="icon-pencil"></i></a></td>
                        <td class="center">
                            <a class="icon-remove-sign" ng-click="DeleteCharAsk($index)" data-toggle="modal" data-target="#deleteChar"></a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h3 class="center" ng-hide="CharactersShow()">Nothing to see here!</h3>
            <p class="center">
                <button class="btn" onclick="javascript:window.location='character_builder.php'"><i class="icon-plus"></i> New</button>
            </p>
            <p ng-show="ResultShow()" class="center">
                <span class="label label-{{ResultClass}}">{{Result}}</span>
            </p>
            <div class="modal hide fade" id="deleteChar">
                <form ng-submit="DeleteChar()" onsubmit="javascript:$('#deleteChar').modal('hide')">
                    <div class="modal-header">
                        <h3>Delete Character</h3>
                    </div>
                    <div class="modal-body">
                        Are you sure you wish to delete {{CharToDelete.Name}}?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Delete</button>
                    </div>
                </form>
            </div>
        </div>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/footer.php'); ?>
