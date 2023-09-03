import Button from 'components/Button';
import ImageGallery from 'components/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';
import React, { useState } from 'react';
import { Notify } from 'notiflix';
import * as API from 'services/api';

export function App() {
  const [images, setImages] = useState([]);
  const [searchSubject, setSearchSubject] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [page, setPage] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const fetchFirstImages = async searchSub => {
    setShowButton(false);

    if (searchSub === '') {
      Notify.info('Ви не ввели тему пошуку!', {
        timeout: 3000,
      });
      return;
    }
    try {
      setSearchSubject(searchSub);
      setPage(1);
      setImages([]);
      setIsLoading(true);
      const images = await API.getImages(searchSub, 1);
      setTimeout(() => {
        if (images.hits.length < API.getPerPage()) {
          setShowButton(false);
        } else {
          setShowButton(true);
        }
        setImages(images.hits);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoreImages = async () => {
    try {
      setShowButton(false);
      setPage(prevPage => prevPage + 1);
      setIsLoading(true);
      const images = await API.getImages(searchSubject, page + 1);
      setTimeout(() => {
        if (images.hits.length < API.getPerPage()) {
          setShowButton(false);
        } else {
          setShowButton(true);
        }
        setImages(prevImages => [...prevImages, ...images.hits]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const changeModalForm = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setOpenModal(true);
    document.addEventListener('keydown', handleEscapeKey);
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      setOpenModal(false);
      document.removeEventListener('keydown', handleEscapeKey);
    }
  };

  const handleEscapeKey = e => {
    if (e.key === 'Escape') {
      setOpenModal(false);
      document.removeEventListener('keydown', handleEscapeKey);
    }
  };

  return (
    <>
      <Searchbar fetchFirstImages={fetchFirstImages} />
      <ImageGallery>
        <ImageGalleryItem images={images} changeModalForm={changeModalForm} />
      </ImageGallery>
      {isLoading && <Loader />}
      {showButton && <Button fetchMoreImages={fetchMoreImages} />}
      {openModal && (
        <Modal
          largeImageURL={largeImageURL}
          handleBackdropClick={handleBackdropClick}
        />
      )}
    </>
  );
}
