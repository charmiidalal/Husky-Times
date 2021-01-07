import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Truncate from 'react-truncate';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { bookmarkItem, unBookmarkItem } from '../actions/bookmarks';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import NewsDefaultImage from './news-default-image.jpg';
import { TwitterShareButton, TwitterIcon } from "react-share";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { RedditShareButton, RedditIcon  } from "react-share";
import { EmailShareButton, EmailIcon } from "react-share";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const NewsItem = ({
  item,
  theme,
  bookmarkItem,
  unBookmarkItem,
  bookmarkItems,
  facebook
}) => {
  // if item is bookmarked find bookmark title
  const isBookmark = item => {              // finds the title of the news
    if (bookmarkItems !== null) {
      return (
        bookmarkItems.findIndex(bookmark => bookmark.title === item.title) > -1
      );
    }
  };
  const bookmark = item => {
    bookmarkItem(item);
  };

  const unBookmark = item => {
    unBookmarkItem(item);


  };

  

  return (  //  adds scroll efefect from aos library
    <Col xs={12} sm={6} md={6} lg={4} xl={4} className='my-2 cardContainer'>
      <Card data-aos="fade-up">       
        {item.urlToImage ? (
          <div
            className='urlImage'
            style={{ backgroundImage: `url(${item.urlToImage})` }}
          />
        ) : (
          <div
            className='urlImage'
            style={{ backgroundImage: `url(${NewsDefaultImage})` }}
          />
        )}
                             
        <Card.Body>            {/*card body contains 2 lines from title 3 lines from description from all the news */}
          <Card.Title>  
            <Truncate lines={2} ellipsis={<span>...</span>}>
              {item.title}      
            </Truncate> 
          </Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            {item.source.name} <br />
            <span style={{ fontWeight: 'normal' }}>{item.author}</span>
          </Card.Subtitle>
          <Card.Text>
            <Truncate lines={3} ellipsis={<span>...</span>}>
              {item.description}
            </Truncate>
          </Card.Text>
          <Button variant={theme} href={item.url} target='_blank'>
            Go to Page
          </Button>
          {isBookmark(item) ? (
            <FaBookmark
              className='float-right mt-2 icon-button'
              size='1.5em'
              onClick={() => unBookmark(item)}
            />
          ) : (                                                  //bookmark btn 
            <FaRegBookmark
              className='float-right mt-2 icon-button'
              size='1.5em'
              onClick={() => bookmark(item)}
            />
          )}

          {/*each individual card body has a footer which has social media icons */ }
        </Card.Body>
        <Card.Footer>
          <small className='text-muted'>          
            Published: <Moment format='YYYY/MM/DD' date={item.publishedAt} /> 
            <br>
            </br>
            < FacebookShareButton url={item.url}> 
              <FacebookIcon logoFillColor="white" size ={33} round/>
                </FacebookShareButton>
                < TwitterShareButton url={item.url}>
              <TwitterIcon logoFillColor="white" size ={33} round />
                </TwitterShareButton>
                < RedditShareButton url={item.url}>
              <RedditIcon logoFillColor="white" size ={33} round/>
                </ RedditShareButton>
                
                
                < EmailShareButton url={item.url}>
              <EmailIcon logoFillColor="white" size ={33} round/>
                </ EmailShareButton>
          </small>
        </Card.Footer>
      </Card>
    </Col>
  );
};

const mapStateToProps = state => ({
  bookmarkItems: state.bookmarks.bookmarkItems
});

export default connect(
  mapStateToProps,
  { bookmarkItem, unBookmarkItem }
)(NewsItem);
