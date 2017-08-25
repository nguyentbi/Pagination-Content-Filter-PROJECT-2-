
const pageDiv = document.getElementsByClassName("page")[0];
const pageHeaderDiv = document.getElementsByClassName("page-header")[0];
const studentListLi = document.getElementsByClassName("student-item");
const studentListUl = document.getElementsByClassName("student-list");
const paginationDiv = document.createElement("div");
const paginationUl = document.createElement("ul");
const studentSearchDiv = document.createElement("div");
const searchBar = document.createElement("input");
const searchButton = document.createElement("button");


paginationUl.className = "pagination";
pageDiv.append(paginationDiv);
paginationDiv.append(paginationUl);
studentSearchDiv.className = "student-search";
searchBar.type = "text";
searchBar.placeholder = "search for students...";
searchButton.textContent = "Search";
pageHeaderDiv.append(studentSearchDiv);
studentSearchDiv.append(searchBar);
studentSearchDiv.append(searchButton);

function showPage(pageNumber, studentList) {
  for (i = 0; i < studentList.length; i += 1) {
    studentList[i].style.display = "none";
  };
  for (i = 0; i < studentList.length; i += 1) {
      if ((i > pageNumber * 10 - 10) && (i < pageNumber * 10)) {
        studentList[i].style.display = "block";
      } else if (pageNumber == 1 && i == 0) {
        studentList[i].style.display = "block";
      };
  };
}



function appendPagesLink(studentList) {
  const numberOfPages = Math.ceil(studentListLi.length / 10);
  for (i = 1; i <= numberOfPages; i += 1) {
    const paginationLi = document.createElement("li");
    const paginationA = document.createElement("a");
    paginationA.textContent = i;
    paginationA.href = "#";
    if (paginationA.textContent == 1) {
      paginationA.className = "active";
    };
    paginationUl.append(paginationLi);
    paginationLi.append(paginationA);
  };

  paginationUl.addEventListener("click", (e) => {
    const li = paginationUl.children;
    for (i = 0; i < li.length; i += 1) {
      const link = li[i].children[0];
      link.classList.remove("active");
    };
    showPage(e.target.textContent, studentListLi);
    e.target.className = "active";
  });
  showPage(1, studentListLi);
}

appendPagesLink(studentListLi);

function searchList() {



  searchButton.addEventListener("click", () => {
    const searchValue = searchBar.value;
    const matchList = [];
    for (i = 0; i < studentListLi.length; i += 1) {
      const name = studentListLi[i].querySelector(".student-details").querySelector("h3").textContent;
      const email = studentListLi[i].querySelector(".student-details").querySelector("span").textContent;
      if (searchValue == name || searchValue == email) {
        matchList.append(studentListLi[i]);
      };
    };
    if (matchList.length == 0) {};
    showPage(1, matchList);
  });
}

searchList();
