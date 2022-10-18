import { apiKey } from "./apiKey.js";
let ndate = new Date();
let current_date = '2022-10-01'
let selectedValues;
// ndate.getFullYear()+"-"+(ndate.getMonth()+1)+"-"+ ndate.getDate(); 
console.log(current_date);
document.getElementById("today").innerHTML = current_date;

async function holiday(country) {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': apiKey,
			'X-RapidAPI-Host': 'public-holiday.p.rapidapi.com'
		}
	};
	
	fetch('https://public-holiday.p.rapidapi.com/2022/'+country, options)
	.then(response => response.json())
	.then(response => checkIfThingIsThere(response))
	.catch(err => document.getElementById("error").innerHTML = err);

	document.getElementById("country-names-kdj").innerHTML = selectedValues;
	//including  all countries*****

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


// var ndate = new Date();
// var current_date = ndate.getFullYear()+"-"+(ndate.getMonth()+1)+"-"+ ndate.getDate();
// document.getElementById("today").innerHTML = current_date;

function search() {
	console.log(document.querySelector(".country-names").value);
	 selectedValues = [].filter
	.call(document.querySelector(".country-names").options, option => option.selected)
	.map(option => option.text);
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
})

// looping the select options to see which one returns an error 
function checkIfThingIsThere (response) {
	const cNames = document.querySelector(".country-names").innerText; // this works for getting all the text values from the html class
	const mlok = cNames.innerText;
	const sArray = Array.from(cNames);
	console.log(cNames);
	document.getElementById("answer").textContent = sArray.length + " countries in total";

// 	for (let i = 0; i < sArray.length; i++) {
// 		// console.log(sArray[i].value+ " = "+ sArray[i].textContent);
// 		if (holiday(sArray[i].value) == null) {
// 			// console.log('mlki');
// 			if(Object.keys(response.data).length){
// 				document.getElementById("error").textContent = sArray[i].outerText;
// 				i++;
// 				return
// 			}
// 		}
// 		return null;
// 	}
} 

// function checkIfThingIsThere(response) {
// 	let s = document.querySelector(".country-names").children;
// 	let sArray = Array.from(s);
// 	for (let i = 0; i < sArray.length; i++) {
// 		// console.log(sArray.length);
// 		// checkEveryCountry = () => {
// 			if (holiday(sArray[i].value) === null) {
// 				console.log('mlki');
// 				if(Object.keys(response.data).length){
// 					document.getElementById("answer").textContent = sArray[i].outerHTML;
// 					i++;
// 					return
// 				}
// 				// i++;
// 				// return checkEveryCountry();
// 			}	
// 		// }
// 		return null;
// 	}

	// function isEmpty(obj) {
	// 	for(var prop in obj) {
	// 		if(obj.hasOwnProperty(prop))
	// 			return false;
	// 	}
	// 	return true;
	// }
	// console.log(s[1].value);
// }


// checkIfThingIsThere();