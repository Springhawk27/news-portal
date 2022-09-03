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
    // categoriesContainer.textContent = '';

    // display all categories
    // const categoryDiv = document.createElement('div');
    // categoryDiv.classList.add('d-flex', 'justify-content-between');
    categories.forEach(category => {
        console.log(category)
        const categoryP = document.createElement('p');

        categoryP.innerHTML = `
                <a onclick="loadCategoriesClick('${category.category_id}') class="text-decoration-none" "href="#" >${category.category_name}</a>
                `;
        categoriesContainer.appendChild(categoryP);

    });
}


const loadCategoriesClick = (id) => {
    console.log(id)
}

loadCategories()