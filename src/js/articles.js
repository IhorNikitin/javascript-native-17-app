import {fetchData} from './helpers.js';
import tmp from './articleTmp';

import '../scss/articles.scss';

class Articles {
    constructor() {
        this.articles = [];
        this.lastLoadedArticle = 0;
        this.count = 0;
        this.root = document.querySelector('.articles');
    }

    lazyLoadArticles() {
        this.getAllArticlesCount();
        this.loadOneArticle(this.lastLoadedArticle + 1)
            .then(() => {
                this.assingScrollHandler();
                this.assingArrowHandler();
            })
            .catch((err) => console.log(err));
    }

    loadOneArticle(id) {
        return new Promise((resolve, reject) => {
            fetchData(`http://localhost:3001/articles/${id}`)
                .then(res => {
                    const result = JSON.parse(res);
                    if (!this.lastLoadedArticle ||
                        !this.articles.find((item) => item.id === result.id)
                    ) {
                        this.articles.push(result);
                        this.lastLoadedArticle++;
                        this.render([result]);
                        this.checkOutNextLoad();
                        resolve(result);
                    }
                })
                .catch(err => reject(err));
        });
    }

    getAllArticlesCount() {
        fetchData('http://localhost:3001/articles/count')
            .then((res) => {
                this.count = JSON.parse(res).count;
            })
            .catch((err) => console.log(err));
    }

    checkOutNextLoad() {
        const footer = document.querySelector('.footer');
        const currentScroll = window.pageYOffset;
        const footerTopPoint = footer.getBoundingClientRect().top + currentScroll;
        const displayHeight = document.documentElement.clientHeight;

        if ((displayHeight + currentScroll + 50 > footerTopPoint) &&
            (this.lastLoadedArticle < this.count)
        ) {
            this.loadOneArticle(this.lastLoadedArticle + 1);
        }
    }

    assingScrollHandler() {
        const body = document.querySelector('body');
        body.onscroll = () => this.checkOutNextLoad();
    }

    assingArrowHandler() {
        const arrow = document.querySelector('.scroll').lastElementChild;
        setTimeout(() => {
            const firstArticle = document.querySelectorAll('.article__title')[0];
            const articleTopPoint = firstArticle &&
                firstArticle.getBoundingClientRect().top + window.pageYOffset;
            arrow.onclick = () => articleTopPoint && window.scrollTo(0, articleTopPoint);
        }, 100);
    }

    loadAllArticles() {
        fetchData('http://localhost:3001/articles')
            .then(res => {
                this.articles = JSON.parse(res);
                this.render(this.articles);
                this.assingArrowHandler();
            })
            .catch(err => console.log(err));
    }

    render(arr) {
        let html = tmp.replace(/>\s+?</g, '><');

        for (let i = 0; i < arr.length; i++) {
            const {img, date, title, description, video} = arr[i];

            this.root.insertAdjacentHTML('beforeEnd', html);
            let article = this.root.lastElementChild;
            let defaultVideo = '<img src="" alt="movie" />';

            article.querySelector('img').src = `../assets/images/${img}`;
            article.querySelector('.article__date').textContent = date;
            article.querySelector('.article__title').textContent = title;
            article.querySelector('.article__text').textContent = description;

            if (!video) {
                let videoContainer = article.querySelector('.article__video');
                videoContainer.innerHTML = defaultVideo;

                let image = videoContainer.firstElementChild;
                image.src = `../assets/images/${img}`;
            }
        }
    }
}

export default Articles;
