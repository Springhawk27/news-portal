// load categories 
const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
    // console.log(data.data.news_category)
}

// display categories
const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories-container');

    // display all categories
    categories.forEach(category => {
        console.log(category)
        const categoryP = document.createElement('p');

        categoryP.innerHTML = `
                <a onclick="loadCategoricalNews('${category.category_id}','${category.category_name}')" class="text-decoration-none text-secondary" href="#" >${category.category_name}</a>
                `;
        categoriesContainer.appendChild(categoryP);


    });
}

// spinner or loader
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

// load categorial news
const loadCategoricalNews = async (id, category_name) => {
    toggleSpinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    console.log(id)

    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data)
    displayNews(data.data, category_name);

}

// display categorical news
const displayNews = (categoryNews, category_name) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';

    // display no phones found
    const newsFound = document.getElementById('found-message');
    if (categoryNews.length === 0) {
        newsFound.classList.remove('d-none');
        // <h3 class="text-warning">No News Found. Please try a new search</h3>
        newsFound.innerHTML = `
        <h3 class="text-danger">${categoryNews.length} News Found in category ${category_name}. Please try another category</h3>
        `
    }
    else if (categoryNews.length > 0) {
        newsFound.classList.remove('d-none');
        newsFound.innerHTML = `
        <h3 class="text-success">${categoryNews.length} news found in category ${category_name}. </h3>
        `
    }
    else {
        newsFound.classList.add('d-none');
    }

    // display all news
    categoryNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('row', 'row-cols-1', 'row-cols-md-1', 'g-4');
        newsDiv.innerHTML = `
     <div class="card mb-3 p-0">
        <div class="row g-0">
            <div class="col-md-4 d-flex align-items-center">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start  h-100 p-3" alt="...">
            </div>
            <div class="col-md-8 ">
                <div class="h-100 card-body d-flex flex-column justify-content-between">
                    <div class=" d-flex flex-column gap-4 mb-3">
                        <h5 class="card-title">${news.title}</h5>
                         <p class="card-text text-truncate">${news.details.slice(0, 200)}</p>
                    </div>

                    <div class="d-flex justify-content-between          align-items-center">
                        <div class="d-flex gap-2">
                            <img class="rounded-circle" style="width: 64px; height: 64px;" src="${news.author?.img ? news.author?.img : 'No Thumbnail'}" alt="">
                             <div>
                                <h5 class="card-title fs-6">${news.author?.name ? news.author.name : 'No Author'}</h5>
                                <p>${news.author?.published_date ? news.author.published_date : 'Date Not Available'}</p>
                            </div>
                        </div>
                        <div>
                            <i class="far fa-eye text-info"></i>
                            <span class="ms-2">${news.total_view ? news.total_view : 'No Views'}</span>
                         </div>
                        <div>
                              <i class="fas fa-star text-warning"></i>
                            <span>${news.rating?.number ? news.rating.number : 'No Rating'}</span>
                         </div>
                        <div>
                          <a onclick="loadNewsDetails('${news._id}')" class="text-decoration-none text-secondary" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">See Details</a>
                         <i class="fas fa-arrow-right text-primary"></i>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        newsContainer.appendChild(newsDiv);
    });
    toggleSpinner(false);

}



//  load news detail on click  and ready for modal
const loadNewsDetails = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
    // console.log(data.data[0])
}

//  display news detail in amodal
const displayNewsDetails = newsDetail => {
    console.log(newsDetail);
    const newsTitle = document.getElementById('newsDetailTitle');
    newsTitle.innerText = newsDetail.title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
        <p>Decription: ${newsDetail.details ? newsDetail.details : 'No Details Found'}</p>

        <div class="d-flex justify-content-between          align-items-center">
        <div class="d-flex gap-2">
            <img class="rounded-circle" style="width: 64px; height: 64px;"
                src="${newsDetail.author?.img ? newsDetail.author?.img : 'No Thumbnail'}" alt="">
            <div>
                <h5 class="card-title fs-6">${newsDetail.author?.name ? newsDetail.author.name : 'No Author Found'}</h5>
                <p>${newsDetail.author?.published_date ? newsDetail.author.published_date : 'Date Not Available'}</p>
            </div>
        </div>
        <div>
            <i class="far fa-eye text-info"></i>
            <span class="ms-2">${newsDetail.total_view ? newsDetail.total_view : 'No Views'}</span>
        </div>
        <div>
             <i class="fas fa-star text-warning"></i>
            <span>${newsDetail.rating?.number ? newsDetail.rating.number : 'No Rating'}</span>
        </div>
    </div>
       
    `
}


loadCategories()