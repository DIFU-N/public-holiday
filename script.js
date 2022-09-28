import { apiKey } from "./apiKey.js";
let ndate = new Date();
let current_date = ndate.getFullYear()+"-"+(ndate.getMonth()+1)+"-"+ ndate.getDate(); 
console.log(current_date);
let countrySelected = document.getElementById("country-names").textContent;
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
		.then(response => {
			todayIsAHoliday(response);
			console.log("response");
		})
		.catch(err => console.error(err));

		document.getElementById("country-names-kdj").innerHTML = countrySelected;

}
//json path starting with 0

function todayIsAHoliday (response) {
	for (let i = 0; i < response.length; i++) {
		if (response[i].date === current_date) {
			console.log(response[i].name);
		}	else {
			console.log("nope");
		}
	}
}


// var ndate = new Date();
// var current_date = ndate.getFullYear()+"-"+(ndate.getMonth()+1)+"-"+ ndate.getDate();
// document.getElementById("today").innerHTML = current_date;


function search() {
	console.log(document.querySelector(".country-names").value);
	return holiday(document.querySelector(".country-names").value);
}
search();

document.querySelector(".btn").addEventListener("click", function() {
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

