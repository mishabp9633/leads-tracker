

// let box=document.getElementById("box")

// box.addEventListener("click", function(){
//     console.log("I Want To Open The Box")
// })

let myLeads=[]
const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const ulEl=document.getElementById("ul-el")
const tabBtn=document.getElementById("tab-btn")
const deleteBtn=document.getElementById("delete-btn")
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads) 
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
        console.log(tabs);
    
    })
    //console.log(tabs[0].url) 
})


function render(leads){
    let listItems =""
    for(let i=0; i<myLeads.length;i++){

    // two methods availabe to add vales to html
//    listItems +="<li><a target='_blank' href='"+myLeads+"'>" + myLeads[i] + "</a></li>"
listItems +=`
            <li>
            <br>
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>    
            </li>
            `
   
//     const li=document.createElement("li")
//     li.textContent=myLeads[i]
//     ulEl.append(li)

}
    ulEl.innerHTML=listItems 
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
      
})

inputBtn.addEventListener("click", function (){
    myLeads.push(inputEl.value)
    inputEl.value=""

    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    render()
    console.log(localStorage.getItem("myLeads"))
} )






//localStorage

// localStorage.setItem("myLeads","www.com")
// console.log(localStorage.getItem("myLeads"))
// localStorage.clear()





// const recipient="james"
// const sender="mishab"
// const email=`
// Hey ${recipient}

// how is it

// going ${sender}`

// console.log(email)



