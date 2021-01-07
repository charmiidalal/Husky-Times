import React, { Fragment, useState, useEffect } from 'react';
import CategorySourceSearchForm from '../components/CategorySourceSearchForm';
import { setTopNews, clearTopNews } from '../actions/news';
import NewsList from '../components/NewsList';
import { connect } from 'react-redux';

//Holds layout of home page for news

// sets homepagewith tops news
const Home = ({ setTopNews, news, clearTopNews }) => {
  const [page, setPage] = useState(1);
  const [categorySourceUrl, setCategorySourceUrl] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  const handleCategorySourceSearch = categorySourceUrl => {
    setPage(1);
    setCategorySourceUrl(categorySourceUrl);
    setIsSearch(true);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (categorySourceUrl) {
      const url = `${categorySourceUrl}`;
      setTopNews(url, page);
    }


    if(!categorySourceUrl) {
      let url1 = `http://newsapi.org/v2/everything?q=usa&sortBy=publishedAt&apiKey=2074f3fdd61247d89814daa1745d49b5`;
      setTopNews(url1,page);
    }

    return () => {
      clearTopNews();
    };
    // eslint-disable-next-line
  }, [categorySourceUrl, page]);

  return (
    <Fragment>
      <CategorySourceSearchForm
        onCategorySourceSearch={categorySourceUrl => {
          handleCategorySourceSearch(categorySourceUrl);
        }}
      />
      {isSearch ? 
      
      <NewsList
        newsItemsTotal={news.newsItemsTotal}
        loading={news.newsLoading}
        newsItems={news.newsItems}
        theme={news.theme}
        loadMore={() => handleLoadMore()}
      />
      :
      <NewsList
        newsItemsTotal={news.newsItemsTotal}
        loading={news.newsLoading}
        newsItems={news.newsItems}
        theme={news.theme}
        loadMore={() => handleLoadMore()}
      />
      }
    </Fragment>
  );
};

const mapStateToProps = state => ({
  news: state.news
});

export default connect(
  mapStateToProps,
  { setTopNews, clearTopNews }
)(Home);
