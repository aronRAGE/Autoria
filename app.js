
// {
// //     {
//       "id": "303b3472b11d51c7d970108e3ec1a15476521ec3",
//       "make": "Chevrolet",
//       "model": "Sportvan G20",
//       "year": 1993,
//       "img": "http://dummyimage.com/161x159.jpg/ff4444/ffffff",
//       "color": "Red",
//       "vin": "JM1CW2BL5C0288424",
//       "country": "Poland",
//       "rating": 2,
//       "price": 2082,
//     **  "reviews": 131,
//       "seller": "Stern Pontin",
//       "vip": false,
//       "top": false,
//       "timestamp": "1601827231000",
//     **  "phone": "+48 (184) 680-6479",
//       "fuel": "Benzin",
//       "engine_volume": 1.6,
//       "transmission": "CVT",
//       "odo": 418116,
//       "consume": { "road": 5.4, "city": 10.6, "mixed": 9.2 }
//     }
//}

// let newCars = CARS.filter(car =>{
//   if (car.make == 'Chevrolet') {
//     return true
//   } else{
//     return false
//   }
// })

// console.log(newCars);
const USD = 29.3566548542 


if (!localStorage.likeList) {
  localStorage.likeList = JSON.stringify([])
}
if (!localStorage.viewedList) {
  localStorage.viewedList = JSON.stringify([])
}
let CARS = cars
const dateFormatter = new Intl.DateTimeFormat('en-US',{
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})
const currencyFormatter = new Intl.NumberFormat('ru',{
  style: "currency",
  currency: "UAH",
  maximumSignificantDigits: 3,
})

const List = document.getElementById('list')
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const filterForm = document.getElementById('filter-form')

const body = document.querySelector('body')

const filterList = ["make", "engine_volume", 'transmission', 'fuel', 'rating', 'price']


searchForm.addEventListener('submit', ev => {
  ev.preventDefault()
  let val = ev.target.searchInput.value.trim().toLowerCase()
  console.log(val);
  CARS = cars.filter(car => {
    let fullCarName = `${car.make} ${car.model}`.trim().toLowerCase()
    return fullCarName.includes(val)
  })
  renderCarList(CARS, List)
})

filterForm.addEventListener('submit', ev => {
  ev.preventDefault()
  const filterOptions = {}
  filterList.forEach(filter => {
    const fieldset = ev.target[filter]
    const fieldsetInputs = fieldset.querySelectorAll('input')
    fieldsetInputs.forEach(input => {
      if (input.checked || filter == 'price') {
        if (!filterOptions.hasOwnProperty(filter)) {
          filterOptions[filter] = []
        }
        filterOptions[filter].push(input.value)
      }
    })
  })
  console.log(filterOptions);
  CARS = cars.filter(car => {
    for (const filter in filterOptions) {
      if (filterOptions.hasOwnProperty(filter)) {
        const filterValues = filterOptions[filter];
        if (filter == 'price' && (car[filter] >= filterValues[0] && car[filter] <= filterValues[1])) {
          return true
        } else if (!filterValues.includes(`${car[filter]}`)) {
          return false
        }
      }
    }
    return true
  })
  renderCarList(CARS, List)
})

// searchInput.addEventListener('input', ev => {
//     let val = ev.target.value.trim().toLowerCase()
//     console.log(val);
//     CARS = cars.filter(car => {
//       let fullCarName = `${car.make} ${car.model}`.trim().toLowerCase()
//       return fullCarName.includes(val)
//     })
//     renderCarList(CARS, List)
//   })

createFilterSection(CARS, filterList)


function createFilterCheckbox(variant) {
  return `<label class="d-block">
  <input type="checkbox" value="${variant}" name="${variant}">
  <span>${variant}</span>
</label>`
}
function createFilterPriceInputs(prices) {
  return `<label class="d-block">
  Min
  <input type="number" value="${prices[0]}" min="${prices[0]}" max="${prices[1] - 1}" name="minPrice">
</label>
<label class="d-block">
Max
  <input type="number" value="${prices[1]}" min="${prices[0] + 1}" max="${prices[1]}" name="maxPrice">
</label>`
}

