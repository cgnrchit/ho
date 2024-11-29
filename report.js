// Firebase imports and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const appSetting = {
  databaseURL: "https://cgnrchits-cd7d1-default-rtdb.asia-southeast1.firebasedatabase.app/"
};


const app = initializeApp(appSetting);
const database = getDatabase(app);
const collectionListDB = ref(database, "collection");

const tblBodyEl = document.querySelector("#tblBody");

//format date to dd/mm/yyyy---------------------------------------------------------
function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return dateString; // Return the original if the date is invalid
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}



//report table------------------------------------------------------------------
onValue(collectionListDB, function(snapshot) {
  if (snapshot.exists()) {
      let userArray = Object.entries(snapshot.val());

      // Sort the array by depositDate in ascending order
      userArray.sort(([, userValueA], [, userValueB]) => {
          const dateA = new Date(userValueA.depositDate);
          const dateB = new Date(userValueB.depositDate);
          return dateA - dateB; // Ascending order
      });

      let htmlContent = ""; // Accumulate HTML here

      userArray.forEach(([userId, userValue]) => {
          const formattedDepositDate = formatDate(userValue.depositDate);
          const formattedReceiptDate = formatDate(userValue.receiptDate);

          htmlContent += `
              <tr>
                  <td style="width: 9%; text-align: left;">${userValue.hiddenBranchName}</td> 
                  <td style="width: 8%; text-align: center;">${formattedDepositDate}</td>
                  <td style="width: 179px; text-align: left;">${userValue.staffName}</td>
                  <td style="width: 8%; text-align: center;">${formattedReceiptDate}</td>
                  <td style="width: 19%; text-align: left;">${userValue.customerName}</td> 
                  <td style="width: 7%; text-align: center;">${userValue.chitNumber}</td> 
                  <td style="width: 7%; text-align: center;">${userValue.instalment}</td> 
                  <td style="width: 7%; text-align: center;">${userValue.receiptNumber}</td> 
                  <td style="width: 7%; text-align: right;">${userValue.amount}</td>
                  <td style="width: 7%; text-align: right;">${userValue.commission}</td>
                  <td style="width: 7%; text-align: right;">${userValue.bankAmount}</td>                    
                  <td style="width: 4%; text-align: center;"><input class="checkbox" type="checkbox" name="select"></td>
                  <td style="width: 4%; text-align: center;">
                      <button class="btn-delete" data-id="${userId}">
                          <img src="delete.svg" class="del-icon">
                      </button>
                  </td>
              </tr>`;
      });

      // Update DOM only once
      tblBodyEl.innerHTML = htmlContent;
  } else {
      tblBodyEl.innerHTML = "<tr><td>No Record</td></tr>";
  }
});



//delete-----------------------------------------------------------
document.addEventListener("click",function(e){
  if(e.target.classList.contains("btn-edit")){
    const id=e.target.dataset.id;
  }else if (e.target.classList.contains("btn-delete")){
    if(confirm("Are You Sure To delete?")){
      const id=e.target.dataset.id;
      let data=ref (database,`collection/${id}`);
      remove(data);
    }
  }
});




