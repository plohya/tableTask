import '../css/style.scss';
import arr from './arrayOfObjects.js';

  class Table{
    constructor(array) {
      this.array = array;
      this.amount = 10; 
      this.page = 1;
      this.sortInformation = {
        title: '',
        desc: -1
      };
    }

    // Initializing method
    init() {
        this.$table = document.createElement('div');
        this.$table.classList.add('tableArea');
        this.$buttonsList = document.createElement('div');
        this.$buttonsList.classList.add('btnList');

        this.drawDynamicButtons();
        this.drawPagButtons();
        this.drawTitles();
        this.drawCells(this.page);
    }

    // Method draws Buttons that can be used for dynamic change (amount elements on page) + addEventListeners for them
    drawDynamicButtons() {
        this.$buttonsList.innerHTML += `<div class='dynamic-list'><div class='text'>Elements on page:</div><button class='dynamicListItem active'>10</button><button class='dynamicListItem'>20</button><button class='dynamicListItem'>50</button><button class='dynamicListItem'>ALL</button></div>`

        document.querySelector('body').appendChild(this.$buttonsList);
        document.querySelectorAll('.dynamicListItem').forEach(item => item.addEventListener('click', (e) => 
                                                          this.dynamicView(e.target.textContent, e.target)));
    }

    // Method draws Buttons that can be used for pagination (reDrawing if pagination pages got new amount) + addEventListeners for them
    drawPagButtons(){
        if(document.querySelector('.pagBtnsList')){
            document.querySelector('.pagBtnsList').remove();
        }

        const pagPageAmount = Math.ceil(this.array.length / this.amount);
        const $pagBtnList = document.createElement('div');
        $pagBtnList.classList.add('pagBtnsList');
        $pagBtnList.innerHTML += `<div class='text'>Pagination buttons:</div>`;
        for(let i = 0; i < pagPageAmount; i++) {
            $pagBtnList.innerHTML += `<button class='pagListItem'>${i+1}</button>`;
        }

        this.$buttonsList.appendChild($pagBtnList);
        document.querySelectorAll('.pagListItem').forEach(item => item.addEventListener('click', (e) => 
                                                          this.drawCells(e.target.textContent)));
    }

    // Method that creates an element on the page and fills it by titles from the array of object + creating arrows for sorting  + addEventListeners for them
    drawTitles() {
        let $titles = document.createElement('div');
        $titles.classList.add('titlesArea');

        const keysArray = this.array.map(item => Object.keys(item));
        this.titlesArray = [];

        for(let i = 0 ; i < keysArray.length; i++) {
          keysArray[i].forEach(item => {
            if(!this.titlesArray.includes(item)) {
              this.titlesArray.push(item);
            }
          });
        }
        $titles.innerHTML = this.titlesArray.map(item => `<div class='tableTopElement'>${item}<div class='sortButton'>></div></div>`).join(' ');
        this.$table.appendChild($titles);
        document.querySelector('body').appendChild(this.$table);
        document.querySelectorAll('.sortButton').forEach(item => item.addEventListener('click', (e) => this.arrowBtnClick(e.target.parentElement.firstChild.textContent, e.target)));
    }

    // Method that creates an element on the page and fills it by data from the array of object
    drawCells(page) {
      if(document.querySelectorAll('.pagListItem')) {
        document.querySelectorAll('.pagListItem').forEach(item => this.checkBtn(item));
        document.querySelectorAll('.pagListItem')[page-1].classList.add('active');
      }
      this.clearCells();
      let $cellsArea = document.createElement('div');
      $cellsArea.classList.add('cellsArea');

      const start = (page - 1) * this.amount;   
      const end = start + this.amount;
      let pageArr = this.array.slice(start, end);

        pageArr.forEach(item => {
        let $cellsRow = document.createElement('div');
        for (let i = 0; i < this.titlesArray.length; i++) {
          if(item[this.titlesArray[i]] === undefined) {
            $cellsRow.innerHTML += `<div class='tableElement'>~</div>`;
          } else {
            $cellsRow.innerHTML += `<div class='tableElement'>${item[this.titlesArray[i]]}</div>`;
          }
        }
        $cellsArea.appendChild($cellsRow);
      });

      this.$table.appendChild($cellsArea);
    }

    // Method that understand did u sorted it before? what should event do? (sort/reverseSort)
    arrowBtnClick(title, btn) {
      if(document.querySelectorAll('.backSortButton')){
        document.querySelectorAll('.backSortButton').forEach(item => this.checkBtn(item));
      }

      if(this.sortInformation.desc === -1 && this.sortInformation.title === title) {
        this.sortTable(title, 'ascending');
        this.sortInformation.desc = 1;
        btn.classList.remove('backSortButton');
      } else {
        this.sortTable(title, 'descending');
        this.sortInformation.desc = -1;
        btn.classList.add('backSortButton');
      }

      this.sortInformation.title = title;
      this.drawPagButtons();
      this.drawCells(this.page);
    }

    // Method that tells drawCells() required amount of elements on each page
    dynamicView(elementsOnPage, btn) {
      if(document.querySelectorAll('.active')) {
        document.querySelectorAll('.active').forEach(item => this.checkBtn(item));
      }
      btn.classList.add('active');

        if(elementsOnPage === 'ALL') {
            this.amount = this.array.length;
        } else {
            this.amount = parseInt(elementsOnPage);
        }

        this.drawPagButtons();
        this.drawCells(this.page);  
    }

    // Method that got possibility to sort table in two-ways
    sortTable(objectField, way) {
      if(way === 'ascending') {
        this.array.sort(function(a,b) {
          return ((a[objectField] < b[objectField]) ? 1 : ((a[objectField] > b[objectField]) ? -1 : 0));
        });
      } else if(way === 'descending'){
        this.array.sort(function(b,a) {
          return ((a[objectField] < b[objectField]) ? 1 : ((a[objectField] > b[objectField]) ? -1 : 0));
        });
      }
      this.drawCells(this.page);
    }

    // Method that checks, is there (at nodelist) pressed items?
    checkBtn(item){
      if(item.classList.contains('active')){
        item.classList.remove('active');
      } else if(item.classList.contains('backSortButton')) {
        item.classList.remove('backSortButton');
      }
    }

    // Method that removes cellsArea from DOM. All data (not titles) from objects are in cellsArea 
    clearCells() {
        if(document.querySelector('.cellsArea')) {
            document.querySelector('.cellsArea').remove();
        }
    }

}

const table = new Table(arr);
table.init();