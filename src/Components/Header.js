import React, { useEffect } from 'react';

function Header(props) {

   useEffect(() => {
      const TypeWriter = function (txtElement, words, wait = 300) {
         this.txtElement = txtElement;
         this.words = words;
         this.txt = '';
         this.wordIndex = 0;
         this.wait = parseInt(wait, 10);
         this.type();
         this.isDeleting = false;
      }

      // Type Method
      TypeWriter.prototype.type = function () {
         // Current index of word
         const current = this.wordIndex % this.words.length;
         // Get full text of current word
         const fullTxt = this.words[current];
         console.log(fullTxt);

         // Check if deleting
         if (this.isDeleting) {
            // Remove a Character
            this.txt = fullTxt.substring(0, this.txt.length - 1);
         } else {
            // Add a character
            this.txt = fullTxt.substring(0, this.txt.length + 1);
         }
         // Insert txt into element
         this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
         console.log(this.txt);
         setTimeout(() => this.type(), 500);
      }
      // Init on DOM Load
      document.addEventListener('DOMContentLoaded', init)

      // Init App
      function init() {
         const txtElement = document.querySelector('.txt-type');
         const words = JSON.parse(txtElement.getAttribute('data-words'));
         const wait = txtElement.getAttribute('data-wait');
         // Init Typewriter
         new TypeWriter(txtElement, words, wait);
      }
   })

   if (props.data) {
      var name = props.data.name;
      var occupation = props.data.occupation;
      var description = props.data.description;
      var city = props.data.address.city;
      var networks = props.data.social.map(function (network) {
         return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
      })
   }




   return (
      <header id="home">

         <nav id="nav-wrap">

            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
            <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

            <ul id="nav" className="nav">
               <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
               <li><a className="smoothscroll" href="#about">About</a></li>
               <li><a className="smoothscroll" href="#resume">Resume</a></li>
               <li><a className="smoothscroll" href="#portfolio">Works</a></li>
               <li><a className="smoothscroll" href="#contact">Contact</a></li>
            </ul>

         </nav>

         <div className="row banner">
            <div className="banner-text">
               <h1 className="responsive-headline">I'm {name}.</h1>
               <h3>I'm a {city} based <span>{occupation}</span>.<span className="txt-type" data-wait="3000" data-words={`["React Developer", "React Native Developer", "MERN Stack Developer", ${description}]`} ></span></h3>
               <hr />
               <ul className="social">
                  {networks}
               </ul>
            </div>
         </div>

         <p className="scrolldown">
            <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
         </p>

      </header>
   );
}

export default Header;
