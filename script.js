'use strict'

//generowanie ID
function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

//TWORZENIE KOLUMNY
function Column(name) {
    var self = this;
    this.id = randomString();
    this.name = name;
    this.$element = createColumn();
    
    //tworzenie elementów kolumny
    function createColumn(){
        var $column = $('<div>').addClass('column');
        var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
        var $columnCardList = $('<ul>').addClass('column-card-list');
        var $columnDelete = $('<button>').addClass('btn-delete').text('x');
        var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

        //podpinanie zdarzeń do elementów
        $columnDelete.on('click', function(){
            self.removeColumn();
        })

        $columnAddCard.on('click', function(){
            self.addCard(new Card(prompt("Enter the name of the card")));;
        })

        //budowanie kolumny z utworzonych elementów
        $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);
        return $column;
    }
}

Column.prototype = {
   
    addCard: function(card) {
        this.$element.children('ul').append(card.$element);
    },
    
    removeColumn: function() {
        this.$element.remove();
    }
};

//tworzenie karty
function Card(description) {
    var self = this;
    this.id = randomString();
    this.description = description;
    this.$element = createCard();

     //1. TWORZENIE ELEMENTÓW KARTY
    function createCard() {
        var $card = $('<li>').addClass('card');
        var $cardDescription = $('<p>').addClass('card-description').text(self.description);
        var $cardDelete = $('<button>').addClass('btn-delete').text('x');
    
    //2. PODPINANIE ZDARZEŃ
        $cardDelete.click(function(){
            self.removeCard();
        });

    //3. BUDOWANIE KARTY
        $card.append($cardDelete)
            .append($cardDescription);
        return $card;    
    }
}

//karta - prototyp
Card.prototype = {
    removeCard: function() {
        this.$element.remove();
    }
}; 


var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element); 
      initSortable(); 
    },
    $element: $('#board .column-container')
};

function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list', 
      placeholder: 'card-placeholder' 
    }).disableSelection(); 
  }


$('.create-column').click(function(){
    var name = prompt('Enter a column name');
    var column = new Column(name);
    board.addColumn(column);
});  

// tworzenie 3 kolumn
var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');

//dodawanie kolumn do Tablicy
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

//tworzenie kart
var card1 = new Card('New task');
var card2 = new Card('Create kanban boards');

//dodawanie kart do kolumn
todoColumn.addCard(card1);
doingColumn.addCard(card2);