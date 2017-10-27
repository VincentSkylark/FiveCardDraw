'use strict';

$(document).ready(function () {
    // View Model
    $(".dots").each(function(){
        $(this).html("................................................................................................................");
    });

    let credit = 1000;
    let win = 0;
    let total = 0;

    let card0 = document.getElementById('card0').getContext('2d');
    let card1 = document.getElementById('card1').getContext('2d');
    let card2 = document.getElementById('card2').getContext('2d');
    let card3 = document.getElementById('card3').getContext('2d');
    let card4 = document.getElementById('card4').getContext('2d');

    let cards = [
        {
            canvas: card0,
            suit: 'h',
            point: 'A',
            isHeld: false,
            infoId:'#isHeld0'
        }, {
            canvas: card1,
            suit: 'd',
            point: '3',
            isHeld: false,
            infoId:'#isHeld1'
        }, {
            canvas: card2,
            suit: 'h',
            point: '6',
            isHeld: false,
            infoId:'#isHeld2'
        }, {
            canvas: card3,
            suit: 'c',
            point: 'J',
            isHeld: false,
            infoId:'#isHeld3'
        }, {
            canvas: card4,
            suit: 'd',
            point: 'Q',
            isHeld: false,
            infoId:'#isHeld4'
        }
    ];
    $("#card0").on("click",()=>{
        cards[0].isHeld = !cards[0].isHeld;
        if(cards[0].isHeld){
            $(cards[0].infoId).css("visibility","visible");
        }else{
            $(cards[0].infoId).css("visibility","hidden");
        }
    });
    $("#card1").on("click",()=>{
        cards[1].isHeld = !cards[1].isHeld;
        if(cards[1].isHeld){
            $(cards[1].infoId).css("visibility","visible");
        }else{
            $(cards[1].infoId).css("visibility","hidden");
        }
    });
    $("#card2").on("click",()=>{
        cards[2].isHeld = !cards[2].isHeld;
        if(cards[2].isHeld){
            $(cards[2].infoId).css("visibility","visible");
        }else{
            $(cards[2].infoId).css("visibility","hidden");
        }
    });
    $("#card3").on("click",()=>{
        cards[3].isHeld = !cards[3].isHeld;
        if(cards[3].isHeld){
            $(cards[3].infoId).css("visibility","visible");
        }else{
            $(cards[3].infoId).css("visibility","hidden");
        }
    });
    $("#card4").on("click",()=>{
        cards[4].isHeld = !cards[4].isHeld;
        if(cards[4].isHeld){
            $(cards[4].infoId).css("visibility","visible");
        }else{
            $(cards[4].infoId).css("visibility","hidden");
        }
    });

    let drawCard = function(value, cardNumber){
        cards[cardNumber].suit = value[0];
        cards[cardNumber].point = value.substring(1,value.length);
        cards.forEach((card)=>{
            card.canvas.drawPokerCard(10, 10, 120, card.suit, card.point);
        });
    };

    // Controller
    const cardSuit = ['h', 'd', 's', 'c'];
    const cardPoint = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    let drawList = [];
    let getRandomCard = function () {
        let suit = cardSuit[Math.floor(Math.random() * cardSuit.length)];
        let point = cardPoint[Math.floor(Math.random() * cardPoint.length)];
        if (drawList.indexOf(suit + point) > -1) {
            return getRandomCard(); // if card has been drawn, draw another one
        } else {
            drawList.push(suit + point);
            return suit + point;
        }
    };


    // check hand of cards and return odd
    let handCheck = function(){
        let pointTable = {
            '2':0, '3':0, '4':0, '5':0, '6':0, '7':0, '8':0, '9':0, '10':0, 'J':0, 'Q':0, 'K':0, 'A':0
        };
        let suitTable = {'h':0, 'd':0, 's':0, 'c':0};
        let pointAsNumber = [];
        let check = {
            jackOrHigher:false,
            pair:0,
            three:false,
            four:false,
            straight:false,
            flush:false
        };
        // check flush
        cards.forEach((card)=>{
            pointTable[card.point]++;
            suitTable[card.suit]++;
            switch(card.point){
                case 'J':
                    pointAsNumber.push(11);
                    break;
                case 'Q':
                    pointAsNumber.push(12);
                    break;
                case 'K':
                    pointAsNumber.push(13);
                    break;
                case 'A':
                    pointAsNumber.push(1);
                    pointAsNumber.push(13);
                    break;
                default:
                    pointAsNumber.push(~~card.point);
            }
        });
        pointAsNumber.forEach((point)=>{
            if(pointAsNumber.includes(point+1) && pointAsNumber.includes(point+2) && pointAsNumber.includes(point+3) && pointAsNumber.includes(point+4) ){
                check.flush = true;
            }
        });
        // check pair Jack or higher, 2 pair, 3 of a kind and 4 of a kind
        pointTable = Object.entries(pointTable);
        pointTable.forEach((row)=>{
            if((row[0]=='J' || row[0]=='Q' || row[0]=='K' || row[0]=='A') && row[1]==2){check.jackOrHigher = true;}
            if(row[1]==2){check.pair++;}
            if(row[1]==3){check.three = true;}
            if(row[1]==4){check.four = true;}
        });
        suitTable = Object.entries(suitTable);
        suitTable.forEach((suit)=>{
            if(suit[1]==5){check.straight = true;}
        });

        if(suitTable[0][1]==4 && pointAsNumber.includes(10) && pointAsNumber.includes(13) && check.flush){
            return 1000; // Royal Flush
        }else if(check.straight && check.flush) {
            return 50; // Straight Flush
        }else if(check.four){
            return 25; // 4 of a kind
        }else if(check.three && check.pair){
            return 10; // full house
        }else if(check.flush){
            return 7; // flush
        }else if(check.straight){
            return 5; // straight
        }else if(check.three){
            return 4; // 3 of a kind
        }else if(check.pair == 2){
            return 3; // 2 pairs
        }else if(check.jackOrHigher){
            return 1; // Jack of Higher
        }else{
            return 0; // High card
        }
    };

    let newGame = function(){
        let cardValue;
        drawList = [];
        for(let i=0; i<5; i++){
            cardValue = getRandomCard();
            drawCard(cardValue, i);
        }
    };

    newGame();

    $("#newGame").on("click",()=>{
        credit -= 1;
        newGame();
        $("#deal").removeAttr("disabled");
        $("#credits").html(credit);
    });

    $("#deal").on("click",()=>{
        cards.forEach((card)=>{
            if(!card.isHeld){
                let cardValue = getRandomCard();
                card.suit = cardValue[0];
                card.point = cardValue.substring(1,cardValue.length);
                card.canvas.drawPokerCard(10, 10, 120, card.suit, card.point);
            }
            card.isHeld = false;
            $(card.infoId).css("visibility","hidden");
        });
        $("#deal").attr("disabled","disabled");
        credit += handCheck();
        $("#credits").html(credit);
        if(handCheck()){win++;}
        total++;
        $("#wins").html(win + " / " + total);
    });
});