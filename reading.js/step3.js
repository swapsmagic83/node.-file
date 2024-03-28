const fs = require('fs')
const process =require('process')
const axios = require('axios')

function cat(path, outPath){
    fs.readFile(path,'utf-8',(err,data)=>{
        if(err){
            console.log('Error',err);
            process.kill(1)
        }
        if (outPath) {
            fs.writeFile(outPath, data, 'utf-8', function(err) {
                if(err) {
                    console.error("Could not write to file: " + outPath);
                    process.exit(1);
                }
            })
        } else {
            console.log('Data:',data)
        }
        
    })
  }

function webCat(url, outPath){
    res = axios.get(url, {}).then(
        (response) => {
            if (outPath) {
                fs.writeFile(outPath, response.data, 'utf-8', function(err) {
                    if(err) {
                        console.error("Could not write to file: " + outPath);
                        process.exit(1);
                    }
                })
            } else {
                console.log('Data:',response.data)
            }
        }
    ).catch(function(error) {
        console.log("Error: " + error);
        process.exit(1);
    }
    )
}

let writeToConsole = false;
let filePath;
let outPath;

if(process.argv.length == 3) {
    writeToConsole = true;
    filePath = process.argv[2];
} else {
    outPath = process.argv[3];
    filePath = process.argv[4];
}


// If filePath is local file
if(filePath.slice(0, 4) == 'http') {
    webCat(filePath, outPath);
} else {
    cat(filePath, outPath);
}
