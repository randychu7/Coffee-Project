
(function() {

"use strict"
// localStorage.clear();
const tbody = document.querySelector('#coffees');
const submitButton = document.querySelector('#submit');
const roastSelection = document.querySelector('#roast-selection');
const coffeeSearch = document.getElementById ("coffee-search");
const selectionAdd = document.querySelector('#add-roast');
const coffeeAdd = document.getElementById("new-coffee");
const submitNew = document.getElementById("submit-new-coffee");

//------------Array Data-------------//
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

//-----------Create the tables ------------------//
// function takes a coffee object and returns an HTML string that represents a row in the table.//
function renderCoffee(coffee) {
    
    var html = '<div class="coffee col-6 d-flex text-align">';   
    html += '<h1>'+coffee.name+ '</h1>';   //creates row for the name
    html += '<p>' + coffee.roast + '</p>';    //creates row for the roast
    html += '</div>';                            
    return html; //Pushes to the html
}

//---------Pushes the coffees into the table---------/
//function takes an array of coffee objects and returns an HTML string that represents the entire table.//

function renderCoffees(coffees) {  
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);    // Use the function above to  
    }
    return html;
}

//--------function that displays the selected groups of the drop down------//
//function is an event listener that filters the coffee data based on the selected roast and updates the table to display only the relevant data.//
function updateCoffees(e) {
    e.preventDefault();
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {          // if the roast is = to the selectedRoast display the selected in the table
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }else if(selectedRoast === 'all'){      // Else Put all the coffees in the table
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

//------- Function that finds Coffee----------//
//functions that finds the coffee based on the roast and the name of the coffee//

function allChosen(){
    let coffeeNew = [];
    let coffeeInput = coffeeSearch.value.toLowerCase();
    
    coffees.forEach(function(coffee){
        if(coffee.name.toLowerCase().includes(coffeeInput)){
            coffeeNew.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(coffeeNew);
}
//-----Functions that finds light coffees--//
function lightChosen(){
    let coffeeNew = [];
    let coffeeInput = coffeeSearch.value.toLowerCase();
    coffees.forEach(function(coffee){
        if(coffee.name.toLowerCase().includes(coffeeInput) && coffee.roast === 'light'){
            coffeeNew.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(coffeeNew);
}
//-----Functions that finds Medium--//
function mediumChosen(){
    let coffeeNew = [];
    let coffeeInput = coffeeSearch.value.toLowerCase();
    coffees.forEach(function(coffee){
        if(coffee.name.toLowerCase().includes(coffeeInput) && coffee.roast === 'medium'){
            coffeeNew.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(coffeeNew);
}
//-----Functions that finds Dark Coffee--//
function darkChosen(){
    let coffeeNew = [];
    let coffeeInput = coffeeSearch.value.toLowerCase();
    coffees.forEach(function(coffee){
        if(coffee.name.toLowerCase().includes(coffeeInput) && coffee.roast === 'dark'){
            coffeeNew.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(coffeeNew);
}

//-----Functions that finds all the coffees--//
function findCoffee(e){
    e.preventDefault();
    let selectedRoast = roastSelection.value;
    if(selectedRoast === 'all'){
        allChosen();
    }else if(selectedRoast === 'light'){
        lightChosen();
    }else if(selectedRoast === 'medium'){
        mediumChosen();
    }else if(selectedRoast === 'dark'){
        darkChosen();
    }
}

//Creates coffee and capitalizes the first letter//
function createCoffees(e){
    e.preventDefault();
    let coffeeInput = coffeeAdd.value;
    let selectedRoast = selectionAdd.value;
    let coffeeArray = coffeeInput.split(" ");
    let coffeeString = '';

    for(var i=0; i<coffeeArray.length; i++){
        coffeeString += coffeeArray[i][0].toUpperCase() + coffeeArray[i].slice(1) + " ";
    }
    coffees.push({
        id: coffees.length+1,
        name: coffeeString,
        roast: selectedRoast
    });

    tbody.innerHTML = renderCoffees(coffees);
    // console.log(coffees);
    localStorage.setItem('addcoffee', JSON.stringify(coffees));
}





//Puts the Coffees Object into the html document//
tbody.innerHTML = renderCoffees(coffees);
const getCoffeesFromStorage = JSON.parse(localStorage.getItem('addcoffee'));
if(getCoffeesFromStorage !== null) {
    coffees = getCoffeesFromStorage;
    tbody.innerHTML = renderCoffees(coffees);
}

//-----Roast Selection dropdown menu-----//
roastSelection.addEventListener('change', updateCoffees);

//---Coffee Search Name input Field-----//
coffeeSearch.addEventListener('keyup', findCoffee);

//---Submit button for choose coffee Section----//
submitButton.addEventListener('click', updateCoffees);

//--Coffee add submit button----------//
submitNew.addEventListener('click', createCoffees);
        



      
})();
