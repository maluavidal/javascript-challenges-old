const data = {
    "insurances": [{
        "id": 3322,
        "name": "Amil"
    }, {
        "id": 3293,
        "name": "Bradesco"
    }, {
        "id": 99231,
        "name": "Hapvida"
    }, {
        "id": 1322,
        "name": "CASSI"
    }, {
        "id": 23111,
        "name": "Sulamérica"
    }],
    "guides": [{
        "number": "3210998321",
        "start_date": "2022-09-23T19:18:47.210Z",
        "patient": {
            "id": 9321123,
            "name": "Augusto Ferreira",
            "thumb_url": "https://imgsapp2.correiobraziliense.com.br/app/noticia_127983242361/2019/10/09/794834/20191004154953157610i.jpg"
        },
        "insurane_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 5567.2
    }, {
        "number": "287312832",
        "start_date": "2022-09-23T19:18:47.210Z",
        "patient": {
            "id": 93229123,
            "name": "Caio Carneiro",
            "thumb_url": "http://3.bp.blogspot.com/-XG5bGlqGnJw/T9lIcssnybI/AAAAAAAADTA/B23ezXOkx8Y/s1600/Aang.jpg"
        },
        "insurane_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 213.3
    }, {
        "number": "283718273",
        "start_date": "2022-09-22T19:18:47.210Z",
        "patient": {
            "id": 213122388,
            "name": "Luciano José",
            "thumb_url": "https://i.ytimg.com/vi/yUXd-enstO8/maxresdefault.jpg"
        },
        "insurane_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 88.99
    }, {
        "number": "009090321938",
        "start_date": "2022-09-20T19:18:47.210Z",
        "patient": {
            "id": 3367263,
            "name": "Felício Santos",
            "thumb_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSxlYabmRlKk43uvsBMIqjA7Rw_YCwK4TyA&usqp=CAU"
        },
        "insurane_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 828.99
    }, {
        "number": "8787128731",
        "start_date": "2022-09-01T19:18:47.210Z",
        "patient": {
            "id": 777882,
            "name": "Fernando Raposo"
        },
        "insurane_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 772
    }, {
        "number": "12929321",
        "start_date": "2022-09-02T19:18:47.210Z",
        "patient": {
            "id": 221,
            "name": "Paciente com nome grante pra colocar text ellipsis testando nome com paciente grande"
        },
        "insurane_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 221
    }]
}

const table = document.getElementById('table');
const tbody = document.getElementById('tbody');
const select = document.getElementById('sel');
const search = document.getElementById('search');
const dateStartInput = document.getElementById('month-start');
const dateEndInput = document.getElementById('month-end');
const monthBtn = document.getElementById('month');
const todayBtn = document.getElementById('today');

const { insurances, guides } = data;

let currentPage = 1;
let itemsPerPage = 2;
let filteredGuides;
let filteredItems;

const init = () => {
    changeDateFilter('month');
    renderTable(guides);
    renderSelect(insurances);
    filterTable();
    paginationStructure(filteredGuides, 2);
};

const renderTable = guides => {
    let html = '';

    if (!guides.length) {
        html += `
        <tr>
        <td colspan="5" id="footer">Nenhuma guia encontrada</td>
        </tr>
        `
    }

    guides.forEach(guide => {
        let deleted = '';
        let hoverDeleted = '';

        if (guide.health_insurance.is_deleted) {
            deleted = 'deleted';
            hoverDeleted = 'Convênio Apagado';
        };

        html += `
        <tr>
            <td>${new Date(guide.start_date).toLocaleDateString('pt-BR')}</td>
            <td>${guide.number}</td>
            <td><img id="img" src="${guide.patient.thumb_url || "https://via.placeholder.com/150x150.jpg"}"/>${guide.patient.name}</td>
            <td class="${deleted}" title="${hoverDeleted}">${guide.health_insurance.name}</td>
            <td>${guide.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
        </tr>
        `
    });

    tbody.innerHTML = html;
};

const renderSelect = insurances => {
    let html = `<option value="">Convênio</option>`;

    insurances.forEach(insurance => {
        html += `<option value="${insurance.id}">${insurance.name}</option>`
    });

    select.innerHTML = html;
};

const formatDate = date => {
    return new Date(date).toISOString().slice(0, 10);
};

