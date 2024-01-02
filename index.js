let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    console.log(tabs);
  });
  console.log(tabs[0].url);
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < myLeads.length; i++) {
    // two methods availabe to add values to html
    //    listItems +="<li><a target='_blank' href='"+myLeads+"'>" + myLeads[i] + "</a></li>"
    listItems += `
            <li>
            <br>
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>   
                <span id="cross" data-index="${i}" style=" margin-left: 30px; cursor: pointer;" ><i class="fa-solid fa-trash"></i>
                </span>
            </li>
            `;

    //     const li=document.createElement("li")
    //     li.textContent=myLeads[i]
    //     ulEl.append(li)
  }
  ulEl.innerHTML = listItems;   
  // Add event listeners to the "remove" spans
  const crossSpans = document.querySelectorAll("#cross");
  crossSpans.forEach(span => {
    span.addEventListener("click", removeItem);
  });
}

function removeItem(event) {
  const index = event.target.dataset.index;
  myLeads.splice(index, 1);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
    const inputValue = inputEl.value.trim(); 
  
    if (inputValue){
      myLeads.push(inputValue);
      inputEl.value = "";
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      render();
    }
});
