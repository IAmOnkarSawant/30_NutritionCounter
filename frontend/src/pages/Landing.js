import React, { Fragment } from 'react';
import { useEffect, useRef } from 'react';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Start from './Start';



function Landing() {
    const testElementRef = useRef(null);
    useEffect(() => {
        const testElement = testElementRef.current;
        // jQuery-based scripts should be handled within useEffect
        const handleNavClick = () => {
            $('.main-nav').slideToggle();
            return false;
        };

        // Run the following logic when the component mounts
        $('#test').scrollToFixed(); // Script for scrollToFixed plugin

        // Event delegation using 'on' to handle click events for '.res-nav_click' elements
        $(document).on('click', '.res-nav_click', handleNavClick);

        // Clean-up: remove event listener when the component unmounts
        return () => {
            $(document).off('click', '.res-nav_click', handleNavClick);
        };
    }, []);

    // Initialize WOW.js for animation
    let wow = new window.WOW({
        animateclassName: 'animated',
        offset: 100,
    });
    wow.init();

    // Script for smooth scrolling when clicking on links
    $(window).load(function () {
        $('.main-nav li a, .servicelink').bind('click', function (event) {
            var $anchor = $(this);

            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 102,
            }, 1500, 'easeInOutExpo');

            if ($(window).width() < 768) {
                $('.main-nav').hide();
            }
            event.preventDefault();
        });
    });

    // Isotope initialization for filtering
    $(window).load(function () {
        var $container = $('.portfolioContainer'),
            $body = $('body'),
            colW = 375,
            columns = null;

        $container.isotope({
            resizable: true,
            masonry: {
                columnWidth: colW
            }
        });
    });



