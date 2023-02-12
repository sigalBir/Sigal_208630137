
var d=new Date();
var currentPage = window.location.pathname;


let users = [];
let translators = [];

if (localStorage.getItem('USERS')) {
    users = JSON.parse(localStorage.getItem('USERS'));
}
else {
    users = [
        { username: "sigal", password: "Sigal123", email: "sigi402@gmail.com", joinDate: "10.11.21", PhoneNumber: "0506716569" },
        { username: "2", password: "hb783h", email: "hodaya67@gmail.com", joinDate: "01.1.22", PhoneNumber: "0548769345" },
        { username: "3", password: "edenYO23", email: "ededed@walla.com", joinDate: "12.04.22", PhoneNumber: "0538761209" },
        { username: "4", password: "shanJul25", email: "jacobi88329@hotmail.com", joinDate: "23.03.21", PhoneNumber: "0585841648" }
    ];
    localStorage.setItem('USERS', JSON.stringify(users));
}

if (localStorage.getItem("TRANSLATORS")) {
    translators = JSON.parse(localStorage.getItem('TRANSLATORS'));
}
else {
    translators = [
        { username: "1", firstName: "סיגל", lastName: "בירהנו", password: "Sigal123", email: "sigi402@gmail.com", joinDate: "10.11.21", PhoneNumber: "0506716569", erea: "מרכז", gender: "נקבה", rank: "5", languages: ["עברית", "אנגלית", "אמהרית"], services: ["תרגום מילולי, תרגום מסמכים"] },
        { username: "5", firstName: "עמית", lastName: "חיים", password: "amithai8", email: "haAmit@walla.com", joinDate: "03.07.21", PhoneNumber: "0537486297", erea: "דרום", gender: "זכר", rank: "3.5", languages: ["מרוקאית", "עברית"], services: ["תרגום מילולי"] },
        { username: "4", firstName: "משה", lastName: "שלום", password: "moshe44", email: "shalomMoshe@walla.com", joinDate: "14.02.22", PhoneNumber: "0524565370", erea: "מרכז, שפלה", gender: "זכר", rank: "4.8", languages: ["אנגלית, צרפתית"], services: ["תרגום מילולי, תרגום מסמכים"] },
        { username: "6", firstName: "ישראל", lastName: "ישראלי", password: "israL97", email: "itsIsraeli@gmail.com", joinDate: "06.11.21", PhoneNumber: "0584981648", erea: "דרום", gender: "זכר", rank: "4", languages: ["אנגלית", "עברית"], services: ["תרגום בליווי"] },
        { username: "7", firstName: "ירין", lastName: "שמעוני", password: "SHImon63@", email: "shimoniya@hotmail.com", joinDate: "23.03.21", PhoneNumber: "0585841758", erea: "צפון", gender: "זכר", rank: "5", languages: ["רוסית", "עברית"], services: ["תרגום מסמכים, תרגום בליווי"] }
    ];
    localStorage.setItem("TRANSLATORS", JSON.stringify(translators));
}

//dynamic navbar
let dynamicNav;
if (localStorage.getItem('LOGGEDIN_USER')) {
    const user = JSON.parse(localStorage.getItem("LOGGEDIN_USER"));
    if (translators.find(t => t.username === user.username)) {
        dynamicNav = `
            <nav>
                <ul>
                    <li><a href="index.html">עמוד בית</a></li>
                    <li><a href="aboutUs.html">אודותינו</a></li>
                    <li><a href="contactUs.html">צור קשר</a></li>
                    <li class="last-nav">
                        <span>היי ${user.username}</span> | <button class="logout" onclick="logout()">התנתק</button>
                    </li>
                </ul>
            </nav>
        `;
    }
    else {
        dynamicNav = `
            <nav>
                <ul>
                    <li><a href="index.html">עמוד בית</a></li>
                    <li><a href="aboutUs.html">אודותינו</a></li>
                    <li><a href="translators.html">מתורגמנים</a></li>
                    <Li><a href="request.html">יצירת בקשת תרגום</a></Li>
                    <li><a href="contactUs.html">צור קשר</a></li>
                    <li class="last-nav">
                        <span>היי ${user.username}</span> | <button class="logout" onclick="logout()">התנתק</button> 
                    </li>
                </ul>
            </nav>
        `;
    }
}
else {
    dynamicNav = `
            <nav>
                <ul>
                    <li><a href="index.html">עמוד בית</a></li>
                    <li><a href="aboutUs.html">אודותינו</a></li>
                    <li><a href="translators.html">מתורגמנים</a></li>
                    <li><a href="contactUs.html">צור קשר</a></li>
                    <li class="last-nav">
                        <a href="loginPage.html">
                            <button class="logIn">התחברות למערכת</button> 
                        </a> 
                    </li>
                </ul>
            </nav>
        `;
}
document.body.innerHTML = dynamicNav + document.body.innerHTML;

//change background of current page
const activePage= document.querySelectorAll('nav a').forEach(
    link => {
        if (
            link.href === `${currentPage}` ||
            link.href.replace("http://localhost:3000", "") === `${currentPage}`
        ) {
            link.classList.add("active");
        }
    }
);

