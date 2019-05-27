const request=require('request')
const geocode=function(address,callback){
  const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1IjoiYW51bW9sdWdvdXRoYW0iLCJhIjoiY2p2eG4zaTdpMDZ3YTQ4bHM1c2tubnQ4eiJ9.iOhd0xwPmVLuBdAMtCsrfA"
  request({url,json:true},(error,response)=>{
    //using shorthand we can use (error,{body}) and replace response.body with body in code

    if(error){
        callback("unable to connect to network",undefined)
      }
      else if(response.body.features.length === 0){
        callback("cannot find the location",undefined)
      }
      else{
        callback(undefined,{
          latitude:response.body.features[0].center[1],
          longitude:response.body.features[0].center[0],
          place:response.body.features[0].place_name
        })
      }
  })
}
module.exports=geocode
