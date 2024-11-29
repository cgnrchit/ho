//  dd/mm/yyyy  Date 
function parseDate(dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // Month is 0-indexed
}

// Filter function
function filterTable() {
  // Get filter values
  const searchText = document.getElementById("hiddenBranchName").value.toLowerCase();
  const fromDateValue = document.getElementById("fromDate").value;
  const toDateValue = document.getElementById("toDate").value;

  // Convert input dates to Date objects for comparison
  let fromDate = fromDateValue ? new Date(fromDateValue) : null;
  let toDate = toDateValue ? new Date(toDateValue) : null;

  // If fromDate is given, set its time to the start of the day (00:00:00)
  if (fromDate) {
    fromDate.setHours(0, 0, 0, 0);
  }

  // If toDate is given, set its time to the end of the day (23:59:59)
  if (toDate) {
    toDate.setHours(23, 59, 59, 999);
  }

  // Get table and rows
  const table = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
  const rows = table.getElementsByTagName("tr");

  // Iterate through rows
  for (let row of rows) {
      const branch = row.cells[0].textContent.toLowerCase(); // Branch column
      const depositDateText = row.cells[1].textContent.trim(); // Deposit Date column (dd/mm/yyyy)
      const depositDate = parseDate(depositDateText); // Convert to Date object

      // Check branch match (ignore if searchText is empty)
      const branchMatch = !searchText || branch.includes(searchText);

      // Check date range match
      const dateMatch = 
          (!fromDate || depositDate >= fromDate) &&
          (!toDate || depositDate <= toDate);

      // Display row only if criteria match
      row.style.display = (branchMatch && dateMatch) ? "" : "none";
  }
}

// Clear filters function
function clearFilters() {
  // Reset filter inputs
  document.getElementById("fromDate").value = "";
  document.getElementById("toDate").value = "";
  document.getElementById("hiddenBranchName").value = "";

  // Reset table rows display
  const table = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
  const rows = table.getElementsByTagName("tr");
  for (let row of rows) {
      row.style.display = ""; // Reset to default display
  }
}






function printTable() {
    const table = document.getElementById("dataTable");
    const rows = table.getElementsByTagName("tr");
    let tableContent = `<table>
    <thead>
        <tr>
            <th>Branch</th>
            <th>Deposit Date</th>
            <th>Staff Name</th>
            <th>Receipt Date</th>
            <th>Customer Name</th>
            <th>Chitty Number</th>
            <th>Instalment</th>
            <th>Receipt Number</th>
            <th>Amount</th>
            <th>Commission</th>
            <th>Bank Amount</th>            
        </tr>
    </thead>
    <tbody>`;

    // Iterate through each row and include only visible rows
    for (let row of rows) {
        if (row.style.display !== "none") { // Include only rows that are not hidden
            const cells = row.getElementsByTagName("td");
            if (cells.length > 0) {
                tableContent += `<tr>
                    <td>${cells[0].textContent}</td> 
                    <td>${cells[1].textContent}</td> 
                    <td>${cells[2].textContent}</td>
                    <td>${cells[3].textContent}</td>
                    <td>${cells[4].textContent}</td>
                    <td>${cells[5].textContent}</td>
                    <td>${cells[6].textContent}</td>
                    <td>${cells[7].textContent}</td>
                    <td>${cells[8].textContent}</td>
                    <td>${cells[9].textContent}</td>
                    <td>${cells[10].textContent}</td>
                </tr>`;
            }
        }
    }

    tableContent += `</tbody></table>`;

    // Open a new print window
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
    <html>
    <head>
    <h2>Chengannur Chits</h2>
    <h3>Collection Report</h3>
    <style>                  
    table {
        width: 100%;
        border-collapse: collapse;
    }
    table, th, td {
        border: 1px solid black;
        text-transform: capitalize;
    }
    th, td {
        padding: 8px;
        text-align: left;
    }
    th {
        background-color: rgb(40, 122, 19);                                            
        color: white;
    }
    td {                       
        padding: 5px;                        
        text-align: left;
        text-transform: capitalize; 
    }
    </style>
    </head>
    <body>
    ${tableContent}
    </body>
    </html>
    `);
    printWindow.document.close();
    printWindow.print();
}






//export to .xls----------------------------------------------------------
function exportTableToExcel() {
  const table = document.getElementById("dataTable");
  const rows = table.getElementsByTagName("tr");
  let tableContent = `<table>
  <thead>
      <tr>
          <th>Branch</th>
          <th>Deposit Date</th>
          <th>Staff Name</th>
          <th>Receipt Date</th>
          <th>Customer Name</th>
          <th>Chitty Number</th>
          <th>Instalment</th>
          <th>Receipt Number</th>
          <th>Amount</th>
          <th>Commission</th>
          <th>Bank Amount</th>                     
      </tr>
  </thead>
  <tbody>`;

  // Iterate through each row and extract data
  for (let row of rows) {
      const cells = row.getElementsByTagName("td");
      if (cells.length > 0) {
          tableContent += `<tr>
              <td>${cells[0].textContent}</td>
              <td>${cells[1].textContent}</td>
              <td>${cells[2].textContent}</td>
              <td>${cells[3].textContent}</td>
              <td>${cells[4].textContent}</td>
              <td>${cells[5].textContent}</td>
              <td>${cells[6].textContent}</td>
              <td>${cells[7].textContent}</td>
              <td>${cells[8].textContent}</td>
              <td>${cells[9].textContent}</td>
              <td>${cells[10].textContent}</td>              
          </tr>`;
      }
  }

  tableContent += `</tbody></table>`;

  // Create a Blob with the table content
  const blob = new Blob([tableContent], { type: "application/vnd.ms-excel;charset=utf-8;" });

  // Generate a download link
  const link = document.createElement("a");
  const filename = "Collection_Report.xls"; // File name for download
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  // Trigger the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

