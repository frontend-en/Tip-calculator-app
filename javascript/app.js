const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const customInput = document.getElementById('custom');
const tipOut = document.getElementById('tip');
const totalOut = document.getElementById('total');
const resetButton = document.getElementById('reset');
const calculatorButton = document.querySelectorAll('.calculator__button')
const parentContainer = document.querySelector('.calculator__calc')
const errorMessge = document.querySelector('.calculator__error')


let ammountTip = {
  bill: '00.00',
  amount: '00.00',
  people: '1',
  custom: '00.00',
  total: '00.00',
  totalTipPerson: '00,00',
}

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
    custom: '0',
    total: '$0.00',
    totalTipPerson: '$0.00',
  }
  console.log(ammountTip);
})

const cleanButtonClass = () => {
  calculatorButton.forEach(item => {
    item.classList.remove('active-btn')
  })
}

const setAmount = () => {
  tipOut.innerHTML =`$${Number(ammountTip.totalTipPerson).toFixed(2)}`
  totalOut.innerHTML =`$${Number(ammountTip.total).toFixed(2)}`
}

const setPersent = () => {
  const tipPer = (ammountTip.custom * ammountTip.bill /100) / ammountTip.people
  ammountTip.totalTipPerson = tipPer
  ammountTip.total = (tipPer + ammountTip.bill) / ammountTip.people
  setAmount()
}

const setInputElem = (inputElem) => {
  if(!inputElem) return
  inputElem.addEventListener('input', ({target}) => {

    if(Number(target.value) <= 0) {
      if(inputElem.id === 'people') {
        inputElem.classList.add('input-error')
        errorMessge.classList.remove('hidden')
      }


    } else {
      ammountTip[inputElem.id] = Number(target.value);
      if(inputElem.id === 'people') {
        inputElem.classList.remove('input-error')
        errorMessge.classList.add('hidden')
      }

      setPersent();
    }


  })
}
const setButtonElem = (buttonElem) => {

  cleanButtonClass()

    ammountTip.custom = Number(buttonElem.textContent.trim().slice(0, -1));
    buttonElem.classList.add('active-btn')
    setPersent()
}

parentContainer.addEventListener('click', (e) => {

  const buttonElem = e.target.closest('button')
  const inputElem = e.target.closest('input')

  if (inputElem) {

    setInputElem(inputElem)

    if(inputElem.id === 'custom') {
      cleanButtonClass()
    }
  }

  if (buttonElem) {
    setButtonElem(buttonElem)
    customInput.value = ''
  }

  if (buttonElem === null || inputElem === null) {
    e.stopPropagation()
    return
  }
})
