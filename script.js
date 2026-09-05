const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const sportInput = document.getElementById("sport");
const messageInput = document.getElementById("message");
const photoInput = document.getElementById("photo");

const btnStudent = document.getElementById("btnStudent");
const btnStaff = document.getElementById("btnStaff");
const card = document.getElementById("card");
const cardSubtitle = document.getElementById("cardSubtitle");
const formSportLabel = document.getElementById("formSportLabel");
const cardSportLabel = document.getElementById("cardSportLabel");
const downloadBtn = document.getElementById("downloadBtn");

let isStaff = false;

const studentOptions = `
  <option>하키</option>
  <option>농구</option>
  <option>야구</option>
  <option>사격</option>
  <option>피겨스케이팅</option>
`;

const staffOptions = `
  <option>교수</option>
  <option>코치</option>
`;

btnStudent.addEventListener("click", () => {
  isStaff = false;
  btnStudent.classList.add("active");
  btnStaff.classList.remove("active");
  
  card.classList.remove("staff");
  downloadBtn.classList.remove("staff-btn");
  
  cardSubtitle.textContent = "STUDENT IDENTITY CARD";
  formSportLabel.textContent = "종목";
  cardSportLabel.textContent = "SPORT";
  
  sportInput.innerHTML = studentOptions;
  document.getElementById("cardSport").textContent = sportInput.value;
});

btnStaff.addEventListener("click", () => {
  isStaff = true;
  btnStaff.classList.add("active");
  btnStudent.classList.remove("active");
  
  card.classList.add("staff");
  downloadBtn.classList.add("staff-btn");
  
  cardSubtitle.textContent = "STAFF IDENTITY CARD";
  formSportLabel.textContent = "직책/담당";
  cardSportLabel.textContent = "ROLE";
  
  sportInput.innerHTML = staffOptions;
  document.getElementById("cardSport").textContent = sportInput.value;
});

nameInput.addEventListener("input",()=>{
  document.getElementById("cardName").textContent =
    nameInput.value || "YOUR NAME";
});

ageInput.addEventListener("input",()=>{
  document.getElementById("cardAge").textContent =
    ageInput.value || "—";
});

sportInput.addEventListener("change",()=>{
  document.getElementById("cardSport").textContent =
    sportInput.value;
});

messageInput.addEventListener("input",()=>{
  document.getElementById("cardMessage").textContent =
    messageInput.value || "YOUR MESSAGE";
});

photoInput.addEventListener("change",()=>{

  const file = photoInput.files[0];

  if(!file)return;

  const reader = new FileReader();

  reader.onload = e => {
    
    // img 태그 대신 CSS 배경 이미지로 설정하여 다운로드 시 비율 유지 및 오류 방지
    const box = document.getElementById("photoBox");
    box.style.backgroundImage = `url("${e.target.result}")`;
    box.classList.remove("empty");

  };

  reader.readAsDataURL(file);
});

async function downloadCard(){

  const cardElement = document.getElementById("card");

  const canvas = await html2canvas(cardElement,{
    scale:3,
    backgroundColor:null,
    width: cardElement.offsetWidth,
    height: cardElement.offsetHeight
  });

  const link = document.createElement("a");

  const defaultPrefix = nameInput.value || (isStaff ? "winterridge_staff" : "winterridge_student");
  const filenameSuffix = isStaff ? "_staff_card.png" : "_student_card.png";
  const filename = defaultPrefix + filenameSuffix;

  link.download = filename;
  link.href = canvas.toDataURL("image/png");

  link.click();
}
