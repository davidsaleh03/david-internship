import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";



const HotCollections = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const {data} = await axios.get(
        'https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections'
      )
      console.log(data)
      setData(data);
      setLoading(false)
    }
    fetchData()
  },[])

  const options = {
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  responsive: {
    0: { items: 1 },
    576: { items: 2 },
    768: { items: 3 },
    1200: { items: 4 }
  }
};
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>  
          {
            loading ? (
    <>
      <OwlCarousel className="owl-theme" {...options} nav>
        {new Array(4).fill(0).map((_, index) => (
            <div key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <div className="skeleton-box" style={{ width: "100%", height: "200px" }}></div>
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <div className="skeleton-box" style={{ width: "50px", height: "50px", borderRadius: '50%' }}></div>
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info nft_coll_info-2">
                  <Link to="/explore">
                    <div className="skeleton-box" style={{ width: "100px", height: "20px" }}></div>
                  </Link>
                  <div className="skeleton-box" style={{ width: "60px", height: "20px" }}></div>
                </div>
              </div>
            </div>
          ))}
      </OwlCarousel>
    </>
  )
            :
            <>
          <OwlCarousel className="owl-theme" {...options} nav>
          {
            data.map((collection) => (
               <div key={collection.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${collection.nftId}`}>
                    <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{collection.title}</h4>
                  </Link>
                  <span>ERC-{collection.code}</span>
                </div>
              </div>
            </div>
            ))
          }
            </OwlCarousel>  
            </>
          }
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
