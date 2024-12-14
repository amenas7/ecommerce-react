import "./Banner.css";

function Banner() {
    return (
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="2000">
                    <img src="https://samgtamkprodeastus03.blob.core.windows.net/banner-image/01-Banner608x304px-alta.jpg.png" className="d-block w-100 custom-image"/>
                </div>
                <div className="carousel-item " data-bs-interval="3000">
                    <img src="https://samgtamkprodeastus03.blob.core.windows.net/banner-image/BANNERDEX_PRIMOR (2)_30072024123340.png" className="d-block w-100 custom-image"/>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                    <img src="https://samgtamkprodeastus03.blob.core.windows.net/banner-image/BANNERDEX_24_AGO_23082024160047.jpg" className="d-block w-100 custom-image"/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
};



export default Banner;