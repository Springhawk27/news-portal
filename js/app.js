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
                <a onclick="loadCategoricalNews('${category.category_id}')" class="text-decoration-none text-secondary" href="#" >${category.category_name}</a>
                `;
        categoriesContainer.appendChild(categoryP);

    });
}

// load categorial news
const loadCategoricalNews = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    console.log(id)

    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data)
    displayNews(data.data);

}

// display categorical news
const displayNews = (categoryNews) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';

    // display all phones
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
                    <div class=" d-flex flex-column gap-4">
                        <h5 class="card-title">${news.title}</h5>
                         <p class="card-text text-truncate">${news.details.slice(1, 200)}</p>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex gap-2">
                            <img class="rounded-circle" style="width: 64px; height: 64px;" src="${news.author.img}" alt="">
                             <div>
                                <h5 class="card-title">${news.author.name ? news.author.name : 'No Author'}</h5>
                                <p>${news.author.published_date}</p>
                            </div>
                        </div>
                        <div>
                            <i class="far fa-eye"></i>
                            <span class="ms-2">1.5M</span>
                         </div>
                        <div>
                            <span>4.5</span>
                         </div>
                        <div>
                          <a class="text-decoration-none text-secondary" href="#">See Details</a>
                         <i class="fas fa-arrow-right text-primary"></i>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        newsContainer.appendChild(newsDiv);
    });

}

loadCategories()