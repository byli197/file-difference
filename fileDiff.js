var myArgs = process.argv.slice(2);
//let f1name = myArgs[0];
//let f2name = '';
//var fileInput = document.getElementById('fileInput');
const fs = require('fs');
//var file = fileInput.files[0]
//const content = fs.readFileSync('blah.txt', {encoding:'utf8', flag:'r'});
let f1lines = fs.readFileSync(myArgs[0], {encoding:'utf8', flag:'r'}).split('\n');
let f2lines = fs.readFileSync(myArgs[1], {encoding:'utf8', flag:'r'}).split('\n');

/*for (let line = 0; line < f1lines.length; line++){
    console.log(f1lines[line]);
    console.log(f2lines[line]);
};*/

function lookForSameLine(line, file, index){
    const count = file.length;
    for (let i = index; i < count; i++){
        if (file[i] === line){
            return (i);
        };
    };
    return (count);
};

function compareFile (f1, f2){
    const count1 = f1.length;
    const count2 = f2.length;
    let index1 = 0;
    let index2 = 0;
    let result = [];

    while (index1 < count1 && index2 < count2){
        if (f1[index1] === f2[index2]){
            result.push(f1[index1]);
            index1++;
            index2++;
        } else {
            next1 = lookForSameLine( f2[index2], f1, index1);
            next2 = lookForSameLine( f1[index1], f2, index2);
            if (next1 === count1 && next2 === count2){
                next1 = index1 + 1;
                next2 = index2 + 1; 
            } else if (next2 === count2 ){
                next2 = index2;
            } else if (next1 === count1){
                next1 = index1;
            };

            for (let i = index1; i < next1; i++){
                result.push("+" + f1[i]);
            };
            for (let i = index2; i < next2; i++){
                result.push("-" + f2[i]);
            };
            index1 = next1;
            index2 = next2;
        };
    };

    return (result);
};

let resultArr = compareFile(f1lines, f2lines);
for (let x = 0; x < resultArr.length; x++){
    console.log(resultArr[x]);
};