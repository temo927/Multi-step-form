const slides = document.querySelectorAll(`.slide`);
const next = document.querySelector(`.form__button--next`);
const back = document.querySelector(`.form__button--back`);
const confirm = document.querySelector(`.form__button--confirm`);
const nameInput = document.querySelector(`#name`);
const emailInput = document.querySelector(`#email`);
const numberInput = document.querySelector(`#number`);
const label = document.querySelectorAll(`.required`);
const monthly = document.querySelector(`#rad1`);
const yearly = document.querySelector(`#rad2`);
const priceContainer = document.querySelectorAll(`.price`);
const offerContainer = document.querySelectorAll(`.offer`);
const planContainer = document.querySelector(`.bill__plans`);
const warning = document.querySelector(`.warning`);
const checkBox1 = document.querySelector(`#online__service`);
const checkBox2 = document.querySelector(`#larger__storage`);
const checkBox3 = document.querySelector(`#costum__profile`);

class User {
  constructor(name, email, phone, bill) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.bill = bill;
  }
}

let payOption = `Yearly`;
class App {
  #currentSlide = 0;
  #maxSlide = slides.length;

  constructor(nameArr, priceArr) {
    this.nameArr = nameArr;
    this.priceArr = priceArr;
    this.#goToSlide(0);
    next.addEventListener(`click`, this.#nextSlide.bind(this));
    back.addEventListener(`click`, this.#prevSlide.bind(this));
    monthly.addEventListener(`change`, this.#planMonth);
    yearly.addEventListener(`change`, this.#planYear);
    planContainer.addEventListener(`click`, this.#selectPlan);
    checkBox1.addEventListener(`click`, this.#infoCheck.bind(this, 1));
    checkBox2.addEventListener(`click`, this.#infoCheck.bind(this, 2));
    checkBox3.addEventListener(`click`, this.#infoCheck.bind(this, 3));
  }

  #goToSlide(slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  }

  #nextSlide(e) {
    e.preventDefault();

    const nameVal = nameInput.value;
    const emailVal = emailInput.value;
    const numberVal = numberInput.value;
    // form validation
    if (!this.#formValid(nameVal, emailVal, numberVal)) return;
    this.#currentSlide++;

    if (this.#currentSlide === this.#maxSlide - 2) {
      // show confrim button
      next.classList.add(`form__button--confirm`);
      next.textContent = `Confirm`;
    }
    if (this.#currentSlide === this.#maxSlide - 1) {
      document.querySelector(`.slide--4`).classList.add(`hidden`);

      next.classList.add(`hidden`);
      back.textContent = ``;
    }
    // show back button
    back.classList.remove(`hidden`);

    this.#goToSlide(this.#currentSlide);
    this.#summary();
  }

  #prevSlide() {
    this.#currentSlide--;
    this.#currentSlide === 0 && back.classList.add(`hidden`);

    if (this.#currentSlide === this.#maxSlide - 3) {
      next.classList.remove(`form__button--confirm`);
      next.textContent = `Next Step`;
    }

    this.#goToSlide(this.#currentSlide);
  }

  #planMonth() {
    const monthPriceArr = [`$9/mo`, `$12/mo`, `$15/mo`];
    priceContainer.forEach((p, i) => {
      p.textContent = monthPriceArr[i];
    });
    offerContainer.forEach((o) => o.classList.add(`hidden`));
    document
      .querySelectorAll(`.plan`)
      .forEach((p) => (p.style.height = `120px`));

    document.querySelectorAll(`.option`).forEach((p, i) => {
      const arrPrice = [`+$1/mo`, `+$2/mo`, `+$2/mo`];
      p.textContent = arrPrice[i];
    });
    payOption = `Monthly`;
  }

  #planYear() {
    const yearPriceArr = [`$90/yr`, `$129/yr`, `$150/yr`];
    priceContainer.forEach((p, i) => {
      p.textContent = yearPriceArr[i];
    });
    offerContainer.forEach((o) => o.classList.remove(`hidden`));
    document;
    document
      .querySelectorAll(`.plan`)
      .forEach((p) => (p.style.height = `140px`));

    document.querySelectorAll(`.option`).forEach((p, i) => {
      const arrPrice = [`+$10/yr`, `+$20/yr`, `+$20/yr`];
      p.textContent = arrPrice[i];
    });
    payOption = `Yearly`;
  }

  #selectPlan(e) {
    const clicked = e.target.closest(`.plan`);
    const siblings = clicked.closest(`.bill__plans`).querySelectorAll(`.plan`);

    clicked.classList.add(`active`);

    siblings.forEach((el) => {
      if (el !== clicked) el.classList.remove(`active`);
    });
  }

  #infoCheck(num) {
    const check = document.querySelector(`.check-${num}`);
    const formName = check.querySelector(`h2`).textContent;
    const formPrice = check.querySelector(`span`).textContent;

    check.classList.toggle(`active-${num}`);

    if (check.classList.contains(`active-${num}`)) {
      this.nameArr.unshift(formName);
      this.priceArr.unshift(formPrice);
    } else {
      this.nameArr.shift();
      this.priceArr.shift();
    }
  }
  #formValid(name, email, number) {
    if (name === `` || name === null) {
      [...label][0].classList.remove(`hidden`);
    } else {
      [...label][0].classList.add(`hidden`);
    }
    if (email === `` || email === null) {
      [...label][1].classList.remove(`hidden`);
    } else {
      [...label][1].classList.add(`hidden`);
    }
    if (number === `` || number === null) {
      [...label][2].classList.remove(`hidden`);
    } else {
      [...label][2].classList.add(`hidden`);
    }
    if (
      name === `` ||
      name === null ||
      email === `` ||
      email === null ||
      number === `` ||
      number === null
    ) {
      return false;
    } else {
      return true;
    }
  }

  #summary() {
    let planActive;
    let priceActive;
    let payOpt;
    let payO;
    let sumPrice;
    const emp = [];
    const plan = document.querySelectorAll(`.plan`);
    plan.forEach((p) => {
      if (p.classList.contains(`active`)) {
        planActive = p.querySelector(`h2`).textContent;
        priceActive = p.querySelector(`.price`).textContent;
      }
    });
    emp.push(Number.parseInt(priceActive.slice(1), 10));

    this.priceArr.forEach((p) => {
      if (p !== ``) {
        emp.push(Number.parseInt(p.slice(2), 10));
      }
    });
    if (typeof emp[0] === `number`) {
      sumPrice = emp.reduce((acu, p) => acu + p);
    }

    payOption === `Monthly` ? (payOpt = `month`) : (payOpt = `year`);
    payOption === `Monthly` ? (payO = `mo`) : (payO = `yr`);

    const [firstPrice = ``, secondPrice = ` `, thirdPrice = ``] = this.priceArr;
    const [firstName = ``, secondName = ``, thirdName = ``] = this.nameArr;

    const html = `
                  <div class="box"> 
                   <div class="summary__plan"> 
                  <label>${planActive}(${payOption})</label>
                    <a>Change</a>
                  </div>

                  <p>${firstName}</p>
                  <p>${secondName}</p>
                  <p>${thirdName}</P>
                </div>
                <div class="summary__price">
                   <p>${priceActive}</p>
                   <p>${firstPrice}</p>
                  <p>${secondPrice}</p>
                 <p>${thirdPrice}</p>
                </div> 
                <div class ="total">
                  <p>Total(${`${payOpt}`})</p>
                   <p>$${sumPrice}/${payO}</p>
                </div>
                `;

    const box = document.querySelector(`.summary`);
    box.insertAdjacentHTML(`afterbegin`, html);

    const user = new User(
      nameInput.value,
      emailInput.value,
      numberInput.value,
      sumPrice
    );
  }
}

const app = new App([], []);