function createFilterBlock(name, variants) {
  let inputs = ``
  if (name != 'price') {
    variants.forEach(variant => {
      inputs += createFilterCheckbox(variant)
    })
  } else {
    inputs += createFilterPriceInputs(variants)
  }

  return `<fieldset class="border p-3 filter-block" name="${name}">
  <h6>${name}</h6>
  ${inputs}
  </fieldset>`
}

function createFilterSection(cars, filterList) {
  let filters = ``
  filterList.forEach(filter => {
    let variants = []
    cars.forEach(car => {
      if (!variants.includes(car[filter])) {
        variants.push(car[filter])
      }
    })
    if (filter != 'price') {
      variants.sort()
      filters += createFilterBlock(filter, variants)
    } else {
      let min = Math.min(...variants)
      let max = Math.max(...variants)
      filters += createFilterBlock(filter, [min, max])
    }


  })
  filterForm.insertAdjacentHTML('afterbegin', filters)
}



window.addEventListener('scroll', ev => {
  if (window.scrollY > 1000 && toTop.classList.contains('hidden')) {
    console.log('yes');
    toTop.classList.remove('hidden')
    toTop.classList.add('visible')
  } else if (window.scrollY < 1000 && !toTop.classList.contains('hidden')) {
    console.log('yes');
    toTop.classList.remove('visible')
    toTop.classList.add('hidden')
  }
})





masonry.addEventListener('click', ev => {
  if (ev.target.classList.contains('btn')) {
    if (ev.target.dataset.action == '1') {
      List.classList.add('masonry1')
      List.classList.remove('masonry2')
    } else if (ev.target.dataset.action == '2') {
      List.classList.add('masonry2')
      List.classList.remove('masonry1')
    }
  }
})


// function isElementInViewport(el) {
//   var rect = el.getBoundingClientRect();
//   return (
//     rect.top >= 0 &&
//     rect.left >= 0 &&
//     rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) &&
//     rect.right <= (window.innerWidth || document. documentElement.clientWidth)
//   );
// }


List.addEventListener('click', event => {
  if (event.target.classList.contains('like')) {
    const btn = event.target
    const id = btn.dataset.id
    const likeList = JSON.parse(localStorage.likeList)

    if (!likeList.includes(id)) {
      likeList.push(id)
      btn.classList.toggle('far')
      btn.classList.toggle('fas')
    } else {
      let idIndex = likeList.indexOf(id)
      likeList.splice(idIndex, 1)
      btn.classList.toggle('far')
      btn.classList.toggle('fas')
    }


    localStorage.likeList = JSON.stringify(likeList)
  }
})
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
function setViewedCard() {
  window.removeEventListener('scroll', setViewedCard)
  console.log('scroll');
  const unseenCards = List.querySelectorAll(".card:not(.seen)");
  const viewedList = JSON.parse(localStorage.viewedList)
  for (let i = 0; i < unseenCards.length; i++) {
    const card = unseenCards[i];
    if (isElementInViewport(card)) {
      card.classList.add("seen");
      const id = card.dataset.id
      // console.log(unseenCards,id);
      viewedList.push(id)
    }
  }
  localStorage.viewedList = JSON.stringify(viewedList)
  // window.addEventListener('scroll', setViewedCard)
  setTimeout(() => {
    window.addEventListener('scroll', setViewedCard)
  }, 50);
  // window.requestAnimationFrame(function () {
  //   window.addEventListener('scroll', setViewedCard)
  // })
}
window.addEventListener('scroll', setViewedCard)




// start()
// async function start() {
//   const res = await fetch('/data/cars.json')
//   const json = await res.json()

// }

console.time('cards')
renderCarList(CARS, List)
console.timeEnd('cards')


sortSelect.addEventListener('change', ev => {
  let value = ev.target.value
  let dividerPos = value.indexOf('-')
  let subject = value.slice(0, dividerPos)

  if (value.endsWith('up')) {
    CARS.sort((a, b) => a[subject] - b[subject])
  } else if (value.endsWith('down')) {
    CARS.sort((a, b) => b[subject] - a[subject])
  }
  renderCarList(CARS, List)
})



function renderCarList(data, node) {
  node.innerHTML = ''
  if (data && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const element = data[i]
      let html = createHTML(element)
      node.insertAdjacentHTML('beforeend', html)
    }
  } else {
    node.insertAdjacentHTML('beforeend', '<h6 class="text-center my-5">Элементов нет :(</h6>')
  }
}

