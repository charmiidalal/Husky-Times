import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { FaExchangeAlt } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';



// category news search
const CategorySourceSearch = ({ onCategorySourceSearch, news }) => {
  // sets empty states for country and category
  const [type, setType] = useState('category');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  // console.log(JSON.parselocalStorage.getItem("userCat"))
  const changeType = () => {
    if (type === 'category') {
      setCountry('');
      setCategory('');
      setType('source');
    } else {
      setSource('');
      setType('category');
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    if (country || source) {
      onCategorySourceSearch(
        `top-headlines?country=${country}&category=${category}&sources=${source}&q=${searchQuery}`
      );
    }
  };

  return (
    <Container fluid className={`heroContainer-${news.theme}`}>
      <Row className='justify-content-md-center'>
        <Col xs lg='8'>
          <Form className='mt-3' onSubmit={onSubmit}>
            <Form.Row>
              {type === 'category' && (
                <Fragment>
                  <Col md='4' sm='4'>
                    <Form.Group>
                      <Form.Control
                        as='select'
                        defaultValue={country}
                        onChange={e => setCountry(e.target.value)}
                      >
                        <option value=''>Select Country</option>
                        {localStorage.getItem("user") == null || localStorage.getItem("userCntry").split(",").indexOf("United States of America") > -1 || localStorage.getItem("user") == null ?
                          <option value='us'>United States of America</option> : ""}
                        {localStorage.getItem("user") == null || localStorage.getItem("userCntry").split(",").indexOf("United Kingdom") > -1 || localStorage.getItem("user") == null ?
                          <option value='gb'>United Kingdom</option> : ""}
                        {localStorage.getItem("user") == null || localStorage.getItem("userCntry").split(",").indexOf("Canada") > -1 || localStorage.getItem("user") == null ?
                          <option value='ca'>Canada</option> : ""}
                        {localStorage.getItem("user") == null || localStorage.getItem("userCntry").split(",").indexOf("China") > -1 || localStorage.getItem("user") == null ?
                          <option value='cn'>China</option> : ""}
                        {localStorage.getItem("user") == null || localStorage.getItem("userCntry").split(",").indexOf("Russia") > -1 || localStorage.getItem("user") == null ?
                          <option value='ru'>Russia</option> : ""}
                        {localStorage.getItem("user") == null || localStorage.getItem("userCntry").split(",").indexOf("France") > -1 || localStorage.getItem("user") == null ?
                          <option value='fr'>France</option> : ""}
                        {localStorage.getItem("user") == null || localStorage.getItem("userCntry").split(",").indexOf("Philippines") > -1 || localStorage.getItem("user") == null ?
                          <option value='ph'>Philippines</option> : ""}
                        {localStorage.getItem("user") == null || localStorage.getItem("userCntry").split(",").indexOf("United Arab Emirates") > -1 || localStorage.getItem("user") == null ?
                          <option value='ph'>United Arab Emirates</option> : ""}
                        {localStorage.getItem("user") == null || localStorage.getItem("userCntry").split(",").indexOf("Australia") > -1 || localStorage.getItem("user") == null ?
                          <option value='au'>Australia</option> : ""}
                        {localStorage.getItem("user") == null || localStorage.getItem("userCntry").split(",").indexOf("South Korea") > -1 || localStorage.getItem("user") == null ?
                          <option value='kr'>South Korea</option> : ""}
                        {localStorage.getItem("user") == null || localStorage.getItem("userCntry").split(",").indexOf("Argentina") > -1 || localStorage.getItem("user") == null ?
                          <option value='ar'>Argentina</option> : ""}
                        {localStorage.getItem("user") == null || localStorage.getItem("userCntry").split(",").indexOf("Indonesia") > -1 || localStorage.getItem("user") == null ?
                          <option value='id'>Indonesia</option> : ""}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md='3' sm='3'>
                    <Form.Group>
                      <Form.Control
                        as='select'
                        defaultValue={category}
                        onChange={e => setCategory(e.target.value)}
                      >
                        <option value='' >All Category</option>
                        {localStorage.getItem("user") == null || localStorage.getItem("userCat").split(",").indexOf("Business") > -1  ?
                          <option value='business'>Business</option> : ""}
                        {localStorage.getItem("user") == null || localStorage.getItem("userCat").split(",").indexOf("Entertainment") > -1 || localStorage.getItem("user") == null ?
                          <option value='entertainment'>Entertainment</option> : ""}
                        {localStorage.getItem("user") == null || localStorage.getItem("userCat").split(",").indexOf("General") > -1 || localStorage.getItem("user") == null ?
                          <option value='general'>General</option> : ""}
                        {localStorage.getItem("user") == null || localStorage.getItem("userCat").split(",").indexOf("Health") > -1 || localStorage.getItem("user") == null ?
                          <option value='health'>Health</option> : ""}
                        {localStorage.getItem("user") == null || localStorage.getItem("userCat").split(",").indexOf("Science") > -1 || localStorage.getItem("user") == null ?
                          <option value='science'>Science</option> : ""}
                        {localStorage.getItem("user") == null || localStorage.getItem("userCat").split(",").indexOf("Sports") > -1 || localStorage.getItem("user") == null ?
                          <option value='sports'>Sports</option> : ""}
                        {localStorage.getItem("user") == null || localStorage.getItem("userCat").split(",").indexOf("Technology") > -1 || localStorage.getItem("user") == null ?
                          <option value='technology'>Technology</option> : ""}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Fragment>
              )}
              {type === 'source' && (
                <Fragment>
                  <Col md='7' sm='7'>
                    <Form.Group>
                      <Form.Control
                        as='select'
                        defaultValue={source}
                        onChange={e => setSource(e.target.value)}
                      >
                        <option value=''> Choose Source</option>
                        {news.newsSource.map(source => (
                          <option key={source.id} value={source.id}>
                            {source.name}
                          </option>
                        ))}
                        {news.newsSource.length === 0 &&
                          !news.newsSourceError && (
                            <option value=''>Loading News Source...</option>
                          )}
                        {news.newsSource.length === 0 &&
                          news.newsSourceError && (
                            <option value=''>Error Loading News Source</option>
                          )}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Fragment>
              )}

              <Col md='3' sm='3' className='mb-3 '>
                <Form.Control
                  placeholder='Keywords (optional)'
                  name='searchQuery'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </Col>
              <Col md='2' sm='2' className='mb-3 '>
                <Button variant={news.theme} type='submit' className='mr-1'>
                  {news.newsLoading ? (
                    <Fragment>
                      <Spinner
                        as='span'
                        animation='border'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                      />
                      <span className='sr-only'>Loading...</span>
                    </Fragment>
                  ) : (
                      <FaSearch />
                    )}
                </Button>
                <Button
                  variant={news.theme}
                  onClick={() => {
                    changeType();
                  }}
                >
                  <FaExchangeAlt />
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = state => ({
  news: state.news
});

export default connect(
  mapStateToProps,
  null
)(CategorySourceSearch);
