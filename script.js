const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const sportInput = document.getElementById("sport");
const messageInput = document.getElementById("message");
const photoInput = document.getElementById("photo");

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

    const img = document.getElementById("photoPreview");
    const box = img.parentElement;

    img.src = e.target.result;
    img.style.display = "block";
    box.classList.remove("empty");

  };

  reader.readAsDataURL(file);
});

async function downloadCard(){

  const card = document.getElementById("card");

  const canvas = await html2canvas(card,{
    scale:3,
    backgroundColor:null
  });

  const link = document.createElement("a");

  const filename =
    (nameInput.value || "winterridge_student_card")
    + "_student_card.png";

  link.download = filename;
  link.href = canvas.toDataURL("image/png");

  link.click();
}