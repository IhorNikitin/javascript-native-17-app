import '../index.html';
import '../scss/main.scss';
import Articles from './articles';

let articlesList = new Articles();
articlesList.lazyLoadArticles();
