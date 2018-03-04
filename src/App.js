import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchBySku } from './actions/searchByUserInput.js'
import { searchById } from './actions/searchByUserInput.js'
import { searchByAuthor } from './actions/searchByUserInput.js'
import { searchByKeywords } from './actions/searchByUserInput.js'

import { passInputId } from './actions/passUserInput.js'
import { passInputSku } from './actions/passUserInput.js'
import { passInputAuthor } from './actions/passUserInput.js'
import { passInputKeywords } from './actions/passUserInput.js'

class App extends Component {
  render() {
    return (
      <div className="App" style={{ marginLeft: 'auto', marginRight: 'auto', width: 80 + '%' }}>

        <h2><form>Id: <input
        value={this.props.book.product_id}
            onChange={event => this.props.passInputId(event.target.value)} />
          <button type="submit" onClick={(event) => { event.preventDefault(); this.props.searchById(this.props.book.product_id) }}> Search</button>
        </form>
        </h2>

        <h2>
          <form>Sku: <input
          value={this.props.book.product_sku}
              onChange={event => this.props.passInputSku(event.target.value)} />
            <button type="submit" onClick={(event) => { event.preventDefault(); this.props.searchBySku(this.props.book.product_sku) }}> Search</button>
          </form>
        </h2>

        <h2>
          <form>Author: <input
          value={this.props.book.author_keywords}
            onChange={event => this.props.passInputAuthor(event.target.value)} />
            <button onClick={(event) => { event.preventDefault(); this.props.searchByAuthor(this.props.book.author_keywords) }}> Search</button>
          </form>
        </h2>

        <h2><form>
          Keywords: <input
            value={this.props.book.title_keywords}
            placeholder="in book title"
            onChange={event => this.props.passInputKeywords(event.target.value)} />
          <button onClick={(event) => { event.preventDefault(); this.props.searchByKeywords(this.props.book.title_keywords) }}> Search</button>
        </form>
        </h2>

        <p style={{ color: '#6c757d' }}>
        Note: <br/>
        this app is meant for <b>localhost use ONLY!</b> Please <b>DO NOT</b> deploy as your api keys will be exposed.<br/>
        For security reason, please genereate Read Only api keys.<br/>
        Please keep this file in a private computer as anyone who can access this file can copy your api keys, thus fetch private data such as customer details / orders from your website.</p>

        <hr />

        {/* ~~~~~below is search result~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <h3 style={{ color: '#545b62' }}>{this.props.book.search_status}</h3>
        {this.props.book.search_status === 'Success' ?
          <div>
            <p><span style={{ color: '#6c757d' }}> Name:</span> {this.props.book.product_name}</p>
            <p><span style={{ color: '#6c757d' }}> Author:</span> {this.props.book.product_author}</p>
            <p><span style={{ color: '#6c757d' }}> ID:</span> {this.props.book.product_id}</p>
            <p><span style={{ color: '#6c757d' }}> Sku:</span> {this.props.book.product_sku}</p>
            <p><span style={{ color: '#6c757d' }}> Status:</span> {this.props.book.product_status}</p>
            <p><span style={{ color: '#6c757d' }}> Price:</span> {this.props.book.product_regular_price}</p>
            <p><span style={{ color: '#6c757d' }}> Quantity:</span> {this.props.book.product_stock_quantity}</p>
          </div> : null
        }

        {this.props.book.search_status === 'Success, this author has following book(s):' ?
          <div>
            <ol>{this.props.book.mutiple_books_array.map(el =>
              <p key={el.id}>
                <li>{el.name}<br />
                  <span style={{ color: '#6c757d' }}>Author:</span> {el.attributes[0].options[0]}<br />
                  <span style={{ color: '#6c757d' }}>Status:</span> {el.status}<br />
                  <span style={{ color: '#6c757d' }}>Price:</span> $ {el.regular_price}<br />
                  <span style={{ color: '#6c757d' }}>Qty:</span> {el.stock_quantity}
                </li>
              </p>
            )}
            </ol>
          </div>
          : null
        }

        {this.props.book.search_status === 'Success,following book(s) contain searched keywords in the title:' ?
          <div>
            <ol>{this.props.book.mutiple_books_array.map(el =>
              <p key={el.id}>
                <li>{el.name}<br />
                  <span style={{ color: '#6c757d' }}>Author:</span> {el.attributes[0].options[0]}<br />
                  <span style={{ color: '#6c757d' }}>Status:</span> {el.status}<br />
                  <span style={{ color: '#6c757d' }}>Price:</span> $ {el.regular_price}<br />
                  <span style={{ color: '#6c757d' }}>Qty:</span> {el.stock_quantity}
                </li>
              </p>
            )}
            </ol>
          </div>
          : null
        }
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    book: state.book
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    searchBySku: searchBySku,
    searchById: searchById,
    searchByAuthor: searchByAuthor,
    searchByKeywords: searchByKeywords,
    passInputId,
    passInputSku,
    passInputAuthor,
    passInputKeywords

  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);

