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
   // Iterates through the student list items 
   for (let i = 0; i < studentListItem.length; i++) {
      // Initially hides all the student list items
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

   
   const paginationDivToRemove = document.querySelector('.pagination')
   const pageDiv = document.querySelector('.page');

   // Checks if pagination div exists and removes it from its parent
   if (paginationDivToRemove != null) {
      pageDiv.removeChild(paginationDivToRemove)
   }
   // Creates a div, gives it a class and appends it to the .page div.
   let paginationDiv = document.createElement('div');
   paginationDiv.setAttribute('class', 'pagination');

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
   if (ul.children.length > 0) {
      document.getElementsByTagName('a')[0].className = 'active';

   }


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
 /* Creates search component and its functionality */
const appendSearchComponent = (list) => {
   
   // Creates and appends a search bar
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

   /* Filtes the list by name for those that include the search value  */
   const performSearch = (list) => {
      const userInput = input.value

      // Creates an empty array to hold the search results
      const searchResults = [];
      // Iterates through the list items 
      for (let i = 0; i < list.length; i++) {
         // Creates a variable to store the students name 
         const studentName = list[i].firstElementChild.firstElementChild.nextElementSibling.textContent
         // Cheks if the user input is not 0 and if the students name includes user input
         if (userInput.length !== 0 && studentName.toLowerCase().includes(userInput.toLocaleLowerCase())) {
            // Adds that list item to the search results array
            searchResults.push(list[i]);
         }

      }

      /* Calls functions to show a page, append paginationlinks and 
      handle no result returned giving the search results as an argument */
      maybeAddNoMachFoundParagraph(searchResults);
      appendPageLinks(searchResults);
      showPage(searchResults, 1);
   }
   // Adds an event listener to the button
   button.addEventListener('click', (e) => {
      performSearch(studentListItem);
   })
   // Adds an event listener to the input feild
   input.addEventListener('keyup', (e) => {
      performSearch(studentListItem)
   })
}

/* Handles no results returned */
const maybeAddNoMachFoundParagraph = (searchResults) => {
   let noMachesFoundParagraph = document.querySelector('.no-search-results-paragraph')
   //Checks if the noMatchesFoundParagraph doesn't exist and creates a p gives it a class and appends it to the .page div
   if (noMachesFoundParagraph == null) {
      noMachesFoundParagraph = document.createElement('p')
      noMachesFoundParagraph.className = 'no-search-results-paragraph'
      document.querySelector('.page').appendChild(noMachesFoundParagraph);
   }

   // Checks if the search result has any list items in it
   if (searchResults.length == 0) {
      // Sets the HTML content of the paragraph
      noMachesFoundParagraph.innerHTML = 'There are no matches found'
   } else if (searchResults.length > 0) {
       // Sets the HTML content of the paragraph
      noMachesFoundParagraph.innerHTML = '';
   }
}





/* Calls the function to show page and passes arguments which should be shown initially */
showPage(studentListItem, 1);
/* Calls the function to append paggination links passing the student list as an argument */
appendPageLinks(studentListItem);
/* Calls the function to append search component passing the student list as an argument */
appendSearchComponent(studentListItem);







