onload =function() {
    const ERROR_MESSAGES = {
        requiredFirstName : 'Firstname is required',
        requiredLastName : 'Lastname is required',
        requiredEmail : 'email is required',
        requiredCity : 'city is required',
        requiredJoinDate : 'joindate is required',
        futureJoinDate :"Please select the past",
        requiredPostalCode : 'postalcode is required',
        requiredAvailability : 'Please select availability day',
    }


    //First Step
    const fname = document.querySelector('#fname-input');
    const lname = document.querySelector('#lname-input');
    const email = document.querySelector('#email-input');
    const date = document.querySelector('#date-input');
    const city = document.querySelector('#city-input');
    const avalibalitiy = document.querySelector("#my-select");
    const address = document.querySelector('#address-input');
    const submit = document.querySelector('#btn-submit');
    const show = document.querySelector('#btn-show');
    const divTable = document.querySelector('#table');
    const table = document.createElement('table');
    const emailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const btn = document.querySelector('#btn-submit');
    const btn2 = document.querySelector('#btn-submit2');

    let employees = []
    let avalibalities = [];

    avalibalitiy.addEventListener("change", ()=>{
        avalibalities.push(avalibalitiy.value);
    })

    //１・Employeeの設定
    function addEmployee () {
        // e.preventDefault();
       let newEmployee = {
           id : `${new Date().getTime()}${randomNumber()}`,
           fname:fname.value,
           lname:lname.value,
           email:email.value,
           date:date.value.replaceAll('-', '/'),
           city:city.value,
           postalcode:address.value,
           avalibalitiy:avalibalities
       }
       //add this object to array
       employees.push(newEmployee);
    //    document.querySelector('form').reset();
       avalibalities = [];
    }

    function showEmployees () {
        divTable.innerHTML = '';
        if (employees.length > 0) {
            displayHeaderTable();
            displayBodyTable();
        }
        else {
            const p = document.createElement('p');
            p.classList.add("text-danger");
            p.textContent = "No  employees to show";
            divTable.appendChild(p);
        }
    }

    function displayHeaderTable() {
        const headers = ["ID","First Name","Last Name","Email","Joined date", "City", "Postal Code", "Availabilities"];
        //display header
        const thead = document.createElement("thead");
        const row = thead.insertRow();
        headers.forEach((header) => {
            row.insertCell().textContent = header;
        })
        table.appendChild(thead);
        divTable.appendChild(table);
    }

    function displayBodyTable() {
        const tbody = document.createElement("tbody");
        employees.forEach((employee) => {
            const row = table.insertRow();
            row.insertCell().textContent = employee.id;
            row.insertCell().textContent = employee.fname;
            row.insertCell().textContent = employee.lname;
            row.insertCell().textContent = employee.email;
            row.insertCell().textContent = employee.date;
            row.insertCell().textContent = employee.city;
            row.insertCell().textContent = employee.postalcode;
            row.insertCell().textContent = employee.avalibalitiy.join("-");
            row.insertCell.innerHTML = '<button class ="btn btn-success">-</button>';

       })
       divTable.appendChild(table);
    }

    function randomNumber() {
        let randNum = Math.round((Math.random() * (21)));
        return randNum;
    }
    //２・showボタンの設置
    submit.addEventListener('click' , e =>  {
        e.preventDefault();
        validateForm();

        // addEmployee();
        // if (checkClasses()) {
        //     location.href = 'main.html';
        // }
    });
    show.addEventListener('click', () => {
        table.innerHTML = '';
        showEmployees();
    })


    const validateForm = () => {
        //username
        if (fname.value === '') {
            setErrorForm(fname, ERROR_MESSAGES.requiredFirstName);

        } else {
            setSuccessFrom(fname);
        }

        if (lname.value === '') {
            setErrorForm(lname, ERROR_MESSAGES.requiredLastName);
        } else {
            setSuccessFrom(lname);
        }

        //email
        if (email.value === '') {
            //email is empty
            setErrorForm(email, ERROR_MESSAGES.requiredEmail);
        } else if (!emailformat.test(email.value)) {
            //email is  not valid
            setErrorForm(email, ERROR_MESSAGES.validEmail);
        } else {
            //everything goes well
            setSuccessFrom(email);
        }
        //city
        if (city.value === '') {
            setErrorForm(city, ERROR_MESSAGES.requiredCity);
        } else {
            setSuccessFrom(city);
        }

        //address
        if (address.value === '') {
            setErrorForm(address, ERROR_MESSAGES.requiredPostalCode);
        } else {
            setSuccessFrom(address);
        }

        //date
        var day = Date.now();
        if (date.value === '') {
            setErrorForm(date, ERROR_MESSAGES.requiredJoinDate);
        } else if(date.valueAsNumber > day) {
            setErrorForm(date, ERROR_MESSAGES.futureJoinDate);
        }else{
            setSuccessFrom(date);
        }

        if (avalibalitiy.value === '') {
            setErrorForm(avalibalitiy, ERROR_MESSAGES.requiredAvailability);
        } else {
            setSuccessFrom(avalibalitiy);
            addEmployee();
        }
    }

    const setErrorForm = (input, message) => {
        const formControl = input.parentElement;
        formControl.classList.remove('success');
        formControl.classList.add('error');
        const small = formControl.querySelector('small');
        small.textContent = message;
    }

    const setSuccessFrom = (input) => {
        const formControl = input.parentElement;
        formControl.classList.remove('error');
        formControl.classList.add('success');
        addEmployee2;

        var addEmployee2 = function() {
            addEmployee();
            var counter = 0;
            return function() {
                console.log( "count :" + counter );
                return counter+=1;
            };
        };

    }


    // const checkClasses = () => {
    //     const formControls = document.querySelectorAll('.form-control')
    //     for (const f of formControls) {
    //         if (f.classList.contains('error')) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }

}
