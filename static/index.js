
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
                    <li><a href="../views/index.html">עמוד בית</a></li>
                    <li><a href="../views/aboutUs.html">אודותינו</a></li>
                    <li><a href="../views/contactUs.html">צור קשר</a></li>
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
                    <li><a href="../views/index.html">עמוד בית</a></li>
                    <li><a href="../views/aboutUs.html">אודותינו</a></li>
                    <li><a href="../views/translators.html">מתורגמנים</a></li>
                    <Li><a href="../views/request.html">יצירת בקשת תרגום</a></Li>
                    <li><a href="../views/contactUs.html">צור קשר</a></li>
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
                    <li><a href="../views/index.html">עמוד בית</a></li>
                    <li><a href="../views/aboutUs.html">אודותינו</a></li>
                    <li><a href="../views/translators.html">מתורגמנים</a></li>
                    <li><a href="../views/contactUs.html">צור קשר</a></li>
                    <li class="last-nav">
                        <a href="../views/logIn.html">
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
    link =>{
        if(link.href.includes(`${currentPage}`)){
            link.classList.add('active');
        }
    }
);

//sign up forms validation (regular and translator)
const form1 = document.querySelector('.regSignForm');
const username = document.querySelector('.regSignForm #username');
const password = document.querySelector('.regSignForm #password');
const msg = document.querySelector('.regSignForm .msg');
const email =document.querySelector('.regSignForm #email')
const phoneNum = document.querySelector('.regSignForm #phoneNumber')
const firstName = document.querySelector('.regSignForm #firstname')
const lastName = document.querySelector('.regSignForm #lastname')
const erea = document.querySelector('.regSignForm #erea');
const gender = document.querySelector('.regSignForm #gender');
let lang = document.querySelector('.regSignForm #multiple-select')

const onSubmit = (e) =>{
    e.preventDefault();
    if(firstName!= null && (firstName.value.length < 2 || lastName.value.length <2)){
        msg.innerHTML = 'אנא מלא שם פרטי ושם משפחה'
        msg.classList.add('error')
    }
    else if(checkIfExist(username)){
        msg.innerHTML = 'שם המשתמש שבחרת כבר קיים, אנא בחר שוב'
        msg.classList.add('error')
        time(msg)
    }
    else if (phoneNum.value.length != 10 || !onlyDigits()) {
        msg.innerHTML = 'אנא הכנס מספר טלפון תקין (מספר באורך 10 ספרות, ללא תווים אחרים'
        msg.classList.add('error')
        time(msg)
    }
    else if(lang.length!= null && !checkSelected()){
        msg.innerHTML = 'יש לבחור לפחות 2 שפות תרגום'
        msg.classList.add('error')
        time(msg)

    }
    else{
        alert('חשבונך נוצר בהצלחה!');
        let user = {
            username: username.value,
            password: password.value,
            email: email.value,
            joinDate: new Date(),
            PhoneNumber: phoneNum.value,
        };
        users.push(user);

        localStorage.setItem("USERS", JSON.stringify(users));
        
        if (document.getElementById("tranSignUp")) {
            // אנחנו בדף של המתורגמן
            translators.push({
                ...user,
                firstName: firstName.value,
                lastName: lastName.value,
                erea: erea.value,
                gender: gender.value,
                language: lang

            });
            localStorage.setItem("TRANSLATORS", JSON.stringify(translators));
        }
     window.location = "logIn.html";
    }
}

if (form1) {
    form1.addEventListener("submit", onSubmit);
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


function onlyDigits() {
  for (let i = phoneNum.value.length - 1; i >= 0; i--) {
    const digit = phoneNum.value.charCodeAt(i);
    if (digit < 48 || digit > 57) {
        return false
    }
  }
  return true
}

const mainCardsElem = document.querySelector(".mainCards");
if (mainCardsElem) {
    for (let i = 0; i < translators.length; i++) {
        const translatorCardTemplate = `
            <div class="cardCont">
                <div class="card">
                    <div class="front">
                        <div class="image">
                            <img src="../static/pics/user.png" width="30%" height="40%">
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


// logIn form validation
const form2 = document.querySelector('.loginForm')
const logUser = document.querySelector('.loginForm #logUser')
const logPass = document.querySelector('.loginForm #logPass')
const logMsg = document.querySelector('.loginForm .logMsg')

const onSub = (e) => {
    e.preventDefault();
    if(!checkIfExist(logUser.value)){
        logMsg.innerHTML = 'שם המשתמש אינו קיים במערכת'
        logMsg.classList.add('error')
        time(logMsg)
    }
    else if(!CompareUserAndPass()){
        logMsg.innerHTML = 'הפרטים שהוזנו אינם תואמים'
        logMsg.classList.add('error')
        time(logMsg)
        logUser.value =''
        logPass.value=''
    }
    else {
        localStorage.setItem('LOGGEDIN_USER', JSON.stringify(users.find(u => u.username === logUser.value)));
        alert('התחברת בהצלחה למערכת, מייד נעביר אותך לדף הבית');
        window.location = 'index.html';
    }

}

if (form2) {
    form2.addEventListener("submit", onSub);
}

function checkIfExist(username) {
    return users.find((u) => u.username === username);
}

function time(massage){
       setTimeout(() =>{
            massage.innerHTML= ''
            massage.classList.remove('error')
        }, 5000)
}


function CompareUserAndPass() {
    return users.find(u => u.username === logUser.value && u.password === logPass.value);
}

function logout() {
    localStorage.removeItem("LOGGEDIN_USER");
    window.location = 'logIn.html';
}

