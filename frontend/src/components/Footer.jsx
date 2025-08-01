import React from 'react';

function Footer() {
  return (
     <footer className="bg-gray-800 text-white p-4 text-center mt-8 main-footer">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
            <p>&copy; 2025 MyGadgetStore. All rights reserved.</p>
            <div className="footer-nav m-2 sm:mt-0">
                <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                </ul>
            </div>
            <div className="social-media">
                <h3>Follow Us</h3>
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
            <div className="copyright">
                &copy; {new Date().getFullYear()} E-commerce Store. All rights reserved.
            </div>
        </div>
    </footer>
    );
}

export default Footer;
