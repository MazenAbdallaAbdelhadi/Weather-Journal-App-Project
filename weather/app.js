
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=53977f69f5c55ade296d7663564c4d83&units=imperial";
const apiUrl = "http://localhost:7000/";

//Get the date
let d = new Date();
let newDate = d.getMonth() + '-' + d.getDate() + '-' + d.getFullYear();

//function return error
const catchError = (error) => console.error ('An error occurs -> ', error);

// function to get zip information
const ZipInfo = async  (zipCode) => {
    res = await (await fetch ("http://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + apiKey)).json();
    return res;
};

// Event listener to add generate data from api to existing HTML DOM element
document.getElementById('generate').addEventListener('click', () =>{
    let data = {
        zip: document.getElementById('zip').value,
        content: document.getElementById('feelings').value,
        date: newDate,
    };

    //post data to get Zip code information
    ZipInfo(data.zip).then(zipInfo => {
        if (zipInfo.cod !=200) {
            return alert(zipInfo.message)
        }

        //post data to server
        data.city = zipInfo.city.country;
        data.des = zipInfo.list[0].weather[0].description;
        data.temp = zipInfo.list[0].main.temp + " C";
        ( async (data) => {
            let res = await fetch(apiUrl+"postData", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            try {
                res.json().then((data) => {
                    if (res.ok) {
                        update();
                    }
                    else {
                        alert('ERROR!!!')
                    }
                }).catch(catchError);
            }catch (error) {
                catchError(error);
            }
        })(data);
    }).catch(catchError);
});

//Update document
const update = async () => {
    let response = await fetch(apiUrl+"All");
    try {
        response.json().then(data => {
            document.getElementById('date').innerText = "Data is: " + data.date;
            document.getElementById('city').innerText = "city name is: " + data.city;
            document.getElementById('temp').innerText = "Temp is: " + data.temp;
            document.getElementById('des').innerText = "description of weather is: " + data.des;
            document.getElementById('content').innerText = "feeling: " + data.content;
        }).catch(catchError);
    }catch (error) {
        catchError(error);
    }
};