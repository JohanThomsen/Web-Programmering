/*console.log("Hello World!!");

let markMass, johnMass, markHeight, johnHeight;

markMass = 90;
markHeight = 1.80;

johnMass = 80;
johnHeight = 1.95;

let johnBMI = johnMass / (johnHeight * johnHeight);
let markBMI = markMass / (markHeight * markHeight);

let isMarkBMIHigher = markBMI > johnBMI;
console.log("Mark BMI: " + markBMI + " John BMI: " + johnBMI)
console.log("Is Marks BMI higher than Johns ? " + isMarkBMIHigher);*/ 

/*let johnAverage = (89  + 120 + 103) / 3;
let mikeAverage = (100 + 94  + 123) / 3;
let maryAverage = (97  + 134 + 105) / 3;

switch (true)
{
    case (johnAverage > maryAverage) && (johnAverage > mikeAverage):
        console.log('John Wins with ' + johnAverage);
        break;
    case (maryAverage > johnAverage) && (maryAverage > mikeAverage):
        console.log('Mary Wins with ' + maryAverage);
        break;
    case (mikeAverage > maryAverage) && (mikeAverage > johnAverage):
        console.log('Mike Wins with ' + mikeAverage);
        break;        
    default:
        console.log('Its a draw');
}*/ 

let john = {
    name: "John Madsen",
    mass: 80,
    height: 1.95,
    calcBMI: function(){
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI;
    }

}

let mark = {
    name: "Mark Johnson",
    mass: 65,
    height: 1.90,
    calcBMI: function(){
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI;
    }

}

if (john.calcBMI() > mark.calcBMI()) {
    console.log(john.name + " has the higest BMI with " + john.BMI);
} else if (john.calcBMI() < mark.calcBMI()) {
    console.log(mark.name + " has the higest BMI with " + mark.BMI);
} else {
    console.log("They have the same BMI");
}
console.log(mark.BMI);

var john = {
    fullName: 'John Smith',
    bills: [124, 48, 268, 180, 42],
    calcTips: function() {
        this.tips = [];
        this.finalValues = [];
                
        for (var i = 0; i < this.bills.length; i++) {
            // Determine percentage based on tipping rules
            var percentage;
            var bill = this.bills[i];
            
            if (bill < 50) {
                percentage = .2;
            } else if (bill >= 50 && bill < 200) {
                percentage = .15;
            } else {
                percentage = .1;
            }
            
            // Add results to the corresponing arrays
            this.tips[i] = bill * percentage;
            this.finalValues[i] = bill + bill * percentage;
        }
    }
}

var mark = {
    fullName: 'Mark Miller',
    bills: [77, 475, 110, 45],
    calcTips: function() {
        this.tips = [];
        this.finalValues = [];
                
        for (var i = 0; i < this.bills.length; i++) {
            // Determine percentage based on tipping rules
            var percentage;
            var bill = this.bills[i];
            
            if (bill < 100) {
                percentage = .2;
            } else if (bill >= 100 && bill < 300) {
                percentage = .1;
            } else {
                percentage = .25;
            }
            
            // Add results to the corresponing arrays
            this.tips[i] = bill * percentage;
            this.finalValues[i] = bill + bill * percentage;
        }
    }
}

function calcAverage(tips) {
    var sum = 0;
    for (var i = 0; i < tips.length; i++) {
        sum = sum + tips[i];
    }
    return sum / tips.length;
}

// Do the calculations
john.calcTips();
mark.calcTips();

john.average = calcAverage(john.tips);
mark.average = calcAverage(mark.tips);
console.log(john, mark);

if (john.average > mark.average) {
    console.log(john.fullName + '\'s family pays higher tips, with an average of $' + john.average);
} else if (mark.average > john.average) {
    console.log(mark.fullName + '\'s family pays higher tips, with an average of $' + mark.average);
}