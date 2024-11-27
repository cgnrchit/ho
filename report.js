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
onValue(collectionListDB, function(snapshot){
    if(snapshot.exists()){
        let userArray = Object.entries(snapshot.val());
        tblBodyEl.innerHTML ="";
        for (let i = 0; i <userArray.length; i++){
            let currentUser = userArray[i];
            let currentUserid = currentUser[0];
            let currentUserValue = currentUser[1];

            // Format dates---------------------------------------------------------------
            const formattedDepositDate = formatDate(currentUserValue.depositDate);
            const formattedReceiptDate = formatDate(currentUserValue.receiptDate);
            // table data-----------------------------------------------------------------
            tblBodyEl .innerHTML +=
                        ` <tr>
                          <td style="width: 9%; text-align: left;">${currentUserValue.hiddenBranchName}</td> 
                          <td style="width: 8%; text-align: center;">${formattedDepositDate}</td>
                          <td style="width: 179px; text-align: left;">${currentUserValue.staffName}</td>
                          <td style="width: 8%; text-align: center;">${formattedReceiptDate}</td>
                          <td style="width: 19%; text-align: left;">${currentUserValue.customerName}</td> 
                          <td style="width: 7%; text-align: center;">${currentUserValue.chitNumber}</td> 
                          <td style="width: 7%; text-align: center;">${currentUserValue.instalment}</td> 
                          <td style="width: 7%; text-align: center;">${currentUserValue.receiptNumber}</td> 
                          <td style="width: 7%; text-align: right;">${currentUserValue.amount}</td>
                          <td style="width: 7%; text-align: right;">${currentUserValue.commission}</td>
                          <td style="width: 7%; text-align: right;">${currentUserValue.bankAmount}</td>                    
                          <td style="width: 4%; text-align: center;"><input class="checkbox" type="checkbox" name="select"></td>
                          <td style="width: 4%; text-align: center;">
                              <button class="btn-delete" data-id="${currentUserid}">
                                  <img src="Image/delete.svg" class="del-icon">
                              </button>
                          </td>
                      </tr>`
        }
    }else{
        tblBodyEl .innerHTML = "<tr><td> No Record</tb></tr>";
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




