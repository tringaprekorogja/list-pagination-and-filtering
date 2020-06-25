/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


/* Creates global variables */

const studentListItem = document.querySelectorAll('li'); // Stores the students list item elements.
const studentsForPage = 10; // Stores the number of items to show on each page.

/* Creates a function to hide all the students except for the ten we want displayed on a page */

const showPage = (list, page) => {
   const startIndex = (page * studentsForPage) - studentsForPage
   const endIndex = page * studentsForPage

  // Iterates throught the list items

   for (let i = 0; i < list.length; i++) {
    // Checks if i is  greater than or equal to the start index variable and less than the end index variable.
      if ( i >= startIndex && i < endIndex) {
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }
   }
}


/* Creates pagination buttons and their functionality. */
const appendPageLinks = (list) => {

   // Calculates how many pages are needed for the list.
   const numOfPages = studentListItem.length / studentsForPage;

   // Creates a div, gives it a class and appends it to the .page div.
   let paginationDiv = document.createElement('div');
   paginationDiv.setAttribute('class', 'pagination');
   const pageDiv = document.querySelector('.page');
   pageDiv.appendChild(div);
   const ul = document.createElement('ul');
   paginationDiv.appendChild(ul);

  // Iterates as many times as the number of pages and creates the correct number of li elements.
   for (let i = 1; i <= numOfPages; i++) {
      const li = document.createElement('li');
      ul.appendChild(list);

      const link = document.createElement('a');
      link.setAttribute('href', '#' );
      link.innerHTML = i;

      li.appendChild(link);
   }
   // Adds the active class name to the first pagination link.

   document.getElementsByTagName('a')[0].className = 'active';

   const links = document.querySelectorAll ('a');

   // Iterates through all the links and adds an eventListener.

   for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', (e)=>{

         // Iterates through all the links and removes the active class name.

         for (let i=0; i < links.length; i++) {
            links[i].className = '';
           
         }
         // Adds the active class to the link that was clicked.
         event.target.className = ('active');
         

         const page = event.target.textContent;


         showPage(studentListItem, page )
                   
         
      })
   }

}

/* Calls the function and passes arguments which should be shown initially */
showPage(studentListItem, 1);

/*Calls the function*/
appendPageLinks(studentListItem);







