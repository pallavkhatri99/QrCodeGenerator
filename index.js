const express = require('express');
const pug = require('pug');
var QRCode = require('qrcode')
const app = express();
const port  = process.env.PORT || 2874;

app.use(express.urlencoded())
app.use(express.static(__dirname+"/public"));
app.set('view engine', 'pug');

let file_path = "public/imgStore/QRCode"+ Date.now() +".png"; 

const genQRCode=(link)=> QRCode.toFile(file_path,link,{
                                                color: {
                                                dark: '#000',  // Black dots
                                                light: '#ffffff' // Transparent background
                                                }
                                            });

/*-------------Get----------------------*/
app.get("/",(req,res)=>{
    res.render('url',{type:"URL",example:'https://www.google.com'});
})
app.get("/url",(req,res)=>{
        res.render('url',{type:"URL",example:'https://www.google.com'});
})
app.get("/upi",(req,res)=>{
    res.render('upi');
})
app.get("/text",(req,res)=>{
    res.render('url',{type:"Text",example:'Hello Good Morning!'});
})
app.get("/email",(req,res)=>{
    res.render('email');
})
app.get("/sms",(req,res)=>{
    res.render('sms');
})
app.get("/youtube",(req,res)=>{
    res.render('url',{type:"Youtube URL",example:'https://youtube.com'});
})
app.get("/facebook",(req,res)=>{
    res.render('facebook');
})
app.get("/twitter",(req,res)=>{
    res.render('twitter');
})
app.get("/location",(req,res)=>{
    res.render('location');
})
/*-------------Post----------------------*/
app.post("/url",(req,res)=>{
    let { body } =  req;
    if(body.link!=""){
        QRCode.toDataURL(body.link,(err,url)=>{
            if(err){console.log('err', err)}
            else{
               res.send({data:url,path:file_path})
               genQRCode(body.link);
            }
        })
    }
})
app.post("/upi",(req,res)=>{
    let { body } =  req;
    if(body.link){
        let { accName, accNumber, accIFSC, upiName, upiId, ammount, type } = body.link
        let str = ""
        if(type == 'withAcc')
            str = "upi://pay?pa=" + accNumber + "@" + accIFSC +".ifsc.npci&pn=" + accName + "&cu=INR"+"&am="+ammount ;
        else if(type == 'withUPI')
            str = "upi://pay?pa=" + upiId +"&pn=" + upiName + "&cu=INR"+"&am="+ammount ;
        QRCode.toDataURL(str,(err,url)=>{
            if(err){console.log('err',err)}
            else{
               res.send({data:url,path:file_path})
               genQRCode(str);
            }
        })
    }
})
app.post("/email",(req,res)=>{
    let { body } =  req;
    if(body.link){
        let { emailId, subType, msgtext} = body.link
        let str = "mailto:" + emailId + "?subject=" + subType + "&body=" + msgtext;
        QRCode.toDataURL(str,(err,url)=>{
            if(err){console.log('err',err)}
            else{
               res.send({data:url,path:file_path})
               genQRCode(str);
            }
        })
    }
})
app.post("/sms",(req,res)=>{
    let { body } =  req;
    if(body.link){
        let { phoneNo, msgtext} = body.link
        let str = "SMSTO:" + phoneNo + ":" + msgtext;
        QRCode.toDataURL(str,(err,url)=>{
            if(err){console.log('err',err)}
            else{
               res.send({data:url,path:file_path})
               genQRCode(str);
            }
        })
    }
})
app.post("/youtube",(req,res)=>{
    let { body } =  req;
    if(body.link!=""){
        QRCode.toDataURL(body.link,(err,url)=>{
            if(err){console.log('err', err)}
            else{
               res.send({data:url,path:file_path})
               genQRCode(body.link);
            }
        })
    }
})
app.post("/facebook",(req,res)=>{
    let { body } =  req;
    if(body.link!=""){
        QRCode.toDataURL(body.link,(err,url)=>{
            if(err){console.log('err', err)}
            else{
               res.send({data:url,path:file_path})
               genQRCode(body.link);
            }
        })
    }
})
app.post("/twitter",(req,res)=>{
    let { body } =  req;
    if(body.link!=""){
        if(body.link.includes('@'))
            body.link = (encodeURI("https://twitter.com/intent/tweet?text="+ body.link)).replace("#","%23")
        QRCode.toDataURL(body.link,(err,url)=>{
            if(err){console.log('err', err)}
            else{
               res.send({data:url,path:file_path})
               genQRCode(body.link);
            }
        })
    }
})


app.get('/download',function(req,res){
	res.download(req.query.file_path);
})


app.listen(port,()=>{
    console.log(`Listen to the port : ${port}`)
})
