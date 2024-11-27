// Firebase imports and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, push, } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const appSetting = {
  databaseURL: "https://cgnrchits-cd7d1-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(appSetting);
const database = getDatabase(app);
const collectionListDB = ref(database, "collection");


const idEl = document.querySelector("#id");
const hiddenBranchNameEL = document.querySelector("#hiddenBranchName");
const depositDateEL = document.querySelector("#depositDate");
const staffNameEL = document.querySelector("#staffName");
const receiptDateEL = document.querySelector("#receiptDate");
const custNameEL = document.querySelector("#custName");
const chitNumberEL = document.querySelector("#chitNumber");
const instalmentEL = document.querySelector("#instalment");
const receiptNumEL = document.querySelector("#receiptNum");
const amountEL = document.querySelector("#amount");
const commissionEL = document.querySelector("#commission");
const bankAmountEL = document.querySelector("#bankAmount");
const collectionForm = document.querySelector("#collectionForm");

// Event listener for the submit button
collectionForm.addEventListener("submit", function(e) {
    e.preventDefault();  // Prevents form from submitting the traditional way

    if(idEl.value){
        //update Record

    }
    //insert

    const collect = {
        
        hiddenBranchName:hiddenBranchNameEL.value,
        depositDate: depositDateEL.value,
        staffName: staffNameEL.value,
        receiptDate: receiptDateEL.value,
        customerName: custNameEL.value,
        chitNumber: chitNumberEL.value,
        instalment: instalmentEL.value,
        receiptNumber: receiptNumEL.value,
        amount: amountEL.value,
        commission: commissionEL.value,
        bankAmount: bankAmountEL.value
    };

    push(collectionListDB, collect)
        .then(() => {
            alert("Data successfully added!");
            collectionForm.reset(); // Optional: Reset the form after submission
        })
        .catch((error) => {
            console.error("Error adding data: ", error);
            alert("An error occurred. Please try again.");
        });
});



