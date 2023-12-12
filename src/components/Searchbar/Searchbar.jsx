import React, { useState } from 'react';
import css from './SearchBar.module.css';

export const SearchBar = props => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = e => {
    setSearchQuery(e.target.value);
  };

  const handelSubmit = e => {
    e.preventDefault();

    props.onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <>
      <div className={css.search}>
        <header className={css.header}>
          <a className={css.headerLogo} href="./App.jsx">
            RESIM
          </a>
        </header>
        <section className={css.hero}>
          <h1 className={css.searchTitle}>Just find your lovely pictures</h1>
          <form className={css.searchForm} onSubmit={handelSubmit}>
            <input
              className={css.heroInput}
              type="text"
              name="searchQuery"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search images and photos"
              autoComplete="off"
              autoFocus="on"
              required
            />
            <button className={css.btn} type="submit">
              Search
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

// export class SearchBar extends React.Component {
//   state = {
//     searchQuery: '',
//   };

//   handleInputChange = e => {
//     this.setState({ searchQuery: e.target.value });
//   };

//   handelSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit(this.state.searchQuery);
//     this.setState({ searchQuery: '' });
//   };

//   render() {
//     return (
//       <>
//         <div className={css.search}>
//           <header className={css.header}>
//             <a className={css.headerLogo} href="./App.jsx">
//               RESIM
//             </a>
//           </header>
//           <section className={css.hero}>
//             <h1 className={css.searchTitle}>Just find your lovely pictures</h1>
//             <form className={css.searchForm} onSubmit={this.handelSubmit}>
//               <input
//                 className={css.heroInput}
//                 type="text"
//                 name="searchQuery"
//                 value={this.state.searchQuery}
//                 onChange={this.handleInputChange}
//                 placeholder="Search images and photos"
//                 autoComplete="off"
//                 autoFocus="on"
//                 required
//               />
//               <button className={css.btn} type="submit">
//                 Search
//               </button>
//             </form>
//           </section>
//         </div>
//       </>
//     );
//   }
// }
