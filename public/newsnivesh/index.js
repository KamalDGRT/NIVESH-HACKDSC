console.log("This is my index js file");



// Grab the news container
let carousel1 = document.getElementById('carousel1');

// Create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/everything?q=stock&apiKey=cfe4c11359c640fbbee61457616ab649`, true);

// What to do when response is ready
xhr.onload = function () {
  if (this.status === 200) {
    let json = JSON.parse(this.responseText);
    let articles = json.articles;
    console.log(articles);
    let newsHtml = "";
    let news = `<div class="col-xl-8 stretch-card grid-margin">
    <div class="position-relative">
        <img src="https://d1m75rqqgidzqn.cloudfront.net/wp-data/2020/07/27172656/iStock-1153657433.jpg" alt="banner" style="height:500px; width:750px;margin-left:5px;border-radius:12px;" />
        <div class="banner-content">
            <div class="badge badge-danger fs-12 font-weight-bold mb-3">
                National news
            </div>
            <h1 class="mb-0"><a href=${articles[0]["url"]} target="_blank" style="color:white;">${articles[0]["title"]}</a></h1>
            <h2 class="mb-2">
                <br>${articles[0]["description"]}
            </h2>
            <div class="fs-12">
                <span class="mr-2">Photo </span>10 Minutes ago
            </div>
        </div>
    </div>
</div>
<div class="col-xl-4 stretch-card grid-margin">
    <div class="card bg-dark text-white">
        <div class="card-body">
            <h2>Latest news</h2>

            <div class="d-flex border-bottom-blue pt-3 pb-4 align-items-center justify-content-between">
                <div class="pr-3">
                    <h5 style="width:180px;"><a href=${articles[1]["url"]} target="_blank" style="color:white;">${articles[1]["title"]}</a></h5>
                    <div class="fs-12">
                        <span class="mr-2">Photo </span>10 Minutes ago
                    </div>
                </div>
                <div class="rotate-img">
                    <img src=${articles[1]["urlToImage"]} alt="thumb" class="img-fluid img-lg"
                        style="height:80px;width:120px;" />
                </div>
            </div>

            <div class="d-flex border-bottom-blue pb-4 pt-4 align-items-center justify-content-between">
                <div class="pr-3">
                    <h5 style="width:180px;"><a href=${articles[2]["url"]} target="_blank" style="color:white;">${articles[2]["title"]}</a></h5>
                    <div class="fs-12">
                        <span class="mr-2">Photo </span>10 Minutes ago
                    </div>
                </div>
                <div class="rotate-img">
                    <img src=${articles[2]["urlToImage"]} alt="thumb" class="img-fluid img-lg"
                        style="height:80px;width:120px;" />
                </div>
            </div>

            <div class="d-flex pt-4 align-items-center justify-content-between">
                <div class="pr-3">
                    <h5 style="width:180px;"><a href=${articles[3]["url"]} target="_blank" style="color:white;">${articles[3]["title"]}</a></h5>
                    <div class="fs-12">
                        <span class="mr-2">Photo </span>10 Minutes ago
                    </div>
                </div>
                <div class="rotate-img">
                    <img src=${articles[3]["urlToImage"]} alt="thumb" class="img-fluid img-lg"
                        style="height:80px;width:120px;" />
                </div>
            </div>
        </div>
    </div>
</div>
    `;
    newsHtml += news;
    carousel1.innerHTML = newsHtml;
  }
  else {
    console.log("Some error occured")
  }
}
xhr.send()
function func(x)
{
   let carousel2=document.getElementById('carousel2');
   const xhr1 = new XMLHttpRequest();
   xhr1.open('GET', `https://newsapi.org/v2/everything?q=${x}&apiKey=cfe4c11359c640fbbee61457616ab649`, true);
   xhr1.onload=function(){
     if(this.status===200)
     {
      let json = JSON.parse(this.responseText);
      let articles = json.articles;
      console.log(articles);
      let news=`<div class="row">
      <div class="col-sm-4 grid-margin">
        <div class="position-relative">
          <div class="rotate-img">
            <img src=${articles[0]["urlToImage"]} alt="thumb" class="img-fluid" style="height:200px;"/>
          </div>
          <div class="badge-positioned">
            <span class="badge badge-danger font-weight-bold">Flash news</span>
          </div>
        </div>
      </div>
      <div class="col-sm-8  grid-margin">
        <h2 class="mb-2 font-weight-600">
        <a href=${articles[0]["url"]} target="_blank" style="color:black;">${articles[0]["title"]}</a>
        </h2>
        <div class="fs-13 mb-2">
          <span class="mr-2">Photo </span>10 Minutes ago
        </div>
        <p class="mb-0">
          ${articles[0]["description"]}
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-4 grid-margin">
        <div class="position-relative">
          <div class="rotate-img">
            <img src=${articles[1]["urlToImage"]} class="img-fluid" style="height:200px;"/>
          </div>
          <div class="badge-positioned">
            <span class="badge badge-danger font-weight-bold">Flash news</span>
          </div>
        </div>
      </div>
      <div class="col-sm-8  grid-margin">
        <h2 class="mb-2 font-weight-600">
          <a href=${articles[1]["url"]} target="_blank" style="color:black;">${articles[1]["title"]}</a>
        </h2>
        <div class="fs-13 mb-2">
          <span class="mr-2">Photo </span>10 Minutes ago
        </div>
        <p class="mb-0">
          ${articles[1]["description"]}
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-4">
        <div class="position-relative">
          <div class="rotate-img">
            <img src=${articles[2]["urlToImage"]} alt="thumb" class="img-fluid" style="height:200px;"/>
          </div>
          <div class="badge-positioned">
            <span class="badge badge-danger font-weight-bold">Flash news</span>
          </div>
        </div>
      </div>
      <div class="col-sm-8">
        <h2 class="mb-2 font-weight-600">
        <a href=${articles[2]["url"]} target="_blank" style="color:black;">${articles[2]["title"]}</a>
        </h2>
        <div class="fs-13 mb-2">
          <span class="mr-2">Photo </span>10 Minutes ago
        </div>
        <p class="mb-0">
        ${articles[2]["description"]}
        </p>
      </div>
    </div>`
    carousel2.innerHTML=news;
     }
   }
   xhr1.send()
}