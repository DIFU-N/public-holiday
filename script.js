import { apiKey } from "./apiKey.js";
let ndate = new Date();
let current_date = '2022-10-01'
ndate.getFullYear()+"-"+(ndate.getMonth()+1)+"-"+ ndate.getDate(); 
console.log(current_date);
document.getElementById("today").innerHTML = current_date;


let selectedValues;


const cNamesForArray = document.querySelector(".country-names").children;
const cNames = document.querySelector(".country-names"); // this works for getting all the text values from the html class
const sArray = Array.from(cNamesForArray);

async function holiday(i, country, thisName, htmlSelect) {
	try {
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': apiKey,
				'X-RapidAPI-Host': 'public-holiday.p.rapidapi.com'
			}
		};
		
		const response = await fetch('https://public-holiday.p.rapidapi.com/2022/'+country, options);
		await response.json();
		todayIsAHoliday(response);

		document.getElementById("country-names-kdj").innerHTML = selectedValues;
		inApi.push(thisName);
		//including all countries*****
			
	} catch (error) {
		notInApi.push(htmlSelect);
	}	
	deleteThem(notInApiArray, sArrayOuterHtml);
	console.log(notInApiArray.length);
}
//json path starting with 0

function todayIsAHoliday (response) {
	for (let i = 0; i < response.length; i++) {
		if (response[i].date === current_date) {
			console.log(response[i].name);
			document.getElementById("answer").textContent = "Yup... It's " + response[i].name;
			break;
		}	else {
			document.getElementById("answer").textContent = "No, Go To Work or School!!!";
			console.log("nope");
		}
	}
}

function search() {
	console.log(document.querySelector(".country-names").value);
	 selectedValues = [].filter
	.call(document.querySelector(".country-names").options, option => option.selected)
	.map(option => option.text);
	// return	testForCountries();
	return holiday(document.querySelector(".country-names").value);
}
search();	

document.querySelector(".btn").addEventListener("click", function(e) {
	e.preventDefault();
	//calls out the selected country in html file
	

	document.getElementById("country-names-kdj").innerHTML = selectedValues;
    search();
})
//to use enter key to search
let ent = document.getElementById("country-names");
ent.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById('btn').click();
    }
});














// deleting the countries that don't have responses in the API from the HTML select element

// const notInApi = [],
// 	inApi = [];
// const notInApiArray = notInApi;
// console.log(notInApiArray);
// let sArrayOuterHtml = [];
// for (let i = 0; i < sArray.length; i++) {
// 	sArrayOuterHtml.push(sArray[i].outerHTML);
// }
// console.log(sArray);

// // looping the select options to see which one returns an error 
// function testForCountries() {
// 	// console.log(cNames[1].value); // this helps to get the individual countries from the class, using an array didn't work.
// 	document.getElementById("answer").textContent = sArray.length + " countries in total";

// 	for (let i = 0; i < sArray.length; i++) {
// 		let cHTML = sArray[i].outerHTML;	
// 		let cNamesValue = cNames[i].value;
// 		let cNamesText = cNames[i].textContent;
// 		holiday(i, cNamesValue, cNamesText, cHTML);
// 	}	
// }

// function deleteThem(deleteThese, fromThese) {
// 	//check if the cNamesText is in the Notinapi array
// 	// finds all the elements of arr2 that are not in arr1
// 	let errorElement = document.querySelector("#error");
// 	let deleteObjects = deleteThese.filter(val => fromThese.find( fromTheseObj => fromTheseObj.prop1 === val))
// 	if(deleteObjects){
// 			errorElement.innerHTML = `
// 			${deleteThese} 
// 		`
// 	}
// }

// document.querySelector("#delCountry").addEventListener("click", function(e) {
// 	e.preventDefault();
// })
