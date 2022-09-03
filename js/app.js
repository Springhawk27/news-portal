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
     <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-4">
            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    
                </div>
            </div>

        </div>
    </div>`;


        `
    <div class="card p-4">
        <div class="col-md-4">
            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                 <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>

    </div>
    `;

        // newsDiv.innerHTML = `
        // <div class="card p-4">
        //     <img src="${news.image}" class="card-img-top" alt="...">
        //     <div class="card-body">
        //         <h5 class="card-title">${news.title}</h5>
        //         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        //         <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>

        //     </div>
        // </div>
        // `;
        newsContainer.appendChild(newsDiv);
    });

}

loadCategories()