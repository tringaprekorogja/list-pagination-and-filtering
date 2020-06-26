/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


/* Creates global variables */

const studentListItem = document.querySelectorAll('li'); // Stores the students list item elements.
const studentsForPage = 10; // Stores the number of items to show on each page.

/* Creates a function to hide all the students except for the ten we want displayed on a page */

const showPage = (list, page) => {
   console.log("List from show page " + list)
   const startIndex = (page * studentsForPage) - studentsForPage
   const endIndex = page * studentsForPage
   for (let i = 0; i < studentListItem.length; i++){
      studentListItem[i].style.display = 'none';
   } 
   // Iterates throught the list items
   for (let i = 0; i < list.length; i++) {
      // Checks if i is  greater than or equal to the start index variable and less than the end index variable.
      if (i >= startIndex && i < endIndex) {
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }
   }
}


/* Creates pagination buttons and their functionality. */
const appendPageLinks = (list) => {

   // Calculates how many pages are needed for the list.
   const numOfPages = list.length / studentsForPage;
    
   // Creates a div, gives it a class and appends it to the .page div.

   let paginationDiv = document.createElement('div');
   paginationDiv.setAttribute('class', 'pagination');
   const pageDiv = document.querySelector('.page');
   pageDiv.appendChild(paginationDiv);
   const ul = document.createElement('ul');
   paginationDiv.appendChild(ul);

   // Iterates as many times as the number of pages and creates the correct number of li elements.
   for (let i = 1; i <= numOfPages; i++) {
      const li = document.createElement('li');
      ul.appendChild(li);

      const link = document.createElement('a');
      link.setAttribute('href', '#');
      link.innerHTML = i;

      li.appendChild(link);
   }
   // Adds the active class name to the first pagination link.
   document.getElementsByTagName('a')[0].className = 'active';

   const links = document.querySelectorAll('a');
   // Iterates through all the links and adds an eventListener.
   for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', (e) => {
         // Iterates through all the links and removes the active class name.
         for (let i = 0; i < links.length; i++) {
            links[i].className = '';

         }
         // Adds the active class to the link that was clicked.
         event.target.className = ('active');


         const page = event.target.textContent;


         showPage(list, page)


      })
   }

}

const appendSearchComponent = (list) => {

   const searchDiv = document.createElement('div')
   searchDiv.className = 'student-search'

   const input = document.createElement('input')
   input.placeholder = 'Search for students...';

   const button = document.createElement('button')
   button.textContent = 'Search';

   searchDiv.appendChild(input);
   searchDiv.appendChild(button)

   const pageHeader = document.querySelector('.page-header')
   pageHeader.appendChild(searchDiv);

   const performSearch = (list) => {
      const userInput = input.value
      const searchResults = [];
      for (let i = 0; i < list.length; i++) {

         const studentName = list[i].firstElementChild.firstElementChild.nextElementSibling.textContent
         if (userInput.length !== 0 && studentName.toLowerCase().includes(userInput.toLocaleLowerCase())) {
              searchResults.push(list[i]);      
         } else {
            
         }
      }
      console.log(searchResults);
      appendPageLinks(searchResults);
      showPage(searchResults, 1);
   }

   button.addEventListener('click', (e) => {
      performSearch(studentListItem);
   })

   input.addEventListener('keyup', (e) => {
      performSearch(studentListItem)
   })

   //const student = document.querySelectorAll('h3');

   // for (let i = 0; i < student.length; i++) {
   //const studentName = student[i].textContent
   //if(userInput.length !== 0 && studentName.toLowerCase().includes(userInput.toLocaleLowerCase())) {
   //console.log(studentName)
   //}

   //}



}





/* Calls the function and passes arguments which should be shown initially */
showPage(studentListItem, 1);

/* Calls the function */
appendPageLinks(studentListItem);

appendSearchComponent(studentListItem);







