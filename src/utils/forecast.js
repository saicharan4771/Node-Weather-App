const request=require('request')


const forecast=function(latitude,longitude,callback){
const url="https://api.darksky.net/forecast/79907f573f463eaf5287ffe66193f482/"+latitude+","+longitude+"?units=si"
request({url:url,json:true},function(error,response){
  // const data=JSON.parse(response.body)
  //enable json true does same thing as parse
  if(error){
    callback("unable to connect to network",undefined)
  }
  else if(response.body.error){
    console.log("cannot find the location",undefined)
  }
  else{
    callback(undefined,{
      summary:response.body.daily.data[0].summary,
      temperature:response.body.currently.temperature,
      th:response.body.daily.data[0].temperatureHigh,
      tl:response.body.daily.data[0].temperatureLow,
      rain:response.body.daily.data[0].precipProbability

    })
}
})
}
module.exports=forecast
