let form = document.querySelector('form');
let resetBtn = document.getElementById('tip_calc_reset_btn')
let peopleError = document.getElementById('tip_calc_error')
const tipData = {
    bill: 0,
    tip: 0,
    people: 0
};

function updateTipData(name, value) {
    tipData[name] = name === 'custom_tip' ? parseFloat(value) / 100 || 0 : parseFloat(value) || 0;
    calculateTip();
}

function isPeopleValid() {
    return tipData.people > 0;
}

function handleError() {
    peopleError.classList.toggle('active', !isPeopleValid());
}

function renderTipStats(tipPerPerson, totalPerPerson) {
    document.querySelector('.tip_amount_per_person_value').textContent = `$${tipPerPerson.toFixed(2)}`;
    document.querySelector('.tip_amount_total_value').textContent = `$${totalPerPerson.toFixed(2)}`;
}

function reset() {
    Object.assign(tipData, { bill: 0, tip: 0, people: 0 });
    form.reset();

    document.getElementById('people').value = ''; // Manually clear the input to avoid validation issue
    
    peopleError.classList.remove('active');
    renderTipStats(0.00, 0.00);
    resetBtn.disabled = true;
}


function calculateTip() {
    if (isPeopleValid() && tipData.bill > 0) {
        let tipPerPerson = (tipData.bill * tipData.custom_tip) / tipData.people;
        let totalPerPerson = (tipData.bill * (1 + tipData.custom_tip)) / tipData.people;
        renderTipStats(tipPerPerson, totalPerPerson);
    } else {
        renderTipStats(0.00, 0.00);
    }
}

function handleInput(e) {
    updateTipData(e.target.name, e.target.value);
    handleError();
    resetBtn.disabled = false;
}

function handleBtnClick(e) {
    if (e.target.matches('.tip_selector[type="button"]')) {
        updateTipData('custom_tip', e.target.value.replace('%', ''));
        handleError()
        resetBtn.disabled = false;
    }
}

form.addEventListener('input', handleInput);
form.addEventListener('click', handleBtnClick);

resetBtn.addEventListener('click', reset);