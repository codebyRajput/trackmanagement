document.addEventListener('DOMContentLoaded', () => {
    fetchMachines();
});

function fetchMachines() {
    fetch('http://localhost:5500/machines')
        .then(response => response.json())
        .then(data => displayMachines(data));
}

function displayMachines(machines) {
    const machineDetails = document.getElementById('machineDetails');
    if (machines.length === 0) {
        machineDetails.innerHTML = '<p>No machines found.</p>';
        return;
    }

    let html = '<table>';
    html += '<tr><th>Machine Type</th><th>Machine No</th><th>Assembly Name</th><th>Failure Date</th><th>Type of Failure</th><th>Description</th><th>Hours Worked</th><th>Function</th><th>Manufacturer</th><th>Performance Parameter</th><th>Remarks</th></tr>';
    machines.forEach(machine => {
        html += `<tr>
            <td>${machine.MACHINETYPE}</td>
            <td>${machine.MACHINENO}</td>
            <td>${machine.ASSEMBLYNAME}</td>
            <td>${new Date(machine.FAILUREDATE).toLocaleString()}</td>
            <td>${machine.TYPEOFFAILURE}</td>
            <td>${machine.DESCRIPTION}</td>
            <td>${machine.HOURSWORKED}</td>
            <td>${machine.mfunction}</td>
            <td>${machine.MANUFACTURER}</td>
            <td>${machine.Performance_parameter}</td>
            <td>${machine.REMARKS}</td>
        </tr>`;
    });
    html += '</table>';
    machineDetails.innerHTML = html;
}

function searchMachine() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    fetch('http://localhost:5500/machines')
        .then(response => response.json())
        .then(data => {
            const filteredMachines = data.filter(machine => 
                machine.MACHINETYPE.toLowerCase().includes(searchInput) || 
                machine.MACHINENO.toString().includes(searchInput));
            displayMachines(filteredMachines);
        });
}
