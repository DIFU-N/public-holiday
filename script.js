import { apiKey } from "./apiKey.js";
let ndate = new Date();
let current_date = ndate.getFullYear()+"-"+(ndate.getMonth()+1)+"-"+ ndate.getDate(); 
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
		.then(response => {
			todayIsAHoliday(response);
			console.log("response");
		})
		.catch(err => console.error(err));

		// document.getElementById("country-names-kdj").innerHTML = selectedValues;
		//including  all countries*****

}
//json path starting with 0

function todayIsAHoliday (response) {
	for (let i = 0; i < response.length; i++) {
		if (response[i].date === current_date) {
			console.log(response[i].name);
			document.getElementById("answer").innerHTML = "Yup... It's " + response[i].name;
			break;
		}	else {
			document.getElementById("answer").innerHTML = "No, Go To Work or School!!!";
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

document.querySelector(".btn").addEventListener("click", function(e) {
	e.preventDefault();
	//calls out the selected country in html file
	const selectedValues = [].filter
	.call(document.querySelector(".country-names").options, option => option.selected)
	.map(option => option.text);

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

