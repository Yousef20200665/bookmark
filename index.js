var BookName = document.getElementById("bookmarkName");
var BookUrl = document.getElementById("bookmarkURL");
var allBookMarks = [];
var errorMessage = document.getElementById("errorMessage");
var nameRegex = /^[A-Z][a-z]{3,10}$/;
var urlRegex = /^https:\/\//;
var btn = document.getElementById("submitBtn1")
if(localStorage.getItem("allBookMarks") != null){
  allBookMarks = JSON.parse(localStorage.getItem("allBookMarks"))
  displayProduct();
}
function AddBookMark() {
  var bookMark = {
    bookMarkName: BookName.value,
    bookMarkUrl: BookUrl.value
  };
  
  if (bookMark.bookMarkName.trim() === "" || bookMark.bookMarkUrl.trim() === "") {
    document.querySelector(".overlay").classList.replace("d-none", "d-block");
    document.getElementById("errorMessage").classList.replace("d-none", "d-block");
  } else if (!nameRegex.test(bookMark.bookMarkName)) {
    alert("Please make sure that the bookmark name starts with a capital letter and contains at least 4 small letters without any special characters.");
  } else if (!urlRegex.test(bookMark.bookMarkUrl)) {
    alert("Please make sure that the website URL starts with 'https://'")
  } else {
    allBookMarks.push(bookMark);
    localStorage.setItem("allBookMarks", JSON.stringify(allBookMarks));
    displayProduct();
  }
}
function displayProduct(){
    var box='';
    for(var i=0;i<allBookMarks.length;i++)
    {
      box+=`<tr>
      <td>${i+1}</td>
      <td>${allBookMarks[i].bookMarkName}</td>
      <td>
      <button" class="btn btn-outline-info" onclick="visit('${allBookMarks[i].bookMarkUrl}')">
      <i class="fa-solid fa-eye pe-2"></i>
      visit</button>
      </td>
      <td>
      <button onclick="deleteItem(${i})" class="btn btn-danger">
      <i class="fa-solid fa-trash-can"></i>
      Delete Item</button>
      </td>
         </tr>
      `
    }
    document.getElementById('tableContent').innerHTML=box;
    localStorage.setItem("allBookMarks", JSON.stringify(allBookMarks));
    
  }
  function checkBookmarkName() {
    if (nameRegex.test(BookName.value)) {
      BookName.classList.add("suc");
      BookName.classList.remove("fail");
    } else {
      BookName.classList.add("fail");
      BookName.classList.remove("suc");
    }
  }
  function checkBookUrl() {
    console.log(BookUrl.value);
    if (urlRegex.test(BookUrl.value)) {
      BookUrl.classList.add("suc");
      BookUrl.classList.remove("fail");
    } else {
      BookUrl.classList.add("fail");
      BookUrl.classList.remove("suc");
    }
  }
btn.addEventListener("click",function(){
  allBookMarks.splice(0,allBookMarks.length);
  displayProduct();
})
  
  function deleteItem(index){
    allBookMarks.splice(index,1);
    displayProduct();
  }
  function visit(url){
    window.open(url, '_blank');
  }
  function closeMassage(){
    errorMessage.classList.replace("d-block","d-none");
    document.querySelector('.overlay').classList.replace("d-block", "d-none");
}