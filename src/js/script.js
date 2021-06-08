import '../css/style.scss';
import arr from './arrayOfObjects.js';

class Table{
  constructor(array) {
    this.array = array;
    this.amount = 10; 
    this.$arrowBtnList = null;
    this.sortInformation = {
      title: '',
      desc: -1
    };
    this.$pagBtns = document.getElementById('pagination');
    this.$table = document.getElementById('tableArea');
    this.$dynamicList = document.querySelectorAll('.item');
  }
    
  init(){
    this.drawTitles(this.array);
    this.$table.innerHTML += `<div id='cellsArea' class='cellsArea'></div>`;
    this.$cellsArea = document.getElementById('cellsArea');
    this.drawCells(this.array);
    this.$pagList();
    this.$arrowBtnList = document.querySelectorAll('.sortButton');
    this.$pagPageNum = document.getElementById('list');
    this.$arbtns = document.querySelectorAll('.sortButton');
    this.$arbtns.forEach(item => item.addEventListener('click', (e) => this.arrowBtnClick(e.target.parentElement.textContent, e.target)));
    this.$dynamicList.forEach(item => item.addEventListener('click', (e) => this.dynamicView(e.target)));
  }
    
  drawTitles(){
    for (let key in this.array[0]) {
      this.$table.innerHTML += `<div class='tableTopElement'>${key}<span class='sortButton'></span><img class="sortButton" src='img/angle-arrow-down_icon-icons.com_73683.svg'></div>`;
    }
  }
    
  drawCells(array){
    this.clearCells();
    for(let i = 0; i < this.amount; i++) {
      for(let key in array[i]) {
        this.$cellsArea.innerHTML += `<div class='tableElement'>${array[i][key]}</div>`;
      }
    }
  }

  $pagList(){
    this.$pagPageNum = Math.ceil(this.array.length / this.amount);
    this.$pagBtns.innerHTML = '';
    for(let i = 0; i < this.$pagPageNum; i++) {
      this.$pagBtns.innerHTML += `<button class='list_item'>${i+1}</button>`;
    }
    this.$pagBtn = document.querySelectorAll('.list_item');
    this.$pagBtn[0].classList.add('active');
    this.$pagBtn.forEach(item => item.addEventListener('click', (e) => this.pagChange(e.target)))
  }
      
  pagChange(page){
    this.$pagBtn.forEach(item => this.checkBtn(item));
    let start = (page.textContent-1) * this.amount;
    let end = start + this.amount;
    console.log(start, end);
    let a = this.array.slice(start,end);
    console.log(a);
    this.drawCells(a);
    page.classList.toggle('active');
  }

  arrowBtnClick(title, btn) {
      this.$arbtns.forEach(item => this.checkBtn(item));
      if(this.sortInformation.desc === -1 && this.sortInformation.title === title) {
      this.reverseSortTable(this.array, title);
      this.drawCells(this.array);
      this.sortInformation.desc = 1;
      this.sortInformation.title = title;
      btn.classList.remove('backSortButton');
      this.$pagList();
    } else {
      this.sortTable(this.array, title);
      this.drawCells(this.array);
      this.sortInformation.desc = -1;
      this.sortInformation.title = title;
      btn.classList.add('backSortButton');
      this.$pagList();
    }
  }

  dynamicView(button){
    this.$dynamicList.forEach(item => this.checkBtn(item));
    if(button.textContent === 'ALL') {
      this.amount = this.array.length;
      this.drawCells(this.array);
      this.$pagList();
    } else {
      this.amount = parseInt(button.textContent);
      this.dynamicChange();
      this.$pagList();
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

  dynamicChange() {
    this.clearCells();
    for(let i = 0; i < this.amount; i++) {
      for(let key in this.array[i]) {
        this.$cellsArea.innerHTML += `<div class='tableElement'>${this.array[i][key]}</div>`;
      }
    }
  }

  sortTable(array, objectField) {
    return array.sort(function(a,b) {
        let x = a[objectField], y = b[objectField];
        return ((x > y) ? 1 : ((x < y) ? -1 : 0));
    })
  }

  reverseSortTable(array, objectField) {    
    return array.sort(function(a,b) {
        let x = a[objectField], y = b[objectField];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    })
  }
  
    clearCells() {       
      this.$cellsArea.innerHTML = ''; 
    }

}

const table = new Table(arr);
table.init();