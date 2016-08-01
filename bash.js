var commands = require('./commands');

function close(commandList){
    commandList.shift();
    if(commandList.length === 0){
       var printToStdOut = function (data) {
            process.stdout.write(data);
            process.stdout.write("\nprompt > ");
        } 
       return printToStdOut;
    }
    
    else{
        var printToStdIn = function (data) {
            var dat = process.stdin.write(data);
            return dat;
        } 
       return printToStdIn;   
    }
}



// Output a prompt
process.stdout.write('prompt > ');
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
    var cmdString = data.toString().trim();
    var cmdList = cmdString.split(/\s*\|\s*/g) ;
    console.log(cmdList);
    var cmd = cmdList[0].split(' ');
    commands[cmd[0]]('', cmd, close(cmdList));
    //process.stdout.write('\nprompt > ');
});

var endOfCommandCallback = function() {
    
}