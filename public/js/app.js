console.log("client side javascript program")
// fetch("https://puzzle.mead.io/puzzle").then(function(response){
//   response.json().then(function(data){
//     console.log(data)
//   })
// })


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const m1=document.querySelector("#m1")
const m2=document.querySelector("#m2")



weatherForm.addEventListener('submit',function(e){
  e.preventDefault()
  //to prevent browset=r from refreshing user data1
  const location=search.value
  m1.textContent="Loading........"
  m2.textContent=""
  fetch("/weather?address="+location).then(function(response){
    response.json().then(function(data){
      if(data.error){
        // console.log(data.error)
        m1.textContent=data.error
      }
       else{
         m1.textContent=data.address
         m2.textContent=data.forecast
      //   console.log(data.location)
      //   console.log(data.forecast)
      }
    })
  })





  console.log("testing")

})
