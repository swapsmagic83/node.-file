const fs = require('fs')
const process =require('process')
const axios = require('axios')

function cat(path){
    fs.readFile(path,'utf-8',(err,data)=>{
        if(err){
            console.log('Error',err);
            process.kill(1)
        }
        console.log('Data:',data)
    })
  }

function webCat(url){
    res = axios.get(url, {}).then(
        (response) => {
            console.log(response);
        }
    ).catch(function(error) {
        console.log("Error: " + error);
        process.exit(1);
    }
    )
}

let filePath = process.argv[2];

// If filePath is local file
if(filePath.slice(0, 4) == 'http') {
    webCat(filePath);
} else {
    cat(filePath);
}
