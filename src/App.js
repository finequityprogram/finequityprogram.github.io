import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


function App() {
 const [user, setUser] = useState({});

 function handleCallbackResponse(response) {
   console.log("Encoded JWT ID token: " + response.credential);
   var userObject = jwt_decode(response.credential);
   console.log(userObject);
   setUser(userObject);
   document.getElementById("signInDiv").style.display = "none";
   localStorage.setItem('user', JSON.stringify(userObject));
 }

 function handleSignOut(event) {
   setUser({});
   document.getElementById("signInDiv").style.display = "flex";
   localStorage.removeItem('user');
 }

 useEffect(() => {
   const storedUser = localStorage.getItem('user');
   if (storedUser) {
     setUser(JSON.parse(storedUser));
   document.getElementById("signInDiv").style.display = "none";
   }
 }, []);

 useEffect(() => {
   /* global google */
   function renderSignInButton() {
     google.accounts.id.initialize({
       client_id: "152896414576-0bl8nigplhvs0ha0eg9fc7m2jrk3klsu.apps.googleusercontent.com",
       callback: handleCallbackResponse
     });
     google.accounts.id.renderButton(
       document.getElementById("signInDiv"),
       { theme: "outline", size: "large" }
     );
   }

   // Load Google API library
   const script = document.createElement('script');
   script.src = 'https://accounts.google.com/gsi/client';
   script.onload = renderSignInButton;
   document.body.appendChild(script);

   return () => {
     // Clean up the script when the component unmounts
     document.body.removeChild(script);
   };
 }, []);

 return (
   <div>
     <div className="desktop">
       <div>
           <img className="finequity-logo" alt="Finequity logo" src="assets/finequity-logo.png" />
       </div>
     </div>
     <div id="signInDiv"></div>
     {Object.keys(user).length !== 0 && (
        <div className="desktop">
            <a href = "welcome.html">
                <button className="button button1">Enter Portal</button>
            </a>
        </div>
     )}
   </div>
 );
}

export default App;