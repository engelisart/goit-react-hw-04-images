import React, { useState, useEffect, useCallback } from 'react';
import { SearchBar } from '../components/Searchbar/Searchbar';
import ButtonLoadMore from '../components/Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImg } from 'api';
import ImageGallery from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export const App = () => {
  //  constructor(props) {
  //     super(props);
  //     this.closeModal = this.closeModal.bind(this);
  //   };

  const [hits, setHits] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalHits, setTotalHits] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [perPage, setPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchImg();
      setHits(data.hits);
      setTotal(data.total);
      setTotalHits(data.totalHits);
    };

    fetchData();

    const closeModal = event => {
      if (event.key === 'Escape') {
        setActiveImage(null);
      }
    };
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await fetchImg({ q: searchQuery, page: page });

        if (page > 1) {
          setHits(prevHits => [...prevHits, ...data.hits]);
        } else {
          setHits(data.hits);
        }

        setTotal(data.total);
        setTotalHits(data.totalHits);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    if (page > 1 || searchQuery) {
      fetchData();
    }
  }, [searchQuery, page]);

  const showLoadMore = () => {
    return page < Math.ceil(total / perPage);
  };

  const handleLoadMore = async () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearchSubmit = async query => {
    setSearchQuery(query);
    setPage(1);
    setHits([]);
    setLoading(true);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <ImageGallery setActiveImage={setActiveImage} images={hits} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {showLoadMore() && <ButtonLoadMore handleLoadMore={handleLoadMore} />}
        </>
      )}
      {activeImage && (
        <Modal image={activeImage} setActiveImage={setActiveImage} />
      )}
    </>
  );
};

// export class App extends React.Component {
// constructor(props) {
//   super(props);
//   this.closeModal = this.closeModal.bind(this);
// }

//   state = {
// hits: [],
// total: 0,
// totalHits: 0,
// searchQuery: '',
// per_page: 12,
// page: 1,
// loading: false,
// activeImage: null,
//   };

//   async componentDidMount() {
//     window.addEventListener('keydown', this.closeModal);
//     const data = await fetchImg();
//     this.setState(prevState => ({
//       hits: data.hits,
//       total: data.total,
//       totalHits: data.totalHits,
//     }));
//   }

//   async componentDidUpdate(_, prevState) {
//     if (this.state.searchQuery !== prevState.searchQuery) {
//       try {
//         this.setState({ loading: true });
//         const data = await fetchImg({ q: this.state.searchQuery });
//         this.setState({
//           hits: data.hits,
//           total: data.total,
//           totalHits: data.totalHits,
//         });
//         this.setState({ loading: false });
//       } catch (error) {
//         console.log('Error fetching data', error);
//       }
//     } else if (this.state.page !== prevState.page) {
//       try {
//         this.setState({ loading: true });
//         const data = await fetchImg({
//           q: this.state.searchQuery,
//           page: this.state.page,
//         });

//         this.setState(prevState => ({
//           hits: [...prevState.hits, ...data.hits],
//           total: data.total,
//           totalHits: data.totalHits,
//         }));
//         this.setState({ loading: false });
//       } catch (error) {
//         console.log('Error fetching data', error);
//       }
//     }
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.closeModal);
//   }

//   closeModal(event) {
//     if (event.key === 'Escape') {
//       this.setState({ activeImage: null });
//     }
//   }

// showLoadMore = () => {
//   // let maxPage = Math.ceil(this.state.total / this.state.per_page);
//   // if (this.state.page < maxPage) {
//   //   return true;
//   // }
//   // return false;

//   return this.state.page < Math.ceil(this.state.total / this.state.per_page)
//     ? true
//     : false;
// };

// setActiveImage = (image = null) => {
//   this.setState({ activeImage: image });
// };

// handleLoadMore = async () => {
//   await this.setState(prevState => ({
//     page: prevState.page + 1,
//   }));
// };

// handleSearchSubmit = async query => {
//   this.setState({ searchQuery: query, page: 1, hits: [], loading: true });
// };

//   render() {
//     return (
// <>
//   <SearchBar onSubmit={this.handleSearchSubmit} />
//   <ImageGallery
//     setActiveImage={this.setActiveImage}
//     images={this.state.hits}
//   />
//   {this.state.loading ? (
//     <Loader />
//   ) : (
//     <>
//       {this.showLoadMore() && (
//         <ButtonLoadMore handleLoadMore={this.handleLoadMore} />
//       )}
//     </>
//   )}
//   {this.state.activeImage && (
//     <Modal
//       image={this.state.activeImage}
//       setActiveImage={this.setActiveImage}
//     />
//   )}
// </>
//     );
//   }
// }