function signUp(event) {
    event.preventDefault();

    //sign up forms validation (regular and translator)
    const username = document.querySelector('.regSignForm #username');
    const password = document.querySelector('.regSignForm #password');
    const msg = document.querySelector('.regSignForm .msg');
    const email = document.querySelector('.regSignForm #email');
    const phoneNum = document.querySelector('.regSignForm #phoneNumber');
    const firstName = document.querySelector('.regSignForm #firstname');
    const lastName = document.querySelector('.regSignForm #lastname');
    const erea = document.querySelector('.regSignForm #erea');
    const gender = document.querySelector('.regSignForm #gender');
    let lang = document.querySelector('.regSignForm #multiple-select');
    
    if(firstName!= null && (firstName.value.length < 2 || lastName.value.length <2)){
        msg.innerHTML = 'אנא מלא שם פרטי ושם משפחה'
        msg.classList.add('error')
        time(msg);
    }
    else if (username.value == null || username.value.length <5 ){
        msg.innerHTML = 'שם משתמש לא יכול להכיל פחות מ-5 תווים'
        msg.classList.add('error')
        time(msg);
    }
    else if (password.value == null || password.value.length <8 ){
        msg.innerHTML = 'סיסמה לא יכולה להכיל פחות מ-8 תווים'
        msg.classList.add('error')
        time(msg);
    }
    else if (phoneNum.value.length != 10 || !onlyDigits(phoneNum.value)) {
        msg.innerHTML =
            "(אנא הכנס מספר טלפון תקין (מספר באורך 10 ספרות, ללא תווים אחרים";
        msg.classList.add("error");
        time(msg);
    } else if (lang != null && !checkSelected()) {
        msg.innerHTML = "יש לבחור לפחות 2 שפות תרגום";
        msg.classList.add("error");
        time(msg);
    } else {
        let user = {
            username: username.value,
            password: password.value,
            email: email.value,
            joinDate: new Date(),
            PhoneNumber: phoneNum.value,
        };
        if (document.getElementById("tranSignUp")) {
            const selected = document.querySelectorAll(
                ".regSignForm #multiple-select option:checked"
            );
            const langs = Array.from(selected).map((el) => el.value).join(',');

            // אנחנו בדף של המתורגמן
            user = {
                ...user,
                firstName: firstName.value,
                lastName: lastName.value,
                erea: erea.value,
                gender: gender.value,
                language: langs,
            };
        }

        fetch(`http://localhost:3000/createUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((response) => {
                window.location = "loginPage.html";
            });
    }
}

function checkSelected(){
    let valid =true
    let selected= []
    for( let option of document.querySelector('.regSignForm #multiple-select')){
        if(option.selected){
            selected.push(option.value)
        }
    }
    lang = selected
    if (lang.length <2){
        valid = false
    }
    return valid
}


function onlyDigits(str) {
    for (let i = 0; i < str.length; i++) {
        const digit = str.charCodeAt(i);
        if (digit < 48 || digit > 57) {
            return false;
        }
  }
    return true;
}

const mainCardsElem = document.querySelector(".mainCards");
if (mainCardsElem) {
    for (let i = 0; i < translators.length; i++) {
        const translatorCardTemplate = `
            <div class="cardCont">
                <div class="card">
                    <div class="front">
                        <div class="image">
                            <img src="graphics/user.png" width="30%" height="40%">
                        </div>
                        <div class="title">
                            <h1 class="transName1">${translators[i].firstName} ${translators[i].lastName}</h1>
                        </div>
                        <div class="des">
                            <p class="tranGender1">מין המתורגמן: ${translators[i].gender}</p>
                            <p class="transErea1">אזור: ${translators[i].erea}</p>
                            <p class="transLang1">שפות: ${translators[i].languages}</p>
                            <button class="flip-btn">לפרטים נוספים</button>
                        </div>
                    </div>
                    <div class="back">
                        <div class="contacDetails">
                            <h1>פרטי התקשרות:</h1>
                            <p>נייד: ${translators[i].PhoneNumber}</p>
                            <p>מייל: ${translators[i].email}</p>
                            <p>סוג שירות: ${translators[i].services}</p>
                            <button class="flip-btn">חזור</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        mainCardsElem.innerHTML += translatorCardTemplate;
    }

    // pages functions
    //flip card function for translators page
    const cards = document.querySelectorAll(".cardCont .card");

    cards.forEach((card) => {
        card.querySelectorAll(".flip-btn").forEach(button => {
            button.addEventListener("click", function () {
                if (card.classList.contains("flipCard")) {
                    card.classList.remove("flipCard");
                } else {
                    card.classList.add("flipCard");
                }
            });
        });
    });
}

function login(event) {
    event.preventDefault();
    const logUser = document.querySelector('.loginForm #logUser');
    const logPass = document.querySelector('.loginForm #logPass');
    
    fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: logUser.value,
            password: logPass.value
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.data?.length === 1) {
                localStorage.setItem('LOGGEDIN_USER', JSON.stringify(response.data[0]));
                alert('התחברת בהצלחה למערכת, מייד נעביר אותך לדף הבית');
                window.location = "index.html";
            }
            else {
                alert('לא נמצא משתמש עבור הפרטים שהוזנו');
            }
        });

}

function time(massage){
       setTimeout(() =>{
            massage.innerHTML= ''
            massage.classList.remove('error')
        }, 5000)
}

function logout() {
    localStorage.removeItem("LOGGEDIN_USER");
    window.location = "loginPage.html";
}