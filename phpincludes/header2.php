    </head>
    <body>
        <div class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container" style="position: relative">
                    <ul class="nav">
                        <li<?php echo activeCheck('index.php'); ?>><a href="index.php">Home</a></li>
                        <li<?php echo activeCheck('character'); ?>><a href="character_builder.php">Character Builder</a></li>
                        <li<?php echo activeCheck('edit_profile.php'); ?>><a href="edit_profile.php">Profile</a></li>
                        <li<?php echo activeCheck('about.php'); ?>><a href="about.php">About</a></li>
                    </ul>
                    <button class="btn btn-primary" id="logoutButton" onclick="javascript:window.location='/logout_process.php'">Log Out</button>
                </div>
            </div>
        </div>