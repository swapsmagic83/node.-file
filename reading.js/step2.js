const fs = require('fs')
const process =require('process')
const axios = require('axios')

function cat(path){
    fs.readFile(path,'utf-8',function(err,data){
        if(err){
            console.log(err)
            process.exit(1)
        }
        console.log(data);
    })
}

function webCat(url){
    response = axios.get(url)
    response.then((res) =>{
        // console.log(res)
    }).catch((error) =>{
        console.log(error)
        process.exit(1)
    })
    
}

let filePath = process.argv[2];

// If filePath is local file
if(filePath.slice(0, 4) == 'http') {
    webCat(filePath);
} else {
    cat(filePath);
}