function createHTML(car) {
  let title = `${car.make} ${car.model}, ${car.year}`
  let top = car.top ? `<div class="card-flag mb-2 top">TOP</div>` : ''
  let vip = car.vip ? `<div class="card-flag mb-2 vip">VIP</div>` : ''

  let stars = ''
  for (let i = 0; i < 5; i++) {
    if (i < car.rating) {
      stars += `<i class="fas fa-star raiting_stars"></i>`
    } else {
      stars += `<i class="far fa-star raiting_stars"></i>`
    }
  }
  let fuelIcon = ''
  if (car.fuel === "Benzin") {
    fuelIcon = `<i class="fas fa-tint fuelIcon"></i>`
  } else if (car.fuel === 'Diesel') {
    fuelIcon = `<i class="fas fa-water fuelIcon"></i>`
  } else {
    fuelIcon = `<i class="fab fa-cloudversify fuelIcon"></i>`
  }
  let fuelConsumeRoad = `road: ${car.consume.road}`
  let fuelConsumeCity = `city: ${car.consume.city}`
  let fuelConsumeMixed = `mixed: ${car.consume.mixed}`

  return `<div class="card row ${JSON.parse(localStorage.viewedList).includes(car.id) && 'seen'}" data-id="${car.id}">
    <div class="col-5 card_img">
      <div class="viptop info_n_img">${top}${vip}</div>
        <img src="${car.img}" alt="">
        <div class="under_img_info">
          <div class="car_info_under_img car_info_info row">
            <p class="col-5">transmission:</p><p class="col-7">${car.transmission}</p>
          </div>
          <div class="car_info_under_img car_info_info row">
            <p class="col-5">vin:</p><p class="col-7">${car.vin}</p>
          </div>
          <div class="car_info_under_img car_info_info row">
            <p class="col-5">odo:</p><p class="col-7">${car.odo}km</p>
          </div>
        </div>
      </div>
    <div class="col-7 card_info">
      <div class="card_title">
        <p>${title}</p>
        <button class="like ${JSON.parse(localStorage.likeList).includes(car.id) ? 'fas' : 'far'} fa-heart" data-id="${car.id}"></button>
      </div>
      <div class="card_subtitle">
        <p>${car.seller}</p>
        <p><i class="fas fa-map-marker-alt map-marker"></i>${car.country}</p>
      </div>
      <div class="car_info">
      <div class="car_info_title"><p>About car</p></div>
      <div class="car_info_block row">
        <div class="car_info_info col-3">Engine: ${car.engine_volume}</div>
        <div class="car_info_info col-5">Color: ${car.color}</div>
        <div class="car_info_info col-3">${car.fuel} ${fuelIcon}</div>
        <div class="car_info_consume col-6 row car_info_consume_first">
          <div class="car_info_info  car_info_fuel_consume col-6">Fuel consume:</div>
          <div class="car_info_consume_statistic col-6">
            <div class="car_info_info car_info_consume col-12"> ${fuelConsumeRoad}</div>
            <div class="car_info_info car_info_consume col-12"> ${fuelConsumeCity}</div>
            <div class="car_info_info car_info_consume col-12"> ${fuelConsumeMixed}</div>
          </div> 
        </div> 
      </div>
    </div>
      <div class="car_raiting"><p>${stars} </p><p><i class="far fa-eye reviews"></i>${car.reviews}</p><p data-id="${car.id}"></p></div>
      <div class="car_price">${currencyFormatter.format(car.price * USD)}</div>
      <button type="button" class="btn btn-success btn-buy">BUY</button>
      <button type="button" class="btn btn-primary">CALL</button>
      <div class="numbers">
        <div class="number">${car.phone}</div>
        <div class="number">${dateFormatter.format(car.timestamp)}</div>
      </div>
    </div>
  </div>`
}



// async function f() {
//   console.log(1);
// }

// setTimeout(() => {
//   console.log(2);
// }, 0);

// console.time('cycle')
// for (let i = 0; i < 500000000; i++) {
//   const r = Math.random()
// }
// console.timeEnd('cycle')

// console.log(3);
// f()


// let formtDate = dateFormatter.format(time)

// console.log(formtDate);


// setInterval(() => {
//   watch.textContent = dateFormatter.format(Date.now())
// }, 1000);