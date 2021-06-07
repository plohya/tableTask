const carOne = {
  "color": "purple",
  "type": "minivan",
  "registration": '2014',
  "capacity": 7
},
carTwo = {
  "color": "white",
  "type": "duster",
  "registration": '2010',
  "capacity": 5
},
carThree = {
  "color": "orange", 
  "type": "boombox",
  "registration": '2015',
  "capacity": 50
},
carFour = {
  "color": "white",
  "type": "cheezee",
  "registration": '2001',
  "capacity": 16
},
carFive = {
  "color": "red",
  "type": "boombox",
  "registration": '2008',
  "capacity": 50
};

  const arr = [carOne, carTwo, carThree, carFour, carFive,carOne, carTwo, carFour, carFive,carOne, carTwo, carThree, carFour, carFive,carOne, carTwo, carThree, carFour, carFive,carFour, carThree];

  // не навешивать класс, а сделать 2 eventа, если нажал на первый, то оно пойдёт на второй как-то так
class Table{
  constructor(array) {
      this.array = array;
      this.sorted = false;
      this.amount = 10; 
      this.$table = document.getElementById('tableArea');
      this.$dynamicList = document.querySelectorAll('.item');
      this.$arrowBtnList = null;
      this.$pagBtnsList = null;
      this.$pagination_element = document.getElementById('pagination');
      this.counter = 0;
      this.sortInformation = {
        title: '',
        desc: -1
      };
   
      // this.clicked = function(e) {
      //   let $button = e.target,
      //       name,
      //       $btnCls = $button.classList;
      //   if($btnCls.contains('sortButton')) {
      //   if($btnCls.contains('sortButton')) {
      //       name = $button.parentElement.innerText;
      //       this.sortedTableDraw(this.array, name);
      //       this.drawTable(this.array);
      //       this.drawTable(this.sortedTableDraw(this.array, name));
      //       $btnCls.toggle('backSortButton');    // button not reversing on 180deg
      //       this.counter = 2;
      //   } else if($btnCls.contains('sortButton') && this.counter === 2) {
      //   } else if($btnCls.contains('backSortButton')) {
      //       name = $button.parentElement.innerText;
      //       this.reverseSortTableDraw(this.array, name);
      //       this.drawTable(this.array);
      //       $btnCls.remove('backSortButton');  // button not reversing on 180deg
      //       this.counter = 1;
      //   } else if ($btnCls.contains('item')) {
      //       if($button.textContent === 'ALL') {
      //         this.clearCells();
      //         this.amount = this.array.length;
      //         this.drawTable(this.array);
      //         $btnCls.toggle('active');
      //       } else {
      //         this.amount = parseInt($button.textContent);
      //         this.dynamicChange(this.array, this.amount);
      //         $btnCls.toggle('active');
      //       }
      //   }
      //   console.log('mainClick');
      // }
      
      // this.clickHandler = this.clicked.bind(this);
      // document.addEventListener('click', this.clickHandler);
  // }

}

  init(){
    this.drawTitles(this.array);
    this.$table.innerHTML += `<div id='cellsArea' class='cellsArea'></div>`;
    this.$cellsArea = document.getElementById('cellsArea');
    this.drawCells(this.array);
    this.$cells = document.querySelectorAll('.tableElement');
    console.log(this.$cellsArea, this.$cells);
    this.addDynamicEvent();
    this.$arrowBtnList = document.querySelectorAll('.sortButton');
    this.$list_element = document.getElementById('list');
    this.displayList();
    this.$arbtns = document.querySelectorAll('.sortButton');
    console.log(this.$arbtns);
    this.$arbtns.forEach(item => item.addEventListener('click', (e) => this.arrowBtnClick(e.target.parentElement.textContent, e.target)));
  }

  arrowBtnClick(title, btn) {
    this.$arbtns.forEach(item => this.checkBtn(item));
    console.log(this.sortInformation.title, this.sortInformation.desc);
    if(this.sortInformation.desc === -1 && this.sortInformation.title === title) {
      this.reverseSortTable(this.array, title);
      this.drawCells(this.array);
      this.sortInformation.desc = 1;
      this.sortInformation.title = title;
      console.log(btn);
      btn.classList.remove('backSortButton');
    } else {
      this.sortTable(this.array, title);
      this.drawCells(this.array);
      this.sortInformation.desc = -1;
      this.sortInformation.title = title;
      btn.classList.add('backSortButton');
    }
  }

  displayList(){
    this.$list_element = Math.ceil(this.array.length / this.amount);
    console.log(this.$list_element);
    this.$pagination_element.innerHTML = '';
    for(let i = 0; i < this.$list_element; i++) {
      this.$pagination_element.innerHTML += `<button class='list_item'>${i+1}</button>`;
    }
    this.$pagBtn = document.querySelectorAll('.list_item');
    this.$pagBtn[0].classList.add('active');
    this.$pagBtn.forEach(item => item.addEventListener('click', (e) => this.pagChange(e.target))
    )};

  pagChange(page){
    this.$pagBtn.forEach(item => this.checkBtn(item));
    let start = (page.textContent-1) * this.amount;
    let end = start + this.amount;
    let a = this.array.slice(start,end);
    console.log('--->', start,end,a);
    this.drawCells(a);
    page.classList.toggle('active');
  }

  addDynamicEvent(){
    this.$dynamicList.forEach(item => item.addEventListener('click', (e) => this.dynamicView(e.target)));
  }
  
  dynamicView(button){
    console.log(button);
    this.$dynamicList.forEach(item => this.checkBtn(item));
    if(button.textContent === 'ALL') {
      this.amount = this.array.length;
      this.drawCells(this.array);
      this.displayList();
    } else {
      this.amount = parseInt(button.textContent);
      this.dynamicChange(this.array, this.amount);
      this.displayList();
    }
    button.classList.toggle('active');
  }
  
  checkBtn(item){
    if(item.classList.contains('active')){
      item.classList.remove('active');
    } else if(item.classList.contains('backSortButton')) {
      item.classList.remove('backSortButton');
    }
  }

  dynamicChange(array, amount) {
    console.log('dynamicChange');
    this.clearCells();
    for(let i = 0; i < this.amount; i++) {
      for(let key in this.array[i]) {
        this.$cellsArea.innerHTML += `<div class='tableElement'>${this.array[i][key]}</div>`;
      }
    }
  }

  drawTitles(){
    console.log('drawTitles');
    for (let key in this.array[0]) {
      this.$table.innerHTML += `<div class='tableTopElement'>${key}<img class="sortButton" src='img/angle-arrow-down_icon-icons.com_73683.svg'></div>`;
    }
  }

  drawCells(array){
    this.clearCells();
    console.log('drawCells');
    for(let i = 0; i < this.amount; i++) {
      for(let key in array[i]) {
        this.$cellsArea.innerHTML += `<div class='tableElement'>${array[i][key]}</div>`;
      }
    }
  }
  // merge sort and reversesortFunctions -> just add parameters
  sortTable(array, objectField) {    
    console.log('sortTable');
    return this.array.sort(function(a,b) {
        let x = a[objectField], y = b[objectField];
        return ((x > y) ? 1 : ((x < y) ? -1 : 0));
    })
  }

  reverseSortTable(array, objectField) {    // sort trouble with registraition date
    console.log('reverseSortTable');
    return array.sort(function(a,b) {
        let x = a[objectField], y = b[objectField];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    })
  }
  
    clearCells() {       // Or i can add it to sort and dynamic change
      this.$cellsArea.innerHTML = ''; 
      console.log('clearCells');
    }

}

const table = new Table(arr);
table.init();