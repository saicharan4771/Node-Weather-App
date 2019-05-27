const path=require("path")//its a core module no need to install
const express=require('express')
const app=express()
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geocode.js')
const forecast=require("./utils/forecast.js")

const port=process.env.PORT || 3000

//to change view directory name you need to include
const partials=path.join(__dirname,"../templates/partials")
const viewspath=path.join(__dirname,"../templates/views")
const publicpath=path.join(__dirname,"../public")


//setting up express config
app.set('view engine','hbs')
app.set("views",viewspath)
hbs.registerPartials(partials)
//static usage
app.use(express.static(publicpath))


app.get('',function(req,res){
  res.render('index',{
    title:"Weather",
    name:"Anumolu"
  })
})
app.get('/about',function(req,res){
  res.render('about',{
    title:"About",
    name:"Anumolu"
  })
})
app.get('/help',function(req,res){
  res.render('help',{
    title:"Help",
    name:"Anumolu"
  })
})
app.get('/weather',function(req,res){
  if(!req.query.address){
    return res.send({
      error:"cannot find address"
    })
  }

  else{
  geocode(req.query.address,(error,data={})=>{
    if(error){
      return res.send({error:error})
    }
    forecast(data.latitude,data.longitude,(error,data1)=>{
      if(error){
        return res.send({error:error})
      }
      res.send({address:data.place,
      forecast:"It is cuurently "+data1.temperature+"."+data1.summary,
      location:req.query.address
    })

  })
})
}

  // res.send({
  //   forecast:"it is smowing",
  //   location:"erragadda",
  //   address:req.query.address
  // })
})


app.get("/products",function(req,res){
  if(!req.query.search){
    return res.send({
      error:"cannot find search"
    })
  }
  console.log(req.query.search)
  res.send({
    product:[]
  })
  })
app.get("/help/*",function(req,res){
  res.render("error",{
    title:"404",
    name:"Anumolu",
    msg:"Article not found"
  })
})


app.get("*",function(req,res){
  res.render("error",{
    title:"404 ",
    name:"Anumolu",
    msg:"Page not found"
  })
})




app.listen(port,function(){
  console.log("Server is up on port 3000")
})




// app.get('',function(req,res){
//   res.send("Hello Express")
// })
// app.get('/help',function(req,res){
//   res.send("Im here to help")
// })
// app.get('/about',function(req,res){
//   res.send("U can know about climate details")
// })
