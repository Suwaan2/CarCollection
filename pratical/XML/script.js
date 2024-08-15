function loadXMLDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            displayData(this);
        }
    };
    xhttp.open("GET", "class.xml", true);
    xhttp.send();
}

function displayData(xml) {
    const xmlDoc = xml.responseXML;
    const table = document.getElementById("studentsTable");
    const students = xmlDoc.getElementsByTagName("student");

    for (let i = 0; i < students.length; i++) {
        const row = table.insertRow(-1);
        const name = row.insertCell(0);
        const id = row.insertCell(1);
        const branch = row.insertCell(2);
        const cgpa = row.insertCell(3);

        name.innerHTML = students[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        id.innerHTML = students[i].getAttribute("id");
        branch.innerHTML = students[i].getElementsByTagName("branch")[0].childNodes[0].nodeValue;
        cgpa.innerHTML = students[i].getElementsByTagName("cgpa")[0].childNodes[0].nodeValue;
    }
}

window.onload = function() {
    loadXMLDoc();
};