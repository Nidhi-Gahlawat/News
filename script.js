$(document).ready(function(){
    $('.wor').click();
    $('.logo').hide();
    $('.nav-link').click(function(){console.log("hi");
      $('.nav-link').removeClass('active');
      $(this).addClass('active');
    });
    // $(".img").animate({
    //     opacity:0.9
    // },5000);
    $('.logo').show(4000);
    
  })

console.log("This is my index js file");

// Initialize the news api parameters
// let source = 'the-times-of-india';
// let apiKey = 'b91839c3917676c462a32bfcf0756d21'
let apiKey = 'd07c280f59b5a1bc7108231045b5d7bc'


// Grab the news container
let newsAccordion = document.getElementById('newsAccordion');

// Create an ajax get request
const xhr = new XMLHttpRequest();


function func(type,val){
    if(type=='lang'){
        xhr.open('GET',`https://gnews.io/api/v4/top-headlines?token=${apiKey}&${type}=${val}`, true);
    
    }
    else{
xhr.open('GET',`https://gnews.io/api/v4/top-headlines?token=${apiKey}&lang=en&${type}=${val}`, true);
    }
// What to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml = "";
        articles.forEach(function(element, index) {
            // console.log(element, index)
            let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
            
                                <h2 class="mb-0">
                                <button class="btn  collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                    aria-expanded="false" aria-controls="collapse${index}">   
                                     <img class="card-img-top" src="${element["image"]}" alt="Card image cap">
        
                               <span class="txt"><b>${index+1}:</b> ${element["title"]}</span>
                                </button>
                                </h2>
                            </div>

                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                                <div class="card-body"> ${element["content"]}. <a href="${element['url']}" target="_blank" style="font-size:medium" >Read more here</a>  </div>
                            </div>
                        </div>`;
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured")
    }
}
xhr.send();
}