return (
    <Fragment>
        <header className="header" id="header" >
            <div className="container" >
                <figure className="logo animated fadeInDown delay-07s">
                    <a href="#"><img src="assets/img/nutrition_icon.png" alt="" /></a>
                </figure>
                <h1 className="animated fadeInDown delay-07s">Welcome <br /> To <br /> Nutrition Counter App</h1>
                <ul className="we-create animated fadeInUp delay-1s">
                    <li>We tell you which nutritions are good for you!</li>
                </ul>
                <a className="link animated fadeInUp delay-1s servicelink" href="#service" >Get Started</a>
            </div>
        </header>

        <nav className="main-nav-outer" id="test">
            <div className="container">
                <ul className="main-nav">
                    <li><a href="#header">Home</a></li>
                    <li><a href="#service">Features</a></li>
                    <li><a href="#client">How it works</a></li>
                    <li className="small-logo"><a href="#header"><img src="assets/img/nutrition_icon logo.png" alt="" /></a></li>
                    {/* <!-- <li><a href="#client">Clients</a></li> --> */}
                    <li><a href="#team">Team</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <a className="res-nav_click" href="#"><i className="fa-bars"></i></a>
            </div>
        </nav>



        <section className="main-section" id="service">
            <div className="container">
                <h2>Features</h2>
                <h6>We offer exceptional service with complimentary hugs.</h6>
                <div className="row">
                    <div className="col-lg-4 col-sm-6 wow fadeInLeft delay-05s">
                        <div className="service-list">
                            <div className="service-list-col1">
                                <i className="fas fa-cutlery"></i>
                            </div>
                            <div className="service-list-col2">
                                {/* <!-- <h3>information extraction &amp; give information</h3> --> */}
                                <h3>information extraction from ingredient label</h3>
                                <p>Using state of the art OCR, we seamlessly extract ingredients from labels, enabling the display of key nutritional values &amp; fundamental metrics along with their precise percentages</p>
                            </div>
                        </div>
                        <div className="service-list">
                            <div className="service-list-col1">
                                <i className="fas fa-camera-retro"></i>
                            </div>
                            <div className="service-list-col2">
                                <h3>information extraction from product table</h3>
                                <p>Proin iaculis purus consequat sem digni ssim. Digni ssim porttitora .</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- <div className="ingredient-label">
            	<img src="assets/img/nutilabel.jpg" alt="">
            </div> --> */}

                </div>
            </div>
        </section>



        <section className="main-section alabaster" id="client">
            <div className="container">
                <div className="row">
                    <figure className="col-lg-5 col-sm-4 wow fadeInLeft">
                        <img src="assets/img/foodfeautures.jpg" alt="" />
                    </figure>
                    <div className="col-lg-7 col-sm-8 featured-work">
                        <h2>How it works</h2>
                        <p className="padding-b">Proin iaculis purus consequat sem cure digni ssim. Donec porttitora entum suscipit aenean rhoncus posuere odio in tincidunt. Proin iaculis purus consequat sem cure digni ssim. Donec porttitora entum suscipit.</p>
                        <div className="featured-box">
                            <div className="featured-box-col1 wow fadeInRight delay-02s">
                                <i className="fa-magic"></i>
                            </div>
                            <div className="featured-box-col2 wow fadeInRight delay-02s">
                                <h3>magic of theme development</h3>
                                <p>Proin iaculis purus consequat sem cure digni ssim. Donec porttitora entum suscipit aenean rhoncus posuere odio in tincidunt. </p>
                            </div>
                        </div>
                        <div className="featured-box">
                            <div className="featured-box-col1 wow fadeInRight delay-04s">
                                <i className="fa-gift"></i>
                            </div>
                            <div className="featured-box-col2 wow fadeInRight delay-04s">
                                <h3>neatly packaged</h3>
                                <p>Proin iaculis purus consequat sem cure digni ssim. Donec porttitora entum suscipit aenean rhoncus posuere odio in tincidunt. </p>
                            </div>
                        </div>
                        <div className="featured-box">
                            <div className="featured-box-col1 wow fadeInRight delay-06s">
                                <i className="fa-dashboard"></i>
                            </div>
                            <div className="featured-box-col2 wow fadeInRight delay-06s">
                                <h3>SEO optimized</h3>
                                <p>Proin iaculis purus consequat sem cure digni ssim. Donec porttitora entum suscipit aenean rhoncus posuere odio in tincidunt. </p>
                            </div>
                        </div>
                        {/* <!-- <a className="Learn-More" href="#">Learn More</a> --> */}
                    </div>
                    <div className="ingredient-label">
                        <img src="assets/img/bottlelabel.jpg" alt="" />

                    </div>
                    {/* <a href ="#" className ="btn"> Click to Try!</a> */}
                    <Router>
                        {/* Your routes */}
                        <Route path="/start" component={Start} />

                        {/* Your link to navigate */}
                        <Link to="/start" className="btn">Click to Try!</Link>
                    </Router>

                </div>

            </div>
        </section>



        {/* <!-- <section className="main-section paddind" id="Portfolio">main-section-start --> */}
        {/* <!-- <div className="container">
    	<h2>Portfolio</h2>
    	<h6>Fresh portfolio of designs that will keep you wanting more.</h6>
      <div className="portfolioFilter">  
        <ul className="Portfolio-nav wow fadeIn delay-02s">
        	<li><a href="#" data-filter="*" className="current" >All</a></li>
            <li><a href="#" data-filter=".branding" >Branding</a></li>
            <li><a href="#" data-filter=".webdesign" >Web design</a></li>
            <li><a href="#" data-filter=".printdesign" >Print design</a></li>
            <li><a href="#" data-filter=".photography" >Photography</a></li>
        </ul>
       </div> 
        
	</div>
    <div className="portfolioContainer wow fadeInUp delay-04s">
            	<div className=" Portfolio-box printdesign">
                	<a href="#"><img src="assets/img/Portfolio-pic1.jpg" alt=""></a>	
                	<h3>Foto Album</h3>
                    <p>Print Design</p>
                </div>
                <div className="Portfolio-box webdesign">
                	<a href="#"><img src="assets/img/Portfolio-pic2.jpg" alt=""></a>	
                	<h3>Luca Theme</h3>
                    <p>Web Design</p>
                </div>
                <div className=" Portfolio-box branding">
                	<a href="#"><img src="assets/img/Portfolio-pic3.jpg" alt=""></a>	
                	<h3>Uni Sans</h3>
                    <p>Branding</p>
                </div>
                <div className=" Portfolio-box photography" >
                	<a href="#"><img src="assets/img/Portfolio-pic4.jpg" alt=""></a>	
                	<h3>Vinyl Record</h3>
                    <p>Photography</p>
                </div>
                <div className=" Portfolio-box branding">
                	<a href="#"><img src="assets/img/Portfolio-pic5.jpg" alt=""></a>	
                	<h3>Hipster</h3>
                    <p>Branding</p>
                </div>
                <div className=" Portfolio-box photography">
                	<a href="#"><img src="assets/img/Portfolio-pic6.jpg" alt=""></a>	
                	<h3>Windmills</h3>
                    <p>Photography</p>
                </div>
    </div>
</section>main-section-end --> */}


        {/* <!-- <section className="main-section client-part" id="client">main-section client-part-start --> */}
        {/* <!-- <div className="container">
		<b className="quote-right wow fadeInDown delay-03"><i className="fa-quote-right"></i></b>
    	<div className="row">
        	<div className="col-lg-12">
            	<p className="client-part-haead wow fadeInDown delay-05">It was a pleasure to work with the guys at Knight Studio. They made sure 
we were well fed and drunk all the time!</p>
            </div>
        </div>
    	<ul className="client wow fadeIn delay-05s">
        	<li><a href="#">
            	<img src="assets/img/client-pic1.jpg" alt="">
                <h3>James Bond</h3>
                <span>License To Drink Inc.</span>
            </a></li>
        </ul>
    </div> -->
<!-- </section>main-section client-part-end -->
<!-- <div className="c-logo-part">c-logo-part-start -->
	<!-- <div className="container">
    	<ul>
        	<li><a href="#"><img src="assets/img/c-liogo1.png" alt=""></a></li>
            <li><a href="#"><img src="assets/img/c-liogo2.png" alt=""></a></li>
            <li><a href="#"><img src="assets/img/c-liogo3.png" alt=""></a></li>
            <li><a href="#"><img src="assets/img/c-liogo4.png" alt=""></a></li>
            <li><a href="#"><img src="assets/img/c-liogo5.png" alt=""></a></li>
    	</ul>
	</div> -->
<!-- </div>c-logo-part-end --> */}
        <section className="main-section team" id="team">
            <div className="container">
                <h2>team</h2>
                <h6>Take a closer look into our amazing team. We won’t bite.</h6>
                <div className="team-leader-block clearfix">
                    <div className="team-leader-box">
                        <div className="team-leader wow fadeInDown delay-03s">
                            <div className="team-leader-shadow"><a href="#"></a></div>
                            <img src="assets/img/rhitesh pic.jpg" alt="" />
                            <ul>
                                <li><a href="#" className="fa-twitter"></a></li>
                                <li><a href="#" className="fa-facebook"></a></li>
                                <li><a href="#" className="fa-pinterest"></a></li>
                                <li><a href="#" className="fa-google-plus"></a></li>
                            </ul>
                        </div>
                        <h3 className="wow fadeInDown delay-03s">Rhitesh Kumar Singh</h3>
                        <span className="wow fadeInDown delay-03s">ML and Frontend </span>
                        <p className="wow fadeInDown delay-03s">Was the brain behind the ml pipeline used and also made the frontend landing page and designed the databases.</p>
                    </div>
                    <div className="team-leader-box">
                        <div className="team-leader  wow fadeInDown delay-06s">
                            <div className="team-leader-shadow"><a href="#"></a></div>
                            <img src="assets/img/onkar.jpeg" alt="" />
                            <ul>
                                <li><a href="#" className="fa-twitter"></a></li>
                                <li><a href="#" className="fa-facebook"></a></li>
                                <li><a href="#" className="fa-pinterest"></a></li>
                                <li><a href="#" className="fa-google-plus"></a></li>
                            </ul>
                        </div>
                        <h3 className="wow fadeInDown delay-06s">Onkar Sawant</h3>
                        <span className="wow fadeInDown delay-06s">Backend and Middleware </span>
                        <p className="wow fadeInDown delay-06s">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat sollicitudin cursus. Dolor sit amet, consectetur adipiscing elit proin consequat.</p>
                    </div>
                    <div className="team-leader-box">
                        <div className="team-leader wow fadeInDown delay-09s">
                            <div className="team-leader-shadow"><a href="#"></a></div>
                            <img src="assets/img/nithin.jpeg" alt="" />
                            <ul>
                                <li><a href="#" className="fa-twitter"></a></li>
                                <li><a href="#" className="fa-facebook"></a></li>
                                <li><a href="#" className="fa-pinterest"></a></li>
                                <li><a href="#" className="fa-google-plus"></a></li>
                            </ul>
                        </div>
                        <h3 className="wow fadeInDown delay-09s">Nithin Venugopal</h3>
                        <span className="wow fadeInDown delay-09s">Frontend</span>
                        <p className="wow fadeInDown delay-09s">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat sollicitudin cursus. Dolor sit amet, consectetur adipiscing elit proin consequat.</p>
                    </div>
                    <div className="team-leader-box">
                        <div className="team-leader  wow fadeInDown delay-06s">
                            <div className="team-leader-shadow"><a href="#"></a></div>
                            <img src="assets/img/team-leader-pic2.jpg" alt="" />
                            <ul>
                                <li><a href="#" className="fa-twitter"></a></li>
                                <li><a href="#" className="fa-facebook"></a></li>
                                <li><a href="#" className="fa-pinterest"></a></li>
                                <li><a href="#" className="fa-google-plus"></a></li>
                            </ul>
                        </div>
                        <h3 className="wow fadeInDown delay-06s">Shubham Jaiswal</h3>
                        <span className="wow fadeInDown delay-06s">Loda Lahsun</span>
                        <p className="wow fadeInDown delay-06s">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat sollicitudin cursus. Dolor sit amet, consectetur adipiscing elit proin consequat.</p>
                    </div>
                </div>
            </div>
        </section>



        <section className="business-talking">
            <div className="container">
                <h2>Contact Us.</h2>
            </div>
        </section>
        <div className="container">
            <section className="main-section contact" id="contact">

                <div className="row">
                    <div className="col-lg-6 col-sm-7 wow fadeInLeft">
                        <div className="contact-info-box address clearfix">
                            <h3><i className=" icon-map-marker"></i>Address:</h3>
                            <span>IIIT Hyderabad, CR Rao Road<br />Gachibowli 500032.</span>
                        </div>
                        <div className="contact-info-box phone clearfix">
                            <h3><i className="fa-phone"></i>Phone:</h3>
                            <span>1-800-BOO-YAHH</span>
                        </div>
                        <div className="contact-info-box email clearfix">
                            <h3><i className="fa-pencil"></i>email:</h3>
                            <span>rhitesh.singh@students.iiit.ac.in</span>
                            <span>onkar.sawant@students.iiit.ac.in</span>
                            {/* <!-- <span>nithin.venugopal@students.iiit.ac.in</span>
                    <span>shubham.jaiswal@students.iiit.ac.in</span> --> */}
                        </div>
                        <div className="contact-info-box hours clearfix">
                            <h3><i className="fa-clock-o"></i>Hours:</h3>
                            <span><strong>Monday - Thursday:</strong> 10am - 6pm<br /><strong>Friday:</strong> People work on Fridays now?<br /><strong>Saturday - Sunday:</strong> Best not to ask.</span>
                        </div>
                        <ul className="social-link">
                            <li className="twitter"><a href="#"><i className="fa-twitter"></i></a></li>
                            <li className="facebook"><a href="#"><i className="fa-facebook"></i></a></li>
                            <li className="pinterest"><a href="#"><i className="fa-pinterest"></i></a></li>
                            <li className="gplus"><a href="#"><i className="fa-google-plus"></i></a></li>
                            <li className="dribbble"><a href="#"><i className="fa-dribbble"></i></a></li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
        <footer className="footer">
            <div className="container">
                <div className="footer-logo"><a href="#"><img src="assets/img/nutrition_icon logo.png" alt="" /></a></div>
                <span className="copyright">&copy; Knight Theme. All Rights Reserved</span>
                <div className="credits">
                    {/* <!-- 
                All the links in the footer should remain intact. 
                You can delete the links only if you purchased the pro version.
                Licensing information: https://bootstrapmade.com/license/
                Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=Knight
            --> */}
                    <a href="https://bootstrapmade.com/free-business-bootstrap-themes-website-templates/">Business Bootstrap Themes</a> by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
            </div>
        </footer>
    </Fragment>
);
        
        }  

export default Landing;