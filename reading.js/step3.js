
const fs = require('fs')
const process =require('process')
const axios = require('axios')

function cat(path,outpath){
    fs.readFile(path,'utf-8',function(err,data){
        if(err){
            console.log(err)
            process.exit(1)
        }
       
        if(outpath){
            fs.writeFile(outpath,data,'utf-8',function(e){
                if(e){
                    console.log(e)
                    process.exit(1)
                }
                console.log('It worked')
            })
        }
        else{
            console.log(data);
        }
    })
}
function webCat(url,outpath){
    response = axios.get(url)
    response.then((res) =>{
        if(outpath){
            fs.writeFile(outpath,res.data,'utf-8',function(e){
                if(e){
                    console.log(e)
                    process.exit(1)
                }
                console.log('It worked')
            })
        }
    })
    .catch((error) =>{
        console.log(error)
        process.exit(1)
    })    
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
    webCat(filePath,outPath);
} else {
    cat(filePath,outPath);
}