const changeDateFilter = buttonType => {

    if (buttonType === 'month') {
        const rawDate = new Date();
        const firstDay = new Date(rawDate.getFullYear(), rawDate.getMonth(), 1);
        dateStartInput.value = `${formatDate(firstDay)}`;

        const lastDay = new Date(rawDate.getFullYear(), rawDate.getMonth() + 1, 0);
        dateEndInput.value = `${formatDate(lastDay)}`;

        // todayBtn.classList.remove('active');
        // monthBtn.classList.add('active');
    }

    if (buttonType === 'today') {
        dateStartInput.value = `${formatDate(new Date())}`;
        dateEndInput.value = `${formatDate(new Date())}`;

        // monthBtn.classList.remove('active');
        // todayBtn.classList.add('active');
    }
};

const activeButton = (buttonType) => {
    let monthActive = monthBtn.classList.contains('active');
    let todayActive = todayBtn.classList.contains('active');
    
    if (buttonType === 'today') {
        monthBtn.classList.remove('active');
        todayBtn.classList.add('active');
    }

    if (buttonType === 'month') {
        todayBtn.classList.remove('active');
        monthBtn.classList.add('active');
    }

    if (!todayActive){
        monthBtn.classList.remove('active');
    } else {
        todayBtn.classList.remove('active');
    }

    filterTable();
};

const normalizeValue = value => {
    return value.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const paginate = (page = 1, filtered) => {
    currentPage = page;

    const offset = (currentPage - 1) * itemsPerPage;

    const paginatedGuides = filtered.slice(offset).slice(0, itemsPerPage);

    paginationStructure(filteredGuides, 2);
    renderTable(paginatedGuides);
};

const paginationStructure = (guides, itemsPerPage) => {
    const pages = document.getElementById('pages');
    filteredItems = filteredGuides.length;
    const totalPages = Math.ceil(guides.length / itemsPerPage);
    let html = '';
    
    if (filteredItems){
        html += `
        <li class="page-item"><a class="page-link" href="#" onClick="filterTable(1)">Primeira</a><li>
        <li class="page-item"><a class="page-link" href="#" onClick="filterTable(currentPage - 1)">Anterior</a><li>
        `
        
        for (let i = 1; i <= totalPages; i++) {
            html += `
            <li class="page-item"><a class="page-link" currentPage="${i}" href="#" onClick="filterTable(${i})">${i}</a><li>
            `
        }
    
        html += `
            <li class="page-item"><a class="page-link" href="#" onClick="filterTable(currentPage + 1)" >Próxima</a><li>
            <li class="page-item"><a class="page-link" href="#" onClick="filterTable(${currentPage}, true)">Última</a><li>
            `
    } 
    
    pages.innerHTML = html;
};

const filterTable = (currentPage, lastPage = false) => {
    const selectValue = ~~document.getElementById('sel').value;
    const searchInputValue = normalizeValue(search.value);
    const dateStartInputValue = document.getElementById('month-start').value;
    const dateEndInputValue = document.getElementById('month-end').value;

    if (currentPage < 1) {
        currentPage = 1;
    }
    
    if (currentPage > filteredItems / 2) { 
        return;
    }
    
    if (!selectValue && !searchInputValue && !dateStartInputValue && !dateEndInputValue) {
        return;
    }
    
    filteredGuides = guides.filter(element => {
        let isValid = true;
        const patientName = normalizeValue(element.patient.name);
        const number = element.number;
        const startDate = formatDate(element.start_date);
        
        if (!patientName.includes(searchInputValue) && !number.includes(searchInputValue)) {
            isValid = false;
        }
        
        if (!(element.health_insurance.id === selectValue || !selectValue)) {
            isValid = false;
        }
        
        if (dateStartInputValue > dateEndInputValue) {
            isValid = false;
        }
        
        if (!(startDate > dateStartInputValue && startDate < dateEndInputValue)) {
            isValid = false;
        }
        
        return isValid;
    });
    
    filteredGuides.sort((date, nextDate) => {
        if (formatDate(date.start_date) > formatDate(nextDate.start_date)) {
            return 1;
        }
        
        if (formatDate(date.start_date) < formatDate(nextDate.start_date)) {
            return -1;
        }
        
        return 0;
    });
    
    if (lastPage) {
        currentPage = filteredGuides.length / 2;
    }
    
    paginate(currentPage, filteredGuides);
    // monthBtn.classList.add('active');
};

init();