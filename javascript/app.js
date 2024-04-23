const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const customInput = document.getElementById('custom');
const tipOut = document.getElementById('tip');
const totalOut = document.getElementById('total');
const resetButton = document.getElementById('reset');
const calculatorButton = document.querySelectorAll('.calculator__button')

let ammountTip = {
  bill: '00.00',
  amount: '00.00',
  people: '1',
  percent: '00.00',
  total: '00.00',
  totalTipPerson: '00,00',
}

calculatorButton.forEach(item => {
  if(item.textContent.trim() === '15%') {
    item.classList.add('active-btn')
  }
})


resetButton.addEventListener('click', () => {
  billInput.value = '';
  peopleInput.value = '';
  customInput.value = '';
  tipOut.innerHTML = '$0.00';
  totalOut.innerHTML = '$0.00';
  ammountTip = {
    bill: '00.00',
    amount: '00.00',
    people: '1',
    percent: '0',
    total: '$0.00',
    totalTipPerson: '$0.00',
  }
  console.log(ammountTip);
})

billInput.addEventListener('input', ({target}) => {
  ammountTip.bill = Number(target.value);
  setPersent();
} )


peopleInput.addEventListener('input', ({target}) => {
  ammountTip.people = Number(target.value);
  setPersent();

} )

customInput.addEventListener('input', ({target}) => {
  ammountTip.percent = Math.abs(Number(target.value));
  setPersent()
})

const setButtonPersent = ({target}) => {
  ammountTip.percent = Number(target.textContent.trim().slice(0, -1));
  setPersent()
}

calculatorButton.forEach(item => {
  item.addEventListener('click', setButtonPersent)
})

const setAmount = () => {
  tipOut.innerHTML =`$${Number(ammountTip.totalTipPerson).toFixed(2)}`
  totalOut.innerHTML =`$${Number(ammountTip.total).toFixed(2)}`
}

const setPersent = () => {
  const tipPer = (ammountTip.percent * ammountTip.bill /100) / ammountTip.people
  ammountTip.totalTipPerson = tipPer
  ammountTip.total = (tipPer + ammountTip.bill) / ammountTip.people
  setAmount()
}
