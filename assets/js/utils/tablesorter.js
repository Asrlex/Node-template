import {showToast} from './swal.js';

const tables = document.querySelectorAll('table');
if (tables.length > 0) {
    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        const ths = table.querySelectorAll('thead th');
        for (let j = 0; j < ths.length; j++) {
            const th = ths[j];
            th.addEventListener('click', async function () {
                sortRows(j, table);
            });
        }
    }
}

let dir = "asc";
const sortRows = async (n, table) => {
    let rows, switching, i, x, y, shouldSwitch, switchcount = 0;
    switching = true;

    dir = dir === "asc" ? "desc" : "asc";

    while (switching) {

        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
    showToast('Tabla ordenada', 'success', 'top-end', 1000);
}