import { useState, useEffect, useMemo } from 'react';

//To deploy a gh pages use: npm run predeploy    npm run deploy

import { IProduct } from './types/objectTypes/IProduct';
import debounce from './hooks/useDebounce';
import Header from './components/Header';
import Search from './components/Search';
import Categories from './components/Categories';
import Products from './features/Products';
import Pagination from './components/Pagination';
import Modal from './components/Modal';
import Footer from './components/Footer';
import { selectCurrentTheme } from './store/slices/theme/themeSlice';
import { IColorTheme, themes } from './types/storeTypes/IThemesState';
import { selectPopUp } from './store/slices/popUp/popUpSlice';
import { useAppSelector } from './store/store';
import { useGetProductsQuery } from './api/modules/productsApi';
import { itemsPerPage } from './values/intValues';
import { colors, stringValues, titles } from './values/stringValues';


export default function App() {
  const { popUpBg, popUpText, showPopUp } = useAppSelector(selectPopUp);
  const currentTheme: IColorTheme = useAppSelector(selectCurrentTheme);


  const [items, setItems] = useState<IProduct[]>([]);
  const [currentItems, setCurrentItems] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [totalItemsQuantity, setTotalItemsQuantity] = useState<number>(1);
  const { data } = useGetProductsQuery({ page: currentPage, limit: itemsPerPage, category: currentCategory});

  useEffect(() => {
    if (currentTheme === themes.light) {
      document.body.style.backgroundColor = colors.whiteColor;
    } else {
      document.body.style.backgroundColor = colors.darkGrayColor;
    }
  }, [currentTheme]);

  useEffect(() => {
    if (data) {
      setCurrentItems(data.records);
      setItems(data.records);
      setTotalItemsQuantity(data.pagination.total);
    }
  }, [data]);

  const pageQuantity = useMemo(() => {
    return Math.ceil(totalItemsQuantity / itemsPerPage);
  }, [totalItemsQuantity]);

  useEffect(() => {
    let lastScroll = 0;

    const header = document.querySelector('.header');
    const cart = document.querySelector('.shop-cart');

    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const containHide = () => header?.classList.contains('hideHeader') ? true : false;

    function handleScroll() {
      if (!cart?.classList.contains('visible')) {
        if (scrollPosition() > lastScroll && !containHide()) {
          header?.classList.add('hideHeader');
        } else if (scrollPosition() < lastScroll && containHide()) {
          header?.classList.remove('hideHeader');
        }
        lastScroll = scrollPosition();
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const paginate = (pageNumber: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  const nextPage = (): void => {
    setCurrentPage((prev) => (prev < pageQuantity ? prev + 1 : 1));
  };

  const prevPage = (): void => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : pageQuantity));
  };

  const searchFn = debounce({
    fn: (inputVal: string) => searchFilter(inputVal),
    waitTime: 500,
  });

  function searchFilter(value: string) {
    if (value !== '') {
      const inputValue = value.trim().toLowerCase();
      const splitValue = inputValue.split('');

      const newCurrItems = items.filter(el => checkAllLetters(el.title.toLowerCase(), splitValue));
      setCurrentItems(newCurrItems);
    } else {
      setCurrentItems(items);
    }
  }

  const [showFullItem, setShowFullItem] = useState(false);
  const [fullItem, setFullItem] = useState<IProduct >(Object);

  const [showModalAbout, setShowModalAbout] = useState(false);
  const [showModalContact, setShowModalContact] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);

  useEffect(() => {
    if (showModalContact || showModalAbout) {
      document.body.classList.add('lock');
    } else {
      document.body.classList.remove('lock');
    }
  }, [showModalAbout, showModalContact]);

  return (
    <div className='wrapper' style={{ background: currentTheme.background, color: currentTheme.color }}>
      <Header onShowModal={onShowModal} />
      <div className='presentation'></div>
      <Search searchFilter={searchFn} />
      <Categories chooseCategory={chooseCategory} />
      <Products type='user' onShowItem={onShowItem} items={currentItems} />
      <div className={`notification ${showPopUp ? 'visible' : ''} ${popUpBg}`}>
        <p>{popUpText}</p>
      </div>
      <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        currentPage={currentPage}
        paginateFn={paginate}
        itemsPerPage={itemsPerPage}
        totalItems={totalItemsQuantity}
      />
      <Modal
        type={"full-item"}
        item={fullItem}
        show={showFullItem}
        onShowItem={onShowItem}
      />
      <Modal
        type={"information"}
        show={showModalAbout}
        onShowModal={onShowModal}
        title={titles.aboutUs}
        textContent={<p>{stringValues.aboutUs}</p>}
      />
      <Modal
        type={"information"}
        show={showModalContact}
        onShowModal={onShowModal}
        title={titles.contacts}
        textContent={
          <div className='modal-text-content'>
            <h3>Phone:  <a>{stringValues.phoneNum}</a></h3>
            <h3>Instagram:  <a>{stringValues.instagram}</a></h3>
            <h3>Facebook: <a>{stringValues.facebook}</a></h3>
          </div>
        }
      />
      <Modal
        type={"login"}
        show={showModalLogin}
        onShowModal={onShowModal}
      />
      <Footer />
    </div>
  );

  function chooseCategory(category: string) {
    setCurrentPage(1);
    setCurrentCategory(category);
  }

  function checkAllLetters(name: string, charArray: string[]) {
    const countMap: { [key: string]: number } = {};

    for (const letter of name) {
      countMap[letter] = (countMap[letter] || 0) + 1;
    }

    return charArray.every((letter) => {
      const countNameChars = countMap[letter] || 0;
      const countArrayChars = charArray.filter((el) => el === letter).length;

      return countNameChars >= countArrayChars;
    });
  }

  function onShowItem(item: IProduct) {
    setFullItem(item);
    setShowFullItem(!showFullItem);
    document.body.classList.toggle('lock');
  }

  function onShowModal(type: string) {
    if (type === "about") {
      setShowModalAbout(!showModalAbout);
    } else if (type === "contacts") {
      setShowModalContact(!showModalContact);
    } else if (type === "login") {
      setShowModalLogin(!showModalLogin);
    } else {
      setShowModalAbout(false);
      setShowModalContact(false);
      setShowModalLogin(false);
    }
  }
}
