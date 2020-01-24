Vue.component('player-select', {
    data: function () {
        return {
            names: []
        }
    },
    template: '<!--<template><div class="container-fluid"><form><div class="form-group"><input type="text" class="form-control" v-model="names[0]"></div></form></div></template>-->'
});

Vue.component('text-color-game', {
    data: function () {
        return {
            colours: [
                {
                    name: 'Blau',
                    colour: '#007ebc'
                },
                {
                    name: 'Rot',
                    colour: '#b52732'
                },
                {
                    name: 'Gelb',
                    colour: '#cdc519'
                },
                {
                    name: 'Grün',
                    colour: '#00d159'
                },
                {
                    name: 'Lila',
                    colour: '#9600d7'
                },
                {
                    name: 'Schwarz',
                    colour: '#190d0b'
                },
                {
                    name: 'Weiß',
                    colour: '#dfd9f2'
                },
                {
                    name: 'Orange',
                    colour: '#c47200'
                }],
            colourName: '',
            currentColor: 1,
            currentStyle: {},
            gameMessage: "Drück den Knopf, wenn der Text Blau ist!",
            hitCounter: 0,
            clicked: false,
            wasBlue: false,
            background: '#190d0b',
            interval: null
        }
    }, computed: {},
    methods: {
        rotateColours() {
            let vm = this;
            vm.interval = setInterval(function () {
                if (!vm.wasBlue) {

                    let index;
                    for (let i = 0; i < 3; i++) {
                        index = Math.floor(Math.random() * vm.colours.length);
                        if (index !== 0) {
                            break;
                        }
                    }
                    if (vm.colourName === vm.colours[index].name) {
                        vm.colourName = vm.colours[(index + 1) % vm.colours.length].name;
                    } else {
                        vm.colourName = vm.colours[index].name;
                    }

                    let index1 = Math.floor(Math.random() * vm.colours.length);
                    let index2 = index1;
                    do {
                        index1 = Math.floor(Math.random() * vm.colours.length);
                    } while (index2 === index1)
                    setTimeout(function () {
                        vm.currentColor = index2;
                        if (index2 === 0) {
                            vm.wasBlue = true;
                        }
                        vm.clicked = false;
                    }, 70);

                    vm.currentStyle = {
                        backgroundColor: vm.colours[index1].colour,
                        shadowColor: vm.colours[index2].colour,
                        color: vm.colours[index2].colour
                    }
                } else {
                    vm.gameMessage = "Daneben. Trink einen Schluck!";
                    vm.background = vm.colours[1].colour;
                    vm.hitCounter = -1;s
                    //clearInterval(vm.interval);
                }
            }, 500);
        },
        evaluateHit() {
            if (!this.clicked) {
                this.clicked = true;
                if (this.currentColor === 0) {
                    this.hitCounter++;
                    this.wasBlue = false;
                    switch (this.hitCounter) {
                        case 5:
                            this.gameMessage = this.hitCounter + " Treffer! Drei Schlücke verteilen oder weitermachen.";
                            break;
                        case 10:
                            this.gameMessage = this.hitCounter + " Treffer! Fünf Schlücke verteilen oder weitermachen.";
                            break;
                        case 15:
                            this.gameMessage = this.hitCounter + " Gewonnen! Zehn Schlücke verteilen!";
                            this.hitCounter = 0;
                            let vm = this;
                            setTimeout(function () {
                                vm.gameMessage = "Drück den Knopf, wenn der Text Blau ist."
                            }, 1500);
                            break;
                        default:
                            this.gameMessage = this.hitCounter + " Treffer!";
                    }

                } else {
                    console.log(this.hitCounter);
                    if (this.hitCounter < 5) {
                        this.gameMessage = "Daneben. Trink einen Schluck!";
                    } else if (this.hitCounter >= 5 && this.hitCounter < 10) {

                        this.gameMessage = "Daneben. Trink zwei Schlücke!";
                    } else if (this.hitCounter >= 10 && this.hitCounter < 15) {
                        this.gameMessage = "Daneben. Trink fünf Schlücke!";
                    }
                    this.hitCounter = 0;


                    let vm = this;
                    setTimeout(function () {
                        vm.gameMessage = "Drück den Knopf, wenn der Text Blau ist."
                    }, 3000);
                }
            }
        }
    }, created() {
        this.rotateColours();
    },
    template: '<div class="container-fluid"><div class="text-container"><div class="container__text" :style="currentStyle" @mousedown="evaluateHit()"><h2>{{ colourName }}</h2></div></div><p class="game-message">{{gameMessage}}</p></div>'
})
;

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        gameStarted: false,
        backgroundColor: '#07070d'
    }, methods: {
        gameStopped(){
            console.log('blub');
            this.backgroundColor = '#b52732'
        }
    }
});