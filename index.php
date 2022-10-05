<?php
    session_start();
    if(isset($_SESSION["name"])){
        $menu=' 
                <li class="nav-item">
                    <a class="nav-link page-scroll" href="dashboard.php">Dashboard</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" id="navbarDropdown" aria-haspopup="true" aria-expanded="false">Hi, '.$_SESSION["name"].'</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#"><span class="item-text">Profile</span></a>
                        <div class="dropdown-items-divide-hr"></div>
                        <a class="dropdown-item" href="logout.php"><span class="item-text">Logout</span></a>
                    </div>
                </li>';
    }
    else{
        $menu= '<li class="nav-item"><a class="nav-link page-scroll" href="login.php">Login/Signup</a></li>';
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Create a stylish landing page for your business startup and get leads for the offered services with this HTML landing page template.">
    <meta name="author" content="Inovatik">
    <title>Evolo - Manage all your projects at one place</title>
    
    <!-- Styles -->
    <link href="css/bootstrap.css?c=9" rel="stylesheet">
	<link href="css/styles.css?x=5" rel="stylesheet">
	
	<!-- Favicon  -->
    <link rel="icon" href="images/favicon.png">
</head>
<body data-spy="scroll" data-target=".fixed-top">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-sm navbar-light navbar-custom">
        <a class="navbar-brand logo-image" href="index.php"><img src="images/logo.svg" alt="alternative" class="logo-img"></a>
	<button class="navbar-toggler" data-toggle="collapse" data-target="#navbarsExampleDefault">
		<span class="navbar-toggler-icon"></span>
	</button>
        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link page-scroll" href="#header">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link page-scroll" href="#services">Why Evolo?</a>
                </li>
                <!-- Dropdown Menu -->          
                <!--li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle page-scroll" href="#about" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">About</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#"><span class="item-text">Terms Conditions</span></a>
                        <div class="dropdown-items-divide-hr"></div>
                        <a class="dropdown-item" href="#"><span class="item-text">Privacy Policy</span></a>
                    </div>
                </li>-->
                <!-- end of dropdown menu -->
				<?=$menu?>
           </ul>
        </div>
    </nav> <!-- end of navbar -->
    <!-- end of navigation -->
    <!-- Header -->
    <header id="header" class="header">
        <div class="header-content">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="text-container">
                            <h1><span class="turquoise">One platform, better teamwork.</span> </h1>
                            <p class="p-large">Manage all your projects from start to finish.</p>
                            <a class="btn-solid-lg page-scroll" href="login.php">DISCOVER</a>
                        </div> <!-- end of text-container -->
                    </div> <!-- end of col -->
                    <div class="col-lg-6">
                        <div class="image-container">
                            <img class="img-fluid" src="images/header-teamwork.svg" alt="alternative">
                        </div> <!-- end of image-container -->
                    </div> <!-- end of col -->
                </div> <!-- end of row -->
            </div> <!-- end of container -->
        </div> <!-- end of header-content -->
    </header> <!-- end of header -->
    <!-- end of header -->
    <!-- Services -->
    <div id="services" class="cards-1">
        <div class="container-fluid serv">
            <div class="row">
                <div class="col-lg-12">
                    <h2>Why Evolo?</h2>
                    <p class="p-heading p-large">All your work in one place: Tasks, docs, chat, goals, and more.</p>
                </div> <!-- end of col -->
            </div> <!-- end of row -->
            <div class="row">
                <div class="col-lg-12">

                    <!-- Card -->
                    <div class="card">
                        <img class="card-image" src="images/services-icon-3.svg" alt="alternative">
                        <div class="card-body">
                            <h4 class="card-title">All in one workspace</h4>
                            <p>Track your group's progress and deadlines all in one place. Delivering your team's best work has never been easier.</p>
                        </div>
                    </div>
                    <!-- end of card -->

                    <!-- Card -->
                    <div class="card">
                        <img class="card-image" src="images/services-icon-2.svg" alt="alternative">
                        <div class="card-body">
                            <h4 class="card-title">Ease of work</h4>
                            <p>Manage, plan, assign and track everything without ambiguity to deliver your team's best work.</p>
                        </div>
                    </div>
                    <!-- end of card -->

                    <!-- Card -->
                    <div class="card">
                        <img class="card-image" src="images/services-icon-1.svg" alt="alternative">
                        <div class="card-body">
                            <h4 class="card-title">Coordination</h4>
                            <p>Constantly updates the team about the status of the tasks assigned so they can coordinate with their individual work.</p>
                        </div>
                    </div>
                    <!-- end of card -->
                    
                </div> <!-- end of col -->
            </div> <!-- end of row -->
        </div> <!-- end of container -->
    </div> <!-- end of cards-1 -->
    <!-- end of services -->
    <!-- Footer -->
    <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="footer-col">
                        <h4>About Evolo</h4>
                        <p>We're passionate about offering some of the best business growth services for startups</p>
                    </div>
                </div> <!-- end of col -->
                <div class="col-md-4">
                    <div class="footer-col middle">
                        <h4>Important Links</h4>
                        <ul class="list-unstyled li-space-lg">
                            <li class="media">
                                <i class="fas fa-square"></i>
                                <div class="media-body">Read our <a class="turquoise" href="terms-conditions.html">Terms & Conditions</a>, <a class="turquoise" href="privacy-policy.html">Privacy Policy</a></div>
                            </li>
                        </ul>
                    </div>
                </div> <!-- end of col -->
                <div class="col-md-4">
                    <div class="footer-col last">
                        <h4>Social Media</h4>
                        <span class="fa-stack">
                            <a href="#your-link">
                                <i class="fas fa-circle fa-stack-2x"></i>
                                <i class="fab fa-facebook-f fa-stack-1x"></i>
                            </a>
                        </span>
                        <span class="fa-stack">
                            <a href="#your-link">
                                <i class="fas fa-circle fa-stack-2x"></i>
                                <i class="fab fa-twitter fa-stack-1x"></i>
                            </a>
                        </span>
                        <span class="fa-stack">
                            <a href="#your-link">
                                <i class="fas fa-circle fa-stack-2x"></i>
                                <i class="fab fa-google-plus-g fa-stack-1x"></i>
                            </a>
                        </span>
                        <span class="fa-stack">
                            <a href="#your-link">
                                <i class="fas fa-circle fa-stack-2x"></i>
                                <i class="fab fa-instagram fa-stack-1x"></i>
                            </a>
                        </span>
                        <span class="fa-stack">
                            <a href="#your-link">
                                <i class="fas fa-circle fa-stack-2x"></i>
                                <i class="fab fa-linkedin-in fa-stack-1x"></i>
                            </a>
                        </span>
                    </div> 
                </div> <!-- end of col -->
            </div> <!-- end of row -->
        </div> <!-- end of container -->
    </div> <!-- end of footer -->  
    <!-- end of footer -->
	
    <!-- Scripts -->
    <script src="js/jquery.min.js"></script> <!-- jQuery for Bootstrap's JavaScript plugins -->
    <script src="js/bootstrap.min.js"></script> <!-- Bootstrap framework -->
    <script src="js/scripts.js"></script> <!-- Custom scripts -->
</body>
</html>