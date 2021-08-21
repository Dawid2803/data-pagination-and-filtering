/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const itemsPerPage = 9;
const header = document.querySelector('header');


function showPage(list, page){
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage; 
   const studentList = document.querySelector(".student-list");
   studentList.innerHTML = '';
   for(let i = 0; i < list.length; i++){
      if(i >= startIndex && i < endIndex){
         studentList.insertAdjacentHTML("beforeend", `
         <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src=${data[i].picture.large} alt="Profile Picture">
            <h3>${data[i].name.first} ${data[i].name.last}</h3>
            <span class="email">${data[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${data[i].registered.date}</span>
          </div>
        </li>
         `);
      }
   }
   return studentList;
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){
   const buttonsNeeded = Math.ceil(list.length / itemsPerPage);
   const linkList = document.querySelector(".link-list");
   linkList.innerHTML ='';
   for(let i = 1; i <= buttonsNeeded ; i++){
      const button = `<li>
         <button type="button">${i}</button>
      </li>`;
      linkList.insertAdjacentHTML("beforeend", button);
      document.querySelector("button").className = "active";
   }

   linkList.addEventListener("click", (e) =>{
      if(e.target.tagName === "BUTTON"){
         let paginationButton = e.target;
         const prevActiveButton = linkList.querySelector('.active');
         prevActiveButton.className ='';
         paginationButton.className ="active";
         showPage(list,paginationButton.textContent);
         }
      }
   )
}

// creating a search bar
const searchBar = document.createElement("label");
searchBar.innerHTML ='';
searchBar.insertAdjacentHTML('beforeend', `
<label for="search" class="student-search">
<span>Search by name</span>
<input id="search" placeholder="Search by name...">
<button id ="search-button" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`
);
header.appendChild(searchBar);

header.addEventListener("keyup", (e) => {
   e.preventDefault();
   if (e.target.id === 'search')
      {
      performSearch(data);
      }
   }  
);

header.addEventListener("click", (e) => 
   {
   e.preventDefault();
   if(e.target.id ==="search-button")
      {
      performSearch(data);
      }
   }
);


function performSearch(list){
   const search = document.querySelector('#search');
   const searchInput = search.value.toLowerCase();
   const filiteredStudents = [];
   let searchName = '';
   for(let i = 0 ; i < list.length; i++);
   {
      searchName = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`;
      if(searchInput.length !== 0 && searchName.includes(searchInput)){
         filiteredStudents.push(list[i]);
      }
      //return default page if input is empty.
      else if(searchInput.length === 0){
         showPage(data, 1);
         addPagination(data);
         return;
      }
   }
   return filiteredStudents;
}  
   
   
   

// Call functions
showPage(data, 1);
addPagination(data);